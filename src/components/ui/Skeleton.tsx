import { motion } from "framer-motion";

interface Props {
  className?: string;
}

export default function Skeleton({
  className,
}: Props) {
  return (
    <motion.div
      animate={{
        opacity: [
          0.5,
          1,
          0.5,
        ],
      }}
      transition={{
        repeat:
          Infinity,
        duration: 1.5,
      }}
      className={`
      rounded-xl
      bg-slate-200
      ${className}
      `}
    />
  );
}