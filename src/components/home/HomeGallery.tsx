import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { galleryImages } from "@/data/gallery";
import { ArrowRight } from "lucide-react";

export default function HomeGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const visibleImages = galleryImages.slice(0, 6);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full mb-4">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Featured Gallery
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              A glimpse of our recent projects and the quality we deliver
            </p>
          </div>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleImages.map((image, idx) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-700"
            >
              {/* Placeholder image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                <div className="text-center text-white/90">
                  <p className="font-semibold text-lg">{image.title}</p>
                  <p className="text-sm opacity-80">{image.category}</p>
                </div>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                <p className="text-blue-300 font-medium">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
