export function getServiceWhatsAppUrl(service) {
    const message = service
        ? `Olá! Tenho interesse no serviço ${service.title} (${service.category}). Gostaria de saber mais e solicitar um orçamento.`
        : 'Olá! Gostaria de solicitar um orçamento de marcenaria.';

    return `https://wa.me/5511971082868?text=${encodeURIComponent(message)}`;
}
