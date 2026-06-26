import { createContext, useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'devlaunch_theme'

export const ThemeContext = createContext(undefined)

/**
 * Reads the persisted theme preference on first load.
 * Falls back to the user's OS-level preference if nothing is stored yet,
 * so first-time visitors see a sensible default instead of always-light.
 */
function getInitialTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  // Lazy initializer runs once, synchronously, before first paint —
  // this avoids a "flash" of the wrong theme on page load.
  const [theme, setTheme] = useState(getInitialTheme)

  // Keep the <html class="dark"> toggle and localStorage in sync whenever
  // theme changes. Tailwind's dark: variant relies on this class existing
  // on a parent element (we configured `dark` as a custom variant in index.css).
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const value = { theme, toggleTheme }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
