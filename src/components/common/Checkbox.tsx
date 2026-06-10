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
      />

      <span>{label}</span>
    </label>
  );
}