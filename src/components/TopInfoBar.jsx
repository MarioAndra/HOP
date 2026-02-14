import { Phone, Mail } from 'lucide-react'

export default function TopInfoBar() {
  return (
    <div className="hidden md:block w-full bg-gradient-to-r from-[#00a1e9] to-white dark:to-[#0b0f1a] border-none">
      <div className="mx-auto max-w-7xl px-4 py-2.5 flex justify-center items-center">
        <div className="flex items-center gap-12">
          
          {/* قسم الهاتف */}
          <div className="flex items-center gap-2 text-white drop-shadow-sm group cursor-default">
            {/* تم تكبير الأيقونة لتناسب الخط */}
            <Phone size={18} className="group-hover:scale-110 transition-transform" />
            {/* تم تغيير text-xs إلى text-sm وزيادة السماكة */}
            <span className="text-sm font-extrabold tracking-wide">+49 40 822275176</span>
          </div>
          
          {/* قسم الإيميل */}
          <div className="flex items-center gap-2 text-white drop-shadow-sm group cursor-default">
            <Mail size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-extrabold tracking-wide">contact@hoplogistics.de</span>
          </div>
          
        </div>
      </div>
    </div>
  )
}