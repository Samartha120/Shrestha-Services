import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { useGalleryStore } from "@/store/galleryStore";
import { useTestimonialStore } from "@/store/testimonialStore";
import type { GalleryItem } from "@/types/gallery.types";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
  FetchError,
} from "@/components/marketing/primitives";

const CATEGORIES = [
  "All",
  "Signage & Boards",
  "Flex & Banner Printing",
  "Digital & Custom Decals",
  "Branding & Advertising Solutions",
];

const capabilities = [
  {
    title: "Materials that last",
    body: "We work in vinyl, acrylic, metal and large-format media chosen to hold up outdoors and in.",
  },
  {
    title: "Finished and installed",
    body: "Cutting, lamination, mounting and on-site fitting are handled in-house, start to finish.",
  },
  {
    title: "Careful, checked work",
    body: "Every job is proofed and colour-matched before it leaves the shop on Main Road, Biratnagar.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GalleryPage() {
  const { galleryItems, isLoading, error, fetchGalleryItems } =
    useGalleryStore();
  const { testimonials, fetchTestimonials } = useTestimonialStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    fetchGalleryItems();
    fetchTestimonials();
    localStorage.removeItem("ss_gallery");
  }, [fetchGalleryItems, fetchTestimonials]);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
        );

  const featuredItems = filteredItems.slice(0, 3);

  useEffect(() => {
    if (selectedImage) {
      const index = filteredItems.findIndex(
        (item) => item.id === selectedImage.id
      );
      setCurrentImageIndex(index >= 0 ? index : 0);
    }
  }, [selectedImage, filteredItems]);

  const handlePrevImage = () => {
    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1;
    setSelectedImage(filteredItems[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex =
      currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
    setSelectedImage(filteredItems[newIndex]);
  };

  // Editorial rhythm: vary span + aspect so the grid never reads as an even 3-col grid.
  const tileClass = (i: number) => {
    const mod = i % 6;
    if (mod === 0) return "lg:col-span-2 aspect-[16/10]";
    if (mod === 3) return "aspect-[3/4]";
    return "aspect-[4/3]";
  };

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-ink text-balance">
              Work that has gone up around Biratnagar.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Boards, banners, decals and branding — a selection of the signage
              and print we have designed, produced and installed.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Category filter */}
      <section className="sticky top-0 z-40 border-b border-line bg-paper/90 py-4 backdrop-blur-md">
        <Container>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "border-ink bg-ink text-inverse"
                    : "border-line text-ink-soft hover:border-line-strong hover:text-ink"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>
      {/* Featured — asymmetric feature + two stacked */}
      {!isLoading && !error && featuredItems.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <Reveal>
              <Eyebrow>Selected</Eyebrow>
            </Reveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <button
                  type="button"
                  onClick={() => setSelectedImage(featuredItems[0])}
                  className="group block w-full overflow-hidden rounded-sm border border-line bg-surface-2 text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden lg:aspect-[16/11]">
                    <img
                      src={featuredItems[0].image}
                      alt={featuredItems[0].title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 p-6">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                        {featuredItems[0].category}
                      </p>
                      <h3 className="mt-2 font-display text-2xl text-ink transition-colors group-hover:text-accent">
                        {featuredItems[0].title}
                      </h3>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </button>
              </Reveal>
              <div className="grid gap-6">
                {featuredItems.slice(1, 3).map((item, i) => (
                  <Reveal key={item.id} delay={(i + 1) * 0.08}>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(item)}
                      className="group flex w-full gap-5 overflow-hidden rounded-sm border border-line bg-surface-2 p-4 text-left"
                    >
                      <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-sm sm:w-36">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="flex min-w-0 flex-col justify-center">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                          {item.category}
                        </p>
                        <h3 className="mt-2 font-display text-xl text-ink transition-colors group-hover:text-accent">
                          {item.title}
                        </h3>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <section className="py-16 lg:py-24">
          <Container>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-sm border border-line bg-surface-2 ${tileClass(
                    i
                  )}`}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
      {/* Fetch error */}
      {!isLoading && error && (
        <section className="py-16 lg:py-24">
          <Container>
            <FetchError
              message="Could not load the gallery."
              onRetry={fetchGalleryItems}
            />
          </Container>
        </section>
      )}
      {/* Full gallery grid */}
      {!isLoading && !error && (
        <section className="border-t border-line bg-surface-2 py-16 lg:py-24">
          <Container>
            <Reveal>
              <h2 className="max-w-2xl font-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
                The full gallery.
              </h2>
            </Reveal>

            {filteredItems.length > 0 ? (
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item, idx) => (
                  <Reveal
                    key={item.id}
                    delay={(idx % 3) * 0.06}
                    className={tileClass(idx)}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedImage(item)}
                      className="group relative block h-full w-full overflow-hidden rounded-sm border border-line bg-paper-dim text-left"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-inverse/80">
                          {item.category}
                        </p>
                        <h3 className="mt-1.5 font-display text-xl text-inverse">
                          {item.title}
                        </h3>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-12 border-t border-line py-20 text-center">
                <p className="font-display text-2xl text-ink">
                  Nothing here yet.
                </p>
                <p className="mx-auto mt-3 max-w-md text-ink-soft text-pretty">
                  We don't have work listed under "{activeCategory}" at the
                  moment.
                </p>
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-accent"
                  >
                    View all work
                  </button>
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Capabilities — qualitative, no invented facts */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
                How the work gets made.
              </h2>
            </Reveal>
            <div>
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="border-t border-line py-7">
                    <h3 className="font-display text-xl text-ink">{c.title}</h3>
                    <p className="mt-2 max-w-lg text-ink-soft text-pretty">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
      {/* Testimonials — from the store */}
      {!isLoading && testimonials.length > 0 && (
        <section className="border-t border-line bg-surface-2 py-20 lg:py-28">
          <Container>
            <Reveal>
              <Eyebrow>In their words</Eyebrow>
            </Reveal>
            <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <Reveal key={testimonial.id} delay={(i % 3) * 0.08}>
                  <figure className="border-t border-line pt-6">
                    <blockquote className="font-display text-lg leading-relaxed text-ink text-pretty">
                      &ldquo;{testimonial.review}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong font-mono text-sm text-ink-soft">
                        {testimonial.customerName.charAt(0)}
                      </span>
                      <span className="font-medium text-ink">
                        {testimonial.customerName}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex w-full max-w-4xl flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
                className="absolute -top-12 right-0 z-10 rounded-full p-2 text-inverse transition-colors hover:text-accent"
              >
                <X className="h-7 w-7" />
              </button>
              <div className="relative mb-6 w-full overflow-hidden rounded-sm bg-black">
                <div className="flex aspect-video items-center justify-center">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      aria-label="Previous"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-inverse backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      aria-label="Next"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-inverse backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 font-mono text-sm text-inverse backdrop-blur-sm">
                      {currentImageIndex + 1} / {filteredItems.length}
                    </div>
                  </>
                )}
              </div>
              <div className="text-inverse">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {selectedImage.category}
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                  {selectedImage.title}
                </h2>
                {selectedImage.description && (
                  <p className="mt-3 leading-relaxed text-inverse/70 text-pretty">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA band */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
              Have a project like these in mind?
            </h2>
            <PrimaryCTA
              to="/quote"
              className="shrink-0 bg-inverse text-ink hover:bg-accent hover:text-inverse"
            >
              Start a quote
            </PrimaryCTA>
          </div>
        </Container>
      </section>
    </div>
  );
}
