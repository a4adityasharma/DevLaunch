import TechBadge from '../components/TechBadge'

export default function About() {
  const techStack = [
    'React 19',
    'Vite',
    'Tailwind CSS v4',
    'React Router v6',
    'Context API'
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          About DevLaunch
        </h1>
        
        <div className="space-y-6">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            DevLaunch is a portfolio project designed to showcase frontend development skills, 
            focusing on creating a polished, production-ready React application without over-engineering.
          </p>
          
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Why I Built This
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              The goal was to demonstrate core React fundamentals—like Hooks, Context API, and 
              component composition—while delivering a responsive, accessible, and aesthetically 
              pleasing user interface. It simulates an asynchronous API to handle loading states 
              and gracefully manages empty states and route handling.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Tech Stack
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Built with modern, lightweight frontend tools:
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Key Features
            </h2>
            <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Responsive design that looks great on mobile, tablet, and desktop.</li>
              <li>Dark mode support via Tailwind CSS and local storage.</li>
              <li>Client-side routing with React Router v6.</li>
              <li>Simulated API calls to demonstrate loading and error handling.</li>
              <li>Bookmark system using React Context and local storage persistence.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

