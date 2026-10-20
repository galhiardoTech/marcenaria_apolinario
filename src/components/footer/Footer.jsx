import React from 'react';
import './Footer.css';
import { business } from '../../data/business.js';
import { getServiceWhatsAppUrl } from '../../data/whatsapp.js';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                
                {/* Coluna 1: Marca e Sobre */}
                <div className="footer-section brand-section">
                    <img src={business.watermarkLogoPath} alt={business.name} className="footer-logo" loading="lazy" decoding="async" />
                    <p className="footer-text">
                        Transformando sonhos em móveis planejados de alto padrão. 
                        Qualidade, durabilidade e design exclusivo para o seu lar.
                    </p>
                </div>

                {/* Coluna 2: Contato */}
                <div className="footer-section contact-section">
                    <h3 className="footer-title">Fale Conosco</h3>
                    <ul className="contact-list">
                        <li>
                            <i className="bi bi-geo-alt-fill icon" aria-hidden="true"></i>
                            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                                {business.addressLabel}<br />{business.cityLabel}
                            </a>
                        </li>
                        <li>
                            <i className="bi bi-telephone-fill icon" aria-hidden="true"></i>
                            <a href={business.phoneHref}>{business.phone}</a>
                        </li>
                    </ul>
                    <a href={getServiceWhatsAppUrl()} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-whatsapp icon" aria-hidden="true"></i> Chamar no WhatsApp
                    </a>
                </div>

                {/* Coluna 3: Redes Sociais */}
                <div className="footer-section social-section">
                    <h3 className="footer-title">Siga-nos</h3>
                    <div className="social-icons">
                        <a href={business.instagramUrl} aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-instagram" aria-hidden="true"></i>
                        </a>
                        <a href={business.mapsUrl} aria-label={`${business.name} no Google Maps`} className="social-link" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Barra de Direitos Autorais */}
            <div className="footer-bottom">
                <div className="bottom-content">
                    <p>&copy; {new Date().getFullYear()} {business.name}.</p>
                    <p className="developer">Desenvolvido por GalhiardoTech</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
