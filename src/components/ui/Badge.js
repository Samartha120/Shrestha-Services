import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
const badgeVariants = cva(`
  inline-flex
  items-center
  rounded-full
  px-3
  py-1
  text-xs
  font-semibold
  `, {
    variants: {
        variant: {
            primary: "bg-blue-100 text-blue-700",
            success: "bg-green-100 text-green-700",
            warning: "bg-yellow-100 text-yellow-700",
            danger: "bg-red-100 text-red-700",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});
export default function Badge({ children, variant = "primary", className, }) {
    return (_jsx("span", { className: twMerge(badgeVariants({
            variant,
        }), className), children: children }));
}
