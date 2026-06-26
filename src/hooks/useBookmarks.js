import { useContext } from 'react'
import { BookmarkContext } from '../context/BookmarkContext'

/**
 * Access bookmark state and actions (add/remove/toggle/check).
 * Throws early if used outside <BookmarkProvider> so misuse fails loudly
 * during development instead of silently reading `undefined`.
 */
export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}
