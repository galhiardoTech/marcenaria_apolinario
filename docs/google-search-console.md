# Publicação e Google Search Console

Guia para o site **Apolinário Móveis Planejados**, com domínio canônico `https://www.apolinariointeriores.com.br/`, hospedagem na Vercel e DNS na Hostinger. Revisão: 20 de outubro de 2026.

## O que aparece na busca

Na captura enviada, a foto de cozinha já aparece à direita. O símbolo de globo à esquerda ocupa o lugar do **favicon**, o pequeno ícone da marca. São recursos diferentes. Na verificação pública, o PNG em `/images/logos/favicon/favicon-96x96.png` deve responder com HTTP 200 e imagem de 96 × 96 pixels; isso não comprova um arquivo quebrado.

Esta revisão prepara ícones em formatos adicionais, identifica a marca e a imagem principal nos metadados e mantém fotos no sitemap. O Google precisa buscar novamente a página inicial e processar os sinais. O favicon e o nome exibidos são escolhidos por sistemas automáticos; podem levar dias ou semanas para atualizar e sua exibição não é garantida. Consulte as orientações oficiais de [favicon](https://developers.google.com/search/docs/appearance/favicon-in-search?hl=pt-br) e [nome do site](https://developers.google.com/search/docs/appearance/site-names?hl=pt-br).

## 1. Publicar na Vercel

As alterações de código locais só passam a valer para o Google depois de um novo deploy de **produção**.

Na pasta do projeto, execute no PowerShell:

```powershell
npm.cmd run build
npm.cmd run test:seo
npm.cmd run lint
```

O build gera HTML estático das páginas `/` e `/servicos`, além de `404.html`, `robots.txt` e `sitemap.xml`, dentro de `dist/`. A pasta `dist-ssr/` é intermediária.

No projeto da Vercel, confirme estas opções de build:

| Configuração | Valor |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Domínio principal | `www.apolinariointeriores.com.br` |
| Domínio sem `www` | Redirecionamento permanente para o domínio principal |

O `vercel.json` versionado configura a saída estática, URLs limpas e normalização das URLs. Publique o código pelo fluxo conectado ao projeto na Vercel e aguarde o deploy de produção terminar. Se o painel tiver configurações antigas de domínio ou de rotas, confira se não entram em conflito com o arquivo do projeto.

Depois de publicar, confira:

| Endereço | Resultado esperado |
|---|---|
| `https://www.apolinariointeriores.com.br/` | HTTP 200; página inicial |
| `https://www.apolinariointeriores.com.br/servicos` | HTTP 200; página de serviços |
| `https://apolinariointeriores.com.br/` | Redirecionamento permanente para a versão com `www` |
| `https://www.apolinariointeriores.com.br/robots.txt` | Texto com permissão de rastreamento e endereço do sitemap |
| `https://www.apolinariointeriores.com.br/sitemap.xml` | XML das duas páginas e suas imagens |
| `https://www.apolinariointeriores.com.br/images/logos/favicon/favicon-96x96.png` | Ícone PNG da marca acessível |
| `https://www.apolinariointeriores.com.br/images/logos/favicon/favicon.ico` | Ícone ICO da marca acessível |
| Uma URL inexistente, como `/pagina-inexistente-teste` | HTTP 404 |

Execute a auditoria HTTP após o deploy:

```powershell
npm.cmd run audit:seo
```

Essa auditoria externa complementa os testes locais; não consulta o índice privado do Google.

## 2. Verificar a propriedade por DNS — opção recomendada

1. Abra o [Google Search Console](https://search.google.com/search-console) na conta que será responsável pelo site.
2. Escolha **Adicionar propriedade → Domínio**.
3. Informe `apolinariointeriores.com.br`, sem protocolo, caminho ou `www`.
4. Copie o registro TXT real fornecido pelo Google, que começa com `google-site-verification=`.
5. Na Hostinger, abra a zona DNS desse domínio e adicione um novo registro:

| Campo | Valor |
|---|---|
| Tipo | `TXT` |
| Nome / Host | `@` |
| Conteúdo / Valor TXT | O registro completo fornecido pelo Search Console |
| TTL | Padrão da Hostinger |

Adicione o TXT sem substituir outros registros. Preserve os registros de e-mail (MX, SPF, DKIM e DMARC), os apontamentos do domínio e o `www`. Não é necessário trocar nameservers ou mover a hospedagem para fazer a verificação.

Volte ao Search Console e clique em **Verificar**. Se o TXT ainda não tiver propagado, aguarde e tente novamente. Mantenha o registro depois da verificação. A propriedade de Domínio reúne as variações do endereço, incluindo `www` e sem `www`. Se os nameservers ativos estiverem em outro provedor, o TXT deve ser criado nesse provedor. Referências: [verificação de propriedade do Google](https://support.google.com/webmasters/answer/9008080?hl=pt-BR) e [registros TXT na Hostinger](https://support.hostinger.com/en/articles/1583664-how-to-manage-txt-records-at-hostinger).

## 3. Alternativa: verificar por tag HTML

Use esta opção se preferir uma propriedade **Prefixo do URL** para `https://www.apolinariointeriores.com.br/`. A tag HTML não verifica uma propriedade do tipo Domínio.

1. No Search Console, crie a propriedade de prefixo e escolha o método **Tag HTML**.
2. Copie somente o valor do atributo `content` da tag entregue pelo Google. Não copie a tag inteira nem o prefixo `google-site-verification=` do método DNS.
3. Na Vercel, nas variáveis de ambiente do projeto para **Production**, defina `VITE_GOOGLE_SITE_VERIFICATION` com esse valor real.
4. Faça um novo build/deploy. O Vite lê essa variável durante o build; apenas salvá-la no painel não altera o HTML já publicado.
5. Confira no código-fonte da página inicial publicada a presença de `<meta name="google-site-verification" content="...">` e clique em **Verificar** no Search Console.

Para testar localmente, use `.env.local` conforme `.env.example` e refaça o build. Esse token de verificação é público e aparece no HTML. Mantenha a variável nos próximos deploys para preservar a verificação. As diferenças entre os métodos constam na [ajuda de verificação do Google](https://support.google.com/webmasters/answer/9008080?hl=pt-BR).

## 4. Enviar o sitemap e solicitar indexação

Depois de confirmar o novo deploy e a propriedade:

1. No relatório **Sitemaps**, envie somente `https://www.apolinariointeriores.com.br/sitemap.xml`. Se o campo já apresentar o domínio, digite apenas `sitemap.xml`.
2. Esse arquivo já inclui as imagens. Não há um segundo sitemap de imagens para enviar. O Google aceita as informações de imagens dentro do sitemap das páginas. Consulte [sitemaps de imagens](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps?hl=pt-br).
3. Inspecione `https://www.apolinariointeriores.com.br/` na barra superior do Search Console.
4. Clique em **Testar URL publicado** e confirme que a busca da página funciona e a indexação é permitida. Se disponível, abra a página testada para conferir o HTML e a renderização.
5. Clique em **Solicitar indexação**.
6. Repita a inspeção, o teste e a solicitação para `https://www.apolinariointeriores.com.br/servicos`.

O sitemap facilita a descoberta, mas seu envio não garante indexação. A solicitação de indexação também entra em uma fila; repetir o pedido continuamente não assegura processamento mais rápido. Referências: [criar e enviar sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=pt-br) e [inspeção de URL](https://support.google.com/webmasters/answer/9012289?hl=pt-BR).

## 5. Acompanhar os resultados

Nos dias seguintes, acompanhe **Sitemaps**, **Indexação → Páginas** e a inspeção individual das duas URLs. Compare a data do último rastreamento com o deploy: o relatório indexado pode continuar mostrando a versão anterior até uma nova visita do Google.

Para os endereços sem `www`, o estado **Página com redirecionamento** é esperado. Eles encaminham à versão canônica com `www`; solicite a indexação do destino. Para as páginas canônicas, investigue bloqueios por `robots.txt`, `noindex`, falha de busca, erro HTTP ou escolha de outra URL canônica quando o relatório indicar um problema. O [Google explica a relação entre redirecionamentos e URLs canônicas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=pt-br).

Confira também o [Teste de pesquisa aprimorada](https://search.google.com/test/rich-results) para os tipos de dados estruturados compatíveis e o [Schema Markup Validator](https://validator.schema.org/) para a sintaxe do conjunto completo. O Teste de pesquisa aprimorada não valida a preferência de nome do site; para isso, siga as [orientações de `WebSite` do Google](https://developers.google.com/search/docs/appearance/site-names?hl=pt-br).

Use consistentemente **Apolinário Móveis Planejados**, o telefone, o endereço e o domínio no site e no Perfil da Empresa no Google. Mantenha fotos reais dos projetos acessíveis e descritas no contexto correto. Os metadados e os dados estruturados ajudam o Google a interpretar o conteúdo; a imagem, o nome, o título e a apresentação final no resultado continuam sujeitos aos sistemas do buscador.
