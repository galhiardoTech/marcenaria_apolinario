import React from 'react';
import './Footer.css';
import logoCinza from '../../assets/img/logos/logoCinza.svg'; 

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                
                {/* Coluna 1: Marca e Sobre */}
                <div className="footer-section brand-section">
                    <img src={logoCinza} alt="Marcenaria Apolinário" className="footer-logo" />
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
                            <span className="icon">📍</span> 
                            <span>Rua Exemplo, 123 - São Paulo, SP</span>
                        </li>
                        <li>
                            <span className="icon">📞</span> 
                            <span>(11) 97108-2868</span>
                        </li>
                        <li>
                            <span className="icon">✉️</span> 
                            <span>contato@marcenariaapolinario.com.br</span>
                        </li>
                    </ul>
                    <a href="https://wa.me/5511971082868" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                        <span className="icon">💬</span> Chamar no WhatsApp
                    </a>
                </div>

                {/* Coluna 3: Redes Sociais */}
                <div className="footer-section social-section">
                    <h3 className="footer-title">Siga-nos</h3>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/apolinariomoveisplanejado?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
                            <img className='instagram-img' src="../../src/assets/img/instagram_icon.svg" alt="Instagram" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Barra de Direitos Autorais */}
            <div className="footer-bottom">
                <div className="bottom-content">
                    <p>&copy; {new Date().getFullYear()} Marcenaria Apolinário.</p>
                    <p className="developer">Desenvolvido com excelência.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;