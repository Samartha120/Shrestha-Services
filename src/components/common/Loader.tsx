import { Loader as Loader2 } from "lucide-react";

interface Props {
  text?: string;
}

export default function Loader({ text = "Loading..." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Loader2 size={32} className="animate-spin text-accent" />

      <p className="mt-3 text-muted">{text}</p>
    </div>
  );
}
