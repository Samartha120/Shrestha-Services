import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  `
  inline-flex
  items-center
  rounded-full
  px-3
  py-1
  text-xs
  font-semibold
  `,
  {
    variants: {
      variant: {
        primary: "bg-accent-soft text-accent",

        success: "bg-surface-2 text-ok",

        warning: "bg-surface-2 text-warn",

        danger: "bg-surface-2 text-err",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  }
);

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "danger";

  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  className,
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        badgeVariants({
          variant,
        }),
        className
      )}
    >
      {children}
    </span>
  );
}
