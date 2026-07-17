# ProjectsSection

Renders the "Projects" section of the page: a large featured-project card with prev/next navigation and a slide animation, followed by a plain list of every project with quick "Site"/"Repo" links.

## File layout

```
ProjectsSection/
  ProjectsSection.jsx              main component — state + orchestration
  subcomponents/
    ProjectCard.jsx                  the large featured-project display card
    CardLink.jsx                     "Live"/"Repo" link-or-disabled-span, used inside ProjectCard
    ProjectLinkButton.jsx            "Site"/"Repo" link-or-disabled-span, used inside the project list rows
    utilities.jsx                    all helper functions, documented
  styles/
    tailwindStyles.jsx                exported Tailwind class-string constants
    styles.css                        relocated component-scoped CSS (see below)
```

## How the pieces connect

`ProjectsSection.jsx` owns all the state — `activeIndex` (which project is shown in the card) and `direction` (which way the card should slide) — and renders two things: one `ProjectCard` for the currently-active project, and a list of every project underneath it.

- **`subcomponents/ProjectCard.jsx`** is the big card: title, a counter ("01 / 08"), prev/next arrow buttons, an image (or a placeholder number if `imageUrl` is empty), a scrollable description + tech-stack block, and Live/Repo links. It receives the active project and the `onPrev`/`onNext`/`direction` callbacks as props — it holds no state of its own.
- **`subcomponents/CardLink.jsx`** and **`subcomponents/ProjectLinkButton.jsx`** look almost identical (both render a link if `href` is truthy, or a disabled-looking span if not) but are kept as two separate components because they're styled differently for two different contexts: `CardLink` matches the underlined-text style used inside the big card ("Live →" / "Repo →"), while `ProjectLinkButton` matches the small bordered-button style used in the plain list rows below ("Site" / "Repo"). Merging them would require passing a style-variant prop for no real benefit, since neither is used outside its one context.
- **`subcomponents/utilities.jsx`** holds every helper function used by both `ProjectsSection.jsx` and `ProjectCard.jsx`: `getInitialFeaturedIndex`, `wrapIndex`, `getDirection`, and `padIndex` (see their doc comments in the file for exactly what each does).
- **`styles/tailwindStyles.jsx`** holds every Tailwind class string used across all of the above, so no component inlines long class strings.
- **`styles/styles.css`** holds CSS that used to live globally in `src/index.css`: the `.themed-scroll` scrollbar theming and the `.animate-card-slide-next`/`-prev` slide-in animation + their `@keyframes`. These were relocated here because they're used exclusively by `ProjectCard.jsx` — nothing else in the app references them. (`.reticle` and `.animate-hero-rise`, by contrast, remain global in `src/index.css` because `AboutSection` and `NotFoundPage` also depend on them.)

## How it reads from `src/data/portfolio-data.json`

`ProjectsSection.jsx` reads `const { data } = useOutletContext()` (provided by `App.jsx` from the route `loader`, `loadPortfolioData` in `src/utilities.jsx`) rather than importing the JSON directly, then uses `data.projects`. Everything comes from that array. Each project object maps like this:

| JSON field | Used for |
| --- | --- |
| `title` | The card's heading, and the label in the list row below |
| `description` | The paragraph inside the card's scrollable block |
| `stack` (array) | The tag list under the description |
| `imageUrl` | The image shown in the card's image frame; if empty/falsy, a large placeholder number (the project's position, e.g. "05") is shown instead |
| `liveUrl` | Powers both the card's "Live" link and the list row's "Site" button; if empty, both render as disabled instead of a link |
| `repoUrl` | Powers both the card's "Repo" link and the list row's "Repo" button; same disabled-if-empty behavior |
| `featured` | Only affects which project is shown **first** when the page loads (via `getInitialFeaturedIndex` — the first project with `featured: true`, or index `0` if none are marked). It does **not** filter or hide anything — every project always appears in the list below regardless of this flag. |

## Adding or removing a project

No component code needs to change — everything derives from the array's length and content.

**To add a project**, append a new object to the `projects` array in `src/data/portfolio-data.json`:

```json
{
  "title": "My New Project",
  "description": "A short description of what it does.",
  "stack": ["React", "Node.js"],
  "repoUrl": "https://github.com/you/repo",
  "liveUrl": "https://example.com",
  "imageUrl": "",
  "featured": false
}
```

- `title`, `description`, and `stack` are effectively required — `title`/`description` render as-is, and `stack` is mapped over to render tags (an empty array just renders no tags, but the key should exist).
- `repoUrl`, `liveUrl`, and `imageUrl` are optional in practice — leave them as empty strings `""` if you don't have a link/image yet, and the UI degrades gracefully (disabled links, placeholder number).
- Set `featured: true` on **at most one** project if you want it to be the one shown when the page first loads. If you set it on more than one, only the first match (in array order) is used for the initial card; if none are `true`, the first project in the array is used.

**To remove a project**, delete its object from the array. The list below and the card's prev/next cycling (`wrapIndex`) automatically adjust to the new length — if the removed project was the initially-featured one, the component falls back to index `0`.

**To reorder projects**, just reorder the array — the list below and the prev/next navigation both follow array order.
