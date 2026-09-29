import { motion, useReducedMotion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={center ? "mb-12 text-center" : "mb-12"}
    >
      <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] leading-tight text-ink text-balance">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-ink-soft text-pretty ${
            center ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
