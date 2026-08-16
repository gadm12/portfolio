// Tailwind class strings for ProjectsSection and its subcomponents.

// ProjectsSection
export const sectionClass = "mx-auto max-w-6xl px-6 py-16";

export const headingClass =
  "mb-10 font-mono text-sm uppercase tracking-[0.2em] text-scarlet-bright";

export const listWrapperClass =
  "mt-8 divide-y divide-line border-y border-line";

export const listRowClass =
  "flex items-center justify-between gap-4 py-4";

export const listRowButtonBaseClass =
  "text-left font-semibold underline decoration-line underline-offset-4 transition hover:text-scarlet-bright hover:decoration-scarlet-bright";

export const listRowButtonActiveClass =
  "text-scarlet-bright decoration-scarlet-bright";

export const listRowButtonInactiveClass = "text-paper";

export const listRowLinksClass =
  "flex shrink-0 gap-2 font-mono text-xs uppercase tracking-wide";

// ProjectLinkButton
export const projectLinkButtonDisabledClass =
  "cursor-not-allowed border border-line px-3 py-1 text-muted";

export const projectLinkButtonClass =
  "border border-line px-3 py-1 text-gold transition hover:border-gold";

// ProjectCard
export const cardBaseClass =
  "reticle border border-line bg-panel p-6 text-scarlet";

export const cardSlideNextClass = "animate-card-slide-next";

export const cardSlidePrevClass = "animate-card-slide-prev";

export const cardHeaderRowClass =
  "flex items-baseline justify-between gap-4";

export const cardTitleClass =
  "min-w-0 truncate font-display text-3xl font-black tracking-wide text-paper";

export const cardCounterClass =
  "shrink-0 font-mono text-xs text-muted";

// Video / Image area
export const cardImageRowClass =
  "mt-5 flex items-center justify-center gap-4";

export const cardNavButtonClass =
  "shrink-0 border border-line px-3 py-6 font-display text-2xl leading-none text-paper transition hover:border-scarlet-bright hover:text-scarlet-bright";

export const cardImageFrameClass =
  "flex aspect-video w-full max-w-4xl items-center justify-center overflow-hidden border border-line bg-ink/60";

export const cardImageClass =
  "h-full w-full object-contain";

export const cardImagePlaceholderClass =
  "font-display text-5xl font-black text-line";

// Description / stack
export const cardScrollBlockClass =
  "themed-scroll mt-5 h-32 overflow-y-auto pr-2 sm:h-40";

export const cardDescriptionClass = "text-paper/70";

export const cardStackListClass =
  "mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-gold";

// Links
export const cardLinkRowClass =
  "mt-5 flex gap-5 font-mono text-sm text-paper";

// CardLink
export const cardLinkDisabledClass =
  "cursor-not-allowed text-muted";

export const cardLinkClass =
  "underline decoration-line underline-offset-4 hover:text-scarlet-bright hover:decoration-scarlet-bright";
