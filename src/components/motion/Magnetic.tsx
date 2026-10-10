import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/motion";

/*
  Magnetic — a wrapper that lets an interactive element drift a few pixels
  toward the pointer, then spring back on leave. Extremely subtle; it reads
  as "weight" on a button rather than a visible animation. No-op for touch
  (pointer events never fire) and reduced-motion users.

  Renders an inline-flex <motion.div> so it hugs the wrapped control without
  disturbing surrounding layout.
*/
export default function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  /* fraction of the pointer offset the element follows (0–1) */
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.magnetic);
  const sy = useSpring(y, SPRING.magnetic);

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
