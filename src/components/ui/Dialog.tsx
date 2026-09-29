import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { X } from "lucide-react";

import { useEffect, type ReactNode } from "react";

interface DialogProps {
  open: boolean;
  title?: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Dialog({
  open,
  title,
  description,
  children,
  onClose,
}: DialogProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-sm border border-line bg-surface p-6 shadow-[var(--shadow-md)]"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                {title && (
                  <h2 className="font-display text-xl text-ink">{title}</h2>
                )}

                {description && (
                  <p className="mt-1 text-sm text-muted">{description}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="rounded-sm p-2 text-muted transition-colors hover:bg-paper-dim hover:text-ink"
              >
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
