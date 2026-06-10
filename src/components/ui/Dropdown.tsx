import {
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronDown,
} from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value?: string;
  onChange: (
    value: string
  ) => void;
}

export default function Dropdown({
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const selected =
    options.find(
      (o) =>
        o.value === value
    );

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        border
        px-4
        py-3
        "
      >
        {selected?.label ||
          "Select"}

        <ChevronDown />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            className="
            absolute
            z-20
            mt-2
            w-full
            rounded-xl
            border
            bg-white
            shadow-lg
            "
          >
            {options.map(
              (option) => (
                <button
                  key={
                    option.value
                  }
                  className="
                  block
                  w-full
                  px-4
                  py-3
                  text-left
                  hover:bg-slate-50
                  "
                  onClick={() => {
                    onChange(
                      option.value
                    );

                    setOpen(
                      false
                    );
                  }}
                >
                  {
                    option.label
                  }
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}