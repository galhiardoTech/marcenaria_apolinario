import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServicosPage.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import WhatsAppButton from '../../components/whatsapp_button/WhatsAppButton';
import { servicesData } from '../../data/servicesData';
import { getServiceWhatsAppUrl } from '../../data/whatsapp';
import { business } from '../../data/business.js';
import ServiceMediaDialog from '../../components/service_media/ServiceMediaDialog.jsx';

function ServicosPage() {
    const [selectedCategory, setSelectedCategory] = useState('TODOS');
    const [selectedService, setSelectedService] = useState(null);
    // O scroll para o topo é controlado centralmente pelo ScrollToTop no App.jsx

    const filteredServices = selectedCategory === 'TODOS'
        ? servicesData
        : servicesData.filter(service => service.category === selectedCategory);

    const categories = ['TODOS', ...new Set(servicesData.map(s => s.category))];

    return (
        <div className="servicos-page-wrapper">
            <Header />
            <main className="servicos-page">
            
            <section className="servicos-header" id="servicos-header">
                <div className="header-content">
                    <nav className="service-breadcrumb" aria-label="Caminho de navegação">
                        <Link to="/">Início</Link>
                        <span aria-hidden="true"> / </span>
                        <span aria-current="page">Serviços</span>
                    </nav>
                    <h1>Móveis planejados em São Paulo</h1>
                    <p>Marcenaria sob medida para cozinhas, quartos, salas e banheiros. Conheça as soluções da {business.name}, na Chácara Belenzinho.</p>
                </div>
            </section>

            <section className="filter-section">
                <div className="filter-container">
                    <h3>Filtrar por Categoria</h3>
                    <div className="category-filters">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="servicos-grid-section" id="catalogo">
                <div className="servicos-grid-container">
                    <div className={`services-grid ${filteredServices.length === 1 ? 'single-item' : ''}`}>
                        {filteredServices.map((service) => (
                            <article key={service.id} className="service-card-full">
                                <div className="card-image-container">
                                    <button
                                        type="button"
                                        className="service-photo-button"
                                        onClick={() => setSelectedService(service)}
                                        aria-label={`Ver foto completa: ${service.title}`}
                                    >
                                        <img
                                            src={service.img}
                                            alt={service.imageAlt ?? service.title}
                                            className="card-image"
                                            style={{ objectPosition: service.imagePosition }}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <span className="service-photo-hint">{service.video ? 'Ver foto e vídeo' : 'Ver foto completa'}</span>
                                    </button>
                                    <div className="category-badge">{service.category}</div>
                                    <img src={business.watermarkLogoPath} alt={business.name} className="watermark-logo" loading="lazy" decoding="async" />
                                </div>

                                <div className="card-content-full">
                                    <h3 className="card-title">{service.title}</h3>
                                    <p className="card-desc">{service.description}</p>

                                    <div className="features-list">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="feature-item">
                                                <span className="feature-icon">✓</span>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a href={getServiceWhatsAppUrl(service)} className="cta-link" target="_blank" rel="noopener noreferrer">
                                        Solicitar Orçamento →
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-content">
                    <h2>Pronto para começar seu projeto?</h2>
                    <p>Entre em contato conosco e transforme seus espaços em obras de arte.</p>
                    <a href={getServiceWhatsAppUrl()} className="cta-button-large" target="_blank" rel="noopener noreferrer">
                        Solicitar Orçamento Agora
                    </a>
                </div>
            </section>
            </main>
            <ServiceMediaDialog service={selectedService} onClose={() => setSelectedService(null)} />
            <Footer />
            <WhatsAppButton />
        </div>
    );
}

export default ServicosPage;
