# SkillsSection

Renders the "Skills" section: a category filter dropdown and a fixed-size grid of skill icon tiles. When a filter narrows the list down, remaining tiles grow (up to a cap) to fill the same box height the "All" view uses, instead of leaving dead space or shrinking the box.

## File layout

```
SkillsSection/
  SkillsSection.jsx              main component — state + layout orchestration
  subComponents/
    SkillTile.jsx                  a single icon tile (or text-fallback badge)
    utilities.jsx                  constants, layout math, category helpers, the measurement hook
    skillcons.jsx                  all react-icons/si (+ one react-icons/di) icon imports and the SKILL_ICONS/FALLBACK_LABELS maps
  styles/
    tailwindStyles.jsx              exported Tailwind class-string constants
    styles.css                      placeholder — no bespoke CSS exists today
```

## How the pieces connect

`SkillsSection.jsx` is the orchestrator. It reads `const { data } = useOutletContext()` (provided by `App.jsx` from the route `loader`, `loadPortfolioData` in `src/utilities.jsx`) rather than importing `portfolio-data.json` directly. On each render it:

1. Reads `data.skills` and derives the category dropdown options via `getCategories()` and the currently-visible list via `filterSkillsByCategory()` (both in `utilities.jsx`).
2. Renders **two** grids inside a shared `wrapperRef` div: a visually hidden "measurer" grid that *always* renders every skill (unfiltered) at the fixed `BASE_TILE_SIZE`, and the real, visible grid that renders only `filtered` skills.
3. Calls `useGridMeasurements(wrapperRef, measurerRef)` — a custom hook in `utilities.jsx` that sets up a single `ResizeObserver` watching both refs — to get the wrapper's live content width and the hidden measurer's live content height. The measurer's height is a stable "what height does the full, unfiltered grid need at this screen width" reference, independent of whatever filter is currently active.
4. Feeds those dimensions into `computeGridLayout(width, height, count)` (also in `utilities.jsx`), which finds the largest square tile size (and matching column count) that fits `count` visible tiles into that same reference box — this is what makes filtered tiles grow to fill the space instead of shrinking the box.
5. Renders each visible tile as a `SkillTile`, passing it the computed `size`.

`SkillTile.jsx` itself is presentation-only: given a `skill` object and a pixel `size`, it looks up the matching icon/color from `SKILL_ICONS` (imported from `skillcons.jsx`), and renders either the icon or — for skills with no distinct brand mark, listed in `FALLBACK_LABELS` — a small text badge, plus a hover tooltip with the skill's name.

`skillcons.jsx` is intentionally *only* icon-import wiring: every `react-icons/si` (and the one `react-icons/di`, since AWS has no Simple Icons mark) import, and the two lookup tables that map a `skill.icon` string to its component + brand color. It has no logic beyond that mapping.

All static Tailwind class strings live in `styles/tailwindStyles.jsx`. Per-tile sizing (`width`/`height`/icon size/font size) is computed at runtime by `computeGridLayout` and applied as inline styles in `SkillTile.jsx`, since Tailwind classes can't express arbitrary runtime-computed pixel values — this is also why `styles/styles.css` is currently just a placeholder: there's no static CSS left to extract once the class strings are pulled into `tailwindStyles.jsx`.

## How to best leverage this component

- **Filtering categories** comes for free from the data — `getCategories()` derives the dropdown options directly from whatever `category` values exist in `data.skills`, so adding a new category to the data automatically adds it to the dropdown (see `EditSkill.md` for the full walkthrough of adding a skill).
- **The size cap** (`MAX_TILE_SIZE`, in `utilities.jsx`) exists so a category with only 1-2 skills doesn't render a comically huge icon — tune this constant if you want tiles to grow larger/smaller at the extreme end.
- **The measurer pattern** is what keeps the box a constant height regardless of filter — if you ever change the base layout (e.g. the grid's padding/gap), keep the measurer grid's wrapper classes (`measurerClass`) and the visible grid's wrapper classes (`gridBoxClass`) using the *same* padding/gap, or the width/height math in `SkillsSection.jsx` (the `- 48 - 2` adjustment) will be measuring against the wrong box.
