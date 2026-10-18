import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { renderSeoHead } from './src/data/seo.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-seo',
      transformIndexHtml: html => html.replace(
        /<!--seo-start-->[\s\S]*?<!--seo-end-->/,
        `<!--seo-start-->\n    ${renderSeoHead('/')}\n    <!--seo-end-->`,
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
})
