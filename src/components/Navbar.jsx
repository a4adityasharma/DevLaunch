import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { to: '/browse', label: 'Browse' },
  { to: '/bookmarks', label: 'Bookmarks' },
  { to: '/about', label: 'About' },
]

// Shared active/inactive styling for NavLink — kept as a function so both
// the desktop and mobile menu render links identically without duplicating
// the className logic.
function navLinkClass({ isActive }) {
  return `text-sm font-medium transition-colors ${
    isActive
      ? 'text-brand-600 dark:text-brand-400'
      : 'text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
  }`
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            D
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            DevLaunch
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile controls: theme toggle always visible, hamburger toggles menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel — only rendered when open */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
