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
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="
        w-full
        rounded-xl
        border
        border-slate-300
        dark:border-slate-800
        bg-white
        dark:bg-slate-900/50
        text-slate-950
        dark:text-slate-50
        p-3
        transition-all
        duration-300
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        hover:border-slate-400
        dark:hover:border-slate-700
        "
      >
        {options.map(
          (option) => (
            <option
              key={option.value}
              value={
                option.value
              }
              className="bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-50"
            >
              {option.label}
            </option>
          )
        )}
      </select>

      {error && (
        <p className="text-sm font-medium text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}