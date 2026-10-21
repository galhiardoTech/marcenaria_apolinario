import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { renderSeoHead } from './src/data/seo.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), 'VITE_')
  return {
    plugins: [
      react(),
      {
        name: 'site-seo',
        transformIndexHtml: html => html.replace(
          /<!--seo-start-->[\s\S]*?<!--seo-end-->/,
          `<!--seo-start-->\n    ${renderSeoHead('/', { googleSiteVerification: env.VITE_GOOGLE_SITE_VERIFICATION })}\n    <!--seo-end-->`,
        ),
        configurePreviewServer(server) {
          server.middlewares.use((request, _response, next) => {
            const url = new URL(request.url, 'http://localhost');
            if (url.pathname === '/servicos' || url.pathname === '/servicos/') {
              request.url = `/servicos/index.html${url.search}`;
            }
            next();
          });
        },
      },
    ],
  }
})
