interface DividerProps {
  label?: string;
}

export default function Divider({ label }: DividerProps) {
  if (!label) {
    return <div className="h-px w-full bg-line" />;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-line" />

      <span className="text-sm text-muted">{label}</span>

      <div className="h-px flex-1 bg-line" />
    </div>
  );
}
