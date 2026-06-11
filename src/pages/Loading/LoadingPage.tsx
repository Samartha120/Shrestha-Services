export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-4">
      <div className="h-10 w-10 rounded-full border-[3px] border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-indigo-400 animate-spin" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading...</p>
    </div>
  );
}
