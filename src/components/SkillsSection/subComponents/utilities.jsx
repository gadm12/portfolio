// Constants and helpers for SkillsSection. This module is deliberately
// hook-free and side-effect-free: every value here is derived from
// portfolio-data.json at render time, and nothing about the Skills section
// is interactive or measured at runtime.

/** Baseline square-tile edge length (px) for a "secondary" skill. Every
 *  other size is this scaled by the skill's LEVEL_SCALE weight. */
export const BASE_TILE_SIZE = 64

// Relative size multiplier per skill level. Skills with no `level` field
// fall back to "secondary" sizing, so this is backwards-compatible with
// any skill you haven't tagged yet.
export const LEVEL_SCALE = {
  primary: 1.5,
  secondary: 1,
  supporting: 0.65,
}

/**
 * The four fixed groups the Skills section renders, in display order. This
 * is a closed set, unlike the old auto-discovered `category` values — the
 * `section` key on each skill in portfolio-data.json must match one of
 * these `key`s. Reorder this array to reorder the on-page sections; add an
 * entry here (and use its key in the JSON) to introduce a new one.
 */
export const SECTIONS = [
  { key: 'backend', label: 'Backend' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'devops', label: 'DevOps' },
  { key: 'tools', label: 'Tools & Practices' },
]

/** Where a skill lands when its `section` is missing or doesn't match any
 *  SECTIONS key — "Tools & Practices" is the catch-all bucket. */
export const DEFAULT_SECTION = 'tools'

/**
 * The three tiers, in the order they stack as rows inside a section (top to
 * bottom, largest to smallest). Every key here must exist in LEVEL_SCALE.
 */
export const LEVELS = ['primary', 'secondary', 'supporting']

/** Where a skill lands when its `level` is missing or doesn't match a tier. */
export const DEFAULT_LEVEL = 'secondary'

/**
 * A skill's tier, normalised to a key that definitely exists in LEVEL_SCALE.
 *
 * Both the row a skill renders in and the size it renders at go through
 * this, deliberately: `level` is structural now, not just cosmetic, so a
 * typo like "primry" must not be able to put a skill in a fourth phantom
 * row while still sizing it as secondary. One accessor means grouping and
 * sizing can never disagree.
 *
 * @param {{level?: string}} skill
 * @returns {string} one of LEVELS
 */
export function getLevel(skill) {
  return Object.hasOwn(LEVEL_SCALE, skill.level) ? skill.level : DEFAULT_LEVEL
}

function levelWeight(skill) {
  return LEVEL_SCALE[getLevel(skill)]
}

/**
 * The pixel size a skill's tile renders at — the only sizing mechanism in
 * this component. Purely a function of the skill's `level`, so a "primary"
 * skill is the same size in every section, which is what makes the three
 * tiers readable as a consistent signal across the whole grid.
 *
 * @param {{level?: string}} skill
 * @returns {number} tile edge length in px (96 / 64 / 41.6 by default)
 */
export function getBaseSize(skill) {
  return BASE_TILE_SIZE * levelWeight(skill)
}

/**
 * Buckets the flat `skills` array into the four fixed sections, preserving
 * each skill's order from portfolio-data.json within its bucket.
 *
 * A skill whose `section` is missing or unrecognized is routed to
 * DEFAULT_SECTION rather than dropped — same defensive spirit as
 * levelWeight()'s fallback above, so a typo in the JSON shows up as a tile
 * in the wrong group (obvious) instead of a tile that silently vanishes
 * (not obvious).
 *
 * @param {Array<{section?: string}>} skills - portfolioData.skills
 * @returns {Record<string, Array>} one array per SECTIONS key; always
 *   contains every key, empty arrays included
 */
export function groupSkillsBySection(skills) {
  const grouped = Object.fromEntries(SECTIONS.map(({ key }) => [key, []]))

  for (const skill of skills) {
    const key = Object.hasOwn(grouped, skill.section) ? skill.section : DEFAULT_SECTION
    grouped[key].push(skill)
  }

  return grouped
}

/**
 * Splits one section's skills into rows by tier, in LEVELS order, so each
 * row holds exactly one level and every tile in it is therefore the same
 * size.
 *
 * Tiers with no skills are dropped rather than rendered empty, so a section
 * holding only primary and supporting skills renders two rows with no gap
 * where the secondary row would have been.
 *
 * @param {Array<{level?: string}>} skills - one section's skills
 * @returns {Array<{level: string, skills: Array}>} non-empty rows, largest first
 */
export function groupSkillsByLevel(skills) {
  return LEVELS.map((level) => ({
    level,
    skills: skills.filter((skill) => getLevel(skill) === level),
  })).filter((row) => row.skills.length > 0)
}
