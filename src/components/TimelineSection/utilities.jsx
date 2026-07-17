/**
 * Extracts the first 4-digit year found in a "dates" string, e.g.
 * "2022 - Present" -> "2022". Returns '' if no 4-digit year is found.
 * Used for the large year figure shown next to each timeline row.
 */
export function startYear(dates) {
  return dates.match(/\d{4}/)?.[0] ?? ''
}

/**
 * Per-variant configuration that lets one TimelineSection component render
 * either the "experience" or "education" arrays from portfolio-data.json,
 * despite their differing field names and body shape (bullet list vs. a
 * single description paragraph).
 *
 * Each variant provides:
 *   - heading: the section heading text (e.g. "Experience").
 *   - getData(data): pulls the relevant array off the full portfolioData object.
 *   - getKey(item): a stable React list key for one entry.
 *   - getTitle(item): the bolded title line (job role, or education program).
 *   - getSubtitle(item): the line under the title (employer org, or school).
 *   - getBody(item): the entry's body content. TimelineSection renders this
 *     generically based on its shape — an array renders as a bulleted list
 *     (experience bullets), a string (or undefined) renders as an optional
 *     paragraph (education description) — so no per-variant JSX branching
 *     is needed beyond this config.
 */
export const VARIANTS = {
  experience: {
    heading: 'Experience',
    getData: (data) => data.experience,
    getKey: (item) => `${item.role}-${item.org}`,
    getTitle: (item) => item.role,
    getSubtitle: (item) => item.org,
    getBody: (item) => item.bullets,
  },
  education: {
    heading: 'Education',
    getData: (data) => data.education,
    getKey: (item) => `${item.school}-${item.program}`,
    getTitle: (item) => item.program,
    getSubtitle: (item) => item.school,
    getBody: (item) => item.description,
  },
}
