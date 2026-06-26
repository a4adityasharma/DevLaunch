# DevLaunch

DevLaunch is a polished, interview-ready frontend-only React portfolio project. It is designed as a single-page application (SPA) where developers can discover and share various software engineering projects. The app showcases React fundamentals—like Hooks, Context API, and component composition—while delivering a responsive, accessible, and aesthetically pleasing user interface.

## Features
- **Responsive Design**: Looks great on mobile, tablet, and desktop devices.
- **Dark Mode**: Integrated dark mode support via Tailwind CSS and local storage persistence.
- **Client-Side Routing**: Fast and smooth navigation utilizing React Router v6.
- **Project Browsing & Search**: Filter and search through a rich set of mock developer projects.
- **Simulated API Integration**: Demonstrates loading and error handling with artificial network delay.
- **Bookmark System**: Save favorite projects using React Context and local storage persistence.

## Tech Stack
- **React 19**
- **Vite**
- **Tailwind CSS v4** (CSS-first config)
- **React Router DOM v6**
- **JavaScript (ES6+)**

## Folder Structure
```text
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
├── context/         # React Context for global state (Theme, Bookmarks)
├── data/            # Local JSON mock data
├── hooks/           # Custom React hooks
├── layouts/         # Layout components (e.g., MainLayout wrapping the router)
├── pages/           # Page-level components
├── services/        # Simulated async API client
├── utils/           # Utility functions
├── App.jsx          # Root component & Route configuration
├── index.css        # Tailwind setup and base styles
└── main.jsx         # Application entry point
```

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd devlaunch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Screenshots to Capture
*(Note: Capture these screenshots manually to include in your portfolio presentation)*

- **Home page (Light mode)**
- **Home page (Dark mode)**
- **Browse page with filters active**
- **Project Details page**
- **Mobile menu open**
- **Bookmarks page with items**
- **404 Not Found page**

## Future Improvements
- **Backend Integration**: Replace the simulated `projectService.js` with a real backend (e.g., Node.js/Express or Firebase).
- **Authentication**: Add user login to sync bookmarks across devices.
- **Pagination**: Implement pagination or infinite scrolling on the Browse page.
- **Unit Testing**: Add tests using Jest and React Testing Library.
- **TypeScript Migration**: Convert the codebase to TypeScript for better type safety.
