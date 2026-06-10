import { X } from "lucide-react";

interface ChipProps {
  label: string;

  removable?: boolean;

  onRemove?: () => void;
}

export default function Chip({
  label,
  removable,
  onRemove,
}: ChipProps) {
  return (
    <div
      className="
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-slate-100
      px-3
      py-2
      text-sm
      "
    >
      {label}

      {removable && (
        <button
          onClick={onRemove}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}