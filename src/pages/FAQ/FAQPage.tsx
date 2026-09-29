import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { faqData } from "@/data/faq";
import {
  Container,
  Eyebrow,
  Reveal,
  PrimaryCTA,
  GhostCTA,
} from "@/components/marketing/primitives";

const categories = ["all", "General", "Services", "Shipping", "Design"];

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 pl-8 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filteredFaqs = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section className="border-b border-line py-20 lg:py-24">
        <Container>
          <Reveal>
            <Eyebrow>Questions & answers</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] text-balance">
              The things people ask us most.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  placeholder="Search questions…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            {/* Filters */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  Categories
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-3">
                  {categories.map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => setSelectedCategory(cat)}
                          className={`text-sm transition-colors ${
                            active
                              ? "font-medium text-accent"
                              : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* Accordion list */}
            <div>
              {filteredFaqs.length > 0 ? (
                <ul className="border-t border-line">
                  {filteredFaqs.map((item, i) => {
                    const isOpen = openId === item.id;
                    return (
                      <Reveal as="li" key={item.id} delay={(i % 4) * 0.05}>
                        <div className="border-b border-line">
                          <button
                            onClick={() =>
                              setOpenId(isOpen ? null : item.id)
                            }
                            className="group flex w-full items-start gap-6 py-6 text-left"
                            aria-expanded={isOpen}
                          >
                            <span className="mt-1 font-mono text-sm text-muted">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 font-display text-xl text-ink">
                              {item.question}
                            </span>
                            <Plus
                              className={`mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                                isOpen ? "rotate-45" : ""
                              }`}
                              strokeWidth={1.5}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={
                                  reduce ? false : { height: 0, opacity: 0 }
                                }
                                animate={{ height: "auto", opacity: 1 }}
                                exit={
                                  reduce
                                    ? undefined
                                    : { height: 0, opacity: 0 }
                                }
                                transition={{
                                  duration: 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <p className="max-w-2xl pb-6 pl-[3.25rem] text-ink-soft text-pretty">
                                  {item.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </Reveal>
                    );
                  })}
                </ul>
              ) : (
                <div className="border-t border-line py-16 text-center">
                  <p className="text-ink-soft text-pretty">
                    No questions match your search. Try different keywords.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-inverse lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-inverse text-balance">
                Still not sure? Just ask.
              </h2>
              <p className="mt-5 max-w-md text-inverse/70 text-pretty">
                If your question isn't here, send us the details and we'll answer
                it properly — no obligation.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-6">
              <PrimaryCTA
                to="/contact"
                className="bg-inverse text-ink hover:bg-accent hover:text-inverse"
              >
                Contact us
              </PrimaryCTA>
              <GhostCTA
                to="/quote"
                className="text-inverse/80 hover:text-inverse"
              >
                Get a quote
              </GhostCTA>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
