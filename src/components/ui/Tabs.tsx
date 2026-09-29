import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface Props {
  tabs: Tab[];
}

export default function Tabs({ tabs }: Props) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="flex gap-2 border-b border-line">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActive(index)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors ${
              active === index ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}

            {active === index && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-6"
      >
        {tabs[active]?.content}
      </motion.div>
    </div>
  );
}
