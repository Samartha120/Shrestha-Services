import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SPRING, useFinePointer } from "@/lib/motion";

/*
  CustomCursor — a soft accent glow that trails the real pointer and gently
  swells over interactive elements. The native cursor is intentionally kept
  visible, so this augments rather than replaces normal mouse behaviour.
  Renders nothing on touch devices or for reduced-motion users.
*/

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, SPRING.cursor);
  const ringY = useSpring(y, SPRING.cursor);

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);

  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target;
      setActive(target instanceof Element && !!target.closest(INTERACTIVE));
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    const downH = () => setDown(true);
    const upH = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    window.addEventListener("pointerdown", downH);
    window.addEventListener("pointerup", upH);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerdown", downH);
      window.removeEventListener("pointerup", upH);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const scale = (active ? 2.4 : 1) * (down ? 0.82 : 1);

  return (
    <motion.div
      aria-hidden
      className="ss-cursor"
      style={{ x: ringX, y: ringY }}
      animate={{
        scale,
        opacity: visible ? (active ? 0.9 : 0.55) : 0,
      }}
      transition={{ scale: { duration: 0.28, ease: [0.33, 1, 0.68, 1] }, opacity: { duration: 0.25 } }}
    >
      <span className="ss-cursor__ring" />
    </motion.div>
  );
}
