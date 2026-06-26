import { FILTER_CATEGORIES } from '../utils/technologies'

/**
 * Multi-select filter list. Like SearchBar, this is controlled by the
 * parent — `selected` is the current set of active category filters, and
 * `onChange` reports the next set whenever a checkbox is toggled.
 */
export default function FilterSidebar({ selected, onChange }) {
  function toggleCategory(category) {
    if (selected.includes(category)) {
      onChange(selected.filter((c) => c !== category))
    } else {
      onChange([...selected, category])
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">
          Filter by Category
        </h3>
        {selected.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {FILTER_CATEGORIES.map((category) => (
          <label
            key={category}
            className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
          >
            <input
              type="checkbox"
              checked={selected.includes(category)}
              onChange={() => toggleCategory(category)}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400 dark:border-slate-600 dark:bg-slate-800"
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  )
}
