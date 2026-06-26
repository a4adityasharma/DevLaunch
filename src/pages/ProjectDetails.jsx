import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProjectById } from '../services/projectService'
import { useBookmarks } from '../hooks/useBookmarks'
import TechBadge from '../components/TechBadge'
import EmptyState from '../components/EmptyState'

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isBookmarked, toggleBookmark } = useBookmarks()

  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Re-fetch whenever `id` changes — this matters because React Router
  // reuses the same ProjectDetails instance when navigating between two
  // /projects/:id routes (e.g. clicking a related project), so a mount-only
  // effect would show stale data instead of the new project.
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    getProjectById(id).then((data) => {
      if (isMounted) {
        setProject(data)
        setIsLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse px-4 py-10 sm:px-6">
        <div className="aspect-[16/7] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 h-8 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-3 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Project not found"
          message="This project doesn't exist or may have been removed."
          actionLabel="Browse all projects"
          onAction={() => navigate('/browse')}
        />
      </div>
    )
  }

  const bookmarked = isBookmarked(project.id)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Hero image */}
      <div className="aspect-[16/7] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Title row */}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            {project.title}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {project.description}
          </p>
        </div>

        <button
          onClick={() => toggleBookmark(project.id)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            bookmarked
              ? 'bg-brand-600 text-white hover:bg-brand-700'
              : 'border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={bookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17l-7-4-7 4V4z"
            />
          </svg>
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>

      {/* Tech stack */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>

      {/* GitHub / Live demo */}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          View on GitHub
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          View Live Demo
        </a>
      </div>

      <hr className="my-10 border-slate-200 dark:border-slate-800" />

      {/* About */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          About this project
        </h2>
        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
          {project.longDescription}
        </p>
      </section>

      {/* Features */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Key Features
        </h2>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Challenges */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Challenges & Solutions
        </h2>
        <ul className="mt-3 flex flex-col gap-2">
          {project.challenges.map((challenge) => (
            <li
              key={challenge}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
            >
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
              {challenge}
            </li>
          ))}
        </ul>
      </section>

      {/* Screenshots */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Screenshots
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.screenshots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              loading="lazy"
              className="rounded-xl border border-slate-200 dark:border-slate-800"
            />
          ))}
        </div>
      </section>

      {/* Developer info */}
      <section className="mt-10 flex items-center gap-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
        <img
          src={project.developer.avatar}
          alt={project.developer.name}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Built by
          </p>
          <p className="font-semibold text-slate-900 dark:text-white">
            {project.developer.name}
          </p>
        </div>
      </section>

      <div className="mt-10">
        <Link
          to="/browse"
          className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
        >
          &larr; Back to all projects
        </Link>
      </div>
    </div>
  )
}
