/**
 * Small reusable pill for displaying a single technology name.
 * Used inside ProjectCard, ProjectDetails, and the homepage's
 * Popular Technologies section — kept as its own component so the
 * styling only has to be defined once.
 */
export default function TechBadge({ name }) {
  return (
    <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
      {name}
    </span>
  )
}
