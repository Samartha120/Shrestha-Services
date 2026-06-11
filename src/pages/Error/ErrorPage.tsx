import { TriangleAlert as AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 flex items-center justify-center mb-6">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl shadow-md transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
