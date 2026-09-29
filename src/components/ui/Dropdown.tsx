import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ options, value, onChange }: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-sm border border-line bg-surface px-4 py-3 text-ink transition-colors hover:border-line-strong"
      >
        {selected?.label || "Select"}

        <ChevronDown className="text-muted" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-sm border border-line bg-surface shadow-[var(--shadow-md)]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                className="block w-full px-4 py-3 text-left text-ink-soft transition-colors hover:bg-paper-dim hover:text-accent"
                onClick={() => {
                  onChange(option.value);

                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
