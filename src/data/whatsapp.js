import { business } from './business.js';

export function getServiceWhatsAppUrl(service) {
    const message = service
        ? `Olá! Tenho interesse no serviço ${service.title} (${service.category}). Gostaria de saber mais e solicitar um orçamento.`
        : 'Olá! Gostaria de solicitar um orçamento de marcenaria.';

    return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
