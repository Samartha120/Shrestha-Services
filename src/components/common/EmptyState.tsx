import { motion, useReducedMotion } from "framer-motion";

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center rounded-sm border border-dashed border-line p-12 text-center"
    >
      <h3 className="font-display text-xl text-ink">{title}</h3>

      {description && <p className="mt-2 text-muted">{description}</p>}

      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
