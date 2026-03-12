import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// إعدادات الحركة للأب (القائمة) والأبناء (الجمل)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
}

function TierCard({
  name,
  desc,
  features,
  popular,
  onSelect,
  isActive,
  onHover,
}) {
  const { i18n, t } = useTranslation()
  const isRTL = i18n.language === 'ar'

  return (
    <motion.div
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(name)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      animate={{
        scale: isActive ? 1.05 : 1,
        y: isActive ? -10 : 0,
        filter: isActive ? 'blur(0px)' : 'blur(0.3px)',
        opacity: isActive ? 1 : 0.92,
      }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: 'tween',
            ease: [0.22, 1, 0.36, 1],
            duration: 0.4,
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      className={`relative p-8 rounded-[2.5rem] border flex flex-col cursor-pointer
        ${isRTL ? 'text-right' : 'text-left'}
        ${
          popular
            ? 'bg-gradient-to-b from-[#00a1e9] to-[#1e73be] text-white border-transparent shadow-2xl shadow-blue-500/30 z-20'
            : 'bg-white dark:bg-[#111827] border-gray-100 dark:border-[#1f2937] text-gray-900 dark:text-[#94a3b8]'
        }
        ${
          isActive
            ? 'shadow-[0_20px_60px_rgba(0,0,0,0.18)]'
            : 'shadow-[0_8px_25px_rgba(0,0,0,0.08)]'
        }
      `}
    >
      {/* Title */}
      <div className="mb-6">
        <h3
          className={`text-xl font-black leading-snug ${
            popular ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}
        >
          {name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm mb-8 opacity-80 leading-relaxed font-medium">
        {desc}
      </p>

      {/* Features - تم إزالة max-h و overflow-hidden */}
      <motion.ul 
        variants={containerVariants}
        className="space-y-4 mb-8 flex-grow"
      >
        {Array.isArray(features) && features.map((f, idx) => (
          <motion.li
            key={idx}
            variants={itemVariants}
            className={`flex items-start gap-3 text-sm font-bold ${
              isRTL ? 'flex-row-reverse text-right' : 'text-left'
            }`}
          >
            {/* الدائرة الزرقاء الصغيرة بدل إشارة الصح */}
            <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
              popular ? 'bg-white' : 'bg-[#00a1e9]'
            }`} />
            
            <span
              className={
                popular
                  ? 'text-white/90'
                  : 'text-gray-700 dark:text-[#94a3b8]'
              }
            >
              {f}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Button */}
      <button
        onClick={onSelect}
        className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black transition-all duration-300
          ${
            popular
              ? 'bg-white text-[#00a1e9] hover:bg-blue-50 shadow-lg'
              : 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-black/10'
          }
        `}
      >
        {t('pricing.request_service')}
        <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
      </button>
    </motion.div>
  )
}

export default function PricingCards() {
  const { t } = useTranslation()
  const [activeCard, setActiveCard] = useState(null)
  const navigate = useNavigate()

  const tiers = [
    {
      id: 'pricing.tiers.courier.name',
      name: t('pricing.tiers.courier.name'),
      desc: t('pricing.tiers.courier.desc'),
      features: t('pricing.tiers.courier.features', {
        returnObjects: true,
      }),
    },
    {
      id: 'pricing.tiers.ptl.name',
      name: t('pricing.tiers.ptl.name'),
      desc: t('pricing.tiers.ptl.desc'),
      features: t('pricing.tiers.ptl.features', {
        returnObjects: true,
      }),
      popular: true,
    },
    {
      id: 'pricing.tiers.ftl.name',
      name: t('pricing.tiers.ftl.name'),
      desc: t('pricing.tiers.ftl.desc'),
      features: t('pricing.tiers.ftl.features', {
        returnObjects: true,
      }),
    },
  ]

  return (
    <section id="pricing" className="bg-white dark:bg-[#0b0f1a] py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-500 mb-6">
            {t('pricing.title_main')}{' '}
            <span className="text-[#00a1e9]">
              {t('pricing.title_highlight')}
            </span>
          </h2>
          <p className="text-gray-500 font-medium">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              {...tier}
              isActive={activeCard === tier.name}
              onHover={(name) => setActiveCard(name)}
              onSelect={() =>
                navigate('/quote', { state: { serviceType: tier.id } })
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}