import { business } from '../src/data/business.js';
import { getSeoTags } from '../src/data/seo.js';

const timeoutMs = 15_000;
const maximumSampleAssets = 12;
const officialUrl = new URL(business.siteUrl);
const canonicalPaths = ['/', '/servicos'];
const canonicalUrls = canonicalPaths.map(path => new URL(path, officialUrl).href);
let passed = 0;
let failed = 0;
let requestCount = 0;

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function errorMessage(error) {
    if (['TimeoutError', 'AbortError'].includes(error.name)) return 'tempo de espera excedido (15 s)';
    return `${error.message}${error.cause?.code ? ` (${error.cause.code})` : ''}`;
}

async function check(label, action) {
    try {
        const detail = await action();
        passed += 1;
        console.log(`[OK] ${label}${detail ? `: ${detail}` : ''}`);
    } catch (error) {
        failed += 1;
        console.error(`[FALHA] ${label}: ${errorMessage(error)}`);
    }
}

async function request(url) {
    requestCount += 1;
    const response = await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(timeoutMs),
        headers: { 'User-Agent': 'Apolinario-SEO-Audit/1.0' },
    });
    const bytes = Buffer.from(await response.arrayBuffer());
    return { status: response.status, headers: response.headers, bytes, text: () => bytes.toString('utf8') };
}

function requireStatus(response, expected = 200) {
    assert(response.status === expected, `HTTP ${response.status}; esperado ${expected}`);
}

function contentType(response) {
    return (response.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
}

function decodeEntities(value) {
    return value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, entity => {
        const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
        if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
        const hexadecimal = entity.toLowerCase().startsWith('&#x');
        const codePoint = Number.parseInt(entity.slice(hexadecimal ? 3 : 2, -1), hexadecimal ? 16 : 10);
        return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : entity;
    });
}

function attributes(tag) {
    const result = {};
    for (const match of tag.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
        result[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
    }
    return result;
}

function tags(html, name) {
    return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => attributes(match[0]));
}

function textContent(html) {
    return decodeEntities(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function robotsTags(html) {
    return tags(html, 'meta').filter(tag => /^(?:robots|googlebot)$/i.test(tag.name ?? ''));
}

function validatePage(response, pathname) {
    requireStatus(response);
    assert(contentType(response) === 'text/html', 'Content-Type deve ser text/html');
    const html = response.text().replace(/<!--[\s\S]*?-->/g, '');
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
    const problems = [];
    const expect = (condition, message) => { if (!condition) problems.push(message); };
    const titles = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
    const expectedTitle = getSeoTags(pathname).find(tag => tag.tag === 'title').children;
    expect(titles.length === 1 && textContent(titles[0][1]) === expectedTitle, 'título ausente, duplicado ou diferente do código atual');
    const canonicals = tags(head, 'link').filter(tag => (tag.rel ?? '').toLowerCase().split(/\s+/).includes('canonical'));
    expect(canonicals.length === 1 && canonicals[0].href === new URL(pathname, officialUrl).href, 'canonical ausente, duplicado ou incorreto');
    const links = tags(head, 'link');
    expect(links.some(tag => tag.rel === 'icon' && tag.href === '/favicon-96x96.png' && tag.type === 'image/png' && tag.sizes === '96x96'), 'favicon PNG de 96 pixels ausente no head');
    expect(links.some(tag => tag.rel === 'manifest' && tag.href === '/site.webmanifest'), 'manifesto ausente ou em caminho desatualizado');
    const directives = robotsTags(head);
    expect(directives.some(tag => /(?:^|[\s,])index(?:$|[\s,])/i.test(tag.content ?? '')), 'meta robots deve permitir indexação');
    expect(!directives.some(tag => /\b(?:noindex|none)\b/i.test(tag.content ?? '')), 'meta robots bloqueia indexação');
    expect(!/\b(?:noindex|none)\b/i.test(response.headers.get('x-robots-tag') ?? ''), 'X-Robots-Tag bloqueia indexação');
    const headings = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
    expect(headings.length === 1 && textContent(headings[0][1]).length > 0, 'HTML deve conter um h1 preenchido');
    expect(textContent(main).length >= 100 && textContent(main).includes(business.name), 'conteúdo principal não está pré-renderizado');
    expect(textContent(body).includes(business.address.streetAddress) && textContent(body).includes(business.phone), 'endereço ou telefone não está renderizado no HTML');
    const jsonLd = [...head.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
        .filter(match => attributes(match[1]).type?.toLowerCase() === 'application/ld+json');
    expect(jsonLd.length > 0, 'JSON-LD ausente no head');
    for (const [, , json] of jsonLd) {
        try {
            const parsed = JSON.parse(json);
            expect(parsed !== null && typeof parsed === 'object', 'JSON-LD deve conter objeto ou lista');
        } catch {
            problems.push('JSON-LD contém JSON inválido');
        }
    }
    expect(tags(head, 'meta').some(tag => tag.property === 'og:image' && tag.content === new URL(business.socialImagePath, officialUrl).href), 'og:image ausente ou incorreta');
    assert(problems.length === 0, problems.join('; '));
    return html;
}

function validatePng(response, dimension) {
    requireStatus(response);
    assert(contentType(response) === 'image/png', 'Content-Type deve ser image/png');
    assert(response.bytes.length >= 24 && response.bytes.subarray(0, 8).toString('hex') === '89504e470d0a1a0a', 'arquivo não é um PNG válido');
    const width = response.bytes.readUInt32BE(16);
    const height = response.bytes.readUInt32BE(20);
    assert(width === dimension && height === dimension, `dimensões ${width}×${height}; esperado ${dimension}×${dimension}`);
    return `${dimension}×${dimension}, ${response.bytes.length.toLocaleString('pt-BR')} bytes`;
}

function robotsGroups(text) {
    const groups = [];
    let current = { agents: [], rules: [] };
    for (const line of text.split(/\r?\n/)) {
        const match = line.replace(/#.*$/, '').trim().match(/^([\w-]+)\s*:\s*(.*?)\s*$/);
        if (!match) continue;
        const [, field, value] = match;
        if (field.toLowerCase() === 'user-agent') {
            if (current.rules.length) {
                groups.push(current);
                current = { agents: [], rules: [] };
            }
            current.agents.push(value.toLowerCase());
        } else if (/^(?:allow|disallow)$/i.test(field)) {
            current.rules.push({ field: field.toLowerCase(), value });
        }
    }
    if (current.agents.length) groups.push(current);
    return groups;
}

function sampleAssets(htmlPages, origin) {
    const resources = new Set();
    for (const html of htmlPages) {
        const candidates = [
            ...tags(html, 'script').map(tag => tag.src),
            ...tags(html, 'link').filter(tag => (tag.rel ?? '').toLowerCase() === 'stylesheet').map(tag => tag.href),
            ...tags(html, 'img').map(tag => tag.src),
        ];
        for (const candidate of candidates.filter(Boolean)) {
            try {
                const url = new URL(candidate, origin);
                if (![origin, officialUrl.origin].includes(url.origin) || !/^\/(?:assets|images)\//.test(url.pathname)) continue;
                if ([business.logoPath, business.socialImagePath].includes(url.pathname)) continue;
                resources.add(`${url.pathname}${url.search}`);
            } catch {
                // Recursos inválidos serão reportados se incluídos nas verificações principais.
            }
        }
    }
    return { total: resources.size, paths: [...resources].slice(0, maximumSampleAssets) };
}

async function audit(origin) {
    console.log(`Auditoria SEO HTTP: ${origin}`);
    console.log(`Canonical esperado: ${officialUrl.origin}; timeout ${timeoutMs / 1000} s; redirecionamentos manuais.\n`);
    const htmlPages = [];
    await Promise.all(canonicalPaths.map(pathname => check(`Página ${pathname}`, async () => {
        const response = await request(new URL(pathname, origin));
        const html = response.status === 200 && contentType(response) === 'text/html' ? response.text() : '';
        if (html) htmlPages.push(html);
        validatePage(response, pathname);
        return '200, HTML pré-renderizado, metadados e JSON-LD válidos';
    })));

    await Promise.all([
        ...[
            ['/favicon-96x96.png', 96],
            ['/apple-touch-icon.png', 180],
            ['/web-app-manifest-192x192.png', 192],
            ['/web-app-manifest-512x512.png', 512],
            [business.logoPath, 512],
        ]
            .map(([pathname, dimension]) => check(pathname, async () => validatePng(await request(new URL(pathname, origin)), dimension))),
        check('/favicon.ico', async () => {
            const response = await request(new URL('/favicon.ico', origin));
            requireStatus(response);
            assert(response.bytes.length >= 6 && response.bytes.subarray(0, 4).toString('hex') === '00000100' && response.bytes.readUInt16LE(4) > 0, 'arquivo não possui cabeçalho ICO válido');
            return `${response.bytes.readUInt16LE(4)} resolução(ões), ${response.bytes.length.toLocaleString('pt-BR')} bytes`;
        }),
        check('/site.webmanifest', async () => {
            const response = await request(new URL('/site.webmanifest', origin));
            requireStatus(response);
            assert(contentType(response) === 'application/manifest+json', 'Content-Type deve ser application/manifest+json');
            const manifest = JSON.parse(response.text());
            assert(manifest.name === business.name && manifest.lang === 'pt-BR', 'manifesto deve identificar a empresa e o idioma corretos');
            assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'manifesto sem ícones');
            await Promise.all(manifest.icons.map(async icon => {
                assert(typeof icon.src === 'string' && icon.src.startsWith('/') && !icon.src.startsWith('//'), 'ícone deve ter caminho público local');
                const size = Number(icon.sizes?.split('x')[0]);
                assert(size > 0 && icon.sizes === `${size}x${size}` && icon.type === 'image/png', 'ícone deve declarar formato PNG e dimensões quadradas');
                validatePng(await request(new URL(icon.src, origin)), size);
            }));
            return `${manifest.icons.length} ícones declarados existem e têm formato e tamanho corretos`;
        }),
        check(business.socialImagePath, async () => {
            const response = await request(new URL(business.socialImagePath, origin));
            requireStatus(response);
            assert(contentType(response) === 'image/jpeg', 'Content-Type deve ser image/jpeg');
            assert(response.bytes.length > 0, 'imagem social está vazia');
            return `${response.bytes.length.toLocaleString('pt-BR')} bytes`;
        }),
        check('/robots.txt', async () => {
            const response = await request(new URL('/robots.txt', origin));
            requireStatus(response);
            assert(contentType(response) === 'text/plain', 'Content-Type deve ser text/plain');
            const text = response.text();
            const groups = robotsGroups(text);
            const applicable = groups.filter(group => group.agents.some(agent => ['*', 'googlebot', 'googlebot-image'].includes(agent)));
            assert(applicable.length > 0, 'nenhuma regra pública para User-agent: * ou Googlebot');
            assert(applicable.every(group => !group.rules.some(rule => rule.field === 'disallow' && /^\/(?:\*)?$/.test(rule.value))), 'robots bloqueia o rastreamento de todo o site');
            assert(applicable.some(group => group.rules.some(rule => rule.field === 'allow' && rule.value === '/')), 'Allow: / ausente');
            const sitemaps = [...text.matchAll(/^\s*Sitemap:\s*(\S+)\s*$/gmi)].map(match => match[1]);
            assert(sitemaps.includes(new URL('/sitemap.xml', officialUrl).href), 'Sitemap não aponta para a URL canônica correta');
            return 'rastreamento liberado e sitemap correto';
        }),
        check('/sitemap.xml', async () => {
            const response = await request(new URL('/sitemap.xml', origin));
            requireStatus(response);
            assert(/^(?:(?:application|text)\/xml|application\/[\w.+-]+\+xml)$/.test(contentType(response)), 'Content-Type deve ser XML');
            const xml = response.text();
            assert(/<urlset\b[^>]*xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["']/i.test(xml) && /<\/urlset>/.test(xml), 'urlset XML ausente ou namespace incorreto');
            const locations = [...xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/g)].map(match => decodeEntities(match[1].trim()));
            assert(locations.length === canonicalUrls.length && [...locations].sort().every((url, index) => url === [...canonicalUrls].sort()[index]), 'sitemap deve listar exatamente / e /servicos com URLs canônicas');
            const images = [...xml.matchAll(/<image:loc\b[^>]*>([\s\S]*?)<\/image:loc>/g)].map(match => decodeEntities(match[1].trim()));
            assert(images.length > 0, 'sitemap ainda não contém image:loc');
            assert(images.every(value => {
                try {
                    const url = new URL(value);
                    return url.protocol === 'https:' && url.origin === officialUrl.origin && !url.username && !url.password;
                } catch { return false; }
            }), 'image:loc deve usar HTTPS e o domínio canônico');
            return `2 páginas e ${images.length} referências de imagens`;
        }),
        check('Página inexistente', async () => {
            const response = await request(new URL('/__auditoria_seo_pagina_inexistente__', origin));
            requireStatus(response, 404);
            assert(contentType(response) === 'text/html', '404 deve entregar text/html');
            assert(robotsTags(response.text()).some(tag => /\bnoindex\b/i.test(tag.content ?? '')) || /\bnoindex\b/i.test(response.headers.get('x-robots-tag') ?? ''), '404 deve informar noindex');
            return 'HTTP 404 com noindex';
        }),
    ]);

    const assets = sampleAssets(htmlPages, origin);
    await check('Recursos locais do HTML', async () => {
        assert(assets.paths.length > 0, 'nenhum recurso local encontrado para conferir');
        const results = await Promise.all(assets.paths.map(async pathname => {
            try {
                const response = await request(new URL(pathname, origin));
                requireStatus(response);
                assert(response.bytes.length > 0, 'arquivo vazio');
                assert(contentType(response) !== 'text/html', 'servidor devolveu HTML no lugar do recurso');
                return null;
            } catch (error) { return `${pathname}: ${errorMessage(error)}`; }
        }));
        const problems = results.filter(Boolean);
        assert(problems.length === 0, problems.join('; '));
        return `${assets.paths.length} de ${assets.total} recursos conferidos`;
    });

    if (origin === officialUrl.origin) {
        const destination = new URL('/servicos?origem=seo', officialUrl);
        const sources = [new URL(destination)];
        sources[0].protocol = 'http:';
        if (officialUrl.hostname.startsWith('www.')) {
            const withoutWww = new URL(destination);
            withoutWww.hostname = withoutWww.hostname.slice(4);
            sources.push(withoutWww);
        }
        await Promise.all(sources.map(source => check(`Redirecionamento ${source.origin}`, async () => {
            const response = await request(source);
            assert([301, 308].includes(response.status), `HTTP ${response.status}; esperado redirecionamento permanente 301 ou 308`);
            const location = response.headers.get('location');
            assert(location && new URL(location, source).href === destination.href, 'Location deve preservar /servicos?origem=seo e apontar para HTTPS com www');
            return `${response.status} preserva caminho e parâmetros`;
        })));
    } else {
        console.log('[INFO] Redirecionamentos HTTP/sem www conferidos somente no domínio oficial.');
    }

    console.log(`\nResultado: ${passed} verificações aprovadas; ${failed} falhas; ${requestCount} requisições GET.`);
    if (failed) process.exitCode = 1;
}

try {
    assert(process.argv.length <= 3, 'Uso: node scripts/audit-seo.mjs [https://dominio-do-site]');
    const input = new URL(process.argv[2] ?? business.siteUrl);
    assert(['https:', 'http:'].includes(input.protocol), 'Informe uma URL http:// ou https://');
    assert(!input.username && !input.password, 'A URL não deve conter credenciais');
    assert(input.pathname === '/' && !input.search && !input.hash, 'Informe apenas a origem do site, sem caminho, parâmetros ou fragmento');
    await audit(input.origin);
} catch (error) {
    console.error(`[FALHA] Auditoria: ${errorMessage(error)}`);
    process.exitCode = 1;
}
