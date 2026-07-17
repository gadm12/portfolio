# ContactSection

Renders the closing "call to action" section of the page: a numbered heading, a large headline, and two buttons — "Email Me" and "View Resume".

## File layout

```
ContactSection/
  ContactSection.jsx        the component
  utilities.jsx              placeholder — no helper functions exist today
  styles/
    tailwindStyles.jsx        exported Tailwind class-string constants
    styles.css                 placeholder — no bespoke CSS exists today
```

## How the pieces relate

`ContactSection.jsx` imports its class strings from `styles/tailwindStyles.jsx` (`sectionClass`, `headingClass`, `headlineClass`, `buttonRowClass`, `emailButtonClass`, `resumeButtonClass`) rather than inlining long Tailwind strings, and imports `styles/styles.css` purely so the file is wired into the build if bespoke CSS is ever needed. `utilities.jsx` is a placeholder — there is no logic in this component beyond reading two fields and conditionally rendering, so there's nothing to extract yet.

## How it gets its data

`ContactSection.jsx` reads everything from `useOutletContext()` (provided by `App.jsx` from the route `loader`, `loadPortfolioData` in `src/utilities.jsx`) rather than importing `portfolio-data.json` or the resume asset directly:

```js
const { data, resume } = useOutletContext()
```

## How it maps to `src/data/portfolio-data.json`

| JSON field | Used for |
| --- | --- |
| `contact.headline` | The large headline text. Falls back to `"Let's build something."` if empty/missing. |
| `contact.email` | Builds the `mailto:` link for the "Email Me" button. Button is omitted entirely if falsy. |

The "View Resume" button does **not** come from the JSON — it uses the `resume` value from context, the same `resume.pdf` asset resolved once by the router loader (same pattern used in `AboutSection`). The button is omitted if that value were ever falsy (it never is, since it's a bundled file).
