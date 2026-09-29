import { motion, useReducedMotion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-16 text-center"
    >
      <h1 className="font-display text-[clamp(2.4rem,5vw,3.5rem)] leading-[1.02] text-ink text-balance">
        {title}
      </h1>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-ink-soft text-pretty">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
