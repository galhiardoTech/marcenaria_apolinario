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
                    Transformando madeira em arte. Projetos exclusivos que unem 
                    funcionalidade e design para o seu ambiente.
                </p>
                
                <a className="home-cta" href="#contato">Solicite um orçamento</a>
            </div>
        </section>
    )
}

export default Home