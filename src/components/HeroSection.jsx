import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="px-4 py-20 text-center sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <span className="inline-block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          Discover. Build. Showcase.
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
          Where developers{' '}
          <span className="text-brand-600 dark:text-brand-400">showcase</span>{' '}
          their best work
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
          Browse real projects built by developers around the world. Get
          inspired, find your next stack, and bookmark the ones you love.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/browse"
            className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 sm:w-auto"
          >
            Browse Projects
          </Link>
          <Link
            to="/about"
            className="w-full rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
