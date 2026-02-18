import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Truck, LayoutGrid, Award, Star, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import logoLight from '../assets/file.svg'
import logoDark from '../assets/file2.png'

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);
  const { t, i18n } = useTranslation();
  const textAlignClass = i18n.language === 'ar' ? 'text-right' : 'text-left';
  const isRTL = i18n.language === 'ar';

  const [step, setStep] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const serviceKeys = ['courier', 'ptl', 'ftl'];
  const sectorKeys = ['messe', 'construction', 'documents', 'retailers', 'autoparts'];
  const valueKeys = ['smart_moves', 'personal_service', 'trust', 'reliability', 'flexibility'];

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
            <a href="#pricing" className="px-8 py-4 rounded-full border border-gray-200 dark:border-[#1f2937] text-gray-900 dark:text-[#94a3b8] font-bold text-lg text-center hover:bg-gray-50 dark:hover:bg-[#111827]/50 transition-all">
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
            
            <div className={`relative z-20 w-full h-full rounded-[1.9rem] md:rounded-[2.4rem] bg-white dark:bg-[#111827] overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
              <AnimatePresence mode="wait">
                
                {/* 0. LOGO + Floating Text (Both Fade Out together) */}
                {step === 0 && (
                  <motion.div
                    key="step-logo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full relative"
                  >
                    <img 
                      src={isDark ? logoDark : logoLight} 
                      alt="HOP Logo" 
                      className="w-full h-full object-cover object-center"
                    />
                    {/* النص العائم أصبح داخل هذا القسم ليتلاشى معه */}
                    <div className="absolute bottom-6 left-0 w-full text-center z-30 pointer-events-none">
                      <div className="shimmer-text text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase leading-tight">
                        {t('brand.fast')} {t('brand.secure')} {t('brand.smart')}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 1. SERVICES */}
                {step === 1 && (
                  <motion.div
                    key="step-services"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full h-full flex flex-col justify-center p-8 md:p-12 space-y-4"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Truck className="text-[#00a1e9]" size={32} />
                      <h3 className="text-[#00a1e9] font-black text-2xl uppercase tracking-tight italic">
                        {t('carousel.badge')}
                      </h3>
                    </div>
                    {serviceKeys.map((key, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={key}
                        className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm"
                      >
                        <CheckCircle2 className="text-[#00a1e9]" size={22} />
                        <span className="font-bold text-lg text-gray-800 dark:text-gray-100 italic">
                          {t(`pricing.tiers.${key}.name`)}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* 2. SECTORS (Grid) */}
                {step === 2 && (
                  <motion.div
                    key="step-sectors"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="w-full h-full flex flex-col justify-center p-6 md:p-10"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <LayoutGrid className="text-[#00a1e9]" size={32} />
                      <h3 className="text-[#00a1e9] font-black text-2xl uppercase italic">
                        {t('sectors.title_main')}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {sectorKeys.map((key, i) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={key}
                          className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/50 dark:border-blue-800/30 text-center font-bold text-sm md:text-base text-gray-700 dark:text-gray-200 flex items-center justify-center"
                        >
                          {t(`sectors.${key}.title`)}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 3. CORE VALUES - Responsive Grid for Long Words */}
{step === 3 && (
  <motion.div
    key="step-values"
    initial={{ opacity: 0, rotateX: 30 }}
    animate={{ opacity: 1, rotateX: 0 }}
    exit={{ opacity: 0, rotateX: -30 }}
    // إضافة padding كافي ومنع الخروج
    className="w-full h-full flex flex-col justify-center p-4 md:p-8 overflow-hidden"
  >
    <div className="flex items-center gap-3 mb-4 md:mb-6 justify-center">
      <Award className="text-[#00a1e9] shrink-0" size={28} />
      <h3 className="text-[#00a1e9] font-black text-xl md:text-2xl uppercase italic whitespace-nowrap">
        {t('about.values.title')}
      </h3>
    </div>
    
    {/* نظام شبكة مرن (Grid) يتكيف مع طول الكلمات */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 max-w-full">
      {valueKeys.map((key, i) => (
        <motion.div 
          key={key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          // تحديد أقصى عرض ومنع النص من الانكسار بشكل مشوه
          className="px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white dark:bg-gray-800 border border-[#00a1e9]/20 shadow-sm flex items-center gap-2 overflow-hidden"
        >
          <Star size={14} className="text-[#00a1e9] fill-[#00a1e9] shrink-0" />
          <span className="font-black text-gray-900 dark:text-white uppercase tracking-tighter text-[10px] md:text-xs lg:text-sm italic truncate">
            {t(`about.values.items.${key}.title`)}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}
              </AnimatePresence>
              
              {/* Decorative Dots (Keep them always visible for design consistency) */}
              <div className="absolute top-4 md:top-6 left-4 md:left-6 w-1.5 h-1.5 rounded-full bg-[#00a1e9] shadow-[0_0_10px_#00a1e9] opacity-50 z-30" />
              <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8] opacity-50 z-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}