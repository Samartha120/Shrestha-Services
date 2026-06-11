import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-16 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>

      {subtitle && (
        <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
