import React from 'react'
import './HomeScreen.css'
import Header from '../../components/header/Header'
import Home from '../../components/home/Home'
import Footer from '../../components/footer/Footer'
import Sobre from '../../components/sobre/Sobre'
import Servicos from '../../components/servicos/Servicos'
import Contato from '../../components/contato/Contato'
import WhatsAppButton from '../../components/whatsapp_button/WhatsAppButton'

function HomeScreen() {
  return (
    <div>
        <Header />
        <main>
        <Home />
        <Sobre />
        <Servicos />
        <Contato />
        </main>
        <Footer />
        <WhatsAppButton />

    </div>
  )
}
export default HomeScreen
