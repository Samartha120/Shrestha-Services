import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, RotateCw } from "lucide-react";
import { twMerge } from "tailwind-merge";

/* ── Layout container ── */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={twMerge("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ── Scroll reveal — subtle, single direction, respects reduced motion ── */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Eyebrow label with a short rule ── */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 eyebrow">
      <span className="h-px w-6 bg-accent" aria-hidden />
      {children}
    </span>
  );
}

/* ── Primary / ghost CTA links (consistent arrow micro-interaction) ── */
type CTAProps = {
  to: string;
  children: ReactNode;
  className?: string;
};

export function PrimaryCTA({ to, children, className }: CTAProps) {
  return (
    <Link
      to={to}
      className={twMerge(
        "group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-accent",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function GhostCTA({ to, children, className }: CTAProps) {
  return (
    <Link
      to={to}
      className={twMerge(
        "group inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-accent",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/* ── Fetch error state — surfaced when a request fails, with retry ── */
export function FetchError({
  message = "Something went wrong while loading this.",
  onRetry,
  className,
}: {
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={twMerge("py-16 text-center", className)}
    >
      <p className="text-sm font-semibold text-err">{message}</p>
      <p className="mt-2 text-sm text-muted">
        Please check your connection and try again.
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <RotateCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
          Try again
        </button>
      )}
    </div>
  );
}
