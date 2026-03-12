import { useState, useEffect } from 'react'
import { Menu, X, MapPin, Sun, Moon, Info, Globe, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import logoLight from '../assets/file.svg'
import logoDark from '../assets/file2.png'
import * as Flags from 'country-flag-icons/react/3x2'

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

    if (item.id === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
    { label: t('nav.services'), href: '#pricing', id: 'services' },
    { label: t('nav.about'), href: '#about', id: 'about' },
    { label: t('nav.contact'), href: '#contact', id: 'contact' },
  ]

  const languages = [
    { code: 'en', label: 'English', FlagIcon: Flags.US },
    { code: 'de', label: 'Deutsch', FlagIcon: Flags.DE },
    { code: 'ar', label: 'العربية', FlagIcon: Flags.SA }
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-white/90 dark:bg-[#0b0f1a]/90 backdrop-blur-md border-b border-gray-100 dark:border-[#1f2937]"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        
        {/* Logo Section */}
        <button 
          onClick={() => { navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); setShowDropdown(false); }} 
          className="flex items-center group bg-transparent border-none outline-none cursor-pointer"
        >
          <HopLogo />
          <img 
            src={isDark ? logoDark : logoLight} 
            alt="HOP Logistics Logo" 
            className={`h-10 md:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${i18n.language === 'ar' ? 'mr-3' : 'ml-3'}`} 
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

          {/* الزر الرئيسي (CTA) بدون أيقونة */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick(e, { href: '#pricing', id: 'services' })}
            className="px-6 py-2.5 rounded-full bg-[#00a1e9] text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-[#1e73be] transition-all"
          >
            {t('hero.cta_start')}
          </motion.button>

          <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1" />

          {/* Language Switcher Desktop */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
            >
              <div className="w-6 h-4 overflow-hidden rounded-sm shadow-sm transition-transform group-hover:scale-110">
                <currentLanguage.FlagIcon title={currentLanguage.label} />
              </div>
              <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#111827] border border-gray-100 dark:border-[#1f2937] rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-2 space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                          i18n.language === lang.code 
                          ? 'bg-[#00a1e9] text-white' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="w-5 h-3 overflow-hidden rounded-[1px]">
                          <lang.FlagIcon />
                        </div>
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
        </nav>

        {/* Mobile Menu Actions */}
        <div className="md:hidden flex items-center gap-2">
           <div className="w-8 h-5 overflow-hidden rounded-sm shadow-sm border border-gray-200 dark:border-gray-700">
             <currentLanguage.FlagIcon />
           </div>

           <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400">
             {isDark ? <Sun size={18} /> : <Moon size={18} />}
           </button>
           
           <button 
             onClick={() => setMobileOpen(!mobileOpen)} 
             className="p-2 text-[#00a1e9] bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-all active:scale-95"
           >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden bg-white dark:bg-[#0b0f1a] border-t border-gray-100 dark:border-[#1f2937] overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {/* روابط التنقل في الموبايل */}
              <div className="space-y-4">
                {navLinks.map(l => (
                  <button 
                    key={l.id} 
                    onClick={(e) => handleNavClick(e, l)} 
                    className="w-full text-left text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-[#00a1e9] transition-colors py-2 block"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              
              <hr className="border-gray-100 dark:border-gray-800" />
              
              {/* أزرار الإجراءات في الموبايل */}
              <div className="space-y-3">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => handleNavClick(e, { href: '#pricing', id: 'services' })}
                  className="flex items-center justify-center w-full py-4 rounded-2xl bg-[#00a1e9] text-white font-black shadow-xl shadow-blue-500/25"
                >
                  {t('hero.cta_start')}
                </motion.button>

                <button 
                  onClick={() => { navigate('/about'); setMobileOpen(false); }} 
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-[#00a1e9] font-black"
                >
                  <Info size={20} /> {t('nav.about')}
                </button>
              </div>

              <hr className="border-gray-100 dark:border-gray-800" />
              
              {/* قسم تبديل اللغة في الموبايل */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                  <Globe size={14} />
                  <span>{i18n.language === 'ar' ? 'اختر اللغة' : 'Select Language'}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex flex-col items-center gap-2 py-3 rounded-xl transition-all border ${
                        i18n.language === lang.code 
                        ? 'bg-[#00a1e9] border-[#00a1e9] text-white shadow-lg shadow-blue-500/20' 
                        : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      <div className="w-8 h-5 overflow-hidden rounded-sm">
                        <lang.FlagIcon />
                      </div>
                      <span className="text-[10px] font-black uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}