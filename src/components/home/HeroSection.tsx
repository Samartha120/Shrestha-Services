import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/marketing/primitives";

const headline: { text: string; accent?: string }[] = [
  { text: "Ink, acrylic" },
  { text: "and vinyl —", accent: "made" },
  { text: "to be seen." },
];

const proofRows = [
  { label: "Large-format flex", note: "wide format" },
  { label: "LED acrylic sign boards", note: "back-lit" },
  { label: "Vehicle wraps", note: "cast vinyl" },
  { label: "Digital & offset print", note: "in-house" },
];

export default function HeroSection() {
  const reduce = useReducedMotion();

  const lineVariants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: { duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* faint baseline grid, not a glowing blob */}
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

          {/* Right — a proof sheet, not a fake stat card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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

              <p className="eyebrow">Proof sheet — no. 0417</p>
              <p className="mt-2 font-display text-xl text-ink">
                Shrestha Services / production menu
              </p>

              <ul className="mt-6 divide-y divide-line">
                {proofRows.map((row, i) => (
                  <li
                    key={row.label}
                    className="flex items-baseline justify-between py-3"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium text-ink">{row.label}</span>
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {row.note}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CMYK press bar */}
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
