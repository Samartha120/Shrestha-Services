import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/marketing/primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const headline: { text: string; accent?: string }[] = [
  { text: "Ink, acrylic" },
  { text: "and vinyl —", accent: "made" },
  { text: "to be seen." },
];

type ProofService = {
  id: string;
  label: string;
  note: string;
  format: string;
  material: string;
  pattern: string;
  patternSize?: string;
};

const services: ProofService[] = [
  {
    id: "flex",
    label: "Large-format flex",
    note: "wide format",
    format: "up to 10 ft wide",
    material: "frontlit / backlit flex",
    pattern:
      "repeating-linear-gradient(180deg, var(--accent-soft) 0 14px, transparent 14px 34px)",
  },
  {
    id: "acrylic",
    label: "LED acrylic sign boards",
    note: "back-lit",
    format: "built to size",
    material: "cast acrylic + LED",
    pattern:
      "radial-gradient(120% 90% at 30% 20%, var(--accent-soft) 0, transparent 60%)",
  },
  {
    id: "vinyl",
    label: "Vehicle wraps",
    note: "cast vinyl",
    format: "full / partial",
    material: "cast laminated vinyl",
    pattern:
      "repeating-linear-gradient(45deg, var(--accent-soft) 0 10px, transparent 10px 26px)",
  },
  {
    id: "print",
    label: "Digital & offset print",
    note: "in-house",
    format: "A6 → B0+",
    material: "paper / board stock",
    pattern: "radial-gradient(var(--accent-soft) 1.4px, transparent 1.6px)",
    patternSize: "12px 12px",
  },
];
export default function HeroSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = services[active];

  const lineVariants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: { duration: 0.7, delay: 0.05 * i, ease: EASE },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* ambient print environment — vertical feed grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px)",
          backgroundSize: "min(20vw, 200px) 100%",
          maskImage: "linear-gradient(to bottom, black, transparent 82%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 82%)",
        }}
      />
      {/* slow material-feed line travelling down the sheet */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 h-px w-full bg-accent/20"
          initial={{ top: "12%" }}
          animate={{ top: ["12%", "86%"] }}
          transition={{
            duration: 9,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      )}

      <Container className="relative">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
          {/* Left — editorial column */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow>Printing &amp; signage · Biratnagar</Eyebrow>
            </motion.div>

            <h1 className="display-xl mt-6 text-[clamp(2.6rem,7vw,4.6rem)] text-ink">
              {headline.map((line, i) => (
                <span key={line.text} className="block overflow-hidden">
                  <motion.span
                    custom={i}
                    variants={reduce ? undefined : lineVariants}
                    initial={reduce ? false : "hidden"}
                    animate="visible"
                    className="block"
                  >
                    {line.text}
                    {line.accent && (
                      <>
                        {" "}
                        <span className="italic text-accent">{line.accent}</span>
                      </>
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft text-pretty"
            >
              A working print shop on Main Road. We proof, produce and install
              everything in-house — from a single roll-up stand to a full
              storefront in acrylic and steel.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Link
                to="/quote"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-inverse transition-colors hover:bg-accent"
              >
                Start a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
              >
                <span className="border-b border-line-strong pb-0.5 transition-colors group-hover:border-accent">
                  See what we make
                </span>
              </Link>
            </motion.div>

            <motion.dl
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex gap-10 border-t border-line pt-6"
            >
              <div>
                <dt className="eyebrow">Turnaround</dt>
                <dd className="font-display text-2xl text-ink">24–48 hrs</dd>
              </div>
              <div>
                <dt className="eyebrow">Formats</dt>
                <dd className="font-display text-2xl text-ink">Any scale</dd>
              </div>
              <div>
                <dt className="eyebrow">Work</dt>
                <dd className="font-display text-2xl text-ink">In-house</dd>
              </div>
            </motion.dl>
          </div>

          {/* Right — interactive proof sheet */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="relative"
          >
            <div className="relative rounded-sm border border-line-strong bg-surface p-6 shadow-[var(--shadow-lg)] sm:p-8">
              {/* registration corner marks */}
              {[
                "left-3 top-3",
                "right-3 top-3",
                "left-3 bottom-3",
                "right-3 bottom-3",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`absolute ${pos} h-4 w-4 opacity-40`}
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--muted),var(--muted)),linear-gradient(var(--muted),var(--muted))",
                    backgroundSize: "1px 100%, 100% 1px",
                    backgroundPosition: "center, center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}

              <div className="flex items-center justify-between">
                <p className="eyebrow">Proof sheet — no. 0417</p>
                <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  live preview
                </span>
              </div>

              {/* preview stage — ink pass reveals the hovered service */}
              <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-sm border border-line bg-paper-dim">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: current.pattern,
                      backgroundSize: current.patternSize,
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {current.material}
                      </span>
                      <span className="font-display text-2xl leading-tight text-ink">
                        {current.label}
                      </span>
                      <span className="mt-1 font-mono text-xs text-accent-ink">
                        {current.format}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
                {!reduce && (
                  <motion.span
                    key={`sweep-${current.id}`}
                    aria-hidden
                    className="absolute inset-y-0 w-1/3 bg-accent"
                    style={{ mixBlendMode: "multiply" }}
                    initial={{ x: "-120%" }}
                    animate={{ x: "320%" }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                )}
              </div>

              {/* selectable production menu — hover or focus to proof */}
              <ul className="mt-5 divide-y divide-line">
                {services.map((row, i) => {
                  const activeRow = i === active;
                  return (
                    <li key={row.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        aria-pressed={activeRow}
                        className="flex w-full items-baseline justify-between py-3 text-left"
                      >
                        <span className="flex items-baseline gap-3">
                          <span
                            className={`font-mono text-xs transition-colors ${
                              activeRow ? "text-accent" : "text-faint"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-medium transition-colors ${
                              activeRow ? "text-accent" : "text-ink"
                            }`}
                          >
                            {row.label}
                          </span>
                        </span>
                        <span className="font-mono text-xs text-muted">
                          {row.note}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* CMYK press bar — print storytelling, not brand colour */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-3 flex-1 overflow-hidden rounded-full">
                  {["#22b8cf", "#e64980", "#f4d03f", "#1a1714"].map((c) => (
                    <span
                      key={c}
                      className="flex-1"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  CMYK
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
