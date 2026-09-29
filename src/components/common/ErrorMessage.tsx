import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-line bg-accent-soft p-4 text-err">
      <AlertCircle size={18} />

      <span>{message}</span>
    </div>
  );
}
