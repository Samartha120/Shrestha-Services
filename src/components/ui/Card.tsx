import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;

  hover?: boolean;
  glass?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = true,
  glass = false,
  animated = true,
  onClick,
}: CardProps) {
  const reduce = useReducedMotion();
  const Component = animated ? motion.div : "div";

  return (
    <Component
      whileHover={hover && !reduce ? { y: -4 } : {}}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={twMerge(
        `
        rounded-sm
        border
        border-line
        bg-surface
        transition-colors
        duration-300
        `,
        glass &&
          `
          bg-surface/80
          backdrop-blur-xl
          `,
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
