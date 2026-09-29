import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/*
 * Split-screen auth shell.
 * Left  — an ink "press specimen" panel (brand, statement, registration marks).
 * Right — the form, on paper.
 * The left panel is decorative and hidden below lg so mobile is form-first.
 */
export default function AuthShell({
  children,
  statement,
  note,
}: {
  children: ReactNode;
  statement: string;
  note: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="grid min-h-screen bg-paper text-ink lg:grid-cols-[1.05fr_1fr]">
      {/* Left — ink specimen panel */}
      <aside className="relative hidden overflow-hidden bg-ink px-12 py-14 text-inverse lg:flex lg:flex-col lg:justify-between xl:px-16">
        {/* hatch texture */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 10px)",
          }}
        />
        {/* corner registration marks */}
        <span
          aria-hidden
          className="absolute right-10 top-10 h-6 w-6 border-r border-t border-inverse/30"
        />
        <span
          aria-hidden
          className="absolute bottom-10 left-10 h-6 w-6 border-b border-l border-inverse/30"
        />

        {/* top — wordmark */}
        <Link to="/" className="relative flex flex-col leading-none">
          <span className="font-display text-3xl font-semibold tracking-tight">
            Shrestha
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-inverse/50">
            Services
          </span>
        </Link>

        {/* middle — statement */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-md font-display text-[clamp(2.2rem,3.4vw,3.4rem)] leading-[1.05] text-balance"
        >
          {statement}
        </motion.h1>

        {/* bottom — CMYK bar + note */}
        <div className="relative">
          <div className="mb-4 flex h-1.5 w-40 overflow-hidden rounded-full">
            <span className="flex-1 bg-[#22b4d6]" />
            <span className="flex-1 bg-[#e6559b]" />
            <span className="flex-1 bg-[#f4c020]" />
            <span className="flex-1 bg-inverse/80" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-inverse/60 text-pretty">
            {note}
          </p>
        </div>
      </aside>

      {/* Right — form */}
      <main className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}

/* Shared editorial field styles */
export const authFieldClass =
  "w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none";

export const authLabelClass =
  "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted";
