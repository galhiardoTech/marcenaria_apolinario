import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from '../dist-ssr/entry-server.js';
import { renderSeoHead, indexablePaths, siteUrl } from '../src/data/seo.js';

const outputDir = fileURLToPath(new URL('../dist/', import.meta.url));
const template = await readFile(resolve(outputDir, 'index.html'), 'utf8');

for (const pathname of [...indexablePaths, '/404']) {
    const head = renderSeoHead(pathname);
    const html = template
        .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, `<!--seo-start-->\n    ${head}\n    <!--seo-end-->`)
        .replace('<div id="root"></div>', () => `<div id="root">${render(pathname)}</div>`);

    const directory = pathname === '/' || pathname === '/404' ? outputDir : resolve(outputDir, pathname.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, pathname === '/404' ? '404.html' : 'index.html'), html);
}

await writeFile(resolve(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(resolve(outputDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexablePaths.map(path => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')}
</urlset>
`);
console.log(`HTML pré-renderizado para ${indexablePaths.join(', ')} e página 404; robots.txt e sitemap.xml gerados.`);
