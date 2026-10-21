import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { getSeoTags, renderSeoHead } from '../src/data/seo.js';
import { business as siteBusiness } from '../src/data/business.js';

const dist = new URL('../dist/', import.meta.url);

for (const [file, canonical, heading] of [
    ['index.html', 'https://www.apolinariointeriores.com.br/', 'Apolinário Móveis Planejados'],
    ['servicos/index.html', 'https://www.apolinariointeriores.com.br/servicos', 'Móveis planejados em São Paulo'],
]) {
    test(`${file}: conteúdo, metadados e dados locais disponíveis sem JavaScript`, async () => {
        const html = await readFile(new URL(file, dist), 'utf8');
        const head = html.split('</head>')[0];
        const body = html.split('</head>')[1];
        assert.match(html, /<html lang="pt-BR">/);
        assert.equal((head.match(/<title\b/g) ?? []).length, 1);
        assert.equal((head.match(/name="description"/g) ?? []).length, 1);
        assert.equal((head.match(/rel="canonical"/g) ?? []).length, 1);
        assert.ok(head.includes(`href="${canonical}"`));
        assert.match(head, /content="index, follow, max-image-preview:large"/);
        assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
        assert.equal((html.match(/<main\b/g) ?? []).length, 1);
        assert.ok(html.includes(heading));
        assert.ok(html.includes('Rua Lessing, 589 - Chácara Belenzinho'));
        assert.ok(!html.includes('Rua Lessig'));
        assert.ok(!body.includes('Marcenaria Apolinário'));
        assert.ok(!body.includes('Apolinário Interiores'));
        assert.ok(head.includes('rel="icon" type="image/png" sizes="96x96" href="/favicon.png"'));
        assert.ok(html.includes('Desenvolvido por GalhiardoTech'));
        assert.ok(!html.includes('Atendimento Seg a Sex'));
        assert.ok(!html.includes('Rua Exemplo'));

        const json = head.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
        assert.ok(json, 'Dados estruturados devem estar no head');
        const graph = JSON.parse(json[1])['@graph'];
        const business = graph.find(item => item['@type'] === 'LocalBusiness');
        const website = graph.find(item => item['@type'] === 'WebSite');
        assert.equal(business.name, 'Apolinário Móveis Planejados');
        assert.equal(website.name, business.name);
        assert.ok(head.includes(`property="og:site_name" content="${business.name}"`));
        assert.equal(business.address.streetAddress, 'Rua Lessing, 589');
        assert.equal(business.telephone, '+55-11-97108-2868');
        assert.equal(business.address.postalCode, '03276-000');
        assert.equal(business.address.addressLocality, 'São Paulo');
        assert.ok(!('openingHours' in business));
        assert.ok(!('openingHoursSpecification' in business));
        assert.ok(business.hasMap.includes('0x94ce5d52f80a37e1:0x465de042dd63e6b5'));
        assert.ok(business.sameAs.includes(business.hasMap));
        assert.ok(business.sameAs.includes('https://www.instagram.com/apolinariomoveisplanejado/'));
        assert.ok(body.includes(`href="${business.hasMap}"`));
        assert.equal(business.logo, 'https://www.apolinariointeriores.com.br/images/logo-apolinario.png');
        await access(new URL('images/logo-apolinario.png', dist));

        // Todos os recursos locais devem existir na publicação estática.
        for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets|images)\/[^"#?]+)"/g)) {
            await access(new URL(asset.slice(1), dist));
        }
    });
}

test('favicon publicado é um PNG quadrado de 96 pixels', async () => {
    const favicon = await readFile(new URL('favicon.png', dist));
    assert.equal(favicon.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(favicon.readUInt32BE(16), 96);
    assert.equal(favicon.readUInt32BE(20), 96);
});

test('ícones compatíveis e manifesto apontam para arquivos válidos', async () => {
    const ico = await readFile(new URL('favicon.ico', dist));
    assert.equal(ico.readUInt16LE(0), 0);
    assert.equal(ico.readUInt16LE(2), 1);
    assert.equal(ico.readUInt16LE(4), 2);
    const sizes = [];
    for (let index = 0; index < ico.readUInt16LE(4); index++) {
        const entry = 6 + index * 16;
        assert.equal(ico[entry], ico[entry + 1]);
        sizes.push(ico[entry]);
        assert.ok(ico.readUInt32LE(entry + 12) + ico.readUInt32LE(entry + 8) <= ico.length);
    }
    assert.deepEqual(sizes, [32, 48]);
    for (const [file, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['images/logo-apolinario.png', 512]]) {
        const png = await readFile(new URL(file, dist));
        assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
        assert.equal(png.readUInt32BE(16), size);
        assert.equal(png.readUInt32BE(20), size);
    }
    const manifest = JSON.parse(await readFile(new URL('site.webmanifest', dist), 'utf8'));
    assert.equal(manifest.name, siteBusiness.name);
    assert.equal(manifest.lang, 'pt-BR');
    for (const icon of manifest.icons) await access(new URL(icon.src.slice(1), dist));
});

test('imagem preferida, catálogo e navegação têm dados estruturados coerentes com o conteúdo', async () => {
    for (const file of ['index.html', 'servicos/index.html']) {
        const html = await readFile(new URL(file, dist), 'utf8');
        const graph = JSON.parse(html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1])['@graph'];
        const image = graph.find(node => node['@type'] === 'ImageObject');
        assert.equal(image.contentUrl, `${siteBusiness.siteUrl}${siteBusiness.socialImagePath}`);
        assert.equal(image.width, 1600);
        assert.equal(image.height, 1200);
        assert.ok(html.includes('property="og:image:width" content="1600"'));
        assert.ok(html.includes('property="og:image:type" content="image/jpeg"'));
        assert.ok(html.includes('name="twitter:image:alt"'));
        const catalog = graph.find(node => node['@type'] === 'OfferCatalog');
        assert.equal(catalog.itemListElement.length, 4);
        assert.ok(catalog.itemListElement.every(node => node['@type'] === 'Service' && node.provider['@id'] === `${siteBusiness.siteUrl}/#empresa`));
        assert.ok(!html.includes('aggregateRating'));
        if (file === 'index.html') {
            const page = graph.find(node => node['@type'] === 'WebPage');
            assert.equal(page.primaryImageOfPage['@id'], image['@id']);
            assert.ok(html.includes(`src="${siteBusiness.socialImagePath}"`));
            assert.ok(html.includes(`rel="preload" as="image" href="${siteBusiness.heroImagePath}"`));
            const hero = await readFile(new URL(siteBusiness.heroImagePath.slice(1), dist));
            assert.equal(hero.subarray(0, 3).toString('hex'), 'ffd8ff');
            assert.ok(hero.length < 300_000, 'Foto de abertura deve continuar otimizada');
        } else {
            const page = graph.find(node => node['@type'] === 'CollectionPage');
            const breadcrumb = graph.find(node => node['@type'] === 'BreadcrumbList');
            assert.equal(page.breadcrumb['@id'], breadcrumb['@id']);
            assert.deepEqual(breadcrumb.itemListElement.map(item => item.item), [`${siteBusiness.siteUrl}/`, `${siteBusiness.siteUrl}/servicos`]);
            assert.ok(html.includes('aria-label="Caminho de navegação"'));
            assert.ok(html.includes('id="catalogo"'));
        }
    }
});

test('verificação do Search Console é opcional e aceita apenas o token público', () => {
    assert.ok(!renderSeoHead('/').includes('google-site-verification'));
    const verification = 'token-publico_do-Google123';
    const head = renderSeoHead('/', { googleSiteVerification: verification });
    assert.ok(head.includes(`name="google-site-verification" content="${verification}"`));
    assert.throws(() => getSeoTags('/', { googleSiteVerification: '<meta content="token" />' }), /somente o token/);
    assert.ok(!renderSeoHead('/inexistente').includes('application/ld+json'));
});

test('novos serviços e fotos estão publicados no catálogo pré-renderizado', async () => {
    const html = await readFile(new URL('servicos/index.html', dist), 'utf8');
    const titles = [
        'Cozinha Amadeirada com Bancada Central',
        'Gabinete Suspenso com Prateleiras',
        'Gabinete com Nichos Iluminados',
        'Gabinete com Penteadeira e Espelheira',
        'Closet com Vidro e Espelho',
    ];
    assert.equal((html.match(/class="service-card-full"/g) ?? []).length, 20);
    for (const title of titles) {
        assert.ok(html.includes(`<h3 class="card-title">${title}</h3>`), `Serviço ausente: ${title}`);
        const button = html.indexOf(`aria-label="Ver foto completa: ${title}"`);
        assert.ok(button >= 0, `Acesso à foto completa ausente: ${title}`);
        const image = html.slice(button).match(/<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"/);
        assert.ok(image, `Foto ou descrição ausente: ${title}`);
        assert.ok(image[1].endsWith('.webp'));
        await access(new URL(image[1].slice(1), dist));
    }
    await access(new URL('videos/cozinha-planejada-detalhes.mp4', dist));
    assert.ok(!html.includes('<video'), 'O vídeo só deve carregar quando a pessoa abrir o serviço');
});

test('sitemap e robots apontam apenas para as páginas públicas do domínio definitivo', async () => {
    const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
    const robots = await readFile(new URL('robots.txt', dist), 'utf8');
    assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), [
        'https://www.apolinariointeriores.com.br/',
        'https://www.apolinariointeriores.com.br/servicos',
    ]);
    assert.match(robots, /Allow: \//);
    assert.ok(robots.includes('Sitemap: https://www.apolinariointeriores.com.br/sitemap.xml'));
    assert.ok(sitemap.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'));
    assert.ok(!sitemap.includes('<lastmod>'), 'Não declarar uma data de alteração artificial a cada build');
    for (const [, pageUrl, imagesXml] of sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>([\s\S]*?)<\/url>/g)) {
        const html = await readFile(new URL(pageUrl.endsWith('/servicos') ? 'servicos/index.html' : 'index.html', dist), 'utf8');
        const images = [...imagesXml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(match => new URL(match[1]));
        assert.ok(images.length > 0, 'Cada página deve informar as fotos presentes nela');
        assert.equal(new Set(images.map(image => image.href)).size, images.length);
        for (const image of images) {
            assert.equal(image.origin, siteBusiness.siteUrl);
            assert.ok(html.includes(`src="${image.pathname}"`));
            assert.ok(!image.pathname.includes('logo-apolinario'));
            await access(new URL(image.pathname.slice(1), dist));
        }
    }
    const notFound = await readFile(new URL('404.html', dist), 'utf8');
    assert.match(notFound, /content="noindex, follow"/);
    assert.ok(!notFound.includes('rel="canonical"'));
    assert.ok(notFound.includes('Página não encontrada'));
});
