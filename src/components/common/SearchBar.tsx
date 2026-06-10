import {
  Search,
  X,
} from "lucide-react";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (
    value: string
  ) => void;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-slate-400
        "
      />

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="
        w-full
        rounded-xl
        border
        border-slate-300
        py-3
        pl-10
        pr-10
        "
      />

      {value && (
        <button
          onClick={() =>
            onChange("")
          }
          className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}