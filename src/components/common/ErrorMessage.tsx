import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
}

export default function ErrorMessage({
  message,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      rounded-xl
      bg-red-50
      border
      border-red-200
      p-4
      text-red-600
      "
    >
      <AlertCircle size={18} />

      <span>{message}</span>
    </div>
  );
}