import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { useTestimonialStore } from "@/store/testimonialStore";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
  GhostCTA,
} from "@/components/marketing/primitives";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-4 w-4 fill-accent text-accent"
              : "h-4 w-4 text-line-strong"
          }
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsPage() {
  const { testimonials, fetchTestimonials, isLoading } = useTestimonialStore();
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const featured = testimonials[selected];

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-28">
        <Container>
          <Reveal>
            <Eyebrow>In their words</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-balance">
              What people say about the work.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              A sign or a print job lasts a long time — so the best measure of
              our work is what people tell us once it's up. Here's what a few of
              them had to say.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Featured */}
      {featured && (
        <section className="border-b border-line py-20 lg:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  Featured
                </p>
                <div className="mt-6 flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelected(idx)}
                      className={`h-1 rounded-full transition-all ${
                        idx === selected
                          ? "w-8 bg-accent"
                          : "w-3 bg-line-strong hover:bg-muted"
                      }`}
                      aria-label={`View testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </Reveal>

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={selected}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.15] text-balance">
                    “{featured.review}”
                  </p>
                  <footer className="mt-8 flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-ink-soft">
                      {initials(featured.customerName)}
                    </span>
                    <span>
                      <span className="block font-medium text-ink">
                        {featured.customerName}
                      </span>
                      <span className="mt-1 block">
                        <Stars rating={featured.rating} />
                      </span>
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </Container>
        </section>
      )}

      {/* List */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
              <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl text-balance">
                More from clients.
              </h2>
              {testimonials.length > 0 && (
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  {String(testimonials.length).padStart(2, "0")} in all
                </span>
              )}
            </div>
          </Reveal>

          {isLoading ? (
            <div className="py-16 text-center">
              <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-line-strong border-t-accent" />
            </div>
          ) : testimonials.length === 0 ? (
            <Reveal>
              <div className="border-t border-line py-16 text-center">
                <p className="mx-auto max-w-md text-lg text-ink-soft text-pretty">
                  We're gathering notes from recent jobs. In the meantime, we'd
                  rather show you the work in person — come by the shop or send
                  us the details of your project.
                </p>
                <div className="mt-8 flex items-center justify-center gap-6">
                  <PrimaryCTA to="/quote">Get a quote</PrimaryCTA>
                  <GhostCTA to="/contact">Contact us</GhostCTA>
                </div>
              </div>
            </Reveal>
          ) : (
            <ul>
              {testimonials.map((t, i) => (
                <Reveal as="li" key={t.id} delay={(i % 3) * 0.06}>
                  <div className="grid gap-4 border-t border-line py-8 sm:grid-cols-[auto_1fr] sm:gap-8">
                    <span className="font-mono text-sm text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <Stars rating={t.rating} />
                      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
                        “{t.review}”
                      </p>
                      <p className="mt-4 font-medium text-ink">
                        {t.customerName}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
                Start your next project with us.
              </h2>
              <p className="mt-5 max-w-md text-inverse/70 text-pretty">
                Tell us what you need printed or made, and we'll come back with a
                written quote — usually the same day.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <PrimaryCTA
                to="/quote"
                className="bg-inverse text-ink hover:bg-accent hover:text-inverse"
              >
                Get a quote
              </PrimaryCTA>
              <GhostCTA
                to="/contact"
                className="text-inverse/80 hover:text-inverse"
              >
                Contact us
              </GhostCTA>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
