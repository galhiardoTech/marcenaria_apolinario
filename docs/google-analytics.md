# Google Analytics e cliques no WhatsApp

A tag `G-D9CGH3KDHN` está no `index.html` e é incluída nas páginas geradas pelo build. Depois de publicar na Vercel, use **Teste a conexão** na configuração do Google para verificar a instalação.

O código do site envia o evento `whatsapp_click` quando alguém clica nos links de orçamento para o WhatsApp da empresa. Inclui o botão flutuante, contato, rodapé, catálogo e visualização ampliada das fotos. A medição não bloqueia a abertura do WhatsApp e não acrescenta telefone nem texto da mensagem aos parâmetros do evento. Um clique não comprova mensagem enviada, orçamento recebido ou venda.

## Concluir nas contas do Google

1. Publique as alterações na Vercel e abra o site publicado.
2. Clique uma vez em um botão de WhatsApp e confira `whatsapp_click` no relatório de tempo real da propriedade do Google Analytics correspondente ao ID acima.
3. No Analytics, em **Administrador → Exibição de dados → Eventos**, marque `whatsapp_click` como evento principal. Pode ser necessário aguardar sua disponibilização na lista de eventos recentes.
4. Confira o vínculo da propriedade do Analytics com a conta correta do Google Ads e a codificação automática do Ads.
5. No Ads, em **Metas → Conversões → Resumo → Criar uma ação de conversão**, selecione a propriedade do Analytics e importe `whatsapp_click`. Algumas interfaces mostram **Importar → Google Analytics 4 → Web**.
6. Identifique a conversão como **Clique no WhatsApp** para evitar confundi-la com um orçamento confirmado. Não mantenha uma conversão de visualização da home como se fosse um pedido de orçamento.

Só a inclusão do código no repositório não publica o site, não marca o evento como principal e não configura sua importação no Google Ads. Não crie também um evento direto do Ads para o mesmo clique sem revisar a contagem, para evitar medir duas vezes a mesma ação.

Referências: [importar eventos do Analytics no Google Ads](https://support.google.com/google-ads/answer/2375435?hl=pt-br) e [requisitos de vínculo e codificação automática](https://support.google.com/analytics/answer/10632359?hl=pt-BR).
