export const SOCIAL_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  email: 'Email',
  resume: 'Resume',
}

export function socialHref(key, value) {
  if (key === 'email') return `mailto:${value}`
  return value
}

export function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function earliestYear(records) {
  const years = records
    .flatMap((record) => record.dates.match(/\d{4}/g) ?? [])
    .map(Number)
  return Math.min(...years)
}
