# Portfolio Template

A single-page developer portfolio built with React 19, Vite, and Tailwind CSS v4. Every piece of content — bio, socials, skills, experience, education, projects, contact info — is loaded from one JSON file (plus two static assets for your photo and résumé) through a React Router data loader, so the site can be re-skinned for a new person without touching component code.

The current content is a working example (Francisco Avila's portfolio) — fork it, replace the data, and it's yours.

## Features

- **Data-driven sections** — About, Skills, Projects, Contact, Experience, and Education all render entirely from `src/data/portfolio-data.json`.
- **Filterable skills grid** — filter by category; remaining tiles grow to fill the available space instead of leaving dead space or shrinking the grid.
- **Project carousel** — a featured project card with prev/next navigation, a directional slide animation, and a scrollable description/stack block, plus a full list of every project below it.
- **Responsive nav** — a horizontal link row on medium screens and up, collapsing to a hamburger-triggered dropdown on smaller screens (including mobile).
- **Scroll-spy navigation** — the nav link for whichever section is currently centered in the viewport highlights automatically, and the URL hash silently stays in sync as you scroll.
- **One loader, no prop drilling** — a single React Router `loader` fetches the JSON data and resolves the photo/résumé assets once; every section reads it via `useOutletContext()` instead of importing the JSON file directly.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (`react-router-dom` v7) — data router with a route `loader`, `useLoaderData()`, and `useOutletContext()`
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- [react-icons](https://react-icons.github.io/react-icons/) (Simple Icons + Devicons) for the skill/tech-stack logos
- [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Available scripts

- `npm run dev` — start the local dev server with hot reload
- `npm run build` — build the production bundle to `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run oxlint

## Customizing the content

Almost everything on the page comes from one file:

```
src/data/portfolio-data.json
```

Open it and replace the sample values with your own — the dev server hot-reloads on save. Your photo and résumé are separate static files, not JSON fields:

```
src/assets/headshot.png   # your photo — replace this file directly
src/assets/resume.pdf     # your résumé — replace this file directly
```

Both are resolved once by the route loader (`loadPortfolioData` in `src/utilities.jsx`) alongside the JSON data, and handed to every page via React Router's `useLoaderData()`/`useOutletContext()` — see "How data flows" below.

### Schema reference

```json
{
  "about": {
    "name": "",
    "title": "",
    "tagline": "",
    "bio": "",
    "photoUrl": "",
    "location": ""
  },
  "socials": { "github": "", "linkedin": "", "email": "" },
  "skills": [{ "name": "Python", "category": "Languages", "icon": "python" }],
  "experience": [{ "role": "", "org": "", "dates": "", "bullets": [] }],
  "education": [{ "school": "", "program": "", "dates": "", "description": "" }],
  "projects": [
    {
      "title": "",
      "description": "",
      "stack": [],
      "repoUrl": "",
      "liveUrl": "",
      "imageUrl": "",
      "featured": false
    }
  ],
  "contact": { "headline": "", "email": "" }
}
```

A few notes:

- Any field left as an empty string (`""`) is simply skipped by the UI — e.g. leave `imageUrl` blank on a project and a placeholder number shows instead of a broken image; leave `repoUrl`/`liveUrl` blank and that link renders disabled instead of clickable.
- `about.photoUrl` is present in the schema but **not actually used** — the photo shown in the About section always comes from `src/assets/headshot.png` (see `src/components/AboutSection/README.md` for the full explanation). Replace that file to change the photo.
- `skills`, `experience`, `education`, and `projects` are all arrays — add or remove entries freely; the sections render however many items you provide. Each skill's `icon` key must match an entry in `src/components/SkillsSection/subComponents/skillcons.jsx` — see `src/components/SkillsSection/EditSkill.md` for a full walkthrough of adding a new skill/icon.
- `featured: true` on at most one project picks which one the Projects carousel shows first on load; it doesn't hide or filter anything — every project still appears in the list below regardless.

## How data flows

1. `src/router.jsx` defines the route tree and attaches a `loader` (`loadPortfolioData`, in `src/utilities.jsx`) to the root route. The loader imports `portfolio-data.json` and the two asset files, and returns `{ data, headShot, resume }`.
2. `src/App.jsx` (the root route's element) calls `useLoaderData()` once to get that object, then:
   - passes it as a `portfolioData` prop directly to `<Navbar>` and `<Footer>` (they're siblings of the routed page content, not descendants of it, so this one-hop prop pass is the only way to reach them), and
   - provides it to every routed page via `<Outlet context={...}>`.
3. `HomePage`/`NotFoundPage` and every section component they render (`AboutSection`, `SkillsSection`, `ProjectsSection`, `ContactSection`, `TimelineSection`) read it with `useOutletContext()` — no component below `App.jsx` imports the JSON file or the asset files directly.

## Project structure

```
src/
├── main.jsx                  # app entry point
├── router.jsx                 # route tree + the data loader
├── utilities.jsx               # loadPortfolioData() — the route loader
├── App.jsx                     # layout: Navbar + routed page content (Outlet) + Footer
├── index.css                    # global styles, Tailwind entry, shared keyframes
├── assets/
│   ├── headshot.png            # <- your photo
│   └── resume.pdf               # <- your résumé
├── data/
│   └── portfolio-data.json      # <- the file you edit
├── pages/
│   ├── HomePage.jsx             # composes all sections in order
│   └── NotFoundPage.jsx
└── components/
    ├── Navbar/
    ├── AboutSection/
    ├── SkillsSection/
    ├── ProjectsSection/
    ├── TimelineSection/         # renders both "Experience" and "Education", via a `variant` prop
    ├── ContactSection/
    └── Footer/
```

Every component directory follows the same shape — a top-level `<ComponentName>.jsx`, a `subComponents/`/`subcomponents/` folder for anything it breaks into, `utilities.jsx` for its helper functions/hooks, a `styles/` folder (`tailwindStyles.jsx` for extracted class strings, `styles.css` for any bespoke CSS), and its own `README.md` explaining exactly how it works and how it maps to `portfolio-data.json`. Start there before editing a component — each README is more detailed than this top-level one for its specific piece.

## Deploying

Not set up yet in this template — a GitHub Pages + GitHub Actions deploy workflow (matching the pattern from the React assessment) is a natural next step once you're happy with your content.
