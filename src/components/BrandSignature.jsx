import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function BrandSignature() {
  const { t } = useTranslation()
  return (
    <section className="py-20 px-4 border-t border-gray-100 dark:border-[#1f2937] bg-white dark:bg-[#0b0f1a]">
      <div className="flex flex-col items-center justify-center">
        <svg width="240" height="80" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Letter H */}
          <motion.path
            d="M50 20 V60 M80 20 V60 M50 40 H80"
            stroke="#00a1e9"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
            className="filter drop-shadow-[0_0_8px_rgba(0,161,233,0.8)]"
          />
          {/* Letter O */}
          <motion.path
            d="M120 20 A 20 20 0 1 1 119.9 20"
            stroke="#00a1e9"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 0.2 }}
            className="filter drop-shadow-[0_0_8px_rgba(0,161,233,0.8)]"
          />
          {/* Letter P */}
          <motion.path
            d="M160 60 V20 H185 C200 20 200 40 185 40 H160"
            stroke="#00a1e9"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 0.4 }}
            className="filter drop-shadow-[0_0_8px_rgba(0,161,233,0.8)]"
          />
        </svg>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.8, 1] }}
          className="flex gap-4 mt-6 items-center"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00a1e9]">{t('brand.fast')}</span>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00a1e9]">{t('brand.secure')}</span>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00a1e9]">{t('brand.smart')}</span>
        </motion.div>
        
        <p className="mt-8 text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-[0.8em]">
          {t('brand.signature')}
        </p>
      </div>
    </section>
  )
}