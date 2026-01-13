import React from 'react'
import './HomeScreen.css'
import Header from '../../components/header/Header'
import Home from '../../components/home/Home'
import Portfolio from '../../components/portifolio/Portfolio'
import Footer from '../../components/footer/Footer'
import Sobre from '../../components/sobre/Sobre'
import Servicos from '../../components/servicos/Servicos'
import Contato from '../../components/contato/Contato'
import WhatsAppButton from '../../components/whatsapp_button/WhatsAppButton'

function HomeScreen() {
  return (
    <div>
        <Header />
        <Home />
        {/* <Portfolio /> */}
        <Sobre />
        <Servicos />
        <Contato />
        <Footer />
        <WhatsAppButton />

    </div>
  )
}
export default HomeScreen