interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value?: string;
  error?: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  value,
  error,
  options,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="
        w-full
        appearance-none
        border-b
        border-line
        bg-transparent
        py-2.5
        text-ink
        transition-colors
        focus:border-accent
        focus:outline-none
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-surface text-ink"
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm font-medium text-err">{error}</p>}
    </div>
  );
}
