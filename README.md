# Marcenaria Apolinário

Site em React e Vite da Marcenaria Apolinário, na Chácara Belenzinho, São Paulo.

## Desenvolvimento e validação

```sh
npm install
npm run dev
npm run build
npm run test:seo
npm run lint
npm run preview
```

No PowerShell com scripts desabilitados, use `npm.cmd` no lugar de `npm`.

O build gera conteúdo HTML completo para `/` e `/servicos`, com hidratação React para menus e filtros. O resultado publicável está em `dist/`; `dist-ssr/` é apenas um artefato usado na geração.

## SEO e publicação

O domínio oficial é `https://www.apolinariointeriores.com.br`. Os títulos, descrições, URLs canônicas, compartilhamento social e dados estruturados estão centralizados em `src/data/seo.js`. Não são publicados horários, avaliações ou outras informações comerciais não confirmadas.

O comando de build também gera:

- `dist/index.html`: página inicial, com conteúdo local e contato;
- `dist/servicos/index.html`: catálogo completo, legível sem executar JavaScript;
- `dist/robots.txt` e `dist/sitemap.xml`: instruções de rastreamento e as duas URLs públicas;
- `dist/404.html`: página de erro com `noindex`.

Publique o conteúdo de `dist/` na raiz da hospedagem, incluindo subdiretórios e imagens. Configure o servidor para:

1. Servir `/servicos/index.html` ao acessar `/servicos`, preferencialmente sem redirecionamento para uma URL com barra final.
2. Servir `404.html` com status HTTP **404** para URLs inexistentes. Evite uma regra geral que entregue a página inicial com status 200 para qualquer endereço.
3. Redirecionar HTTP para HTTPS e o domínio sem `www` para `https://www.apolinariointeriores.com.br`, preservando caminho e parâmetros.

As regras para a Hostinger estão em `public/.htaccess`, copiado automaticamente para `dist/.htaccess`. Elas configuram o domínio oficial, a página de serviços e o erro 404. Na hospedagem web com Apache/LiteSpeed, envie o conteúdo de `dist/` para `public_html`, incluindo esse arquivo. Antes de substituir um `.htaccess` existente, guarde uma cópia e preserve eventuais regras adicionais; remova a regra antiga que enviava qualquer endereço para `index.html`.

Após o envio, confira que `/servicos` entrega o catálogo diretamente, que HTTP e o domínio sem `www` redirecionam para o endereço oficial e que uma URL inexistente retorna status 404. Essas regras ainda precisam ser verificadas na hospedagem real. `vite preview` serve apenas para conferir o build local, não para hospedar em produção.

Depois da publicação:

1. Verifique a propriedade do domínio no [Google Search Console](https://search.google.com/search-console) pelo método disponível no provedor de DNS.
2. Envie `https://www.apolinariointeriores.com.br/sitemap.xml`.
3. Inspecione `/` e `/servicos` e confira o HTML renderizado e a possibilidade de indexação.
4. Confira os dados estruturados no [Teste de pesquisa aprimorada](https://search.google.com/test/rich-results).
5. Mantenha nome, telefone, endereço e site consistentes no Perfil da Empresa no Google. Use os horários reais apenas depois de confirmados.

Os SVGs das logos e algumas fotos originais ainda são grandes. A próxima melhoria de desempenho é otimizar esses arquivos preservando a identidade visual, e medir o resultado no PageSpeed Insights após a publicação.

Referências: [Guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pt-br), [SEO em JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=pt-br) e [dados estruturados de empresa local](https://developers.google.com/search/docs/appearance/structured-data/local-business?hl=pt-br).
