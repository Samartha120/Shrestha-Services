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
          <label className="text-sm font-medium">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
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
            px-4
            py-3
            transition-all
            duration-300
            focus:ring-2
            focus:ring-blue-500
            ${
              leftIcon
                ? "pl-10"
                : ""
            }
            ${
              error
                ? "border-red-500"
                : "border-slate-300"
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
          <p className="text-xs text-slate-500">
            {helperText}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;