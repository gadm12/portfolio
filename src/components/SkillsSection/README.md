# SkillsSection

Renders the "Skills" section: four fixed groups — **Backend**, **Frontend**, **DevOps**, **Tools & Practices** — each with its own heading and grid of skill icon tiles, separated by a horizontal rule. Every tile's size comes from its skill's `level`, so the three tiers read as a consistent visual signal across all four groups.

There is no filter UI and no runtime state. Grouping and emphasis are both edited by hand in `src/data/portfolio-data.json`.

## File layout

```
SkillsSection/
  SkillsSection.jsx              main component — groups the data and renders the four sections
  subComponents/
    SkillTile.jsx                  a single icon tile (or text-fallback badge)
    utilities.jsx                  the SECTIONS config, grouping helper, and level-based sizing
    skillcons.jsx                  all react-icons/si (+ one react-icons/di) icon imports and the SKILL_ICONS/FALLBACK_LABELS maps
  styles/
    tailwindStyles.jsx              exported Tailwind class-string constants
    styles.css                      placeholder — no bespoke CSS exists today
```

## How the pieces connect

`SkillsSection.jsx` reads `const { data } = useOutletContext()` (provided by `App.jsx` from the route `loader`, `loadPortfolioData` in `src/utilities.jsx`) rather than importing `portfolio-data.json` directly. On each render it:

1. Calls `groupSkillsBySection(data.skills)` (in `utilities.jsx`) to bucket the flat skills array into the four groups, preserving each skill's order from the JSON within its bucket.
2. Filters `SECTIONS` down to the groups that actually have skills, so an emptied-out group doesn't leave a bare bordered box and a stray divider on the page.
3. Renders each remaining group as a heading plus a flex-wrap grid, with an `<hr>` before every group *except* the first.
4. Sizes each tile with `getBaseSize(skill)` — `BASE_TILE_SIZE` (64px) scaled by the skill's `LEVEL_SCALE` weight.

It holds no state and uses no hooks beyond `useOutletContext`.

`SkillTile.jsx` is presentation-only: given a `skill` object and a pixel `size`, it looks up the matching icon/color from `SKILL_ICONS` (imported from `skillcons.jsx`), and renders either the icon or — for skills with no distinct brand mark, listed in `FALLBACK_LABELS` — a small text badge, plus a hover tooltip with the skill's name.

`skillcons.jsx` is intentionally *only* icon-import wiring: every `react-icons/si` (and the one `react-icons/di`, since AWS has no Simple Icons mark) import, and the two lookup tables that map a `skill.icon` string to its component + brand color. It has no logic beyond that mapping.

All static Tailwind class strings live in `styles/tailwindStyles.jsx`. The one thing that can't be a class is per-tile sizing (`width`/`height`/icon size/font size), which is computed from the skill's level and applied as an inline style in `SkillTile.jsx` — this is also why `styles/styles.css` is currently just a placeholder.

## Sizing

`LEVEL_SCALE` in `utilities.jsx` is the **only** sizing mechanism:

| `level` | multiplier | rendered size |
|---|---|---|
| `primary` | 1.5 | 96px |
| `secondary` | 1 (default) | 64px |
| `supporting` | 0.65 | ~42px |

A skill with no `level` field falls back to `secondary`. Because the size depends on nothing but the level, a `primary` tile in Backend is exactly the same size as a `primary` tile in Tools & Practices — that cross-section consistency is what makes the tiers legible as a ranking rather than as an artifact of how many skills happen to be in a group.

> **A note on what used to be here.** This component previously rendered a hidden "measurer" grid and binary-searched (`computeGridLayout`) for the largest tile size that would fit the *filtered* skills into the height the *unfiltered* grid needed — that's what made a narrowed-down category grow its tiles instead of leaving dead space. That machinery only did real work because the visible set differed from the measured set. With fixed sections, each group measures exactly what it renders, so the search provably converges to scale 1.0 and returns the level-scaled base sizes at every breakpoint. It was removed rather than kept as a no-op. If you ever reintroduce something that makes the visible set differ from the measured set, that's when the measurer earns its place again.

## How to best leverage this component

- **Reordering the sections** on the page is a matter of reordering the `SECTIONS` array in `utilities.jsx` — the headings, grids, and dividers all follow it.
- **Adding a fifth section** takes two edits: an entry in `SECTIONS` (`{ key, label }`), and that `key` on the relevant skills in the JSON. Unlike the old `category` field, section keys are a **closed set** — they are not auto-discovered from the data, because a typo would otherwise silently create a new one-item group.
- **A typo'd or missing `section`** doesn't drop the skill. `groupSkillsBySection` routes it to `DEFAULT_SECTION` (`tools`), so it shows up in the wrong group — visible and fixable — instead of vanishing.
- **Balancing the groups visually** is done with `level`, not with counts. A group with a lot of `supporting` skills stays compact because those tiles are ~42px; promote one to `primary` to give a group more presence.

See `EditSkill.md` for the step-by-step walkthrough of adding, moving, or removing a skill.
