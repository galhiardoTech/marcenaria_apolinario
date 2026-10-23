import React from 'react';
import './Contato.css';
import { business } from '../../data/business.js';
import { getServiceWhatsAppUrl } from '../../data/whatsapp.js';

function Contato() {

    return (
        <section className="contact-section" id="contato">
            <div className="contact-container">
                
                {/* Lado Esquerdo: Informações e Texto */}
                <div className="contact-info">
                    <span className="contact-subtitle">FALE CONOSCO</span>
                    <h2 className="contact-title">VAMOS TIRAR SEU PROJETO DO PAPEL?</h2>
                    <p className="contact-desc">
                        Entre em contato para agendar uma visita técnica ou solicitar um orçamento exclusivo. 
                        Estamos prontos para transformar seu ambiente.
                    </p>

                    <div className="contact-details">
                        <div className="detail-item">
                            <i className="bi bi-geo-alt-fill icon" aria-hidden="true"></i>
                            <div>
                                <h4>Localização</h4>
                                <p>
                                    <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                                        {business.addressLabel}<br />{business.cityLabel}
                                    </a>
                                </p>
                            </div>
                        </div>
                        
                        <div className="detail-item">
                            <i className="bi bi-telephone-fill icon" aria-hidden="true"></i>
                            <div>
                                <h4>Telefone / WhatsApp</h4>
                                {business.phones.map((phone) => (
                                    <p key={phone.telephone}><a href={phone.href}>{phone.display}</a></p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lado Direito: CTA WhatsApp */}
                <div className="contact-cta-wrapper">
                    <div className="contact-cta-card">
                        <h3>Fale pelo WhatsApp</h3>
                        <p>Resposta rápida, envio de fotos e orçamentos personalizados direto com nosso time.</p>
                        <a 
                            className="whatsapp-btn"
                            href={getServiceWhatsAppUrl()}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-whatsapp" aria-hidden="true"></i> Chamar no WhatsApp
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Contato;
