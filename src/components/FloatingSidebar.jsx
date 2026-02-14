import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.8 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24 } 
  },
}

function ExpandButton({ icon: Icon, label, ariaLabel, href, onClick, isLink }) {
  const Component = isLink ? motion.a : motion.button;
  const props = isLink ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <Component
      layout
      {...props}
      variants={itemVariants}
      aria-label={ariaLabel}
      className="group flex flex-row-reverse items-center overflow-hidden h-12 rounded-full text-white shadow-xl bg-gray-900 dark:bg-[#111827] hover:bg-[#00a1e9] dark:shadow-[0_0_12px_rgba(56,189,248,0.25)] cursor-pointer outline-none border-none"
      style={{ width: '48px' }}
      whileHover={{ 
        width: 220,
        transition: { type: 'spring', stiffness: 380, damping: 28 }
      }}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex items-center h-12 px-4 text-sm font-black whitespace-nowrap overflow-hidden">
        {label}
      </div>
    </Component>
  )
}

export default function FloatingSidebar() {
  const { t } = useTranslation()
  // --- إعدادات الشركة (تأكد من تعديل الأرقام هنا) ---
  const companyPhoneNumber = "+49123456789"; // رقم الاتصال الهاتفي
  const whatsappNumber = "49123456789";    // رقم الواتساب (بدون أصفار أو +)
  const navigate = useNavigate()

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. زر الاتصال الهاتفي: يفتح لوحة الاتصال في الهاتف مباشرة */}
      <ExpandButton 
        isLink={true}
        icon={Phone} 
        label={t('common.call_support')} 
        ariaLabel={t('common.call_support')} 
        href={`tel:${companyPhoneNumber}`} 
      />

      {/* 2. زر الإيميل: يفتح فورم التواصل داخل الموقع (Contact Form) */}
      <ExpandButton 
        isLink={false}
        icon={Mail} 
        label={t('common.email_office')} 
        ariaLabel={t('nav.get_quote')} 
        onClick={() => navigate('/quote')} 
      />

      {/* 3. زر الواتساب: يفتح محادثة مباشرة */}
      <ExpandButton 
        isLink={true}
        icon={MessageCircle} 
        label={t('common.whatsapp')} 
        ariaLabel={t('common.whatsapp')} 
        href={`https://wa.me/${whatsappNumber}`} 
      />
    </motion.div>
  )
}
