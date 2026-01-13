import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import logoColorida from '../../assets/img/logos/logoColorida.svg';

function Header() {
    const [activeLink, setActiveLink] = useState('#home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Função para links normais
    const handleLinkClick = (link) => {
        setActiveLink(link);
        setIsMobileMenuOpen(false);
    };

    // Função exclusiva para a Logo (Vai para Home e sobe para o topo)
    const handleLogoClick = () => {
        setActiveLink('#home');
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="header">
            <div className="header-inner">
                {/* Logo com função de ir para o topo */}
                <Link
                    className="logo"
                    to="/#home"
                    onClick={() => handleLogoClick('#home')}
                    aria-label="Marcenaria Apolinário"
                >
                    <img src={logoColorida} alt="Logo Marcenaria Apolinário" />
                </Link>

                {/* Botão Hambúrguer */}
                <button
                    className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Abrir menu"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                    <ul className="nav-list">
                        <li>
                            <Link
                                className={`nav-link ${activeLink === '#home' ? 'active' : ''}`}
                                to="/#home"
                                onClick={() => handleLinkClick('#home')}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === '#sobre' ? 'active' : ''}`}
                                to="/#sobre"
                                onClick={() => handleLinkClick('#sobre')}
                            >
                                Sobre Nós
                            </Link>
                        </li>

                        <li>
                            <Link
                                className={`nav-link ${activeLink === '#solucoes' ? 'active' : ''}`}
                                to="/#solucoes"
                                onClick={() => handleLinkClick('#solucoes')}
                            >
                                Soluções
                            </Link>
                        </li>


                        <li>
                            <Link
                                className={`nav-link ${activeLink === '#contato' ? 'active' : ''}`}
                                to="/#contato"
                                onClick={() => handleLinkClick('#contato')}
                            >
                                Contato
                            </Link>
                        </li>
                    </ul>

                    {/* Botão CTA Mobile */}
                    <Link
                        to="/servicos"
                        className="cta mobile-cta"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        + Serviços
                    </Link>
                </nav>

                {/* Botão CTA Desktop */}
                <Link to="/servicos" className="cta desktop-cta">
                    + Serviços
                </Link>
            </div>
        </header>
    );
}

export default Header;
