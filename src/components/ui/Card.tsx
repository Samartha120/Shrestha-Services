import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;

  hover?: boolean;
  glass?: boolean;
  animated?: boolean;
}

export default function Card({
  children,
  className,
  hover = true,
  glass = false,
  animated = true,
}: CardProps) {
  const Component = animated
    ? motion.div
    : "div";

  return (
    <Component
      whileHover={
        hover
          ? {
              y: -8,
              scale: 1.02,
            }
          : {}
      }
      transition={{
        duration: 0.3,
      }}
      className={twMerge(
        `
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)]
        transition-all
        duration-300
        `,
        glass &&
          `
          bg-white/70
          backdrop-blur-xl
          border-white/20
          `,
        className
      )}
    >
      {children}
    </Component>
  );
}