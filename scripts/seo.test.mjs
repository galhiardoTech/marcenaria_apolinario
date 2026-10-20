import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

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
    const notFound = await readFile(new URL('404.html', dist), 'utf8');
    assert.match(notFound, /content="noindex, follow"/);
    assert.ok(!notFound.includes('rel="canonical"'));
    assert.ok(notFound.includes('Página não encontrada'));
});
