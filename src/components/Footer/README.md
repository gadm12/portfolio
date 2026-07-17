# Footer

Renders the single-line site footer: a copyright notice with the current year and the site owner's name.

## File layout

```
Footer/
  Footer.jsx                the component
  utilities.jsx              getCurrentYear() helper
  styles/
    tailwindStyles.jsx        exported Tailwind class-string constant
    styles.css                 placeholder — no bespoke CSS exists today
```

## How the pieces relate

`Footer.jsx` calls `getCurrentYear()` from `utilities.jsx` (a one-line, documented wrapper around `new Date().getFullYear()`) instead of inlining that call, and reads its single class string (`footerClass`) from `styles/tailwindStyles.jsx`. `styles/styles.css` is a placeholder, imported for build-wiring consistency with the other components.

## How it gets its data

Like `Navbar`, `Footer` is rendered as a **sibling** of `<Outlet>` in `App.jsx`, not a descendant of it, so it can't use `useOutletContext()`. `App.jsx` instead passes its `useLoaderData()` result down as a `portfolioData` prop: `<Footer portfolioData={portfolioData} />` — a deliberate one-hop prop pass (not drilling), since it's the only way to reach a component outside the routed subtree.

`Footer({ portfolioData })` reads `portfolioData.data.about.name`.

## How it maps to `src/data/portfolio-data.json`

| JSON field | Used for |
| --- | --- |
| `about.name` | The name shown after the copyright year. |

No other fields are read.
