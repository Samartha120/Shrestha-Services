import {
  type ReactNode,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

interface Props {
  content: string;
  children: ReactNode;
}

export default function Tooltip({
  content,
  children,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <div
      className="
      relative
      inline-block
      "
      onMouseEnter={() =>
        setOpen(true)
      }
      onMouseLeave={() =>
        setOpen(false)
      }
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 5,
            }}
            className="
            absolute
            bottom-full
            left-1/2
            mb-2
            -translate-x-1/2
            rounded-lg
            bg-slate-900
            px-3
            py-2
            text-xs
            text-white
            whitespace-nowrap
            "
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}