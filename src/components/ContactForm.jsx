import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Send, User, Mail, MessageSquare, CheckCircle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useTranslation } from 'react-i18next'

export default function ContactForm() {
  const { t } = useTranslation()
  const formRef = useRef();
  const [phone, setPhone] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = 'service_p74f8vp'; 
    const templateID = 'template_q9i5r79'; 
    const publicKey = 'SK5NTr8r6V5KukeCX';   

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
      .then((result) => {
          setIsSuccess(true);
          setIsSending(false);
          setPhone('');
      }, (error) => {
          console.log('Error:', error.text);
          setIsSending(false);
          alert(t('contact.error_message'));
      });
  };

  if (isSuccess) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0f1a] px-4 font-modern">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 rounded-[3rem] bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-[#1f2937] shadow-2xl max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 font-luxury">{t('contact.success_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{t('contact.success_message')}</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="w-full py-4 rounded-2xl bg-[#00a1e9] text-white font-black hover:bg-gray-900 transition-all font-modern uppercase tracking-widest"
          >
            {t('contact.success_cta')}
          </button>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-32 pb-20 bg-white dark:bg-[#0b0f1a] font-modern">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter font-luxury">
            {t('nav.get_quote')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium font-modern">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.form 
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 bg-gray-50 dark:bg-[#111827] p-8 md:p-12 rounded-[3rem] border border-gray-100 dark:border-[#1f2937] shadow-2xl relative z-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.labels.first_name')}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="first_name" type="text" placeholder={t('contact.placeholders.first_name')} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-[#0b0f1a] border border-transparent focus:border-[#00a1e9] outline-none transition-all dark:text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.labels.father_name')}</label>
              <input name="father_name" type="text" placeholder={t('contact.placeholders.father_name')} className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-[#0b0f1a] border border-transparent focus:border-[#00a1e9] outline-none transition-all dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.labels.last_name')}</label>
              <input required name="last_name" type="text" placeholder={t('contact.placeholders.last_name')} className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-[#0b0f1a] border border-transparent focus:border-[#00a1e9] outline-none transition-all dark:text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.labels.email')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required name="user_email" type="email" placeholder={t('contact.placeholders.email')} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-[#0b0f1a] border border-transparent focus:border-[#00a1e9] outline-none transition-all dark:text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.labels.phone')}</label>
              <input type="hidden" name="user_phone" value={phone} />
              <div className="phone-input-dark">
                <PhoneInput
                  country={'de'}
                  value={phone}
                  onChange={setPhone}
                  containerClass="!w-full"
                  inputClass="!w-full !h-[58px] !pl-14 !rounded-2xl !bg-white !dark:bg-[#0b0f1a] !border-transparent !focus:border-[#00a1e9] !text-gray-900 !dark:text-white !transition-all font-modern"
                  buttonClass="!bg-transparent !border-none !rounded-l-2xl !pl-4 hover:!bg-gray-100 dark:hover:!bg-gray-800"
                  dropdownClass="!bg-white dark:!bg-[#111827] !text-gray-900 dark:!text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.labels.details')}</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
              <textarea required name="message" rows="5" placeholder={t('contact.placeholders.details')} className="w-full pl-12 pr-6 py-4 rounded-[2rem] bg-white dark:bg-[#0b0f1a] border border-transparent focus:border-[#00a1e9] outline-none transition-all dark:text-white resize-none font-modern"></textarea>
            </div>
          </div>

          <motion.button 
            disabled={isSending}
            whileHover={!isSending ? { scale: 1.02 } : {}}
            whileTap={!isSending ? { scale: 0.98 } : {}}
            className={`w-full py-5 rounded-[2rem] text-white font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all mt-4 relative overflow-hidden font-modern uppercase tracking-widest ${
              isSending 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#00a1e9] hover:bg-[#1e73be] shadow-blue-500/25'
            }`}
          >
            <AnimatePresence mode="wait">
              {isSending ? (
                <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-3">
                  <Loader2 className="animate-spin" size={24} />
                  <span>{t('contact.processing')}</span>
                </motion.div>
              ) : (
                <motion.div key="normal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-3">
                  <span>{t('contact.submit')}</span>
                  <Send size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </div>

      <style>{`
        .dark .phone-input-dark .react-tel-input .country-list { background-color: #111827 !important; color: white !important; font-family: 'Inter', sans-serif; }
        .dark .phone-input-dark .react-tel-input .country-list .country:hover { background-color: #1f2937 !important; }
        .dark .phone-input-dark .react-tel-input .selected-flag:hover { background-color: #1f2937 !important; }
        .react-tel-input .form-control { font-family: 'Inter', sans-serif !important; }
      `}</style>
    </section>
  )
}