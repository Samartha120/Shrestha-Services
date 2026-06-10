import { motion } from "framer-motion";

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
      flex
      flex-col
      items-center
      justify-center
      rounded-2xl
      border
      border-dashed
      border-slate-300
      p-12
      text-center
      "
    >
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </motion.div>
  );
}