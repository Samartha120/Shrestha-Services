import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useGalleryStore } from "@/store/galleryStore";
import type { GalleryItem } from "@/types/gallery.types";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
  FetchError,
} from "@/components/marketing/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GalleryCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { galleryItems, isLoading, error, fetchItemsByCategory } =
    useGalleryStore();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const reduce = useReducedMotion();

  const decodedCategory = category ? decodeURIComponent(category) : "";

  useEffect(() => {
    if (decodedCategory) {
      fetchItemsByCategory(decodedCategory);
    }
  }, [decodedCategory, fetchItemsByCategory]);

  useEffect(() => {
    if (selectedImage) {
      const index = galleryItems.findIndex(
        (item) => item.id === selectedImage.id
      );
      setCurrentImageIndex(index >= 0 ? index : 0);
    }
  }, [selectedImage, galleryItems]);

  const handlePrevImage = () => {
    const newIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : galleryItems.length - 1;
    setSelectedImage(galleryItems[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex =
      currentImageIndex < galleryItems.length - 1 ? currentImageIndex + 1 : 0;
    setSelectedImage(galleryItems[newIndex]);
  };

  const tileClass = (i: number) => {
    const mod = i % 6;
    if (mod === 0) return "lg:col-span-2 aspect-[16/10]";
    if (mod === 3) return "aspect-[3/4]";
    return "aspect-[4/3]";
  };

  return (
    <div className="bg-paper text-ink">
      {/* Back */}
      <div className="sticky top-0 z-40 border-b border-line bg-paper/90 py-4 backdrop-blur-md">
        <Container>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to gallery
          </Link>
        </Container>
      </div>

      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Portfolio</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-ink text-balance">
              {decodedCategory}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              A closer look at our {decodedCategory.toLowerCase()} work —
              designed, produced and installed from our shop in Biratnagar.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Loading */}
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
              message="Could not load this category."
              onRetry={() =>
                decodedCategory && fetchItemsByCategory(decodedCategory)
              }
            />
          </Container>
        </section>
      )}

      {/* Grid */}
      {!isLoading && !error && (
        <section className="py-16 lg:py-24">
          <Container>
            {galleryItems.length > 0 ? (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {galleryItems.length}{" "}
                  {galleryItems.length === 1 ? "item" : "items"}
                </p>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {galleryItems.map((item, idx) => (
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
              </>
            ) : (
              <div className="border-t border-line py-20 text-center">
                <p className="font-display text-2xl text-ink">
                  Nothing here yet.
                </p>
                <p className="mx-auto mt-3 max-w-md text-ink-soft text-pretty">
                  We don't have work listed under "{decodedCategory}" at the
                  moment.
                </p>
              </div>
            )}
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
                {galleryItems.length > 1 && (
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
                      {currentImageIndex + 1} / {galleryItems.length}
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
            <div>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
                Interested in {decodedCategory.toLowerCase()}?
              </h2>
              <p className="mt-5 max-w-md text-inverse/70 text-pretty">
                Tell us the details and we'll put together a written quote.
              </p>
            </div>
            <PrimaryCTA
              to="/quote"
              className="shrink-0 bg-inverse text-ink hover:bg-accent hover:text-inverse"
            >
              Request a quote
            </PrimaryCTA>
          </div>
        </Container>
      </section>
    </div>
  );
}
