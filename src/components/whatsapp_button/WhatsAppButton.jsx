import React from 'react';
import './WhatsAppButton.css';
import { getServiceWhatsAppUrl } from '../../data/whatsapp.js';

function WhatsAppButton() {
    const whatsappUrl = getServiceWhatsAppUrl();

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
