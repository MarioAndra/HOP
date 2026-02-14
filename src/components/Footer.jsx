import { Twitter, Linkedin, Instagram, Facebook } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import logo from '../assets/file.svg'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <motion.footer
      id="contact"
      className="bg-white dark:bg-[#0b0f1a] border-t border-gray-100 dark:border-[#1f2937]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-gray-900 dark:text-[#94a3b8]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="HOP Logo" className="h-10 w-auto" />
              <span className="text-2xl font-black tracking-tighter">HOP</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-[#94a3b8] font-medium max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">{t('footer.solutions')}</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              <li>{t('footer.links.road_freight')}</li>
              <li>{t('footer.links.express')}</li>
              <li>{t('footer.links.global')}</li>
              <li>{t('footer.links.docs')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-500 mb-6 uppercase tracking-widest text-xs">{t('footer.center')}</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              <li>{t('footer.links.tracking')}</li>
              <li>{t('footer.links.support')}</li>
              <li>{t('footer.links.terms')}</li>
              <li>{t('footer.links.privacy')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-gray-500 mb-6 uppercase tracking-widest text-xs">{t('footer.get_in_touch')}</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500 mb-6">
              <li>+49 40 822275176</li>
              <li>contact@hoplogistics.de</li>
              <li>{t('footer.location')}</li>
            </ul>
            <div className="flex items-center gap-3">
              {/* هنا الأزرار القابلة للضغط فقط */}
              {[
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Twitter, href: "https://twitter.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Instagram, href: "https://instagram.com" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-gray-100 text-gray-400 hover:bg-blue-50 hover:text-[#00a1e9] transition-all"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-[#1f2937] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-400">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span>{t('footer.legal')}</span>
            <span>{t('footer.cookies')}</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}