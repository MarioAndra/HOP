import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import logoLight from '../assets/file.svg'
import logoDark from '../assets/file2.png'

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);
  const { t, i18n } = useTranslation();
  const textAlignClass = i18n.language === 'ar' ? 'text-right' : 'text-left';

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden bg-white dark:bg-[#0b0f1a]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(0, 161, 233, 0.1) 45%, 
            rgba(0, 161, 233, 0.8) 50%, 
            rgba(0, 161, 233, 0.1) 55%, 
            transparent 100%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: rgba(156, 163, 175, 0.5);
          animation: shimmer 6s infinite linear;
        }
        .dark .shimmer-text {
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(56, 189, 248, 0.1) 45%, 
            rgba(56, 189, 248, 0.9) 50%, 
            rgba(56, 189, 248, 0.1) 55%, 
            transparent 100%);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: rgba(75, 85, 99, 0.6);
        }
      `}} />

      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-blue-50/50 dark:from-[rgba(0,161,233,0.1)] to-transparent -z-10" />
      
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={"flex-1 w-full " + textAlignClass}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-[rgba(0,161,233,0.1)] text-[#00a1e9] text-sm font-bold mb-6 md:mb-8">
            <Zap size={16} />
            {t('hero.badge')}
          </div>
          
          {/* التنسيق الهرمي للجملة الجديدة */}
          <h1 className="font-black text-gray-900 dark:text-white leading-[1.1] mb-6 md:mb-8">
            <span className="text-5xl md:text-7xl block mb-2">
              {t('hero.title_part1')}
            </span>
            <span className="text-4xl md:text-6xl block mb-2 text-[#00a1e9]">
              {t('hero.title_highlight')}
            </span>
            <span className="text-3xl md:text-5xl block opacity-80">
              {t('hero.title_part2')}
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-500 dark:text-[#94a3b8] mb-8 md:mb-10 leading-relaxed font-medium max-w-xl">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#pricing" className="px-8 py-4 rounded-full bg-[#00a1e9] text-white font-bold text-lg text-center shadow-xl shadow-blue-500/20 hover:bg-[#1e73be] transition-all">
              {t('hero.cta_start')}
            </a>
            <a href="#services" className="px-8 py-4 rounded-full border border-gray-200 dark:border-[#1f2937] text-gray-900 dark:text-[#94a3b8] font-bold text-lg text-center hover:bg-gray-50 dark:hover:bg-[#111827]/50 transition-all">
              {t('hero.cta_services')}
            </a>
          </div>
        </motion.div>
        
        <div className="flex-1 relative group w-full max-w-[400px] md:max-w-none mx-auto mt-8 md:mt-0">
          <div className="w-full aspect-square rounded-[3rem] bg-[#00a1e9] opacity-10 blur-3xl absolute inset-0 group-hover:opacity-20 transition-opacity duration-700" />
          
          <div className="relative z-10 w-full aspect-square md:aspect-video rounded-[2rem] md:rounded-[2.5rem] p-[2px] overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-2xl">
            <div 
              className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, #00a1e9 85%, #38bdf8 100%)'
              }}
            />
            <div className="relative z-20 w-full h-full rounded-[1.9rem] md:rounded-[2.4rem] bg-white dark:bg-[#111827] flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [0, -15, 0] }}
                transition={{ 
                  scale: { duration: 0.8, delay: 0.5 },
                  opacity: { duration: 0.8, delay: 0.5 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative z-30 flex flex-col items-center"
              >
                <img 
                  src={isDark ? logoDark : logoLight} 
                  alt="HOP Logistics Logo" 
                  className="h-40 md:h-52 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,161,233,0.2)]"
                />
                <div className="shimmer-text mt-6 text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase leading-tight">
                  FAST SECURE SMART
                </div>
              </motion.div>
              <div className="absolute top-4 md:top-6 left-4 md:left-6 w-1.5 h-1.5 rounded-full bg-[#00a1e9] shadow-[0_0_10px_#00a1e9] opacity-50" />
              <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8] opacity-50" />
              <div className="absolute inset-0 bg-[#00a1e9]/5 animate-pulse rounded-[1.9rem] md:rounded-[2.4rem]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}