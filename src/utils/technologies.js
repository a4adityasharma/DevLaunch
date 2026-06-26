/**
 * Small pure helper functions that derive lists from project data.
 * Keeping these in utils/ (rather than recomputing inline in components)
 * means the logic is unit-testable and reusable across pages.
 */

/**
 * Returns a sorted list of unique technologies used across all projects,
 * each with a count of how many projects use it. Used for the "Popular
 * Technologies" section on the homepage.
 * @param {Array} projects
 * @returns {Array<{ name: string, count: number }>}
 */
export function getTechnologyCounts(projects) {
  const counts = {}
  for (const project of projects) {
    for (const tech of project.techStack) {
      counts[tech] = (counts[tech] || 0) + 1
    }
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Returns the fixed list of filterable categories.
 * Kept as a constant (not derived) because we want a stable, predictable
 * filter sidebar even if a category temporarily has zero matching projects.
 */
export const FILTER_CATEGORIES = [
  'React',
  'JavaScript',
  'Python',
  'AI',
  'Web Development',
  'Security',
  'Frontend',
  'Backend',
  'Full Stack',
]
