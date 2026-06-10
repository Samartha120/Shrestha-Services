import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Award, Users, Zap, ArrowRight } from "lucide-react";
import { useGalleryStore } from "@/store/galleryStore";
import { useTestimonialStore } from "@/store/testimonialStore";
import type { GalleryItem } from "@/types/gallery.types";
import Card from "@/components/ui/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/ui/Badge";

const CATEGORIES = [
  "All",
  "Signage & Boards",
  "Flex & Banner Printing",
  "Digital & Custom Decals",
  "Branding & Advertising Solutions",
];

const stats = [
  { value: "500+", label: "Projects Completed", icon: Award },
  { value: "350+", label: "Happy Clients", icon: Users },
  { value: "15+", label: "Years of Experience", icon: Zap },
];

export default function GalleryPage() {
  const { galleryItems, isLoading, fetchGalleryItems } = useGalleryStore();
  const { testimonials, fetchTestimonials } = useTestimonialStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const featuredRef = useRef(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: "-100px" });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });
  const projectRef = useRef(null);
  const projectInView = useInView(projectRef, { once: true, margin: "-100px" });
  const testimonialRef = useRef(null);
  const testimonialInView = useInView(testimonialRef, { once: true, margin: "-100px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    fetchGalleryItems();
    fetchTestimonials();
    // Clear localStorage to get fresh data
    localStorage.removeItem("ss_gallery");
  }, [fetchGalleryItems, fetchTestimonials]);

  // Filter items based on selected category
  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) =>
            item.category.toLowerCase() === activeCategory.toLowerCase()
        );

  // Featured items (first 3)
  const featuredItems = filteredItems.slice(0, 3);

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

  // Skeleton card
  const SkeletonCard = ({ index }: { index: number }) => (
    <div className={`rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse ${getAspectRatioClass(index)}`} />
  );

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Portfolio</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Our Print Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-2"
          >
            Showcasing our finest printing solutions and premium branding work
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={heroInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block h-1 bg-gradient-to-r from-blue-600 to-cyan-500 w-20 origin-left"
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

      {/* Featured Gallery Showcase */}
      {!isLoading && filteredItems.length > 0 && featuredItems.length > 0 && (
        <motion.section
          ref={featuredRef}
          initial={{ opacity: 0, y: 40 }}
          animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Our most popular and impressive print work
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                >
                  <Card className="h-full overflow-hidden group cursor-pointer" onClick={() => setSelectedImage(item)}>
                    <div className="aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3">{item.category}</Badge>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <SkeletonCard key={i} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      {!isLoading && (
        <motion.section
          ref={gridRef}
          initial={{ opacity: 0, y: 40 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900/50"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Full Gallery
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Browse all our print and branding work
              </p>
            </motion.div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + Math.min(idx * 0.08, 0.4),
                    }}
                    className={`group cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-shadow ${getAspectRatioClass(
                      idx
                    )}`}
                    onClick={() => setSelectedImage(item)}
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-900">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6"
                      >
                        <Badge className="mb-3">{item.category}</Badge>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
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
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full mb-6">
                  <Zap className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  No items found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 max-w-md mx-auto">
                  We don&apos;t have any gallery items in the &quot;{activeCategory}&quot; category yet.
                </p>
                <Button onClick={() => setActiveCategory("All")}>
                  View All Projects
                </Button>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Project Preview Section */}
      <motion.section
        ref={projectRef}
        initial={{ opacity: 0, y: 40 }}
        animate={projectInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-950"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Our Work?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              We bring premium quality, attention to detail, and innovative solutions to every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={projectInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-600 aspect-video flex items-center justify-center"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="Our Process"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={projectInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-6">
                {[
                  {
                    title: "Premium Quality Materials",
                    desc: "We use only the highest-grade vinyl, acrylic, and printing media for long-lasting results.",
                  },
                  {
                    title: "Professional Installation",
                    desc: "Our expert team ensures perfect setup and finishing for every project, big or small.",
                  },
                  {
                    title: "Fast Turnaround",
                    desc: "Quick production times without compromising quality, with rush options available.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Customer Success Showcase (Testimonials) */}
      {!isLoading && testimonials.length > 0 && (
        <motion.section
          ref={testimonialRef}
          initial={{ opacity: 0, y: 40 }}
          animate={testimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={testimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Customer Success Stories
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                What our clients have to say about our work
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={testimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                >
                  <Card className="h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < testimonial.rating ? "text-yellow-400" : "text-slate-300 dark:text-slate-600"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">
                      &quot;{testimonial.review}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {testimonial.customerName}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Statistics Section */}
      <motion.section
        ref={statsRef}
        initial={{ opacity: 0, y: 40 }}
        animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-600"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-5xl sm:text-6xl font-bold text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xl text-blue-50">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

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
                <Badge className="mb-3">{selectedImage.category}</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  {selectedImage.title}
                </h2>
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
        className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-100 dark:from-slate-900 to-white dark:to-slate-950 border-t border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Ready to Elevate Your Brand?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
          >
            Get a custom quote for your printing and branding needs. Our team is ready to bring your vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="gap-2">
              Get Your Quote Today <ArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
