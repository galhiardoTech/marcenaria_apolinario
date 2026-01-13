import React from 'react';
import './Portfolio.css';

// Importe suas imagens aqui
import foto1 from '../../assets/img/fotoFundo.png'; 

function Portfolio() {
    // Lista de projetos
    const projects = [
        { id: 1, img: foto1, title: 'Cozinha Planejada' },
        { id: 2, img: foto1, title: 'Armário Rústico' },
        { id: 3, img: foto1, title: 'Ilha Gourmet' },
        { id: 4, img: foto1, title: 'Painel de Madeira' },
    ];

    return (
        <section className="portfolio-section" id="portfolio">
            <div className="portfolio-container">
                {/* Cabeçalho */}
                <div className="portfolio-header">
                    <span className="portfolio-subtitle">NOSSO TRABALHO</span>
                    <h2 className="portfolio-title">PORTFÓLIO EXCLUSIVO</h2>
                    <div className="portfolio-divider"></div>
                </div>

                {/* Grid de Imagens */}
                <div className="portfolio-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="portfolio-item">
                            <div className="image-wrapper">
                                <img src={project.img} alt={project.title} />
                                <div className="overlay">
                                    <h3>{project.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;