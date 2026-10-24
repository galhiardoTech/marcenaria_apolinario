# Contexto do projeto — Apolinário Móveis Planejados

Revisão de 20 de outubro de 2026. Este documento registra fatos observados e decisões do projeto; dados comerciais sujeitos a mudanças devem ser conferidos com o responsável.

## Objetivo

Alinhar o site, o Perfil da Empresa no Google e o Instagram com a identidade da Apolinário Móveis Planejados. Corrigir a apresentação da marca e do favicon sem confundir o negócio com empresas de nome semelhante.

## Identidade confirmada

O responsável confirmou nesta conversa o endereço e o telefone de atendimento. O perfil público no Google Maps aponta para o mesmo site e informa os mesmos contatos.

| Campo | Informação |
|---|---|
| Marca usada no projeto | Apolinário Móveis Planejados |
| Nome exibido no Google Maps | Apolinario Móveis Planejados |
| Categoria exibida no Maps | Loja de marcenaria |
| Site canônico | https://www.apolinariointeriores.com.br/ |
| Endereço | Rua Lessing, 589 — Chácara Belenzinho, São Paulo — SP |
| CEP | 03276-000 |
| Telefone e WhatsApp | (11) 97108-2868 |
| Instagram | https://www.instagram.com/apolinariomoveisplanejado/ |
| Nomes alternativos já usados no site | Marcenaria Apolinário; Apolinário Interiores |

[Perfil exato da empresa no Google Maps](https://www.google.com/maps/place/Apolinario+M%C3%B3veis+Planejados/@-23.5805781,-46.549859,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce5d52f80a37e1:0x465de042dd63e6b5!8m2!3d-23.5805781!4d-46.549859!16s%2Fg%2F11zzslkvtm).

O ViaCEP também identifica o logradouro desse CEP como [Rua Lessing](https://viacep.com.br/ws/03276000/json/). A grafia anterior no site, “Lessig”, estava incorreta. O Instagram vinculado pelo site exibe “Apolinário móveis planejados lda”, reforçando a identificação da marca.

O Maps exibia nota 5,0 e 8 avaliações no momento da consulta. Esses números são apenas um registro da consulta: não foram adicionados ao site nem aos dados estruturados. Os horários publicados no Maps também não foram incorporados ao site, pois precisam de confirmação específica de vigência.

Cadastros empresariais de nomes semelhantes, dados antigos de Styllus e outro negócio chamado Apolinário Planejados não foram adotados como fonte de CNPJ, endereço ou contato deste projeto. O CNPJ correto ainda não foi confirmado.

## Projeto e infraestrutura

- Pasta informada pelo responsável: `C:\Users\galhi\Desktop\marcenaria_apolinario`.
- React 19, React Router 7 e Vite 7; CSS por componente; ícones do Bootstrap Icons.
- Rotas públicas: `/` e `/servicos`.
- Hospedagem: Vercel, confirmada pelos cabeçalhos HTTP e pelo histórico fornecido pelo responsável.
- Domínio administrado na Hostinger, conforme informado pelo responsável em “Como funciona o Search Console”.
- `npm run build` gera o cliente, a renderização no servidor e o HTML estático de ambas as rotas. O resultado publicável fica em `dist/`; `dist-ssr/` é intermediário.
- `scripts/prerender.mjs` gera também `404.html`, `robots.txt` e `sitemap.xml`.
- `public/.htaccess` serve apenas para eventual hospedagem Apache/LiteSpeed; não configura a Vercel.

## Conteúdo do site

A página inicial apresenta a empresa, a história, exemplos de cozinhas, banheiros, quartos e salas e o contato para orçamento pelo WhatsApp. A página de serviços oferece filtro por categoria e mensagens de orçamento associadas ao móvel escolhido. As fotos e artes originais ficam em `src/assets/img/`.

No histórico “Personalização para gerar leads”, o responsável preparava produtos para o Perfil da Empresa com fotos de uma cozinha em L provençal (`cozinha4.png`), gabinete de banheiro com espelho (`banheiro1.jpeg`) e painel ripado para sala (`sala3.jpeg`). A situação atual desses produtos dentro da conta do Google não foi auditada.

As alegações já existentes de mais de 20 anos de experiência e as características dos móveis foram preservadas. Garantias, preços, parcelamento, autoria das fotos e especificações dos materiais não foram ampliados nesta revisão. A bio pública do Instagram menciona orçamento/projeto grátis e parcelamento em até 10 vezes; esses termos não foram acrescentados ao site sem confirmação comercial.

## Google e indexação: evidências

- A captura enviada pelo responsável já mostrava um resultado do site no Google, com título, descrição e uma foto de cozinha à direita. O ícone à esquerda ainda era um globo genérico.
- O endereço sem `www` retorna redirecionamento permanente HTTP 308 para o endereço com `www`.
- A página inicial e `/servicos` responderam HTTP 200 e continham conteúdo, metadados e dados estruturados no HTML, sem depender da execução de JavaScript.
- As páginas públicas permitem indexação; não foi encontrado `noindex` ou bloqueio pelo robots.txt nessas duas páginas.
- O sitemap existe e lista exatamente as duas URLs canônicas. O robots.txt libera o rastreamento e aponta para esse sitemap.
- Um endereço inexistente de teste respondeu HTTP 404, servindo `404.html`.
- O status “Página com redirecionamento” da URL sem `www` é compatível com a configuração atual. O status de indexação deve ser inspecionado na URL final com `www`.
- A existência pública do sitemap não confirma seu envio ou processamento dentro da conta do Search Console. A conta privada não foi acessada nesta revisão.

## Ajustes preparados nesta revisão

1. `src/data/business.js` concentra marca, nomes alternativos, endereço, telefone, Instagram, Maps e caminhos das imagens.
2. Cabeçalho, título principal, textos de apresentação, rodapé, página de serviços e página 404 passam a usar a mesma marca.
3. “Rua Lessig” é corrigido para “Rua Lessing”. Endereço e ícone no rodapé abrem o perfil exato no Google Maps.
4. `LocalBusiness`, `WebSite`, títulos e Open Graph usam o mesmo nome principal. O negócio passa a informar sua logo e o perfil correto no Maps (`hasMap` e `sameAs`).
5. As logos originais colorida e cinza foram exportadas para PNG quadrado de 512 × 512 pixels; a pasta `public/images/logos/favicon/` concentra os ícones PNG, ICO, SVG e o manifesto, todos servidos pelo caminho estável `/images/logos/favicon/`. A arte cinza deixa de exigir o download de um SVG de aproximadamente 7 MB no site. As artes SVG originais foram preservadas.
6. Todos os links de contato obtêm o telefone dos dados centralizados.
7. Os testes existentes passam a conferir também o nome, o endereço corrigido, os vínculos do Maps, a logo e o favicon publicado.
8. O README distingue a administração do domínio na Hostinger da hospedagem na Vercel.

## Validação e publicação

Validação concluída nesta revisão: build completo, quatro testes de SEO e lint aprovados. Na prévia local, o cabeçalho, a logo e a apresentação foram conferidos no desktop e em uma largura de celular de 390 pixels; não houve rolagem horizontal. O menu móvel abriu, a navegação chegou aos serviços, o filtro de cozinha exibiu somente essa categoria e os links de WhatsApp mantiveram o número confirmado.

As alterações foram aplicadas à pasta local do projeto. Ainda não foram publicadas na Vercel nesta revisão; o resultado exibido no Google pode continuar refletindo a publicação anterior.

Execute nesta ordem:

```sh
npm run build
npm run test:seo
npm run lint
```

Após publicar o conteúdo de `dist/` na Vercel, conferir as duas páginas, o favicon, o sitemap e os redirecionamentos. No Search Console, enviar `https://www.apolinariointeriores.com.br/sitemap.xml` se necessário e solicitar novo rastreamento da página inicial com `www`.

O Google decide a apresentação final do nome, do ícone e das imagens. A atualização do favicon pode levar dias a semanas; a solicitação de rastreamento não garante uma mudança imediata.

## Atualização do catálogo de serviços

Foram incluídos cinco trabalhos da pasta `fotosNovosServicos`: uma cozinha, três composições de banheiro e um closet. O catálogo passa de 15 para 20 serviços, com fotos ampliáveis, descrições específicas e um vídeo de cozinha disponível sob demanda. A origem dos arquivos e a classificação estão em [novos-servicos.md](novos-servicos.md).

## Fontes de referência da revisão de identidade

- [Página inicial](https://www.apolinariointeriores.com.br/), [serviços](https://www.apolinariointeriores.com.br/servicos), [robots.txt](https://www.apolinariointeriores.com.br/robots.txt) e [sitemap](https://www.apolinariointeriores.com.br/sitemap.xml).
- Perfil exato no Google Maps e Instagram vinculados acima.
- [Google: favicon nos resultados](https://developers.google.com/search/docs/appearance/favicon-in-search?hl=pt-br).
- [Google: nome do site](https://developers.google.com/search/docs/appearance/site-names?hl=pt-br).
- [Google: relatório de sitemaps](https://support.google.com/webmasters/answer/7451001?hl=pt-BR).
- [Google: inspeção de URL](https://support.google.com/webmasters/answer/9012289?hl=pt-BR).

## Revisão de SEO e preparação para o Search Console

A nova conferência HTTP de produção, em 20 de outubro de 2026 no horário de São Paulo, confirmou que o favicon PNG de 96 pixels já está publicado e responde 200. Portanto, a captura com globo genérico não demonstra falha no carregamento atual do arquivo. O rastreamento e a apresentação final do Google são etapas posteriores à publicação.

Nesta etapa foram adicionados `favicon.ico` de 32/48 pixels, ícone Apple de 180 pixels, ícone de 192 pixels e manifesto. A foto social passa a informar tipo, dimensões e descrição; o HTML da seção Sobre usa a mesma URL estável. Os dados estruturados identificam a imagem principal da home, as quatro categorias de serviços e a navegação de serviços, sem inventar avaliações, preços ou horários.

O sitemap gerado inclui as duas páginas canônicas e 25 referências a fotos realmente presentes no HTML. Logos são excluídas e não são criadas datas artificiais de atualização. A imagem de abertura e do cabeçalho de serviços foi exportada para JPEG de 195.024 bytes, com redução de aproximadamente 90%; o PNG original foi preservado.

`vercel.json` registra build, saída estática, URLs limpas, remoção da barra final e redirecionamento do host sem `www`. Não existe fallback global de SPA na configuração. A verificação por tag HTML é opcional por `VITE_GOOGLE_SITE_VERIFICATION`; nenhum token foi inventado ou adicionado. O fluxo recomendado de propriedade de Domínio utiliza TXT real fornecido pelo Google na zona DNS ativa.

Validações locais: build e oito testes de SEO aprovados; XML válido com duas páginas e 25 fotos; lint e verificação de diferenças aprovados. A auditoria HTTP `npm run audit:seo` na produção encontrou dez verificações aprovadas e três diferenças em relação ao novo build: os arquivos ICO e Apple ainda retornam 404 e o sitemap publicado ainda não tem as fotos. Esses recursos adicionais não são pré-requisitos para indexar as páginas; já estão preparados em `dist/` para o próximo deploy.

As alterações desta etapa continuam locais. Não foi feito deploy, envio do sitemap na conta do Google nem alteração do DNS. O procedimento completo está em [google-search-console.md](google-search-console.md). Após publicar, executar novamente `npm run audit:seo`, enviar o sitemap e inspecionar as duas URLs canônicas no Search Console.
