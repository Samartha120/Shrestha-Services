import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
}

export default function Skeleton({ className }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className={`rounded-sm bg-surface-2 ${className}`}
    />
  );
}
