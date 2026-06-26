import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/**
 * Layout route component. Navbar and Footer mount once and persist across
 * navigation; <Outlet /> renders whichever page component matches the
 * current route. This avoids re-rendering the chrome on every page change
 * and keeps each page component focused only on its own content.
 */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
