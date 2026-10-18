import './App.css';
import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from './screens/home_screen/HomeScreen.jsx';
import ServicosPage from './screens/servicos_page/ServicosPage.jsx';
import Seo from './components/seo/Seo.jsx';
import { Link } from 'react-router-dom';

// Desativa a restauração automática de scroll do navegador
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

/**
 * Componente que controla o scroll ao trocar de rota
 * - useLayoutEffect: executa ANTES do navegador pintar (scroll imediato)
 * - Reforços com rAF/setTimeout para garantir no Chrome
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const scrollEl = document.scrollingElement || document.documentElement;

    // Sempre força topo na troca de rota (mesmo com hash)
    scrollEl.scrollTo(0, 0);
    requestAnimationFrame(() => scrollEl.scrollTo(0, 0));
    setTimeout(() => scrollEl.scrollTo(0, 0), 50);

    // Se houver hash, tenta rolar suavemente para a âncora após garantir topo
    if (hash) {
      const id = hash.replace('#', '');
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      if (!tryScroll()) {
        const timer = setTimeout(tryScroll, 80);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, hash]);

  return null;
}

export function AppContent() {
  return (
    <>
      <Seo />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/servicos" element={<ServicosPage />} />
        <Route path="*" element={
          <main style={{ padding: '80px 24px', textAlign: 'center' }}>
            <h1>Página não encontrada</h1>
            <p>Conheça os móveis planejados da Marcenaria Apolinário.</p>
            <Link to="/">Voltar à página inicial</Link>
          </main>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
