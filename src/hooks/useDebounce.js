import { useEffect, useState } from 'react'

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms
 * have passed without `value` changing. Used on the search input so we
 * don't re-filter the entire project list on every single keystroke —
 * only after the user pauses typing.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // If `value` changes again before the timeout fires, this cleanup
    // cancels the stale timeout — otherwise we'd briefly flash an outdated
    // intermediate value before the latest one lands.
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}
