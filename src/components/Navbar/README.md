# Navbar

Renders the sticky top navigation: a brand-mark link (initials), a horizontal link row on medium screens and up, and a hamburger-triggered dropdown panel on smaller screens (including mobile). The currently-active link — whichever section is centered in the viewport — is highlighted and kept in sync with the URL as the page is scrolled.

## File layout

```
Navbar/
  Navbar.jsx                 the component
  utilities.jsx               NAV_LINKS config, initials() helper, useCloseOnEscape() hook, useScrollSpy() hook
  styles/
    tailwindStyles.jsx         exported Tailwind class-string constants
    styles.css                  placeholder — no bespoke CSS exists today
```

## How the pieces relate

`Navbar.jsx` is a thin renderer: it holds only the `isOpen` open/closed state, calls `useScrollSpy()` for the active link, and renders the JSX. Everything else comes from `utilities.jsx`:
- `NAV_LINKS` — the array of `{ label, href }` pairs rendered in both the desktop row and the mobile panel.
- `initials(name)` — turns the portfolio owner's name into the two-letter brand mark shown at the top-left.
- `useCloseOnEscape(isOpen, onClose)` — a small custom hook that closes the mobile menu when Escape is pressed while it's open, attaching/detaching a `keydown` listener only while relevant.
- `useScrollSpy(navLinks)` — tracks which link's target section is currently centered in the viewport and returns its `href` (see "Scroll-spy" below).

All class strings live in `styles/tailwindStyles.jsx`, including `activeLinkClass` (applied alongside `linkClass` when a link is the scroll-spy's active one — it reuses the same `text-scarlet-bright` color already used on `:hover`) and the three hamburger-bar classes that get conditionally combined with `hamburgerTopBarOpenClass`/`hamburgerMiddleBarOpenClass`/`hamburgerBottomBarOpenClass` to morph the icon into an "X" when the menu is open — this is pure Tailwind `transform`/`transition` utilities, no custom CSS. `styles/styles.css` is a placeholder for consistency with the other component directories.

### Responsive behavior

- **`md` and up**: the horizontal link row (`desktopListClass`, `hidden md:flex`) is shown; the hamburger button (`md:hidden`) is not rendered.
- **Below `md` (including mobile)**: the link row is hidden, the hamburger button is shown, and clicking it toggles a bordered dropdown panel directly under the nav containing the same links stacked vertically. Clicking a link in the panel, or pressing Escape, closes it.

### Scroll-spy (active link tracking + URL sync)

`useScrollSpy` resolves each `NAV_LINKS` entry to its target section element (e.g. `/#projects` → `document.querySelector('#projects')`) and watches all of them with a single `IntersectionObserver`. The observer's `rootMargin` (`-45% 0px -45% 0px`) shrinks its effective viewport down to a thin horizontal band around the vertical center of the screen, so a section only counts as "active" while it's genuinely centered — not merely visible.

Two things happen when the centered section changes:
1. `Navbar.jsx` re-renders with the matching link's `href` marked active, applying `activeLinkClass`.
2. The address bar's hash is silently updated to match, via `window.history.replaceState(null, '', href)` — **not** react-router's `navigate`/`Link`. This matters because `replaceState` fires no event react-router listens for (only `popstate`, e.g. browser back/forward, does), so it updates the visible URL without touching react-router's `useLocation()` and without re-triggering `App.jsx`'s existing click-to-scroll effect (which watches that same location's hash and calls `scrollIntoView`). Clicking an actual nav `<Link>` still goes through react-router exactly as before, untouched by this.

If no section is currently centered (e.g. mid-transition between two sections), the previously active link is kept rather than cleared, so the highlight doesn't flicker off between sections.

**A known/expected edge case**: a short section (e.g. `Contact`, which is just a headline and two buttons) may not occupy the visual center once scrolled to — after `scrollIntoView` places it at the top of the viewport, the center band can fall into the *next* section instead. Clicking "Contact" still correctly scrolls there; the nav highlight (and URL) may then immediately hand off to whichever section is actually centered. This isn't a bug, it's the scroll-spy doing exactly what it's designed to do — track the section that's visually centered, not just the last-clicked one.

## How it gets its data

Unlike the section components, `Navbar` can't use `useOutletContext()` — in `App.jsx`, `Navbar` is rendered as a **sibling** of `<Outlet>`, not a descendant of it, so there's no Outlet context available to it. Instead, `App.jsx` calls `useLoaderData()` once (the same route `loader`, `loadPortfolioData` in `src/utilities.jsx`, that provides the Outlet context to everything else) and passes the result down as a single `portfolioData` prop: `<Navbar portfolioData={portfolioData} />`. This is a deliberate one-hop prop pass, not drilling — it's the only way to get loader data to a component outside the routed subtree.

`Navbar({ portfolioData })` then reads `portfolioData.data.about.name`.

## How it maps to `src/data/portfolio-data.json`

| JSON field | Used for |
| --- | --- |
| `about.name` | Passed to `initials()` for the brand mark, and used as its `aria-label`. |

`NAV_LINKS` is static, hand-authored component config — it is **not** derived from `portfolio-data.json`.
