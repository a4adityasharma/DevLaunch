import { useEffect, useState } from 'react'
import { getFeaturedProjects } from '../services/projectService'
import ProjectCard from './ProjectCard'
import LoadingSkeleton from './LoadingSkeleton'

const FEATURED_COUNT = 4

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // `isMounted` guards against setting state after the component has
    // unmounted (e.g. if the user navigates away before the simulated
    // request resolves) — avoids a React warning and a real memory-leak
    // pattern that shows up with real APIs too.
    let isMounted = true

    async function fetchFeatured() {
      try {
        setIsLoading(true)
        const data = await getFeaturedProjects(FEATURED_COUNT)
        if (isMounted) setProjects(data)
      } catch {
        if (isMounted) setError('Could not load featured projects.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchFeatured()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
              Featured Projects
            </h2>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              The most-loved projects on DevLaunch right now.
            </p>
          </div>
        </div>

        {isLoading && <LoadingSkeleton count={FEATURED_COUNT} />}

        {error && (
          <p className="text-center text-sm text-rose-500">{error}</p>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
