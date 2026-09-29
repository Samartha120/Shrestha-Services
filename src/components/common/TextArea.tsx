import { forwardRef } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          rows={6}
          className="
          w-full
          resize-none
          border-b
          border-line
          bg-transparent
          py-2.5
          text-ink
          placeholder:text-muted
          transition-colors
          focus:border-accent
          focus:outline-none
          "
          {...props}
        />

        {error && <p className="text-sm font-medium text-err">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
