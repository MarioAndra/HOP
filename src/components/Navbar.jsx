import { useState, useEffect } from 'react'
import { Menu, X, MapPin, Sun, Moon, AlignRight, Info, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import logoLight from '../assets/file.svg'
import logoDark from '../assets/file2.png'

// التابع الخاص بالأيقونة المتحركة (السهم والدبوس)
const HopLogo = () => (
  <div className="relative flex items-center justify-center w-12 h-12">
    <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute overflow-visible">
      <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        d="M5 85C20 30 70 30 85 62" 
        stroke="#00a1e9" 
        strokeWidth="8" 
        strokeLinecap="round" 
      />
      <motion.path 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        d="M72 58 L85 65 L92 50" 
        stroke="#00a1e9" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.15, 1], opacity: [1, 0.8, 1] }}
      transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-1 -right-1 text-[#1e73be]"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-25"></div>
        <MapPin size={24} fill="currentColor" fillOpacity="0.3" className="relative z-10" />
      </div>
    </motion.div>
  </div>
)

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null
    return saved ? saved === 'dark' : false
  })
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowDropdown(false);
    setMobileOpen(false);
  };

  const handleNavClick = (e, item) => {
    if (e) e.preventDefault();
    setMobileOpen(false);
    setShowDropdown(false);

    // إذا كان الرابط هو About Us، ننتقل لصفحة الأباوت
    if (item.id === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // الروابط الأخرى التي تعتمد على الـ Scroll (Services & Contact)
    const targetId = item.href.replace('#', '');
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const navLinks = [
    { label: t('nav.services'), href: '#services', id: 'services' },
    { label: t('nav.about'), href: '#about', id: 'about' },
    { label: t('nav.contact'), href: '#contact', id: 'contact' },
  ]

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ar', label: 'Arabic' }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-white/90 dark:bg-[#0b0f1a]/90 backdrop-blur-md border-b border-gray-100 dark:border-[#1f2937]"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        
        <button 
          onClick={() => { navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); setShowDropdown(false); }} 
          className="flex items-center group bg-transparent border-none outline-none cursor-pointer"
        >
          <HopLogo />
          <img 
            src={isDark ? logoDark : logoLight} 
            alt="HOP Logistics Logo" 
            className={`h-12 md:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${i18n.language === 'ar' ? 'mr-4' : 'ml-4'}`} 
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <button 
              key={l.id} 
              onClick={(e) => handleNavClick(e, l)}
              className="text-sm font-bold text-gray-600 dark:text-[#94a3b8] hover:text-[#00a1e9] transition-colors cursor-pointer bg-transparent border-none outline-none"
            >
              {l.label}
            </button>
          ))}

          <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1" />

          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-[#00a1e9] transition-all"
            >
              <AlignRight size={24} className={`${showDropdown ? 'rotate-90' : 'rotate-0'} transition-transform duration-300`} />
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#111827] border border-gray-100 dark:border-[#1f2937] rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="bg-gray-50/50 dark:bg-gray-800/30 p-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                          i18n.language === lang.code 
                          ? 'bg-[#00a1e9] text-white shadow-md' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 transition-all hover:scale-110">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            onClick={() => navigate('/quote')}
            className="px-5 py-2 rounded-full bg-[#00a1e9] text-white text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-gray-900 transition-all"
          >
            {t('nav.get_quote')}
          </button>
        </nav>

        {/* Mobile Menu Actions */}
        <div className="md:hidden flex items-center gap-3">
           <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 transition-all active:scale-90">
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
           </button>
           <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 text-[#00a1e9] transition-transform active:scale-90">
              {mobileOpen ? <X size={32} /> : <AlignRight size={32} />}
           </button>
        </div>
      </div>
      
      {/* Mobile Menu Content */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="md:hidden bg-white dark:bg-[#0b0f1a] border-t border-gray-100 dark:border-[#1f2937] overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-5">
              {navLinks.map(l => (
                <button key={l.id} onClick={(e) => handleNavClick(e, l)} className="text-left text-xl font-bold text-gray-800 dark:text-gray-200 bg-transparent border-none outline-none">
                  {l.label}
                </button>
              ))}
              
              <hr className="border-gray-100 dark:border-gray-800" />
              
              {/* قسم اختيار اللغة المضاف للموبايل */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest px-1">
                  <Globe size={14} />
                  <span>Select Language</span>
                </div>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex-1 py-3 rounded-xl text-sm font-black uppercase transition-all ${
                        i18n.language === lang.code 
                        ? 'bg-[#00a1e9] text-white shadow-lg shadow-blue-500/20' 
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {lang.code}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-800" />
              
              <button onClick={() => { navigate('/about'); setMobileOpen(false); }} className="flex items-center gap-3 text-left text-xl font-black text-[#00a1e9] bg-transparent border-none outline-none">
                <Info size={22} /> {t('nav.about')}
              </button>
              <button onClick={() => { navigate('/quote'); setMobileOpen(false); }} className="w-full py-4 rounded-2xl bg-[#00a1e9] text-white text-center font-black text-lg shadow-lg shadow-blue-500/20">
                {t('nav.get_quote')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}