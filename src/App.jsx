import './App.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomeScreen from './screens/home_screen/HomeScreen.jsx'
import ServicosPage from './screens/servicos_page/ServicosPage.jsx'

// Rola suavemente para a âncora quando a URL contém hash (#alvo)
function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/servicos" element={<ServicosPage />} />
      </Routes>
    </Router>
  )
}

export default App
