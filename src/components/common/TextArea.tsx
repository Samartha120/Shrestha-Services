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
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
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
          dark:border-slate-800
          bg-white
          dark:bg-slate-900/50
          text-slate-950
          dark:text-slate-50
          placeholder-slate-400
          dark:placeholder-slate-500
          p-4
          transition-all
          duration-300
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          hover:border-slate-400
          dark:hover:border-slate-700
          "
          {...props}
        />

        {error && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
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