import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  X
} from "lucide-react";

import {
  useEffect,
  type ReactNode,
} from "react";

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

  useEffect(() => {
    const handleEsc = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEsc
      );
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-50
            "
            onClick={onClose}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
            fixed
            left-1/2
            top-1/2
            z-50
            w-full
            max-w-lg
            -translate-x-1/2
            -translate-y-1/2
            rounded-3xl
            bg-white
            dark:bg-slate-900
            p-6
            shadow-2xl
            "
          >
            <div
              className="
              mb-4
              flex
              items-start
              justify-between
              "
            >
              <div>
                {title && (
                  <h2
                    className="
                    text-xl
                    font-bold
                    "
                  >
                    {title}
                  </h2>
                )}

                {description && (
                  <p
                    className="
                    mt-1
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                    "
                  >
                    {description}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="
                rounded-lg
                p-2
                hover:bg-slate-100
                dark:hover:bg-slate-800
                "
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