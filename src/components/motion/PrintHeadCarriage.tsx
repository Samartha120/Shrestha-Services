import { useEffect } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/*
  PrintHeadCarriage — a restrained, realistic large-format inkjet pass.

  A thin print-head carriage glides left→right across the region, laying a
  faint halftone ink band in its wake; the band then "dries" and fades before
  the next pass. Modelled on how a wide-format plotter actually prints: the
  carriage accelerates off the home edge, cruises, decelerates into the far
  edge, and the ink only exists where the head has already travelled.

  Lives behind the hero headline (absolute, inset-0 of its wrapper). All
  motion is a single looped motion value → GPU transforms/opacity + one
  clip-path. Reduced-motion users get a static, already-printed band.
*/

/* CMYK channels on the head — ties to the proof-sheet CMYK bar, kept tiny. */
const CHANNELS = ["#22b8cf", "#e64980", "#f4d03f", "#1a1714"];

export default function PrintHeadCarriage({
  className,
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();
  const sweep = useMotionValue(0);

  // Carriage position with faked accel / cruise / decel, then parked off-stage.
  const carriageX = useTransform(
    sweep,
    [0, 0.08, 0.42, 0.5, 1],
    ["-6%", "16%", "86%", "104%", "104%"]
  );
  const carriageOpacity = useTransform(
    sweep,
    [0, 0.02, 0.5, 0.56],
    [0, 1, 1, 0]
  );
  // Ink band is revealed up to the head, then holds, then dries/fades.
  const bandInsetRight = useTransform(sweep, [0, 0.5, 1], ["100%", "0%", "0%"]);
  const bandClip = useTransform(bandInsetRight, (r) => `inset(0 ${r} 0 0)`);
  const bandOpacity = useTransform(
    sweep,
    [0, 0.05, 0.62, 0.86],
    [0, 1, 1, 0]
  );

  useEffect(() => {
    if (reduce) return;
    const controls = animate(sweep, 1, {
      duration: 11,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 2.4,
    });
    return () => controls.stop();
  }, [reduce, sweep]);

  // Halftone ink texture — fine rosette-ish dot screen in the accent ink.
  const inkTexture = {
    backgroundImage:
      "radial-gradient(color-mix(in srgb, var(--accent) 60%, transparent) 1px, transparent 1.6px)",
    backgroundSize: "7px 7px",
  } as const;

  // Feather the band top/bottom so it reads as a printed strip, not a block.
  const feather = {
    maskImage:
      "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
  } as const;

  if (reduce) {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      >
        <div
          className="absolute inset-x-0 top-[5%] h-[48%] opacity-[0.06]"
          style={{ ...inkTexture, ...feather }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {/* printed ink band — appears in the carriage's wake, then dries */}
      <motion.div
        className="absolute inset-x-0 top-[5%] h-[48%]"
        style={{ opacity: bandOpacity, clipPath: bandClip, ...feather }}
      >
        <div className="absolute inset-0 opacity-[0.10]" style={inkTexture} />
        {/* soft wet sheen trailing the head */}
        <div
          className="absolute inset-y-0 right-0 w-24"
          style={{
            background:
              "linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 16%, transparent))",
          }}
        />
      </motion.div>

      {/* the print-head carriage */}
      <motion.div
        className="absolute top-[2%] h-[54%]"
        style={{ left: carriageX, opacity: carriageOpacity, x: "-50%" }}
      >
        {/* fine ink mist at the nozzle's leading edge */}
        <div
          className="absolute left-1/2 top-1/2 h-24 w-16 -translate-x-1/2 -translate-y-1/2 blur-md"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 34%, transparent), transparent 72%)",
          }}
        />
        {/* nozzle bar */}
        <div
          className="relative h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--accent), transparent)",
            boxShadow:
              "0 0 10px 1px color-mix(in srgb, var(--accent) 55%, transparent)",
          }}
        >
          {/* CMYK sub-nozzles riding the carriage */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-1">
            {CHANNELS.map((c) => (
              <span
                key={c}
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: c, opacity: 0.85 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
