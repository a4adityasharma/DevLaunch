import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../services/projectService'
import { getTechnologyCounts } from '../utils/technologies'

const MAX_TECHS_SHOWN = 8

export default function PopularTechnologies() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let isMounted = true
    getAllProjects().then((data) => {
      if (isMounted) setProjects(data)
    })
    return () => {
      isMounted = false
    }
  }, [])

  // Recomputing tech counts is cheap here (20 projects), but useMemo is the
  // correct habit: it documents "this is derived data, not raw state" and
  // avoids recalculating on every re-render once `projects` stops changing
  // (e.g. if a parent re-renders this for an unrelated reason).
  const techCounts = useMemo(() => getTechnologyCounts(projects), [projects])

  if (techCounts.length === 0) return null

  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Popular Technologies
        </h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          What developers on DevLaunch are building with.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {techCounts.slice(0, MAX_TECHS_SHOWN).map((tech) => (
            <Link
              key={tech.name}
              to={`/browse?tech=${encodeURIComponent(tech.name)}`}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-400"
            >
              {tech.name}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                {tech.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
