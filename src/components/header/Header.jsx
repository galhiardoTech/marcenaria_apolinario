import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

import logoColorida from '../../assets/img/logos/logoColorida.svg';

function Header() {
    const [activeLink, setActiveLink] = useState('#home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Lógica visual para saber qual link está ativo enquanto rola a página
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['#home', '#sobre', '#solucoes', '#contato'];
            const scrollPosition = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const sectionId = sections[i].replace('#', '');
                const section = document.getElementById(sectionId);
                
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveLink(sections[i]);
                        break;
                    }
                }
            }
            if (window.scrollY < 100) setActiveLink('#home');
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) setActiveLink(location.hash);
    }, [location.hash]);

    // Função UNIFICADA para fechar o menu apenas
    const closeMenu = () => {
        setIsMobileMenuOpen(false);
        // NÃO fazemos scroll aqui. O App.js detecta a mudança de rota e faz o scroll.
    };

    return (
        <header className="header">
            <div className="header-inner">
                <Link
                    className="logo"
                    to="/#home"
                    onClick={closeMenu}
                    aria-label="Marcenaria Apolinário"
                >
                    <img src={logoColorida} alt="Logo Marcenaria Apolinário" />
                </Link>

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
                                onClick={closeMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === '#sobre' ? 'active' : ''}`}
                                to="/#sobre"
                                onClick={closeMenu}
                            >
                                Sobre Nós
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === '#solucoes' ? 'active' : ''}`}
                                to="/#solucoes"
                                onClick={closeMenu}
                            >
                                Soluções
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`nav-link ${activeLink === '#contato' ? 'active' : ''}`}
                                to="/#contato"
                                onClick={closeMenu}
                            >
                                Contato
                            </Link>
                        </li>
                    </ul>

                    {/* Botões CTA */}
                    <Link
                        to="/servicos#servicos-header"
                        className="cta mobile-cta"
                        onClick={closeMenu}
                    >
                        + Serviços
                    </Link>
                </nav>

                <Link 
                    to="/servicos#servicos-header" 
                    className="cta desktop-cta"
                    onClick={closeMenu}
                >
                    + Serviços
                </Link>
            </div>
        </header>
    );
}

export default Header;