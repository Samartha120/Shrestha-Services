import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  "Tech Solutions Nepal",
  "Creative Agency",
  "Retail Chain",
  "Event Management",
  "Hotel Group",
  "Corporate Brand",
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full mb-4">
            Our Partners
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Trusted by Leading Companies
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700"
            >
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-center">
                {partner}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
