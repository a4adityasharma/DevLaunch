import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookmarks } from '../hooks/useBookmarks'
import { getProjectById } from '../services/projectService'
import ProjectCard from '../components/ProjectCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import EmptyState from '../components/EmptyState'

export default function Bookmarks() {
  const { bookmarkedIds } = useBookmarks()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchBookmarks() {
      if (bookmarkedIds.length === 0) {
        if (isMounted) {
          setProjects([])
          setIsLoading(false)
        }
        return
      }

      setIsLoading(true)
      try {
        // Fetch all bookmarked projects in parallel
        const fetchedProjects = await Promise.all(
          bookmarkedIds.map((id) => getProjectById(id))
        )
        // Filter out any nulls if an ID somehow became invalid
        const validProjects = fetchedProjects.filter(Boolean)
        
        if (isMounted) {
          setProjects(validProjects)
        }
      } catch (error) {
        console.error('Failed to fetch bookmarked projects:', error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchBookmarks()

    return () => {
      isMounted = false
    }
  }, [bookmarkedIds])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Your Bookmarks
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Projects you've saved for later
        </p>
      </div>

      {isLoading ? (
        <LoadingSkeleton count={Math.max(1, bookmarkedIds.length)} columns={4} />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          message="You haven't saved any projects. Browse the collection to find some you like!"
          actionLabel="Browse all projects"
          onAction={() => navigate('/browse')}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

