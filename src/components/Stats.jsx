import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Stats() {
  const { t, i18n } = useTranslation()
  const nfCompact = new Intl.NumberFormat(i18n.language, { notation: 'compact', maximumFractionDigits: 1 })
  const nfPercent = new Intl.NumberFormat(i18n.language, { style: 'percent', maximumFractionDigits: 1 })
  let nfKm
  try { nfKm = new Intl.NumberFormat(i18n.language, { style: 'unit', unit: 'kilometer', unitDisplay: 'narrow', notation: 'compact' }) } catch (e) { nfKm = nfCompact }
  const stats = [
    { k: t('stats.clients'), v: nfCompact.format(2500) },
    { k: t('stats.success_rate'), v: nfPercent.format(0.992) },
    { k: t('stats.daily_shipments'), v: nfCompact.format(850) },
    { k: t('stats.distance'), v: nfKm.format(12000000) },
  ]
  return (
    <section className="bg-white dark:bg-[#0b0f1a] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="rounded-3xl border border-blue-50 dark:border-[#1f2937] p-8 bg-gradient-to-b from-blue-50/50 to-white dark:bg-[#111827] shadow-sm hover:shadow-md transition-all duration-300 group text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-[#00a1e9] group-hover:scale-110 transition-transform duration-300">
                {s.v}
              </div>
              <div className="mt-3 text-xs md:text-sm font-bold text-gray-400 dark:text-[#94a3b8] uppercase tracking-widest">
                {s.k}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}