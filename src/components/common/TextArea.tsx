import {
  forwardRef,
} from "react";

interface Props
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<
  HTMLTextAreaElement,
  Props
>(
  (
    {
      label,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          rows={6}
          className="
          w-full
          rounded-xl
          border
          border-slate-300
          p-4
          focus:ring-2
          focus:ring-blue-500
          "
          {...props}
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName =
  "TextArea";

export default TextArea;