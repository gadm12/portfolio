# TimelineSection

A single component that renders both the "Experience" and "Education" sections of the page — same year/title/subtitle/body layout, driven by a `variant` prop (`"experience" | "education"`).

## File layout

```
TimelineSection/
  TimelineSection.jsx        the component
  utilities.jsx                startYear() helper + the VARIANTS config object
  styles/
    tailwindStyles.jsx          exported Tailwind class-string constants
    styles.css                   placeholder — no bespoke CSS exists today
```

## How the pieces relate

`TimelineSection.jsx` is a thin renderer driven entirely by `utilities.jsx`:
- `startYear(dates)` — pulls the first 4-digit year out of a `"dates"` string (e.g. `"2022 - Present"` → `"2022"`) for the large year figure next to each row.
- `VARIANTS` — the config object mapping `experience`/`education` to their data source and field accessors (`getData`, `getKey`, `getTitle`, `getSubtitle`, `getBody`). This is what lets one component serve two different JSON shapes without duplicating JSX.

The body rendering is generic, not variant-specific: `TimelineSection.jsx` checks `Array.isArray(body)` — an array (experience's `bullets`) renders as the bulleted list, anything else (education's `description`, a string or `undefined`) renders as an optional paragraph. This is why `VARIANTS.education.getBody` doesn't need its own bullet-vs-paragraph logic — it just returns the field, and the component's shape-check handles the rest.

Class strings are extracted into `styles/tailwindStyles.jsx` (e.g. `rowClass`, `yearClass`, `bulletListClass`, `descriptionClass`). `styles/styles.css` is a placeholder, imported for build-wiring consistency with the other component directories.

## How it gets its data

`TimelineSection.jsx` reads `const { data } = useOutletContext()` (provided by `App.jsx` from the route `loader`, `loadPortfolioData` in `src/utilities.jsx`) instead of importing `portfolio-data.json` directly, then calls `config.getData(data)` — `VARIANTS`' accessor functions already expect the raw JSON-shaped root object, so no change was needed there.

## How it maps to `src/data/portfolio-data.json`

| Prop | JSON source | Fields used |
| --- | --- | --- |
| `variant="experience"` | `experience[]` | `role` (title), `org` (subtitle), `dates`, `bullets` (body — rendered as a list) |
| `variant="education"` | `education[]` | `program` (title), `school` (subtitle), `dates`, `description` (body — rendered as a paragraph, omitted if empty) |

`HomePage.jsx` renders this component twice — once per variant — to produce both the "Experience" and "Education" sections seen on the page.
