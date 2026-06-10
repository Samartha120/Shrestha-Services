import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
export default function Card({ children, className, hover = true, glass = false, animated = true, }) {
    const Component = animated
        ? motion.div
        : "div";
    return (_jsx(Component, { whileHover: hover
            ? {
                y: -8,
                scale: 1.02,
            }
            : {}, transition: {
            duration: 0.3,
        }, className: twMerge(`
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800/80
        bg-white
        dark:bg-slate-900/95
        shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)]
        dark:shadow-none
        transition-all
        duration-300
        card-transition
        `, glass &&
            `
          bg-white/70
          dark:bg-slate-900/60
          backdrop-blur-xl
          border-white/20
          dark:border-slate-800/40
          `, className), children: children }));
}
