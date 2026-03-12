import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'
import { Users, CheckCircle, Truck, Clock } from 'lucide-react'

// --- مكون العداد الرقمي ---
function AnimatedNumber({ value, suffix = "", isPercent = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 40,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {

      let interval;

      const startCounting = () => {
        motionValue.set(0);

        setTimeout(() => {
          motionValue.set(value);
        }, 500);
      };

      startCounting();

      // إعادة العد كل 30 ثانية
      interval = setInterval(() => {
        startCounting();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isInView, value, motionValue]);

  const displayValue = useTransform(springValue, (latest) => {
    if (isPercent) {
      return (latest * 100).toFixed(1) + "%";
    }
    return Math.floor(latest).toLocaleString() + suffix;
  });

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    { k: t('stats.clients'), v: 1500, suffix: "+", icon: Users },
    { k: t('stats.success_rate'), v: 0.998, isPercent: true, icon: CheckCircle },
    { k: t('stats.daily_shipments'), v: 450, suffix: "+", icon: Truck },
    { k: t('stats.distance'), v: 0.99, isPercent: true, icon: Clock },
  ];

  return (
    <section className="bg-white dark:bg-[#0b0f1a] py-24 overflow-hidden perspective-[1500px]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ 
                y: -15, 
                rotateX: 5,
                rotateY: 10,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative group p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm hover:shadow-2xl hover:shadow-[#00a1e9]/20 transition-all duration-500 text-center overflow-hidden cursor-pointer"
            >

              <div className="absolute -inset-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-blue-400/5 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out pointer-events-none z-20" />

              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ translateZ: "20px" }}
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <s.icon 
                  size={140} 
                  strokeWidth={0.3} 
                  className="text-blue-500/[0.03] dark:text-blue-400/[0.04] group-hover:text-blue-500/[0.08] group-hover:scale-110 transition-all duration-700 ease-out" 
                />
              </motion.div>

              <div className="absolute inset-0 rounded-[3rem] border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                <div className="text-4xl md:text-5xl font-black text-[#00a1e9] mb-4 tracking-tighter drop-shadow-sm">
                  <AnimatedNumber 
                    value={s.v} 
                    suffix={s.suffix} 
                    isPercent={s.isPercent} 
                  />
                </div>

                <div className="text-[10px] md:text-xs font-black text-gray-400 dark:text-[#94a3b8] uppercase tracking-[0.3em]">
                  {s.k}
                </div>
              </div>

              <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-500/40 shadow-[0_0_8px_#00a1e9] transition-all duration-500" />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/20 dark:to-blue-900/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}