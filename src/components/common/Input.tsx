import {
  forwardRef,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      type,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

    const isPassword =
      type === "password";

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            className={`
            w-full
            rounded-xl
            border
            bg-white
            dark:bg-slate-900/50
            text-slate-950
            dark:text-slate-50
            placeholder-slate-400
            dark:placeholder-slate-500
            px-4
            py-3
            transition-all
            duration-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            ${
              leftIcon
                ? "pl-10"
                : ""
            }
            ${
              error
                ? "border-red-500 bg-red-50/10 focus:ring-red-500/50"
                : "border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700"
            }
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-slate-600
              dark:hover:text-slate-350
              "
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}
        </div>

        {helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;