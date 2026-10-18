import React from 'react'
import './Home.css'

function Home() {
    return (
        <section className="home" id="home">
            <div className="home-container">
                {/* Texto pequeno acima do título (igual na foto) */}
                <span className="pre-title">SOFISTICAÇÃO E QUALIDADE</span>
                
                <h1 className="home-title">MARCENARIA APOLINÁRIO</h1>
                
                <p className="home-subtitle">
                    Móveis planejados e marcenaria sob medida em São Paulo.
                    Projetos exclusivos para cozinhas, quartos, salas e banheiros,
                    com a Marcenaria Apolinário na Chácara Belenzinho.
                </p>
                
                <a className="home-cta" href="#contato">Solicite um orçamento</a>
            </div>
        </section>
    )
}

export default Home
