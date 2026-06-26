import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

/**
 * Access the current theme and the function to toggle it.
 * Throws early if used outside <ThemeProvider> so misuse fails loudly
 * during development instead of silently reading `undefined`.
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
