/**
 * Picks which project index should be shown first when ProjectsSection mounts.
 *
 * Looks for the first project with `featured: true` in the array and returns
 * its index; falls back to `0` (the first project) if none are marked
 * featured, so the component always has a valid starting index regardless
 * of the data.
 *
 * @param {Array<{featured?: boolean}>} projects - portfolioData.projects
 * @returns {number} the index to use as the initial activeIndex
 */
export function getInitialFeaturedIndex(projects) {
  return Math.max(0, projects.findIndex((project) => project.featured))
}

/**
 * Wraps an index around the bounds of a list, so moving past either end
 * loops back to the other side instead of going out of range.
 *
 * Used by ProjectsSection's goPrev/goNext to cycle through projects:
 * `wrapIndex(activeIndex - 1, projects.length)` / `wrapIndex(activeIndex + 1, projects.length)`.
 *
 * @param {number} index - the raw (possibly out-of-range) index
 * @param {number} length - the length of the list being wrapped around
 * @returns {number} an index guaranteed to be within [0, length - 1]
 */
export function wrapIndex(index, length) {
  return (index + length) % length
}

/**
 * Determines which direction the project card should slide/animate in,
 * based on whether the destination project comes after or before the
 * currently active one in the list.
 *
 * Used when a project is selected directly from the list below the card
 * (as opposed to using the prev/next arrows, which already know their
 * own direction).
 *
 * @param {number} fromIndex - the currently active project index
 * @param {number} toIndex - the project index being navigated to
 * @returns {'next'|'prev'} the animation direction
 */
export function getDirection(fromIndex, toIndex) {
  return toIndex > fromIndex ? 'next' : 'prev'
}

/**
 * Formats a 1-based project number as a zero-padded two-digit string,
 * e.g. `padIndex(1)` -> "01", `padIndex(12)` -> "12".
 *
 * Used for both the "01 / 08" project counter and the large placeholder
 * number shown in the image frame when a project has no imageUrl.
 *
 * @param {number} n - a 1-based project number
 * @returns {string} the zero-padded two-digit string
 */
export function padIndex(n) {
  return String(n).padStart(2, '0')
}
