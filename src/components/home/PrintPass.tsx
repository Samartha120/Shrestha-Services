import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Container, Eyebrow } from "@/components/marketing/primitives";

type Step = { no: string; tag: string; title: string; body: string };

const steps: Step[] = [
  {
    no: "01",
    tag: "Brief",
    title: "You tell us the job",
    body: "Sizes, surface, where it's going and when you need it. We quote in writing — no guesswork.",
  },
  {
    no: "02",
    tag: "Artwork",
    title: "We set the artwork",
    body: "Your files are prepped to size with bleed, crop marks and registration — ready for press.",
  },
  {
    no: "03",
    tag: "Proof",
    title: "You sign the proof",
    body: "A colour-accurate proof goes back to you. Nothing prints until you approve it.",
  },
  {
    no: "04",
    tag: "Print",
    title: "Ink meets material",
    body: "Printed in-house on calibrated machines — flex, vinyl, acrylic or stock, at any scale.",
  },
  {
    no: "05",
    tag: "Finish",
    title: "Cut, laminate, mount",
    body: "Laminated, contour-cut and mounted by hand so edges sit clean and square.",
  },
  {
    no: "06",
    tag: "Deliver",
    title: "Delivered or installed",
    body: "Collected, delivered, or fitted on site by our own team — finished and checked.",
  },
];
function CornerMarks() {
  return (
    <>
      {["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"].map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute ${pos} h-3.5 w-3.5 opacity-50`}
            style={{
              backgroundImage:
                "linear-gradient(var(--muted),var(--muted)),linear-gradient(var(--muted),var(--muted))",
              backgroundSize: "1px 100%, 100% 1px",
              backgroundPosition: "center, center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )
      )}
    </>
  );
}

// The finished artwork that sits on the sheet — reused by the static
// (compact) view and built up in layers by the scroll story.
function FinishedComposition() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5">
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        <span>Shrestha Services</span>
        <span className="tabular-nums">C M Y K</span>
      </div>

      {/* printed panel */}
      <div className="relative mt-4 flex-1 overflow-hidden rounded-sm">
        <div
          className="absolute inset-0 bg-accent-soft"
          style={{
            backgroundImage: "radial-gradient(var(--accent) 1.3px, transparent 1.6px)",
            backgroundSize: "11px 11px",
          }}
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-paper-dim/80 to-transparent p-4">
          <span className="font-display text-[1.7rem] leading-[0.95] text-ink">
            Made to
            <br />
            be seen.
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-ink">
          Finished print
        </span>
        <span className="h-px w-16 bg-brass/70" />
      </div>
    </div>
  );
}

export default function PrintPass() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const artwork = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
  const colour = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const detail = useTransform(scrollYProgress, [0.46, 0.6], [0, 1]);
  const inkX = useTransform(scrollYProgress, [0.42, 0.64], ["-35%", "135%"]);
  const inkOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.44, 0.64, 0.68],
    [0, 1, 1, 0]
  );
  const finished = useTransform(scrollYProgress, [0.64, 0.8], [0, 1]);
  const delivered = useTransform(scrollYProgress, [0.84, 0.96], [0, 1]);
  const liftY = useTransform(scrollYProgress, [0.84, 0.96], [10, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(v * steps.length))
    );
    setActive(idx);
  });

  return (
    <section className="border-t border-line bg-paper">
      <Container className="pt-20 lg:pt-28">
        <div className="max-w-2xl">
          <Eyebrow>The digital print pass</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl text-balance">
            Artwork becomes a physical print — one pass at a time.
          </h2>
          <p className="mt-5 max-w-md text-ink-soft text-pretty">
            From a signed-off file to a finished, installed piece. Scroll to run
            a job through the shop.
          </p>
        </div>
      </Container>

      {/* Compact — mobile, and the whole section when motion is reduced */}
      <Container className={reduce ? "pb-20 lg:pb-28" : "pb-20 lg:hidden"}>
        <div className="mt-10 grid items-start gap-10 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs rounded-sm border border-line-strong bg-paper-dim p-5 shadow-[var(--shadow-md)]">
            <CornerMarks />
            <FinishedComposition />
          </div>
          <ol className="space-y-5">
            {steps.map((s) => (
              <li key={s.no} className="flex gap-4 border-t border-line pt-4">
                <span className="font-mono text-xs text-accent">{s.no}</span>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {s.tag}
                  </span>
                  <h3 className="font-display text-lg text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      {/* Scroll story — desktop only, motion enabled */}
      {!reduce && (
        <div ref={ref} className="relative hidden lg:block">
          <Container>
            <div className="grid grid-cols-[0.9fr_1.1fr] gap-16">
              {/* Pinned press sheet, built up pass by pass */}
              <div className="sticky top-0 flex h-screen items-center">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-sm rounded-sm border border-line-strong bg-paper-dim p-6 shadow-[var(--shadow-lg)]">
                  <CornerMarks />

                  {/* 02 — artwork: dashed placement outline + crop guides */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-5 rounded-sm border border-dashed border-ink/25"
                    style={{ opacity: artwork }}
                  />

                  {/* 03/04 — colour laid into the panel */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-x-6 top-16 bottom-20 overflow-hidden rounded-sm"
                    style={{ opacity: colour }}
                  >
                    <div
                      className="absolute inset-0 bg-accent-soft"
                      style={{
                        backgroundImage:
                          "radial-gradient(var(--accent) 1.3px, transparent 1.6px)",
                        backgroundSize: "11px 11px",
                      }}
                    />
                  </motion.div>

                  {/* 04 — ink pass sweeping across the sheet */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-6 w-16 bg-accent"
                    style={{
                      left: inkX,
                      opacity: inkOpacity,
                      mixBlendMode: "multiply",
                    }}
                  />

                  {/* 05 — detail: brass hairline + spec readout */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-x-6 bottom-16 flex items-center justify-between"
                    style={{ opacity: detail }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                      laminated · contour-cut
                    </span>
                    <span className="h-px w-14 bg-brass/70" />
                  </motion.div>

                  {/* 05 — the headline resolves crisp */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-x-6 top-20 bottom-24 flex items-end p-1"
                    style={{ opacity: finished }}
                  >
                    <span className="font-display text-[1.7rem] leading-[0.95] text-ink">
                      Made to
                      <br />
                      be seen.
                    </span>
                  </motion.div>

                  {/* 06 — delivered: lifts off the bed with an install tag */}
                  <motion.span
                    aria-hidden
                    className="absolute -right-3 top-10 rounded-full border border-accent/40 bg-surface px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-accent-ink shadow-[var(--shadow-sm)]"
                    style={{ opacity: delivered, y: liftY }}
                  >
                    Installed on site
                  </motion.span>
                </div>
              </div>

              {/* Full-height step blocks drive the active state */}
              <ol>
                {steps.map((s, i) => {
                  const on = active === i;
                  return (
                    <li
                      key={s.no}
                      className="flex min-h-screen flex-col justify-center"
                    >
                      <div
                        className={`flex items-baseline gap-4 transition-opacity duration-500 ${
                          on ? "opacity-100" : "opacity-35"
                        }`}
                      >
                        <span
                          className={`font-mono text-sm transition-colors duration-500 ${
                            on ? "text-accent" : "text-faint"
                          }`}
                        >
                          {s.no}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                          {s.tag}
                        </span>
                      </div>
                      <h3
                        className={`mt-4 font-display text-4xl leading-tight transition-colors duration-500 ${
                          on ? "text-ink" : "text-muted"
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-sm text-ink-soft text-pretty">
                        {s.body}
                      </p>
                      <span
                        className={`mt-6 h-px origin-left bg-accent transition-transform duration-500 ${
                          on ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{ width: "4rem" }}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
