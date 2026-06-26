import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllProjects } from '../services/projectService'
import { useDebounce } from '../hooks/useDebounce'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import ProjectCard from '../components/ProjectCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import EmptyState from '../components/EmptyState'

export default function Browse() {
  // `?tech=` can arrive from the homepage's Popular Technologies links.
  // We only read it once on mount to seed the initial search term — after
  // that, the search input's own state takes over so typing doesn't fight
  // with the URL.
  const [searchParams] = useSearchParams()
  const initialTech = searchParams.get('tech') ?? ''

  const [allProjects, setAllProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(initialTech)
  const [selectedCategories, setSelectedCategories] = useState([])

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    getAllProjects().then((data) => {
      if (isMounted) {
        setAllProjects(data)
        setIsLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  // Derived list — recalculated only when the underlying data, the
  // (debounced) search term, or the selected categories actually change.
  // Search matches project name, technology, or developer name, per spec.
  const filteredProjects = useMemo(() => {
    const term = debouncedSearchTerm.trim().toLowerCase()

    return allProjects.filter((project) => {
      const matchesSearch =
        term === '' ||
        project.title.toLowerCase().includes(term) ||
        project.developer.name.toLowerCase().includes(term) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(term))

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => project.category.includes(cat))

      return matchesSearch && matchesCategory
    })
  }, [allProjects, debouncedSearchTerm, selectedCategories])

  function handleClearAll() {
    setSearchTerm('')
    setSelectedCategories([])
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Browse Projects
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          {isLoading
            ? 'Loading projects...'
            : `${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'} found`}
        </p>
      </div>

      <div className="mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <FilterSidebar
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </aside>

        <div>
          {isLoading && <LoadingSkeleton count={6} columns={3} />}

          {!isLoading && filteredProjects.length === 0 && (
            <EmptyState
              title="No matching projects"
              message="Try a different search term or clear your filters."
              actionLabel="Clear all"
              onAction={handleClearAll}
            />
          )}

          {!isLoading && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
