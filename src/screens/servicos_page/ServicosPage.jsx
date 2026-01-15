import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ServicosPage.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import WhatsAppButton from '../../components/whatsapp_button/WhatsAppButton';
import { servicesData } from '../../data/servicesData';
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
            <div className="servicos-page">
            
            <section className="servicos-header" id="servicos-header">
                <div className="header-content">
                    <h1>Nossos Serviços</h1>
                    <p>Soluções em marcenaria para todo tipo de projeto. Do residencial ao corporativo, temos expertise para realizar seu sonho.</p>
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
                                    <img src={service.img} alt={service.title} className="card-image" />
                                    <div className="category-badge">{service.category}</div>
                                    <img src={logoCinza} alt="Marcenaria Apolinário" className="watermark-logo" />
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

                                    <Link to="/#contato" className="cta-link">
                                        Solicitar Orçamento →
                                    </Link>
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
                    <Link to="/#contato" className="cta-button-large">
                        Solicitar Orçamento Agora
                    </Link>
                </div>
            </section>
            </div>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}

export default ServicosPage;