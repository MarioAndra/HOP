import { motion } from 'framer-motion'
import { 
  Zap, ShieldCheck, Star, CheckCircle2, 
  Globe2, Target, Link as LinkIcon, MousePointer2
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

// --- مكون خريطة العالم اللوجستية المتحركة ---
const AnimatedLogisticsMap = () => {
  const hubs = [
    { id: 'germany', x: 52, y: 35, name: 'Germany', isMain: true },
    { id: 'france', x: 42, y: 42, name: 'France' },
    { id: 'italy', x: 52, y: 55, name: 'Italy' },
    { id: 'spain', x: 30, y: 58, name: 'Spain' },
  ];

  const routes = [
    { from: [52, 35], to: [42, 42] },
    { from: [52, 35], to: [52, 55] },
    { from: [52, 35], to: [30, 58] },
  ];

  return (
    <div className="relative w-full h-48 mx-auto mb-8 flex items-center justify-center overflow-hidden rounded-2xl bg-blue-50/20 dark:bg-blue-900/5">
      <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d">
        <path
          d="M10,30 Q15,25 25,25 T40,20 T55,25 T70,20 T85,25 T95,35 V60 Q80,70 60,65 T40,75 T20,70 T5,60 Z"
          fill="currentColor"
          className="text-[#00a1e9] opacity-[0.08] dark:opacity-[0.12]"
        />
        {routes.map((route, i) => {
          const pathD = `M ${route.from[0]} ${route.from[1]} Q ${(route.from[0] + route.to[0]) / 2 - 5} ${(route.from[1] + route.to[1]) / 2 - 5} ${route.to[0]} ${route.to[1]}`;
          return (
            <g key={`route-${i}`}>
              <path d={pathD} fill="none" stroke="#00a1e9" strokeWidth="0.5" className="opacity-20" />
              <motion.path
                d={pathD}
                fill="none"
                stroke="#00a1e9"
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
              />
              <motion.circle
                r="1"
                fill="#00a1e9"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: "linear" }}
                style={{ offsetPath: `path('${pathD}')` }}
              />
            </g>
          );
        })}
        {hubs.map((hub) => (
          <g key={hub.id}>
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              r={hub.isMain ? 4 : 2.5}
              fill="#00a1e9"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <circle cx={hub.x} cy={hub.y} r={hub.isMain ? 1.5 : 1} fill="#00a1e9" />
          </g>
        ))}
      </svg>
    </div>
  )
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export default function About() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const values = [
    { key: 'smart_moves', icon: Zap, num: '1' },
    { key: 'personal_service', icon: Star, num: '2' },
    { key: 'trust', icon: ShieldCheck, num: '3' },
    { key: 'reliability', icon: CheckCircle2, num: '4' },
    { key: 'flexibility', icon: Globe2, num: '5' }
  ];

  return (
    <div className={`relative min-h-screen bg-white dark:bg-[#0b0f1a] overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* الخلفية الضوئية */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-blue-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-40">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 border-b border-gray-100 dark:border-gray-800 pb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter uppercase">
            {t('about.main_title.part1')} <span className="text-[#00a1e9]">{t('about.main_title.part2')}</span> <br/> 
            <span className="text-gray-400 dark:text-gray-600">{t('about.main_title.part3')}</span>
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <span className="h-[2px] w-12 bg-[#00a1e9]"></span>
            <p className="text-[#00a1e9] text-xl font-bold tracking-widest uppercase italic">
              {t('about.slogan')}
            </p>
          </div>
        </motion.header>

        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-8 space-y-20">
            
            {/* Mission */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 text-[#00a1e9] mb-4">
                <Target size={32} strokeWidth={2.5} />
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase">
                  {t('about.mission.title')}
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bold leading-relaxed">
                {t('about.mission.text')}
              </p>
            </motion.section>

            {/* Vision */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="flex items-center gap-3 text-[#00a1e9] mb-4">
                <Globe2 size={32} strokeWidth={2.5} />
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase">
                  {t('about.vision.title')}
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-bold leading-relaxed">
                {t('about.vision.text')}
              </p>
            </motion.section>

            {/* Who We Are */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6">
              <div className="flex items-center gap-3 text-[#00a1e9]">
                <MousePointer2 size={24} className="rotate-90" />
                <h3 className="text-lg font-black uppercase tracking-[0.2em]">Who We Are</h3>
              </div>
              <div className="text-lg text-gray-700 dark:text-gray-400 font-bold leading-relaxed space-y-4">
                <p>{t('about.p1')}</p>
                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-l-4 border-[#00a1e9] italic text-gray-500">
                   {t('about.p2')} {t('about.p3')}
                </div>
              </div>
            </motion.section>

            {/* Values */}
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-12">
              <div className="flex items-center gap-3 text-[#00a1e9]">
                <LinkIcon size={24} />
                <h3 className="text-lg font-black uppercase tracking-[0.2em]">Our Core Values</h3>
              </div>
              <div className="space-y-10">
                {values.map((v, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#00a1e9] font-black text-xl border border-blue-100 dark:border-blue-800 group-hover:bg-[#00a1e9] group-hover:text-white transition-all duration-300">
                      {v.num}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900 dark:text-white uppercase mb-2">
                        {t(`about.values.items.${v.key}.title`)}
                      </h4>
                      <p className="text-lg text-gray-500 dark:text-gray-400 font-bold">
                        {t(`about.values.items.${v.key}.desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 hidden lg:block">
            <div className="sticky top-32 p-10 rounded-[3rem] bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-transparent border border-blue-100/50 dark:border-blue-900/20 text-center backdrop-blur-sm">
              <AnimatedLogisticsMap />
              {/* النصوص المترجمة للـ Sidebar */}
              <h5 className="text-sm font-black text-[#00a1e9] uppercase tracking-widest">
                {t('about.sidebar.title')}
              </h5>
              <p className="mt-4 text-gray-500 font-bold text-sm leading-relaxed">
                {t('about.sidebar.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}