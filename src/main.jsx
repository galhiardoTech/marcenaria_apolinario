import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import App from './App.jsx'
import { trackWhatsAppClick } from './data/analytics.js'

// Um único listener cobre os botões, ícones e serviços nas duas rotas.
document.addEventListener('click', trackWhatsAppClick, true)

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
