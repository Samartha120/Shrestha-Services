import { useReducedMotion } from "framer-motion";

export default function LoadingPage() {
  const reduce = useReducedMotion();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-paper px-4">
      <span
        className={`h-9 w-9 rounded-full border-2 border-line border-t-accent ${
          reduce ? "" : "animate-spin"
        }`}
        aria-hidden
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
        Loading
      </p>
    </div>
  );
}
