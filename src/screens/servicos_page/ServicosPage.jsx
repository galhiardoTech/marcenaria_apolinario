import React, { useState } from 'react';
import './ServicosPage.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import WhatsAppButton from '../../components/whatsapp_button/WhatsAppButton';
import { servicesData } from '../../data/servicesData';
import { getServiceWhatsAppUrl } from '../../data/whatsapp';
import logoCinza from '../../assets/img/logos/logoCinza.svg';

function ServicosPage() {
    const [selectedCategory, setSelectedCategory] = useState('TODOS');
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
                    <h1>Móveis planejados em São Paulo</h1>
                    <p>Marcenaria sob medida para cozinhas, quartos, salas e banheiros. Conheça as soluções da Marcenaria Apolinário, na Chácara Belenzinho.</p>
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

            <section className="servicos-grid-section">
                <div className="servicos-grid-container">
                    <div className={`services-grid ${filteredServices.length === 1 ? 'single-item' : ''}`}>
                        {filteredServices.map((service) => (
                            <article key={service.id} className="service-card-full">
                                <div className="card-image-container">
                                    <img src={service.img} alt={service.title} className="card-image" loading="lazy" decoding="async" />
                                    <div className="category-badge">{service.category}</div>
                                    <img src={logoCinza} alt="Marcenaria Apolinário" className="watermark-logo" loading="lazy" decoding="async" />
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
            <Footer />
            <WhatsAppButton />
        </div>
    );
}

export default ServicosPage;
