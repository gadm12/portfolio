# Portfolio Template

A Vite + React single-page portfolio site driven entirely by one JSON file. Fork it, edit your data, deploy — no component code required to get a working portfolio live.

## Quick start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Customize your content

Everything on the page — your name, bio, skills, experience, education, projects, and contact info — comes from a single file:

```
src/data/portfolio-data.json
```

Open it and replace the sample values with your own. The app rebuilds automatically as you save (`npm run dev` hot-reloads).

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
  "socials": { "github": "", "linkedin": "", "email": "", "website": "" },
  "skills": [{ "category": "Languages", "items": ["Python", "JavaScript"] }],
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
  "contact": { "headline": "", "email": "", "resumeUrl": "" }
}
```

A few notes:

- Any field left as an empty string (`""`) is simply skipped by the UI — e.g. leave `photoUrl` blank and no broken image shows up; leave a `socials` entry blank and that link doesn't render.
- `skills` and `experience`/`education`/`projects` are all arrays — add or remove entries freely; the sections render however many items you provide.
- `featured` on a project isn't used by the layout yet — it's there if you want to extend `ProjectsSection`/`ProjectCard` to highlight certain projects.

## Project structure

```
src/
├── main.jsx              # app entry point
├── router.jsx            # "/" -> HomePage, "*" -> NotFoundPage
├── App.jsx                # layout: Navbar + page content + Footer
├── data/
│   └── portfolio-data.json  # <- the file you edit
├── pages/
│   ├── HomePage.jsx      # composes all sections in order
│   └── NotFoundPage.jsx
└── components/
    ├── Navbar.jsx
    ├── AboutSection.jsx
    ├── SkillsSection.jsx
    ├── ExperienceSection.jsx
    ├── EducationSection.jsx
    ├── ProjectsSection.jsx
    ├── ProjectCard.jsx
    ├── ContactSection.jsx
    └── Footer.jsx
```

Each section component reads only its own slice of `portfolio-data.json`, so if you want to go beyond editing content — reorder sections, restyle a component, add a new section — the code is small and self-contained enough to modify directly.

## Tech stack

- [Vite](https://vite.dev/) + [React](https://react.dev/)
- [React Router](https://reactrouter.com/) (`react-router-dom`)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`

## Available scripts

- `npm run dev` — start the local dev server with hot reload
- `npm run build` — build the production bundle to `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run oxlint

## Deploying

Not set up yet in this template — a GitHub Pages + GitHub Actions deploy workflow (matching the pattern from the React assessment) is a natural next step once you're happy with your content.
