import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { statistics } from "@/data/statistics";
import { CheckCircle, Users, TrendingUp, Award } from "lucide-react";

const iconMap: Record<string, any> = {
  "Projects Completed": CheckCircle,
  "Happy Clients": Users,
  "Years Experience": TrendingUp,
  "Awards": Award,
};

function AnimatedCounter({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let currentCount = 0;
      const step = end / 50;
      const timer = setInterval(() => {
        currentCount += step;
        if (currentCount >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold">
      {count}+
    </span>
  );
}

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statistics.map((stat, idx) => {
            const Icon = iconMap[stat.label];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white mb-2">
                  <AnimatedCounter end={stat.value} />
                </h3>
                <p className="text-blue-100 font-medium text-lg">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
