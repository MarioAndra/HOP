import { motion } from 'framer-motion'
import { Globe2, ShieldCheck, Zap, MapPin, Target, Eye, Star, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

export default function About() {
  const { t } = useTranslation()
  return (
    <div className="bg-white dark:bg-[#0b0f1a] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#00a1e9] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <MapPin size={14} /> {t('about.badge')}
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-none uppercase">
              {t('about.title_prefix')} <br/> {t('about.title_infix')} <span className="text-[#00a1e9]">{t('about.title_highlight')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-[#f8fafc] max-w-5xl mx-auto font-bold leading-relaxed not-italic tracking-tight">
              {t('about.p1')} {t('about.p2')} {t('about.p3')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#111827]/50">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3.5rem] bg-white dark:bg-[#0b0f1a] border border-gray-100 dark:border-[#1f2937] shadow-2xl shadow-blue-500/5 transition-transform hover:scale-[1.02] duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-[#00a1e9] mb-8">
              <Target size={36} />
            </div>
            <h3 className="text-3xl font-black mb-6 dark:text-white tracking-tight uppercase">{t('about.mission.title')}</h3>
            <p className="text-gray-600 dark:text-[#94a3b8] font-bold leading-relaxed text-xl not-italic">
              {t('about.mission.text')}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3.5rem] bg-white dark:bg-[#0b0f1a] border border-gray-100 dark:border-[#1f2937] shadow-2xl shadow-blue-500/5 transition-transform hover:scale-[1.02] duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-[#00a1e9] mb-8">
              <Eye size={36} />
            </div>
            <h3 className="text-3xl font-black mb-6 dark:text-white tracking-tight uppercase">{t('about.vision.title')}</h3>
            <p className="text-gray-600 dark:text-[#94a3b8] font-bold leading-relaxed text-xl not-italic">
              {t('about.vision.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white dark:bg-[#0b0f1a] pb-32">
        <div className="mx-auto max-w-7xl px-4 text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">{t('about.values.title')}</h2>
          <div className="w-24 h-2 bg-[#00a1e9] mx-auto mt-6 rounded-full" />
        </div>
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            { key: 'smart_moves', icon: Zap },
            { key: 'personal_service', icon: Star },
            { key: 'trust', icon: ShieldCheck },
            { key: 'reliability', icon: CheckCircle2 },
            { key: 'flexibility', icon: Globe2 }
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[3rem] bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-[#1f2937] text-center group hover:border-[#00a1e9] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
            >
              <div className="w-12 h-12 mx-auto bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <value.icon className="text-[#00a1e9]" size={28} />
              </div>
              <h4 className="text-lg font-black dark:text-white mb-3 uppercase tracking-tight">{t(`about.values.items.${value.key}.title`)}</h4>
              <p className="text-sm text-gray-500 dark:text-[#94a3b8] font-bold leading-relaxed">{t(`about.values.items.${value.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}