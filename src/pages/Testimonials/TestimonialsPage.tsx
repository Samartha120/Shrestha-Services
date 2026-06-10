import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTestimonialStore } from "@/store/testimonialStore";
import Button from "@/components/common/Button";
import Card from "@/components/ui/Card";
import { Star, Quote, ArrowRight, MessageSquare } from "lucide-react";

export default function TestimonialsPage() {
  const { testimonials, fetchTestimonials, isLoading } = useTestimonialStore();
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={`${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "text-slate-300 dark:text-slate-600"
          }`}
        />
      ))}
    </div>
  );

  const calculateAverageRating = () => {
    if (testimonials.length === 0) return 0;
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
    return (sum / testimonials.length).toFixed(1);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-20" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Trusted by 350+ Clients
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            What Our Clients <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Are Saying</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-300">
            Real stories from real customers about their experience with Shrestha Services.
          </motion.p>
        </motion.div>
      </section>

      {/* Average Rating */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 sm:p-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
            <div className="text-6xl font-bold text-slate-900 dark:text-white mb-2">
              {calculateAverageRating()}
            </div>
            <div className="text-lg text-slate-600 dark:text-slate-400">
              Average rating based on {testimonials.length} reviews
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Featured Testimonial */}
      {testimonials.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 sm:p-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/50">
                <div className="flex gap-4 mb-6">
                  <Quote className="h-12 w-12 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                </div>

                <p className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-8 leading-relaxed">
                  "{testimonials[selectedTestimonial].review}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-6">
                  <div>
                    <div className="flex gap-2 mb-3">
                      {renderStars(testimonials[selectedTestimonial].rating)}
                    </div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {testimonials[selectedTestimonial].customerName}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTestimonial(idx)}
                        className={`h-3 rounded-full transition-all ${
                          idx === selectedTestimonial
                            ? "bg-blue-600 w-8"
                            : "bg-slate-300 dark:bg-slate-600 w-3 hover:bg-slate-400 dark:hover:bg-slate-500"
                        }`}
                        aria-label={`View testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </section>
      )}

      {/* Testimonials Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
            All Testimonials
          </motion.h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">
                No testimonials yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  custom={idx}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 h-full flex flex-col">
                    {/* Rating */}
                    <div className="mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Review Text */}
                    <p className="text-slate-700 dark:text-slate-300 mb-6 flex-1 leading-relaxed">
                      "{testimonial.review}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {getInitials(testimonial.customerName)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {testimonial.customerName}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="p-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 border-0 shadow-lg text-center">
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to join our happy clients?
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Start your next printing project with us and experience the Shrestha Services difference. Get a free quote today.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote">
                <Button
                  className="bg-white hover:bg-slate-100 text-blue-600 h-12 px-8 font-semibold"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-blue-700 h-12 px-8"
                  leftIcon={<MessageSquare size={18} />}
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </Card>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 sm:p-12">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  98%
                </div>
                <p className="text-slate-600 dark:text-slate-400">Client Satisfaction Rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  4.8★
                </div>
                <p className="text-slate-600 dark:text-slate-400">Average Rating</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  99%
                </div>
                <p className="text-slate-600 dark:text-slate-400">On-Time Delivery</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
