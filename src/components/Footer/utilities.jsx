// Logic-oriented helper functions for Footer.

/**
 * Returns the current calendar year as a number (e.g. 2026).
 *
 * Extracted from the inline `new Date().getFullYear()` call that used to live
 * directly in the JSX, so the "what year is it" logic has a single, testable,
 * documented home rather than being an unnamed expression inside the render.
 */
export function getCurrentYear() {
  return new Date().getFullYear()
}
