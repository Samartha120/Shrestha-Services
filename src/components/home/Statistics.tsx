import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/marketing/primitives";

/*
 * Capability band (replaces the old fabricated stat counters).
 * No invented numbers — qualitative proof drawn from what the shop actually does.
 */
const handles = [
  { k: "Large format", v: "Flex, banners & hoardings printed at scale." },
  { k: "Signage", v: "Acrylic, metal & LED boards, built and mounted." },
  { k: "Vehicle & vinyl", v: "Wraps, decals and frosted glass graphics." },
  { k: "Finishing", v: "Cutting, lamination, mounting and install." },
];

export default function Statistics() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // A soft light drifts up through the dark band as it scrolls past —
  // carries the eye between the light sections above and below.
  const lightY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-20 text-inverse lg:py-28"
    >
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[140%]"
          style={{
            y: lightY,
            background:
              "radial-gradient(60% 42% at 72% 30%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
          }}
        />
      )}
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-3 eyebrow text-faint">
              <span className="h-px w-6 bg-accent" aria-hidden />
              What leaves the shop
            </span>
            <h2 className="mt-5 max-w-md font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] text-inverse text-balance">
              One roof, from the artwork to the wall.
            </h2>
            <p className="mt-5 max-w-sm text-inverse/60 text-pretty">
              Design, print, finish and fit — handled in-house so nothing gets
              lost in a hand-off and the colour you approve is the colour that
              ships.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-10">
            {handles.map((h, i) => (
              <div
                key={h.k}
                className="border-t border-white/12 pt-5"
              >
                <dt className="flex items-baseline gap-3 font-display text-xl text-inverse">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {h.k}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-inverse/60 text-pretty">
                  {h.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
