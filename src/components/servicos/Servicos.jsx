import React, { useState } from 'react';
import './Servicos.css';
import { servicesData } from '../../data/servicesData';
import { getServiceWhatsAppUrl } from '../../data/whatsapp';
import { Link } from 'react-router-dom';
import { business } from '../../data/business.js';
import ServiceMediaDialog from '../service_media/ServiceMediaDialog.jsx';

function Servicos() {
    const [selectedService, setSelectedService] = useState(null);
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
                    <h2 className="section-title">MÓVEIS PLANEJADOS SOB MEDIDA</h2>
                    <p className="section-desc">
                        Do projeto 3D à instalação final, cuidamos de cada etapa para garantir a excelência.
                    </p>
                </div>

                <div className="services-grid">
                    {displayServices.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="card-image">
                                {/* ADICIONADO className="main-img" AQUI PARA NÃO CONFLITAR COM A LOGO */}
                                <button
                                    type="button"
                                    className="service-photo-button"
                                    onClick={() => setSelectedService(service)}
                                    aria-label={`Ver foto completa: ${service.title}`}
                                >
                                    <img
                                        src={service.img}
                                        alt={service.imageAlt ?? service.title}
                                        className="main-img"
                                        style={{ objectPosition: service.imagePosition }}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="service-photo-hint">{service.video ? 'Ver foto e vídeo' : 'Ver foto completa'}</span>
                                </button>
                                
                                <div className="category-tag">{service.category}</div>
                                
                                {/* A Logo (Marca d'água) */}
                                <img 
                                    src={business.watermarkLogoPath}
                                    alt={business.name}
                                    className="watermark-logo" 
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            
                            <div className="card-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <a href={getServiceWhatsAppUrl(service)} className="card-link" target="_blank" rel="noopener noreferrer">Saiba mais &rarr;</a>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="section-desc">
                    <Link to="/servicos">Conheça todos os serviços de marcenaria e móveis planejados</Link>
                </p>
            </div>
            <ServiceMediaDialog service={selectedService} onClose={() => setSelectedService(null)} />
        </section>
    );
}

export default Servicos;
