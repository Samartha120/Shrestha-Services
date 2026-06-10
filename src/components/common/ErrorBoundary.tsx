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
        <div
          className="
          flex
          min-h-[300px]
          flex-col
          items-center
          justify-center
          "
        >
          <h2 className="text-2xl font-bold">
            Something went wrong
          </h2>

          <button
            className="
            mt-4
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-white
            "
            onClick={() =>
              window.location.reload()
            }
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}