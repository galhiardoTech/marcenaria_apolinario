import React from 'react';
import './WhatsAppButton.css';

function WhatsAppButton() {
    const phoneNumber = "5511971082868"; 
    const message = "Olá! Gostaria de um orçamento.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a 
            href={whatsappUrl}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale conosco no WhatsApp"
        >
            <i className="bi bi-whatsapp whatsapp-icon" aria-hidden="true"></i>
            
            {/* Tooltip opcional que aparece ao passar o mouse */}
            <span className="whatsapp-tooltip">Orçamento Rápido</span>
        </a>
    );
}

export default WhatsAppButton;