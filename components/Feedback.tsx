export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12" aria-label="Yükleniyor">
      <div className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-zinc-900 animate-spin" />
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      className="rounded-2xl bg-red-50 border border-red-100 px-6 py-5"
      role="alert"
    >
      <div className="flex gap-3 items-start">
        <span className="text-red-400 mt-0.5 shrink-0" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5a1 1 0 112 0v3a1 1 0 11-2 0V5zm1 7a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <p className="text-red-700 text-sm">{message}</p>
      </div>
    </div>
  );
}

export function ResultSkeleton() {
  return (
    <div
      className="rounded-3xl bg-zinc-900 text-white p-8 space-y-6 shadow-2xl animate-pulse"
      aria-hidden="true"
    >
      <div className="space-y-3">
        <div className="h-3 w-16 bg-zinc-700 rounded" />
        <div className="h-6 w-64 bg-zinc-700 rounded" />
        <div className="h-8 w-48 bg-zinc-700 rounded" />
      </div>
      <div className="h-6 w-56 bg-zinc-800 rounded-full" />
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-800 rounded-2xl p-5">
          <div className="h-3 w-20 bg-zinc-700 rounded mb-2" />
          <div className="h-7 w-16 bg-zinc-700 rounded" />
        </div>
        <div className="bg-zinc-800 rounded-2xl p-5">
          <div className="h-3 w-16 bg-zinc-700 rounded mb-2" />
          <div className="h-7 w-12 bg-zinc-700 rounded" />
        </div>
      </div>
    </div>
  );
}