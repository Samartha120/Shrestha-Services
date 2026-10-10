import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

/*
  ─────────────────────────────────────────────────────────────
  Shared motion language for the public site.
  One source of truth for easing, duration and reveal variants so
  the whole experience reads as a single, art-directed system
  rather than a pile of ad-hoc animations.
  ─────────────────────────────────────────────────────────────
*/

/* Signature ease-out — the shop's existing curve. Keep it canonical. */
export const EASE = [0.22, 1, 0.36, 1] as const;
/* Gentle settle, used for springy-feeling tweens. */
export const EASE_SOFT = [0.33, 1, 0.68, 1] as const;
/* Symmetric accel / decel — for ambient, continuous motion. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
} as const;

/* Spring presets tuned once, reused for pointer-driven motion. */
export const SPRING = {
  /* magnetic buttons — quick, lightly damped */
  magnetic: { stiffness: 160, damping: 15, mass: 0.1 },
  /* cursor ring — trails the pointer with a soft lag */
  cursor: { stiffness: 400, damping: 32, mass: 0.5 },
  /* card tilt — slow, heavy, premium */
  tilt: { stiffness: 180, damping: 22, mass: 0.6 },
} as const;

/* ── Reveal variants ──────────────────────────────────────── */

/* Clean fade + rise (matches the existing Reveal default). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
};

/*
  Print-layer reveal — content wipes in through a clip-path, as if a
  printing layer is being laid onto the sheet. Pairs a slight rise with
  a blur-to-sharp "registration" settle.
*/
export const printReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    filter: "blur(0px)",
    transition: {
      duration: DUR.slow,
      ease: EASE,
      filter: { duration: DUR.base },
    },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/* ── Environment hooks ────────────────────────────────────── */

/*
  True only for devices with a precise pointer (mouse / trackpad).
  Pointer-driven flourishes (custom cursor, magnetic, tilt) opt in on
  this so touch devices keep a clean, native experience.
*/
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}
