import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface Props {
  items: AccordionItem[];
}

export default function Accordion({
  items,
}: Props) {
  const [active, setActive] =
    useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen =
          active === index;

        return (
          <div
            key={index}
            className="
            rounded-2xl
            border
            border-slate-200
            overflow-hidden
            "
          >
            <button
              onClick={() =>
                setActive(
                  isOpen
                    ? null
                    : index
                )
              }
              className="
              flex
              w-full
              items-center
              justify-between
              p-5
              "
            >
              <span className="font-medium">
                {item.title}
              </span>

              <motion.div
                animate={{
                  rotate: isOpen
                    ? 180
                    : 0,
                }}
              >
                <ChevronDown />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                >
                  <div className="p-5 pt-0">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}