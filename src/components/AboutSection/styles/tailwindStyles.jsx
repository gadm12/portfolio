// Tailwind class strings shared across AboutSection and its sub-components.
// Pulled out here so subComponents/*.jsx stay readable and classes aren't duplicated.

export const sectionClass =
  'mx-auto grid max-w-4xl gap-12 px-6 py-24 md:grid-cols-[1.3fr_1fr] md:items-center'

// AboutHeader
export const headerWrapperClass = 'animate-hero-rise'
export const eyebrowClass = 'font-mono text-xs uppercase tracking-[0.2em] text-scarlet-bright'
export const headingClass =
  'mt-3 font-display text-6xl leading-[0.95] font-black tracking-wide text-paper sm:text-7xl'
export const roleClass = 'mt-4 font-mono text-lg uppercase tracking-widest text-gold'
export const taglineClass = 'mt-3 text-lg text-muted italic'
export const bioClass = 'mt-4 max-w-lg text-paper/80'
export const socialListClass = 'mt-8 flex flex-wrap gap-x-6 gap-y-2'
export const socialLinkClass =
  'font-mono text-sm uppercase tracking-wider text-paper underline decoration-line underline-offset-4 transition hover:decoration-scarlet-bright hover:text-scarlet-bright'

// IdCard
export const idCardWrapperClass = 'reticle animate-hero-rise border border-line bg-panel p-6 text-scarlet'
export const idCardBodyClass = 'text-paper'
export const idPhotoClass = 'mb-6 h-20 w-20 object-cover'
export const idInitialsClass =
  'mb-6 flex h-20 w-20 items-center justify-center border border-line font-display text-2xl font-black text-gold'
export const idListClass = 'space-y-3 font-mono text-sm'
export const idRowClass = 'flex justify-between gap-4 border-b border-line pb-3'
export const idRowLastClass = 'flex justify-between gap-4'
export const idLabelClass = 'text-muted uppercase tracking-widest'
export const idValueClass = 'text-right text-paper'
