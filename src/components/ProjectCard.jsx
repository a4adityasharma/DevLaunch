import { Link } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks'
import TechBadge from './TechBadge'

/**
 * The card is itself a link to the project's detail page, but it also
 * contains independently-clickable buttons (GitHub, Live Demo, Bookmark).
 * Without stopPropagation, clicking those buttons would also trigger the
 * outer <Link> navigation — a common gotcha when nesting interactive
 * elements inside a clickable card.
 */
export default function ProjectCard({ project }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const bookmarked = isBookmarked(project.id)

  function handleBookmarkClick(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleBookmark(project.id)
  }

  function handleExternalLinkClick(e) {
    // Let the link open normally, just stop it bubbling up to the card's Link
    e.stopPropagation()
  }

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleBookmarkClick}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          aria-pressed={bookmarked}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white dark:bg-slate-900/90 dark:text-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={bookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className={`h-5 w-5 ${bookmarked ? 'text-brand-600 dark:text-brand-400' : ''}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17l-7-4-7 4V4z"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {project.techStack.length > 3 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-sm">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleExternalLinkClick}
              className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
            >
              GitHub
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleExternalLinkClick}
              className="text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
            >
              Live Demo
            </a>
          </div>

          <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-rose-400"
            >
              <path d="M12 21s-7.5-4.6-10-9C.5 8.5 2 4.5 6 4c2-.3 3.7.7 5 2.5C12.3 4.7 14 3.7 16 4c4 .5 5.5 4.5 4 8-2.5 4.4-10 9-10 9z" />
            </svg>
            {project.likes}
          </span>
        </div>
      </div>
    </Link>
  )
}
