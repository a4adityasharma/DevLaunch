import projectsData from '../data/projects.json'

/**
 * This file simulates a real API client.
 *
 * In a production app, these functions would use axios to call a real
 * backend, e.g.:
 *
 *   const res = await axios.get(`${API_BASE_URL}/projects`)
 *   return res.data
 *
 * Since DevLaunch is frontend-only, we don't have a server to call — so
 * instead we resolve from a local JSON file, but we keep the exact same
 * function signatures and async behavior (including an artificial delay)
 * that a real network request would have. This means every component that
 * calls these functions already handles loading/error states correctly,
 * and swapping in a real backend later only requires editing this one file.
 */

const SIMULATED_DELAY_MS = 300

/**
 * Simulates network latency so loading states are visible and testable.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Fetches all projects.
 * @returns {Promise<Array>} list of project objects
 */
export async function getAllProjects() {
  await delay(SIMULATED_DELAY_MS)
  return projectsData
}

/**
 * Fetches a single project by its id.
 * @param {string} id
 * @returns {Promise<Object|null>} the matching project, or null if not found
 */
export async function getProjectById(id) {
  await delay(SIMULATED_DELAY_MS)
  const project = projectsData.find((p) => p.id === id)
  return project ?? null
}

/**
 * Fetches a handful of projects to feature on the homepage.
 * Selects the highest-liked projects rather than a random/static slice,
 * so the "Featured" section reflects real signal in the data.
 * @param {number} count
 * @returns {Promise<Array>}
 */
export async function getFeaturedProjects(count = 4) {
  await delay(SIMULATED_DELAY_MS)
  return [...projectsData].sort((a, b) => b.likes - a.likes).slice(0, count)
}
