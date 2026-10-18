import React from 'react';
import './Contato.css';

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
                                <p>Rua Lessig, 589 - Chácara Belenzinho</p>
                            </div>
                        </div>
                        
                        <div className="detail-item">
                            <i className="bi bi-telephone-fill icon" aria-hidden="true"></i>
                            <div>
                                <h4>Telefone / WhatsApp</h4>
                                <p><a href="tel:+5511971082868">(11) 97108-2868</a></p>
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
                            href="https://wa.me/5511971082868?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20de%20marcenaria"
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
