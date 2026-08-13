# Mohamed Gad - Portfolio

My personal developer portfolio, built with React 19, Vite, and Tailwind CSS v4. All content - bio, socials, skills, experience, education, projects, and contact info — is driven from a single JSON file, loaded through a React Router data loader.

**Live site:** [gadm12.github.io/portfolio](https://gadm12.github.io/portfolio/)

## About me

I'm a U.S. Army veteran (11 years of service) transitioning into software development. I hold a BSIT from University of Phoenix and I'm currently attending Code Platoon, a veteran-focused software engineering bootcamp, with the goal of moving into remote software engineering work.

## Features

- **Data-driven sections** — About, Skills, Projects, Contact, Experience, and Education all render entirely from `src/data/portfolio-data.json`.
- **Filterable skills grid** — filter by category; remaining tiles grow to fill the available space instead of leaving dead space or shrinking the grid.
- **Project carousel** — a featured project card with prev/next navigation, a directional slide animation, and a scrollable description/stack block, plus a full list of every project below it.
- **Responsive nav** — a horizontal link row on medium screens and up, collapsing to a hamburger-triggered dropdown on smaller screens (including mobile).
- **Scroll-spy navigation** — the nav link for whichever section is currently centered in the viewport highlights automatically, and the URL hash silently stays in sync as you scroll (basename-aware, so it plays nicely with the GitHub Pages subpath).
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

## Content

Almost everything on the page comes from one file:

```
src/data/portfolio-data.json
```

My photo and résumé are separate static files, not JSON fields:

```
src/assets/headshot.png
src/assets/resume.pdf
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
  "skills": [
    {
      "name": "Python",
      "category": "Languages",
      "icon": "python"
    }
  ],
  "experience": [
    { "role": "", "org": "", "dates": "", "bullets": [] }
  ],
  "education": [
    {
      "school": "",
      "program": "",
      "dates": "",
      "description": ""
    }
  ],
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
│   ├── headshot.png            # my photo
│   └── resume.pdf               # my résumé
├── data/
│   └── portfolio-data.json      # the content file
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

Every component directory follows the same shape — a top-level `<ComponentName>.jsx`, a `subComponents/`/`subcomponents/` folder for anything it breaks into, `utilities.jsx` for its helper functions/hooks, a `styles/` folder (`tailwindStyles.jsx` for extracted class strings, `styles.css` for any bespoke CSS), and its own `README.md` explaining exactly how it works and how it maps to `portfolio-data.json`.

## Deploying

Deployed to GitHub Pages via GitHub Actions on every push to `main` (see `.github/workflows/`). The build uses Vite's `base: "/portfolio/"` config combined with a `basename`-aware React Router setup so deep links, scroll-spy hash updates, and hard refreshes all resolve correctly under the `/portfolio/` subpath.
