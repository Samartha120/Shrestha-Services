interface Props {
  checked: boolean;
  value: string;
  label: string;
  onChange: (value: string) => void;
}

export default function Radio({ checked, value, label, onChange }: Props) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
      <input
        type="radio"
        checked={checked}
        value={value}
        onChange={() => onChange(value)}
        className="h-4 w-4 border-line-strong bg-transparent text-accent focus:ring-accent"
      />

      <span>{label}</span>
    </label>
  );
}
