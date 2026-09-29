import React from "react";

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(
    error: Error
  ) {
    console.error(error);
  }

  render() {
    if (
      this.state.hasError
    ) {
      return (
        <div className="flex min-h-[300px] flex-col items-center justify-center bg-paper px-6 text-center">
          <p className="eyebrow text-accent">Something broke on the press</p>
          <h2 className="mt-3 font-display text-2xl text-ink">
            Something went wrong
          </h2>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            The page hit an unexpected error. Reloading usually clears it.
          </p>
          <button
            className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-inverse transition-colors hover:bg-accent"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}