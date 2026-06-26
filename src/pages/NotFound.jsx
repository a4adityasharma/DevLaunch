import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6">
      <h1 className="text-5xl font-bold text-brand-600 dark:text-brand-400">404</h1>
      <p className="text-slate-600 dark:text-slate-300">
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="rounded-full bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  )
}
