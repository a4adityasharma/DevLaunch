import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-brand-600 px-6 py-14 text-center sm:px-12">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Got a project worth showing off?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-100">
          Explore what others have built, get inspired, and bookmark the
          projects that match the stack you're learning.
        </p>
        <Link
          to="/browse"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-sm transition-colors hover:bg-brand-50"
        >
          Start Exploring
        </Link>
      </div>
    </section>
  )
}
