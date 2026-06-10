interface DividerProps {
  label?: string;
}

export default function Divider({
  label,
}: DividerProps) {
  if (!label) {
    return (
      <div
        className="
        h-px
        w-full
        bg-slate-200
        "
      />
    );
  }

  return (
    <div
      className="
      flex
      items-center
      gap-4
      "
    >
      <div className="h-px flex-1 bg-slate-200" />

      <span
        className="
        text-sm
        text-slate-500
        "
      >
        {label}
      </span>

      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}