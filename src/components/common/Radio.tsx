interface Props {
  checked: boolean;
  value: string;
  label: string;
  onChange: (
    value: string
  ) => void;
}

export default function Radio({
  checked,
  value,
  label,
  onChange,
}: Props) {
  return (
    <label
      className="
      flex
      items-center
      gap-2
      cursor-pointer
      "
    >
      <input
        type="radio"
        checked={checked}
        value={value}
        onChange={() =>
          onChange(value)
        }
      />

      <span>{label}</span>
    </label>
  );
}