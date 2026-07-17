import { useEffect, useState } from 'react'

// Base/max square-tile size (px) and the flex/grid gap (px) between tiles.
// BASE_TILE_SIZE also doubles as the size used to measure the "All filter"
// reference height (see useGridMeasurements below) and as the floor that
// computeGridLayout will never shrink a tile below.
export const BASE_TILE_SIZE = 64
export const MAX_TILE_SIZE = 200
export const GAP = 16

/**
 * Returns the sorted-by-first-appearance list of unique categories present
 * in the skills array, plus the "All" option prepended by the caller.
 *
 * @param {Array<{category: string}>} skills - portfolioData.skills
 * @returns {string[]} unique category names, in first-seen order
 */
export function getCategories(skills) {
  return [...new Set(skills.map((skill) => skill.category))]
}

/**
 * Filters the skills array down to a single category, or returns every
 * skill unfiltered when `category` is `'All'`.
 *
 * @param {Array<{category: string}>} skills - portfolioData.skills
 * @param {string} category - the selected category, or 'All'
 * @returns {Array} the filtered skill list
 */
export function filterSkillsByCategory(skills, category) {
  return category === 'All' ? skills : skills.filter((skill) => skill.category === category)
}

/**
 * Computes the largest square tile size (and matching column count) that
 * fits `count` tiles into a `containerWidth` x `containerHeight` box, so
 * that filtering down to fewer skills doesn't leave the box with lots of
 * dead space around tiny tiles — instead the tiles grow to fill it.
 *
 * Tries every possible column count from 1 to `count`, and for each one
 * computes the largest tile size that would fit that many columns within
 * the available width AND the resulting row count within the available
 * height, then picks whichever column count yields the largest tile.
 *
 * The result is clamped between BASE_TILE_SIZE (so a fully-populated "All"
 * view never shrinks below today's default tile size) and MAX_TILE_SIZE
 * (so a 1-2 skill category doesn't render an absurdly huge icon), and
 * floored to a whole pixel — flooring only ever shrinks the grid relative
 * to the container, never enlarges it, so it can't reintroduce overflow
 * from sub-pixel rounding.
 *
 * @param {number} containerWidth - available content width, in px
 * @param {number} containerHeight - available content height, in px
 * @param {number} count - number of tiles to fit
 * @returns {{size: number, columns: number}}
 */
export function computeGridLayout(containerWidth, containerHeight, count) {
  if (!containerWidth || !containerHeight || !count) {
    return { size: BASE_TILE_SIZE, columns: 1 }
  }

  let bestSize = -Infinity
  let bestColumns = 1
  for (let columns = 1; columns <= count; columns++) {
    const rows = Math.ceil(count / columns)
    const sizeByWidth = (containerWidth - (columns - 1) * GAP) / columns
    const sizeByHeight = (containerHeight - (rows - 1) * GAP) / rows
    const size = Math.min(sizeByWidth, sizeByHeight)
    if (size > bestSize) {
      bestSize = size
      bestColumns = columns
    }
  }

  const size = Math.floor(Math.min(Math.max(bestSize, BASE_TILE_SIZE), MAX_TILE_SIZE))
  return { size, columns: bestColumns }
}

/**
 * Tracks the live pixel dimensions SkillsSection needs to compute its grid
 * layout: the visible wrapper's content width, and the hidden "measurer"
 * grid's content height (see SkillsSection.jsx for why a hidden measurer
 * exists — it always renders the full unfiltered skill list at
 * BASE_TILE_SIZE, so its natural height is a stable "All filter" reference
 * height regardless of the currently-selected category).
 *
 * Both dimensions come from a single ResizeObserver watching both refs, so
 * layout stays correct across window resizes and category changes alike.
 *
 * @param {import('react').RefObject<HTMLElement>} wrapperRef - the outer wrapper (width source)
 * @param {import('react').RefObject<HTMLElement>} measurerRef - the hidden measurer grid (height source)
 * @returns {{containerWidth: number, referenceHeight: number}}
 */
export function useGridMeasurements(wrapperRef, measurerRef) {
  const [containerWidth, setContainerWidth] = useState(0)
  const [referenceHeight, setReferenceHeight] = useState(0)

  useEffect(() => {
    if (!wrapperRef.current || !measurerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === wrapperRef.current) {
          setContainerWidth(entry.contentRect.width)
        } else if (entry.target === measurerRef.current) {
          setReferenceHeight(entry.contentRect.height)
        }
      }
    })

    observer.observe(wrapperRef.current)
    observer.observe(measurerRef.current)
    return () => observer.disconnect()
  }, [wrapperRef, measurerRef])

  return { containerWidth, referenceHeight }
}
