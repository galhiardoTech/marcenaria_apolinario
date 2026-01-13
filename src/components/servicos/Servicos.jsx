import React from 'react';
import './Servicos.css';
import { servicesData } from '../../data/servicesData';
import logoCinza from '../../assets/img/logos/logoCinza.svg';

function Servicos() {
    // Lógica para filtrar apenas 1 serviço por categoria para exibição
    const categories = [...new Set(servicesData.map(s => s.category))];
    const displayServices = categories.map(category => 
        servicesData.find(service => service.category === category)
    );

    return (
        <section className="services-section" id="solucoes">
            <div className="services-container">
                
                <div className="section-header">
                    <span className="section-subtitle">O QUE FAZEMOS</span>
                    <h2 className="section-title">SOLUÇÕES EM MARCENARIA</h2>
                    <p className="section-desc">
                        Do projeto 3D à instalação final, cuidamos de cada etapa para garantir a excelência.
                    </p>
                </div>

                <div className="services-grid">
                    {displayServices.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="card-image">
                                {/* ADICIONADO className="main-img" AQUI PARA NÃO CONFLITAR COM A LOGO */}
                                <img 
                                    src={service.img} 
                                    alt={service.title} 
                                    className="main-img" 
                                />
                                
                                <div className="category-tag">{service.category}</div>
                                
                                {/* A Logo (Marca d'água) */}
                                <img 
                                    src={logoCinza} 
                                    alt="Marcenaria Apolinário" 
                                    className="watermark-logo" 
                                />
                            </div>
                            
                            <div className="card-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <a href="#contato" className="card-link">Saiba mais &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Servicos;