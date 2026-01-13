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
                            <span className="icon">📍</span>
                            <div>
                                <h4>Localização</h4>
                                <p>Av. das Indústrias, 100 - São Paulo, SP</p>
                            </div>
                        </div>
                        
                        <div className="detail-item">
                            <span className="icon">📞</span>
                            <div>
                                <h4>Telefone / WhatsApp</h4>
                                <p>(11) 99999-9999</p>
                            </div>
                        </div>

                        <div className="detail-item">
                            <span className="icon">✉️</span>
                            <div>
                                <h4>Email</h4>
                                <p>contato@marcenariaapolinario.com.br</p>
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
                            Chamar no WhatsApp
                        </a>
                        <p className="cta-note">Atendimento Seg a Sex, 8h às 18h</p>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Contato;