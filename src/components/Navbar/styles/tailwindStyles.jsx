// Tailwind class strings for Navbar.

export const navClass = 'sticky top-0 z-10 border-b border-line bg-ink/95'
export const navRowClass = 'flex items-center justify-between gap-x-6 gap-y-2 px-6 py-4'
export const brandClass = 'font-display text-xl font-black tracking-wide text-paper'

export const desktopListClass = 'hidden flex-wrap gap-x-5 gap-y-1 md:flex'
export const linkClass = 'font-mono text-xs uppercase tracking-[0.15em] text-muted transition hover:text-scarlet-bright'
// Applied alongside linkClass when a link's section is the scroll-spy active one —
// reuses the same color already used on :hover, so "active" reads as "currently hovered".
export const activeLinkClass = 'text-scarlet-bright'

export const hamburgerButtonClass = 'flex h-8 w-8 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden'
export const hamburgerBarClass = 'h-px w-6 bg-paper transition duration-200'
export const hamburgerTopBarOpenClass = 'translate-y-[7px] rotate-45'
export const hamburgerMiddleBarOpenClass = 'opacity-0'
export const hamburgerMiddleBarClosedClass = 'opacity-100'
export const hamburgerBottomBarOpenClass = '-translate-y-[7px] -rotate-45'

export const mobileMenuClass = 'flex flex-col border-t border-line bg-ink/95 px-6 py-4 md:hidden'
export const mobileMenuItemClass = 'border-b border-line py-3 last:border-b-0'
