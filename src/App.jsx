import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Routes, Route, useLocation } from 'react-router-dom'

// استيراد المكونات
import TopInfoBar from './components/TopInfoBar'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Stats from './components/Stats'
import Services from './components/Services'
import PricingCards from './components/PricingCards'
import Footer from './components/Footer'
import FloatingSidebar from './components/FloatingSidebar'
import About from './components/About'
import TruckCarousel from './components/TruckCarousel'
import WelcomeScreen from './components/WelcomeScreen'
import ContactForm from './components/ContactForm'
import BrandSignature from './components/BrandSignature'

function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])
  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const { i18n } = useTranslation()

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
    if (i18n.language === 'ar') {
      document.documentElement.classList.add('font-arabic')
    } else {
      document.documentElement.classList.remove('font-arabic')
    }
  }, [i18n.language])

  return (
    <div className="bg-white text-gray-900 dark:bg-[#0b0f1a] dark:text-[#94a3b8] min-h-screen transition-colors duration-300">
      <AnimatePresence mode="wait">
        {loading && (
          <WelcomeScreen key="welcome" onFinished={() => setLoading(false)} />
        )}
      </AnimatePresence>
      {!loading && (
        <div className="animate-in fade-in duration-1000">
          <ScrollToTop />
          <TopInfoBar />
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <TruckCarousel />
                    <Services />
                    <PricingCards />
                    <Stats />
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/quote" element={<ContactForm />} />
            </Routes>
          </main>
          <BrandSignature />
          <Footer />
          <FloatingSidebar />
        </div>
      )}
    </div>
  )
}
