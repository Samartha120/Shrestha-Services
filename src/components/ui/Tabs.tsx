import { useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface Props {
  tabs: Tab[];
}

export default function Tabs({
  tabs,
}: Props) {
  const [active, setActive] =
    useState(0);

  return (
    <div>
      <div className="flex gap-2 border-b">
        {tabs.map(
          (tab, index) => (
            <button
              key={tab.label}
              onClick={() =>
                setActive(index)
              }
              className="
              relative
              px-4
              py-3
              "
            >
              {tab.label}

              {active ===
                index && (
                <motion.div
                  layoutId="tab-indicator"
                  className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-0.5
                  bg-blue-600
                  "
                />
              )}
            </button>
          )
        )}
      </div>

      <motion.div
        key={active}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="py-6"
      >
        {
          tabs[active]
            ?.content
        }
      </motion.div>
    </div>
  );
}