import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  onClose,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-50
            "
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            className="
            fixed
            left-1/2
            top-1/2
            z-50
            w-full
            max-w-xl
            -translate-x-1/2
            -translate-y-1/2
            rounded-3xl
            bg-white
            dark:bg-slate-900
            p-6
            shadow-2xl
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {title}
              </h3>

              <button onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}