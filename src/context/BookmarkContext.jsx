import { createContext, useEffect, useState } from 'react'

const BOOKMARKS_STORAGE_KEY = 'devlaunch_bookmarks'

export const BookmarkContext = createContext(undefined)

/**
 * Reads persisted bookmark IDs on first load.
 * We store only an array of project ids (not full project objects) — the
 * project data itself always comes from projectService, so there's a single
 * source of truth and no risk of a bookmarked project's stored data going
 * stale relative to the "real" data.
 */
function getInitialBookmarks() {
  try {
    const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    // If localStorage has malformed JSON (e.g. corrupted manually), fail
    // safe with an empty list rather than crashing the whole app.
    return []
  }
}

export function BookmarkProvider({ children }) {
  const [bookmarkedIds, setBookmarkedIds] = useState(getInitialBookmarks)

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarkedIds))
  }, [bookmarkedIds])

  function isBookmarked(projectId) {
    return bookmarkedIds.includes(projectId)
  }

  function addBookmark(projectId) {
    setBookmarkedIds((prev) =>
      prev.includes(projectId) ? prev : [...prev, projectId]
    )
  }

  function removeBookmark(projectId) {
    setBookmarkedIds((prev) => prev.filter((id) => id !== projectId))
  }

  function toggleBookmark(projectId) {
    setBookmarkedIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    )
  }

  const value = {
    bookmarkedIds,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
  }

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}
