# Novos serviços — fotos de 20 de outubro de 2026

Origem: pasta `C:\Users\galhi\Desktop\fotosNovosServicos`. As cinco fotos foram conferidas individualmente, não são cópias exatas das imagens que já estavam no catálogo e foram organizadas por ambiente no projeto. Os arquivos originais da pasta foram preservados.

## Serviços cadastrados

| Foto original | Categoria | Nome no site | Características visíveis |
|---|---|---|---|
| WhatsApp Image 2026-10-20 at 12.44.04.jpeg | Cozinha | Cozinha Amadeirada com Bancada Central | Bancada central; portas e gavetas; acabamento amadeirado |
| WhatsApp Image 2026-10-20 at 12.44.07.jpeg | Banheiro | Gabinete Suspenso com Prateleiras | Gabinete suspenso; duas portas; prateleiras abertas |
| WhatsApp Image 2026-10-20 at 12.44.08.jpeg | Banheiro | Gabinete com Nichos Iluminados | Nichos iluminados; área espelhada; nicho lateral aberto |
| WhatsApp Image 2026-10-20 at 12.44.09.jpeg | Banheiro | Gabinete com Penteadeira e Espelheira | Penteadeira integrada; espelheira ampla; painel ripado |
| WhatsApp Image 2026-10-20 at 12.44.45.jpeg | Quarto | Closet com Vidro e Espelho | Portas de vidro; perfis escuros; módulos espelhados |

Os textos descrevem o que aparece nas fotos. Não foram acrescentadas promessas de impermeabilidade, tipo de madeira, ferragens, medidas, preço ou garantia que não possam ser confirmadas pelas imagens.

O vídeo `WhatsApp Video 2026-10-20 at 12.41.00.mp4` foi conferido: mostra detalhes de portas, gavetas e uma cozinha amadeirada. Foi incluído como demonstração de cozinha na visualização ampliada, com o título genérico “Cozinha planejada em vídeo”. Não se presumiu que a foto e o vídeo mostrem exatamente o mesmo ambiente.

## Organização no projeto

- Os cinco registros novos têm os IDs 16 a 20 e ficam em `src/data/newServicesData.js`.
- `src/data/servicesData.js` inclui esses registros antes dos 15 serviços anteriores, preservando os IDs existentes.
- As imagens ficam nas pastas de cozinha, banheiro e quarto dentro de `src/assets/img/servicos/`, com nomes descritivos e formato WebP.
- As cinco imagens preservam a proporção e a resolução de 1200 × 1600 pixels. Juntas, passaram de aproximadamente 613 KB para 369 KB.
- O vídeo original foi copiado para `public/videos/cozinha-planejada-detalhes.mp4`, sem alterar seu conteúdo.

## Comportamento no site

A página inicial continua mostrando um exemplo por categoria e agora destaca a nova cozinha, o gabinete suspenso e o closet. A sala anterior permanece como exemplo dessa categoria.

O catálogo completo passa de 15 para 20 serviços. Cada novo serviço tem nome, descrição, características e texto alternativo específico da foto. Os botões de orçamento mantêm o WhatsApp confirmado e identificam o serviço escolhido na mensagem.

As fotos do catálogo e da página inicial podem ser abertas inteiras em uma janela de visualização. Ela permite fechar pelo botão, por Escape ou pelo fundo. O vídeo só aparece ao abrir o serviço de cozinha, sem reprodução automática e com carregamento sob demanda.

## Publicação

Estas alterações foram preparadas no projeto local. A publicação na Vercel continua sendo uma etapa separada. O build deve ser gerado novamente antes de publicar.

## Validação concluída

- Build de produção, cinco testes de SEO e lint aprovados.
- Os cinco registros e os arquivos de imagem estão no HTML pré-renderizado do catálogo.
- O filtro de banheiro exibe os três modelos novos e os dois anteriores; a página inicial destaca a nova cozinha, o gabinete com prateleiras e o closet.
- Fotos completas conferidas na prévia de desktop e na tela de celular de 390 × 844 pixels, sem rolagem horizontal.
- Fechamento da visualização por botão, Escape e clique no fundo conferidos; o foco retorna ao botão da foto e a rolagem da página é restaurada.
- Vídeo de 8,3 segundos reproduzido na prévia local. Sem reprodução automática; a mídia é removida da página ao fechar a visualização.
- Links de orçamento usam o telefone confirmado e o nome do serviço escolhido.
