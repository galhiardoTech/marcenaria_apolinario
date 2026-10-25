import React from 'react';
import './Sobre.css';
import { business } from '../../data/business.js';

function Sobre() {
    return (
        <section className="sobre-section" id="sobre">
            {/* Lado Esquerdo: Texto */}
            <div className="sobre-content">
                <span className="sobre-subtitle">QUEM SOMOS</span>
                <h2 className="sobre-title">
                    TRADIÇÃO E DESIGN <br /> EM CADA DETALHE
                </h2>
                
                <p className="sobre-text">
                    Há mais de 20 anos, a {business.name} transforma madeira bruta em obras de arte funcionais.
                    Unimos a marcenaria artesanal clássica com as mais modernas tendências de arquitetura e design de interiores.
                </p>

                <p className="sobre-text">
                    Na Chácara Belenzinho, em São Paulo, criamos móveis sob medida para alinhar
                    estética, durabilidade e a personalidade de quem vive no ambiente.
                </p>

                <a href="#contato" className="sobre-btn">
                    SOLICITE UM ORÇAMENTO
                </a>
            </div>

            {/* Lado Direito: Imagem */}
            <div className="sobre-image-wrapper">
                <img src={business.socialImagePath} alt={business.socialImageAlt} width={business.socialImageWidth} height={business.socialImageHeight} loading="lazy" decoding="async" />
            </div>
        </section>
    );
}

export default Sobre;
