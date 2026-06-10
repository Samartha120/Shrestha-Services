import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Hop as Home, Search, Mail, ArrowRight, CircleAlert as AlertCircle } from "lucide-react";
import Button from "@/components/common/Button";

export default function NotFoundPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Animated 404 Number */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="inline-block"
            >
              <div className="text-9xl sm:text-[150px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-none">
                404
              </div>
            </motion.div>

            {/* Animated illustration */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <AlertCircle className="w-32 h-32 text-blue-200 dark:text-blue-900/30 opacity-50" />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Page Not Found
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto"
          >
            Oops! It seems like the page you're looking for doesn't exist. This might have been moved
            or deleted.
          </motion.p>

          {/* Search Suggestion */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-12 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-slate-900 dark:text-white">Need help?</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Try searching for what you need or explore our main sections:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                to="/services"
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium text-sm"
              >
                Services
              </Link>
              <Link
                to="/gallery"
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium text-sm"
              >
                Gallery
              </Link>
              <Link
                to="/blog"
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium text-sm"
              >
                Blog
              </Link>
              <Link
                to="/faq"
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors font-medium text-sm"
              >
                FAQ
              </Link>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/">
              <Button variant="primary" size="lg">
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                <Mail className="w-5 h-5" />
                Contact Support
              </Button>
            </Link>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-slate-200 dark:border-slate-700"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Still can't find what you're looking for?
            </p>
            <a
              href="mailto:support@shresthaservices.com"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold group"
            >
              Email our support team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-8 h-8 bg-blue-400 rounded-full opacity-20"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-12 h-12 bg-indigo-400 rounded-lg opacity-20"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </div>
  );
}
