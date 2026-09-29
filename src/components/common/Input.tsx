import { forwardRef, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`
            w-full
            border-b
            bg-transparent
            py-2.5
            text-ink
            placeholder:text-muted
            transition-colors
            focus:outline-none
            ${leftIcon ? "pl-7" : ""}
            ${isPassword ? "pr-9" : ""}
            ${error ? "border-err focus:border-err" : "border-line focus:border-accent"}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {helperText && <p className="text-xs text-muted">{helperText}</p>}

        {error && <p className="text-sm font-medium text-err">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
