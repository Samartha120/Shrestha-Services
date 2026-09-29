import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface Props {
  items: AccordionItem[];
}

export default function Accordion({ items }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = active === index;

        return (
          <div key={index}>
            <button
              onClick={() => setActive(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-accent"
            >
              <span className="font-medium text-ink">{item.title}</span>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={reduce ? { duration: 0 } : undefined}
                className="text-muted"
              >
                <ChevronDown />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 text-ink-soft">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
