import React from "react";
import { Loader as Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  `
  inline-flex
  items-center
  justify-center
  gap-2
  rounded-full
  font-semibold
  transition-colors
  duration-200
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-accent
  focus-visible:ring-offset-2
  focus-visible:ring-offset-paper
  disabled:pointer-events-none
  disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-inverse hover:bg-accent",
        secondary:
          "bg-accent text-accent-ink hover:bg-accent-hover",
        outline:
          "border border-line-strong text-ink hover:border-ink hover:bg-paper-dim",
        ghost:
          "text-ink-soft hover:text-ink hover:bg-paper-dim",
        danger:
          "bg-err text-inverse hover:opacity-90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  children,
  loading,
  leftIcon,
  rightIcon,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        buttonVariants({ variant, size }),
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
}