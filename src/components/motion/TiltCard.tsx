import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/motion";

/*
  TiltCard — a restrained 3D parallax tilt that responds to the pointer.
  Children can opt into depth with the `data-tilt-layer` attribute (they get
  a small translateZ via CSS). Falls back to a plain element for touch and
  reduced-motion. Max tilt is deliberately shallow (a few degrees) so it
  reads as premium material response, not a toy.
*/
export default function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  /* maximum rotation in degrees on each axis */
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srx = useSpring(rotateX, SPRING.tilt);
  const sry = useSpring(rotateY, SPRING.tilt);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max);
    rotateX.set(-py * max);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
