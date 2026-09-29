interface Props {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ checked, label, onChange }: Props) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-3 text-sm text-ink-soft">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="
        h-4
        w-4
        rounded-sm
        border-line-strong
        bg-transparent
        text-accent
        transition-colors
        focus:ring-accent
        "
      />

      <span className="font-medium">{label}</span>
    </label>
  );
}
