import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);

for (const [file, canonical, heading] of [
    ['index.html', 'https://www.apolinariointeriores.com.br/', 'MARCENARIA APOLINÁRIO'],
    ['servicos/index.html', 'https://www.apolinariointeriores.com.br/servicos', 'Móveis planejados em São Paulo'],
]) {
    test(`${file}: conteúdo, metadados e dados locais disponíveis sem JavaScript`, async () => {
        const html = await readFile(new URL(file, dist), 'utf8');
        const head = html.split('</head>')[0];
        assert.match(html, /<html lang="pt-BR">/);
        assert.equal((head.match(/<title\b/g) ?? []).length, 1);
        assert.equal((head.match(/name="description"/g) ?? []).length, 1);
        assert.equal((head.match(/rel="canonical"/g) ?? []).length, 1);
        assert.ok(head.includes(`href="${canonical}"`));
        assert.match(head, /content="index, follow, max-image-preview:large"/);
        assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
        assert.equal((html.match(/<main\b/g) ?? []).length, 1);
        assert.ok(html.includes(heading));
        assert.ok(html.includes('Rua Lessig, 589 - Chácara Belenzinho'));
        assert.ok(html.includes('Desenvolvido por GalhiardoTech'));
        assert.ok(!html.includes('Atendimento Seg a Sex'));
        assert.ok(!html.includes('Rua Exemplo'));

        const json = head.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
        assert.ok(json, 'Dados estruturados devem estar no head');
        const graph = JSON.parse(json[1])['@graph'];
        const business = graph.find(item => item['@type'] === 'LocalBusiness');
        assert.equal(business.telephone, '+55-11-97108-2868');
        assert.equal(business.address.postalCode, '03276-000');
        assert.equal(business.address.addressLocality, 'São Paulo');
        assert.ok(!('openingHours' in business));
        assert.ok(!('openingHoursSpecification' in business));

        // Todos os recursos locais devem existir na publicação estática.
        for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets|images)\/[^"#?]+)"/g)) {
            await access(new URL(asset.slice(1), dist));
        }
    });
}

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
