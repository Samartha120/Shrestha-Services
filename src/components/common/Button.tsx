import React from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  `
  inline-flex
  items-center
  justify-center
  rounded-xl
  font-medium
  transition-all
  duration-300
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50
  hover:scale-[1.03]
  active:scale-[0.97]
  `,
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700",
        secondary:
          "bg-slate-900 text-white hover:bg-slate-800",
        outline:
          "border border-slate-300 hover:bg-slate-100",
        danger:
          "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5",
        lg: "h-12 px-8 text-lg",
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