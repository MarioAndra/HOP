import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// استيراد الصور من المسار المحلي الجديد
import truck1 from '../assets/trucks/photo1.png'
import truck2 from '../assets/trucks/photo2.jpg'
import truck3 from '../assets/trucks/photo3.png'

export default function TruckCarousel() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const isRtl = i18n.language === 'ar'
  
  // تتبع العنصر النشط عند اللمس في الموبايل
  const [activeTouchIndex, setActiveTouchIndex] = useState(null);

  const truckImagesLocalized = [
    { 
      url: truck1, 
      label: t('pricing.tiers.courier.name'), 
      status: t('pricing.tiers.courier.name'),
      serviceKey: 'pricing.tiers.courier.name'
    },
    { 
      url: truck2, 
      label: t('pricing.tiers.ftl.name'), 
      status: t('pricing.tiers.ftl.name'),
      serviceKey: 'pricing.tiers.ftl.name'
    },
    { 
      url: truck3, 
      label: t('pricing.tiers.ptl.name'), 
      status: t('pricing.tiers.ptl.name'),
      serviceKey: 'pricing.tiers.ptl.name'
    },
  ]

  // إذا كانت اللغة عربية، نعكس ترتيب الصور لتبدأ من اليمين بشكل منطقي
  const displayImages = isRtl ? [...truckImagesLocalized].reverse() : truckImagesLocalized;
  
  // تحديد اتجاه الحركة
  const animateX = isRtl ? ["0%", "50%"] : ["0%", "-50%"];

  const handleClick = (serviceKey) => {
    navigate('/quote', {
      state: {
        serviceType: serviceKey
      }
    })
  }

  return (
    <section className="bg-white dark:bg-[#0b0f1a] py-20 overflow-hidden border-y border-gray-50 dark:border-[#1f2937]">
      
      {/* عنوان القسم */}
      <div className="mx-auto max-w-7xl px-4 mb-12">
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <h3 className="text-xs font-black tracking-[0.5em] text-[#00a1e9] uppercase mb-2">
              {t('carousel.badge')}
            </h3>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
              {t('carousel.title')}
            </h2>
          </div>
          <p className="text-gray-500 dark:text-[#94a3b8] font-medium max-w-xs text-sm">
            {t('carousel.description')}
          </p>
        </div>
      </div>

      {/* شريط الصور المتحرك */}
      <div className="flex w-max" dir="ltr">
        <motion.div 
          className="flex gap-8 px-4"
          animate={{ x: animateX }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >

          {[...displayImages, ...displayImages].map((item, index) => {
            const isActive = activeTouchIndex === index;

            return (
              <div 
                key={index}
                onClick={() => handleClick(item.serviceKey)}
                onTouchStart={() => setActiveTouchIndex(index)}
                onMouseEnter={() => setActiveTouchIndex(index)}
                onMouseLeave={() => setActiveTouchIndex(null)}
                className={`group relative w-[300px] md:w-[550px] h-[350px] rounded-[3rem] overflow-hidden border-4 transition-all duration-700 shadow-2xl bg-gray-100 dark:bg-gray-800 cursor-pointer
                  ${isActive ? 'border-[#00a1e9]' : 'border-transparent'}`}
              >

                {/* الصورة */}
                <img 
                  src={item.url} 
                  alt={item.label} 
                  className={`w-full h-full object-cover transition-all duration-1000 ease-in-out 
                    ${isActive ? 'grayscale-0 opacity-100 scale-105' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105'}`}
                />
                
                {/* التظليل السفلي */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-500 
                  ${isActive ? 'opacity-80' : 'opacity-70 group-hover:opacity-80'}`} 
                />
                
                {/* نصوص الصورة */}
                <div className={`absolute bottom-10 z-20 ${isRtl ? 'right-10 text-right' : 'left-10 text-left'}`}>
                  <div className="text-[#38bdf8] font-black text-[10px] tracking-[0.4em] uppercase mb-1">
                    HOP Logistics 
                  </div>
                  <div className="text-white text-2xl font-black tracking-tight">
                    {item.label}
                  </div>
                </div>

                {/* شارة الحالة */}
                <div className={`absolute top-8 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 ${isRtl ? 'left-10' : 'right-10'}`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00a1e9] animate-pulse shadow-[0_0_8px_#00a1e9]" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    {item.status}
                  </span>
                </div>

                {/* طبقة تفاعلية إضافية */}
                <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-[#00a1e9]/5' : 'bg-transparent'}`} />

              </div>
            )
          })}

        </motion.div>
      </div>
    </section>
  )
}