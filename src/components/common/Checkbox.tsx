interface Props {
  checked: boolean;
  label: string;
  onChange: (
    checked: boolean
  ) => void;
}

export default function Checkbox({
  checked,
  label,
  onChange,
}: Props) {
  return (
    <label
      className="
      flex
      items-center
      gap-3
      cursor-pointer
      select-none
      text-sm
      text-slate-700
      dark:text-slate-350
      "
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(
            e.target.checked
          )
        }
        className="
        h-5
        w-5
        rounded-lg
        border-slate-300
        dark:border-slate-800
        bg-white
        dark:bg-slate-900/50
        text-blue-600
        focus:ring-blue-500
        dark:focus:ring-offset-slate-900
        transition-all
        "
      />

      <span className="font-semibold">{label}</span>
    </label>
  );
}