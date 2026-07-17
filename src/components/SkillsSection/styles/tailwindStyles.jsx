// Tailwind class strings for SkillsSection and its subComponents.
// Dynamic per-tile sizing (width/height/transition/font-size, computed from
// the grid layout math) stays as inline styles in SkillTile.jsx, since those
// values are runtime-computed, not static classes.

// SkillsSection
export const sectionClass = 'mx-auto max-w-4xl px-6 py-16'
export const headerRowClass = 'mb-10 flex flex-wrap items-center justify-between gap-4'
export const headingClass = 'font-mono text-sm uppercase tracking-[0.2em] text-scarlet-bright'

export const selectWrapperClass = 'relative'
export const selectClass =
  'appearance-none border border-line bg-panel px-4 py-2 pr-9 font-mono text-xs uppercase tracking-widest text-paper transition hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold'
export const selectArrowClass = 'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted'

export const gridWrapperClass = 'relative'
export const measurerClass = 'invisible absolute inset-x-0 top-0 flex flex-wrap justify-center gap-4 p-6'
export const gridBoxClass = 'gap-4 border border-line bg-ink/40 p-6'

// SkillTile
export const tileClass = 'group relative flex shrink-0 items-center justify-center border border-line bg-paper'
export const tileFallbackLabelClass = 'font-mono font-semibold text-ink'
export const tileTooltipClass =
  'pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-line bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-paper opacity-0 transition group-hover:opacity-100'
