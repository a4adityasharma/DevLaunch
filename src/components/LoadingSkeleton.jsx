/**
 * Skeleton placeholder shaped like ProjectCard, so the layout doesn't shift
 * when real data replaces it. `count` controls how many skeleton cards to
 * render — callers pass the same number they expect real cards to show.
 * `columns` lets each caller match its own grid (Home's 4-col layout vs
 * Browse's 3-col layout next to a sidebar) so the transition from skeleton
 * to real content doesn't visibly reflow.
 */
export default function LoadingSkeleton({ count = 4, columns = 4 }) {
  const colsClass = columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${colsClass}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="aspect-video bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="flex gap-2 pt-1">
              <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-14 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
