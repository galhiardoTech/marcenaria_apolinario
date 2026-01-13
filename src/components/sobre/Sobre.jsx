import React from 'react';
import './Sobre.css';
import fotoSobre from '../../assets/img/fotoSobre.jpeg'; // Use uma foto bonita de um móvel ou da oficina

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
                    Há mais de 20 anos, a Marcenaria Apolinário transforma madeira bruta em obras de arte funcionais. 
                    Unimos a marcenaria artesanal clássica com as mais modernas tendências de arquitetura e design de interiores.
                </p>

                <p className="sobre-text">
                    Cada projeto é único, pensado para alinhar estética, durabilidade e a personalidade de quem vive no ambiente.
                </p>

                <a href="#contato" className="sobre-btn">
                    CONHEÇA NOSSA HISTÓRIA
                </a>
            </div>

            {/* Lado Direito: Imagem */}
            <div className="sobre-image-wrapper">
                <img src={fotoSobre} alt="Detalhe de acabamento Marcenaria Apolinário" />
            </div>
        </section>
    );
}

export default Sobre;