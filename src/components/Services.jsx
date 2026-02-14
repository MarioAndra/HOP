import { motion, AnimatePresence } from 'framer-motion'
import { Package, Building2, FileText, Store, Car, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// images
import messe from '../assets/sectors/Messe&Event.png'
import construction from '../assets/sectors/Constraction.png'
import documents from '../assets/sectors/Documents&packages.png'
import retailers from '../assets/sectors/Retailers& Wholesalers.png'
import autoparts from '../assets/sectors/Autoparts&Automotive.png'

const sectors = [
  {
    title: 'Messe & Event',
    icon: Package,
    image: messe,
    desc: 'We provide fast and secure transport of exhibition equipment, event materials, and stage systems directly to event locations with high precision and timing.'
  },
  {
    title: 'Constraction',
    icon: Building2,
    image: construction,
    desc: 'We deliver construction equipment and building materials directly to the specified site with high speed, safety, and reliability.'
  },
  {
    title: 'Documents & Packages',
    icon: FileText,
    image: documents,
    desc: 'Secure and fast delivery of documents and packages with full tracking and guaranteed confidentiality.'
  },
  {
    title: 'Retailers & Wholesalers',
    icon: Store,
    image: retailers,
    desc: 'Smart logistics solutions for retailers and wholesalers including warehousing, distribution, and last-mile delivery.'
  },
  {
    title: 'Autoparts & Automotive',
    icon: Car,
    image: autoparts,
    desc: 'Professional transport of vehicles, spare parts, and automotive components with full protection and optimized routes.'
  },
]

export default function Services() {
  const { t } = useTranslation()
  const [activeSector, setActiveSector] = useState(null)
  const sectors = [
    { title: t('sectors.messe.title'), icon: Package, image: messe, desc: t('sectors.messe.desc') },
    { title: t('sectors.construction.title'), icon: Building2, image: construction, desc: t('sectors.construction.desc') },
    { title: t('sectors.documents.title'), icon: FileText, image: documents, desc: t('sectors.documents.desc') },
    { title: t('sectors.retailers.title'), icon: Store, image: retailers, desc: t('sectors.retailers.desc') },
    { title: t('sectors.autoparts.title'), icon: Car, image: autoparts, desc: t('sectors.autoparts.desc') },
  ]

  return (
    <section id="services" className="bg-white dark:bg-[#0b0f1a] py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            {t('sectors.title_main')} <span className="text-[#00a1e9]">{t('sectors.title_highlight')}</span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-[#94a3b8] max-w-xl">
            {t('sectors.subtitle')}
          </p>
        </div>

        {/* Pyramid Layout */}
        <div className="flex flex-col items-center gap-10">
          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {sectors.slice(0, 3).map((item, i) => (
              <SectorCard key={item.title} item={item} index={i} onOpen={setActiveSector} />
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-4xl">
            {sectors.slice(3, 5).map((item, i) => (
              <SectorCard key={item.title} item={item} index={i + 3} onOpen={setActiveSector} />
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {activeSector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-lg w-full rounded-[2.5rem] overflow-hidden bg-[#0b0f1a] border border-white/10 shadow-2xl"
            >
              {/* background */}
              <div className="absolute inset-0">
                <img src={activeSector.image} alt={activeSector.title} className="w-full h-full object-cover opacity-20" />
              </div>

              {/* content */}
              <div className="relative z-10 p-10">
                <button
                  onClick={() => setActiveSector(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <X size={18} />
                </button>

                <div className="w-16 h-16 mb-6 rounded-2xl bg-[#00a1e9] flex items-center justify-center text-white shadow-lg">
                  <activeSector.icon size={30} />
                </div>

                <h3 className="text-3xl font-black text-white mb-4">
                  {activeSector.title}
                </h3>

                <p className="text-[#cbd5e1] leading-relaxed text-lg">
                  {activeSector.desc}
                </p>

                <div className="mt-8 h-[3px] w-20 bg-[#00a1e9] rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function SectorCard({ item, index, onOpen }) {
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onOpen(item)}
      onTouchStart={() => onOpen(item)}
      className="group relative h-[320px] rounded-[2.5rem] overflow-hidden shadow-xl border border-white/10 cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

      {/* Hover glow */}
      <div className="absolute inset-0 bg-[#00a1e9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <div className="w-14 h-14 mb-5 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shadow-lg group-hover:bg-[#00a1e9] transition-colors">
          <Icon size={26} />
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight">
          {item.title}
        </h3>

        <div className="mt-3 h-[3px] w-14 bg-[#00a1e9] rounded-full" />
      </div>
    </motion.div>
  )
}
