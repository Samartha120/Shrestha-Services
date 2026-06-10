import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className={
        center
          ? "text-center mb-12"
          : "mb-12"
      }
    >
      <h2
        className="
        text-3xl
        md:text-4xl
        font-bold
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
          mt-3
          text-slate-500
          max-w-2xl
          mx-auto
          "
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}