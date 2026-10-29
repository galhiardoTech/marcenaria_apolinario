import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { render } from '../dist-ssr/entry-server.js';
import { renderSeoHead, indexablePaths, siteUrl } from '../src/data/seo.js';
import { business } from '../src/data/business.js';

const outputDir = fileURLToPath(new URL('../dist/', import.meta.url));
const template = await readFile(resolve(outputDir, 'index.html'), 'utf8');
const env = loadEnv('production', fileURLToPath(new URL('../', import.meta.url)), 'VITE_');
const sitemapPages = [];
const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const brandImages = new Set([business.logoPath, business.watermarkLogoPath]);

// Preserve as URLs publicadas antes da mudança dos ícones para a raiz.
// Rastreadores podem continuar buscando esses endereços a partir de seu cache.
const legacyIconsDir = resolve(outputDir, 'images/logos/favicon');
await mkdir(legacyIconsDir, { recursive: true });
for (const file of [
    'favicon.ico', 'favicon-96x96.png', 'favicon.svg', 'apple-touch-icon.png',
    'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png', 'site.webmanifest',
]) {
    await copyFile(resolve(outputDir, file), resolve(legacyIconsDir, file));
}

for (const pathname of [...indexablePaths, '/404']) {
    const head = renderSeoHead(pathname, { googleSiteVerification: env.VITE_GOOGLE_SITE_VERIFICATION });
    const html = template
        .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, `<!--seo-start-->\n    ${head}\n    <!--seo-end-->`)
        .replace('<div id="root"></div>', () => `<div id="root">${render(pathname)}</div>`);

    const directory = pathname === '/' || pathname === '/404' ? outputDir : resolve(outputDir, pathname.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, pathname === '/404' ? '404.html' : 'index.html'), html);

    if (indexablePaths.includes(pathname)) {
        // Use as URLs finais geradas pelo Vite, incluindo apenas fotos presentes na página.
        const images = [...new Set([...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)]
            .map(match => match[1])
            .filter(src => src.startsWith('/') && !brandImages.has(src)))];
        for (const image of images) await access(resolve(outputDir, image.slice(1)));
        sitemapPages.push({ pathname, images });
    }
}

await writeFile(resolve(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await writeFile(resolve(outputDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapPages.map(({ pathname, images }) => `  <url>
    <loc>${escapeXml(`${siteUrl}${pathname}`)}</loc>
${images.map(image => `    <image:image><image:loc>${escapeXml(`${siteUrl}${image}`)}</image:loc></image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`);
console.log(`HTML pré-renderizado para ${indexablePaths.join(', ')} e página 404; robots.txt e sitemap com fotos gerados.`);
