import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CircleCheck as CheckCircle, ArrowRight, Hop as Home, FileText, Mail } from "lucide-react";
import Button from "@/components/common/Button";

export default function QuoteSuccessPage() {
  const navigate = useNavigate();

  // Confetti-like animation
  const confettiPieces = Array.from({ length: 30 });

  useEffect(() => {
    // Auto-redirect after 8 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard/quotes");
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Confetti Animation */}
      {confettiPieces.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500 rounded-full"
          initial={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            opacity: 1,
          }}
          animate={{
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 600,
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 2 + Math.random() * 1,
            delay: Math.random() * 0.3,
            ease: "easeOut",
          }}
          style={{
            left: 0,
            top: 0,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2,
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full blur-xl opacity-50"
            />
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-full p-6 shadow-2xl shadow-blue-600/30">
              <CheckCircle size={80} className="text-white" />
            </div>
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 space-y-4"
        >
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 bg-clip-text text-transparent">
            Quote Submitted!
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Thank you for your quote request. We've received your details and will review them shortly.
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {/* Confirmation Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <Mail size={32} className="text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
              Confirmation Sent
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Check your email for details
            </p>
          </motion.div>

          {/* Track Progress Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <FileText size={32} className="text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
              Track Progress
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              View in your dashboard
            </p>
          </motion.div>

          {/* Expert Review Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <div className="text-3xl mb-3 flex justify-center">🔍</div>
            <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">
              Expert Review
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Within 24-48 hours
            </p>
          </motion.div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
            What Happens Next?
          </h2>
          <ol className="space-y-3 text-left text-slate-700 dark:text-slate-300">
            {[
              "Our design team reviews your project requirements",
              "We prepare a detailed quote with exact pricing",
              "You'll receive the quote via email and in your dashboard",
              "Accept the quote to proceed with your order",
            ].map((step, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex gap-3 items-start"
              >
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white font-semibold text-sm">
                  {idx + 1}
                </span>
                <span className="text-sm">{step}</span>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
        >
          <Link to="/dashboard/quotes" className="flex-1">
            <Button
              size="lg"
              className="w-full"
              rightIcon={<ArrowRight size={18} />}
            >
              View My Quotes
            </Button>
          </Link>

          <Link to="/" className="flex-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              leftIcon={<Home size={18} />}
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Auto-redirect Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-sm text-slate-500 dark:text-slate-500"
        >
          <motion.span
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Redirecting to your quotes dashboard in a few seconds...
          </motion.span>
        </motion.p>
      </motion.div>
    </div>
  );
}
