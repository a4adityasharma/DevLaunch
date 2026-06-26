import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
            D
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            DevLaunch
          </span>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {year} DevLaunch. Built for showcasing developer projects.
        </p>

        <div className="flex gap-4 text-sm">
          <Link
            to="/about"
            className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          >
            About
          </Link>
          <Link
            to="/browse"
            className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
          >
            Browse
          </Link>
        </div>
      </div>
    </footer>
  )
}
