interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value?: string;
  error?: string;
  options: Option[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
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
        <label>{label}</label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="
        w-full
        rounded-xl
        border
        border-slate-300
        p-3
        focus:ring-2
        focus:ring-blue-500
        "
      >
        {options.map(
          (option) => (
            <option
              key={option.value}
              value={
                option.value
              }
            >
              {option.label}
            </option>
          )
        )}
      </select>

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}