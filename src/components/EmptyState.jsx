/**
 * Generic "nothing here" state. Accepts an optional onReset callback so
 * different pages (Browse with active filters, Bookmarks with none saved)
 * can offer a relevant action without duplicating this component.
 */
export default function EmptyState({
  title = 'No projects found',
  message = 'Try adjusting your search or filters.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center dark:border-slate-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10 text-slate-300 dark:text-slate-600"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35M8 11h6" />
      </svg>
      <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
