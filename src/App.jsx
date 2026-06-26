import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { BookmarkProvider } from './context/BookmarkContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Browse from './pages/Browse'
import ProjectDetails from './pages/ProjectDetails'
import Bookmarks from './pages/Bookmarks'
import About from './pages/About'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <Routes>
          {/* MainLayout renders Navbar + Footer once; child routes render
              into its <Outlet /> via nested routes below. */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BookmarkProvider>
    </ThemeProvider>
  )
}

export default App
