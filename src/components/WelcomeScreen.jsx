import { motion } from 'framer-motion'
import logo from '../assets/file.svg'
import { useTranslation } from 'react-i18next'

export default function WelcomeScreen({ onFinished }) {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b0f1a]"
    >
      <div className="relative flex flex-col items-center">
        {/* تأثير توهج خلف اللوغو */}
        <div className="absolute inset-0 bg-[#00a1e9] blur-[100px] opacity-20 animate-pulse" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onAnimationComplete={() => {
             // ننتظر قليلاً بعد ظهور اللوغو ثم نغلق الواجهة
             setTimeout(onFinished, 1000);
          }}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <img src={logo} alt="HOP LOGISTICS" className="h-32 md:h-44 w-auto" />
          
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-black text-white tracking-[0.3em] italic">
              HOP<span className="text-[#00a1e9]">!</span>
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#00a1e9] to-transparent" />
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">
              {t('common.speed_dna')}
            </p>
          </div>
        </motion.div>

        {/* شريط تحميل صغير تحت */}
        <div className="absolute bottom-20 w-48 h-[1px] bg-gray-800 overflow-hidden">
           <motion.div 
             initial={{ x: "-100%" }}
             animate={{ x: "100%" }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="w-full h-full bg-[#00a1e9]"
           />
        </div>
      </div>
    </motion.div>
  )
}