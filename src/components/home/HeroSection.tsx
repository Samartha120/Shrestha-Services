import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Printer, ArrowRight, CheckCircle } from "lucide-react";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    "Premium Quality Printing",
    "Fast Turnaround Time",
    "Competitive Pricing",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Now Accepting Orders!
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
              Transform Your Vision into{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Stunning Reality
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Kathmandu's leading printing & signage expert. From business cards to billboards,
              we bring your ideas to life with premium quality and unmatched service.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/quote"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 active:scale-95"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 active:scale-95"
              >
                View Services
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Hero graphic */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-30"
              />
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-1 rounded-3xl shadow-2xl">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center">
                      <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Printer className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">10+</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Years of Experience</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">500+</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">Projects Done</p>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">350+</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">Happy Clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
