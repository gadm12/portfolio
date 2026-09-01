// Tailwind class strings for SkillsSection and its subComponents.
// Per-tile sizing (width/height/icon size/font size) stays as inline styles
// in SkillTile.jsx, since it's computed from the skill's level at render
// time and Tailwind can't express arbitrary pixel values.

// SkillsSection
export const sectionClass = 'mx-auto max-w-4xl px-6 py-16'
export const headerRowClass = 'mb-10'
export const headingClass = 'font-mono text-sm uppercase tracking-[0.2em] text-scarlet-bright'

// One fixed section (Backend / Frontend / DevOps / Tools & Practices)
export const subHeadingClass = 'mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gold'
export const dividerClass = 'my-10 border-t border-line'
export const gridBoxClass =
  'flex flex-wrap items-center justify-center gap-4 border border-line bg-ink/40 p-6'

// SkillTile
export const tileClass = 'group relative flex shrink-0 items-center justify-center border border-line bg-paper'
export const tileFallbackLabelClass = 'font-mono font-semibold text-ink'
export const tileTooltipClass =
  'pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-line bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-paper opacity-0 transition group-hover:opacity-100'
