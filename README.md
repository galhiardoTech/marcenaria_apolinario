# Apolinário Móveis Planejados

Site institucional em React e Vite da Apolinário Móveis Planejados, na Chácara Belenzinho, São Paulo. Apresenta projetos de cozinhas, quartos, salas e banheiros sob medida, com contato para orçamento.

## Identidade e contato

- Nome principal: **Apolinário Móveis Planejados**.
- Site: **https://www.apolinariointeriores.com.br/**.
- Telefone/WhatsApp: **(11) 97108-2868**.
- Endereço: **Rua Lessing, 589 — Chácara Belenzinho, São Paulo — SP, CEP 03276-000**.
- Instagram: **https://www.instagram.com/apolinariomoveisplanejado/**.

Os nomes anteriores Marcenaria Apolinário e Apolinário Interiores podem aparecer como nomes alternativos nos dados estruturados. O domínio continua sendo apolinariointeriores.com.br. O perfil do negócio no Google deve ser vinculado pelo endereço específico confirmado no Maps, evitando resultados de empresas homônimas.

Os dados da empresa e o link exato do Maps estão em `src/data/business.js`. O histórico da revisão, as fontes e as pendências estão em [docs/contexto-projeto.md](docs/contexto-projeto.md).

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

O build gera HTML completo para `/` e `/servicos`, com hidratação React para menus e filtros. O conteúdo publicável fica em `dist/`; `dist-ssr/` é um artefato intermediário. Execute `test:seo` depois do build, pois ele verifica os arquivos de `dist/`.

## SEO

Títulos, descrições, URLs canônicas, compartilhamento social e dados estruturados estão centralizados em `src/data/seo.js`. O domínio canônico usa HTTPS e `www`.

`public/favicon.png` é a versão quadrada de 96 × 96 pixels da logo existente. `public/images/logo-apolinario.png` é a versão quadrada de 512 × 512 usada no cabeçalho e nos dados estruturados. `public/images/logo-apolinario-cinza.png` preserva a arte usada no rodapé e nas marcas d'água. As artes SVG originais foram preservadas.

O build também gera:

- `dist/index.html`: página inicial com conteúdo local e contato.
- `dist/servicos/index.html`: catálogo legível sem JavaScript.
- `dist/robots.txt` e `dist/sitemap.xml`: rastreamento e as duas URLs públicas.
- `dist/404.html`: página de erro com `noindex`.

Não acrescente horários, avaliações, preços ou certificações sem confirmação. Mantenha nome, endereço, telefone, site e identidade visual consistentes no site, Instagram e Perfil da Empresa no Google.

## Domínio e publicação

O domínio é administrado na **Hostinger** e a aplicação React é publicada na **Vercel**, conforme informado pelo responsável. Configurações de DNS da Hostinger e publicação da Vercel têm funções diferentes.

Na Vercel, o comando de build é `npm run build` e a saída estática é `dist`. A configuração de domínio deve enviar HTTP e o domínio sem `www` para `https://www.apolinariointeriores.com.br`, preservando o caminho e os parâmetros.

Após publicar, confira:

1. `/` responde com status 200 e o nome correto da empresa.
2. `/servicos` entrega diretamente o catálogo pré-renderizado.
3. Uma URL inexistente responde com status 404 e a página com `noindex`.
4. HTTP e a versão sem `www` redirecionam para a versão oficial.
5. O favicon e os arquivos de logo são públicos e carregam corretamente.
6. `/robots.txt` e `/sitemap.xml` respondem com seu conteúdo próprio.

`public/.htaccess` contém regras para uma eventual hospedagem Apache/LiteSpeed. Esse arquivo não configura as rotas ou os redirecionamentos da Vercel. `vite preview` serve apenas para conferir o build local.

## Google

1. Verifique a propriedade do domínio no [Google Search Console](https://search.google.com/search-console).
2. Envie **https://www.apolinariointeriores.com.br/sitemap.xml**.
3. Inspecione as versões com `www` de `/` e `/servicos`.
4. Confira os dados no [Teste de pesquisa aprimorada](https://search.google.com/test/rich-results).
5. Use o site canônico e os dados de contato corretos no Perfil da Empresa.

A versão sem `www` pode aparecer como “Página com redirecionamento” no Search Console, enquanto a versão oficial é indexada. A exibição de favicon, nome do site e fotos nos resultados é decidida pelo Google e pode demorar a refletir uma atualização.

Referências: [Guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pt-br), [SEO em JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=pt-br), [dados estruturados de empresa local](https://developers.google.com/search/docs/appearance/structured-data/local-business?hl=pt-br) e [favicon nos resultados](https://developers.google.com/search/docs/appearance/favicon-in-search?hl=pt-br).
