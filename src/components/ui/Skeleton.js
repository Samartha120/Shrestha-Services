import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function Skeleton({ className, }) {
    return (_jsx(motion.div, { animate: {
            opacity: [
                0.5,
                1,
                0.5,
            ],
        }, transition: {
            repeat: Infinity,
            duration: 1.5,
        }, className: `
      rounded-xl
      bg-slate-200
      ${className}
      ` }));
}
