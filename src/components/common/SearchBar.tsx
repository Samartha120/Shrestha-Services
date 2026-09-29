import { Search, X } from "lucide-react";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
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
        className="absolute left-0 top-1/2 -translate-y-1/2 text-muted"
      />

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-line bg-transparent py-2.5 pl-7 pr-8 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
