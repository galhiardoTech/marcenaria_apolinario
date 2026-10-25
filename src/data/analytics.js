import { business } from './business.js';

// Mede a abertura do WhatsApp, sem enviar telefone ou texto da mensagem.
export function trackWhatsAppClick(event) {
    const link = event.target?.closest?.('a[href]');
    if (!link || typeof window.gtag !== 'function') return;

    try {
        const url = new URL(link.href);
        if (url.protocol !== 'https:' || url.hostname !== 'wa.me'
            || url.pathname !== `/${business.whatsappNumber}`) return;

        window.gtag('event', 'whatsapp_click', {
            send_to: 'G-D9CGH3KDHN',
            transport_type: 'beacon',
        });
    } catch {
        // Uma falha na medição não deve impedir o contato com a empresa.
    }
}
