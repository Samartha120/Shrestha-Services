import { X } from "lucide-react";

interface ChipProps {
  label: string;

  removable?: boolean;

  onRemove?: () => void;
}

export default function Chip({ label, removable, onRemove }: ChipProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink-soft">
      {label}

      {removable && (
        <button
          onClick={onRemove}
          className="text-muted transition-colors hover:text-accent"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
