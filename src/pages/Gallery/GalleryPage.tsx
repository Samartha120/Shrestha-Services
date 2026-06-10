import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGalleryStore } from "@/store/galleryStore";
import type { GalleryItem } from "@/types/gallery.types";

const CATEGORIES = [
  "All",
  "Signage & Boards",
  "Flex & Banner Printing",
  "Digital & Custom Decals",
  "Branding & Advertising Solutions",
];

export default function GalleryPage() {
  const { galleryItems, isLoading, fetchGalleryItems } = useGalleryStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  // Filter items based on selected category
  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category.toLowerCase() === activeCategory.toLowerCase()
        );

  // Set current image index when selected image changes
  useEffect(() => {
    if (selectedImage) {
      const index = filteredItems.findIndex((item) => item.id === selectedImage.id);
      setCurrentImageIndex(index >= 0 ? index : 0);
    }
  }, [selectedImage, filteredItems]);

  const handlePrevImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1;
    setSelectedImage(filteredItems[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
    setSelectedImage(filteredItems[newIndex]);
  };

  // Masonry grid layout with different aspect ratios
  const getAspectRatioClass = (index: number) => {
    const patterns = ["aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[16/9]"];
    return patterns[index % patterns.length];
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Our Print Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-2"
          >
            Showcasing our finest printing solutions and premium branding work
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={heroInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-block h-1 bg-gradient-to-r from-blue-500 to-cyan-400 w-20 origin-left"
          />
        </div>
      </motion.section>

      {/* Category Filter */}
      <section className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all text-sm sm:text-base ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {!isLoading && (
        <motion.section
          ref={gridRef}
          className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{
                      duration: 0.6,
                      delay: Math.min(idx * 0.08, 0.4),
                    }}
                    className={`group cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${getAspectRatioClass(
                      idx
                    )}`}
                    onClick={() => setSelectedImage(item)}
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-900">
                      {/* Placeholder gradient - replace with actual image when available */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6"
                      >
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-blue-300 font-semibold text-sm mb-3">
                          {item.category}
                        </p>
                        {item.description && (
                          <p className="text-slate-200 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </motion.div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white to-transparent" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg">
                  No items found in this category
                </p>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 z-10 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <div className="relative w-full bg-black rounded-xl overflow-hidden mb-6">
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 to-black">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Navigation Buttons */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {filteredItems.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/60 px-4 py-2 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
                    {currentImageIndex + 1} / {filteredItems.length}
                  </div>
                )}
              </div>

              {/* Image Details */}
              <div className="text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  {selectedImage.title}
                </h2>
                <p className="text-blue-400 font-semibold mb-3">
                  {selectedImage.category}
                </p>
                {selectedImage.description && (
                  <p className="text-slate-300 leading-relaxed">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-slate-900 border-t border-slate-700"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Get a custom quote for your printing and branding needs. Our team is ready to bring your vision to life.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            Get Your Quote Today
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
