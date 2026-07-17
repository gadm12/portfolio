# Adding or removing a skill

This is a step-by-step guide for changing which skills appear in the Skills section. No component code needs to change for a skill that already has a matching icon — you only touch `src/data/portfolio-data.json` and, if needed, `subComponents/skillcons.jsx`. (`SkillsSection.jsx` itself reads this data via `useOutletContext()`, provided by the route loader in `src/utilities.jsx` — you don't need to touch that wiring to add or remove a skill.)

## Adding a skill that already has an icon in `skillcons.jsx`

1. Open `src/data/portfolio-data.json`.
2. Find the `skills` array.
3. Add a new object to the array:
   ```json
   { "name": "TypeScript", "category": "Languages", "icon": "typescript" }
   ```
   - `name` — the display name shown in the tile's tooltip.
   - `category` — the group it's filed under in the dropdown. Reuse an existing category (e.g. `"Languages"`, `"Frontend"`, `"DevOps"`) to add it to that group, or type a brand-new string to create a new category — the dropdown picks up new categories automatically (see `getCategories()` in `subComponents/utilities.jsx`), no component code changes needed.
   - `icon` — a key that must exist in `SKILL_ICONS` (see step 4 if it doesn't yet).
4. Check `subComponents/skillcons.jsx` for that `icon` key inside the `SKILL_ICONS` object. If it's already there, you're done — save and reload the dev server.

## Adding a skill that needs a brand-new icon

1. Find the icon on [Simple Icons](https://simpleicons.org/) (react-icons' `si` set is what this project uses). Note its React component name — Simple Icons names are always `Si` + the brand name in PascalCase (e.g. "TypeScript" → `SiTypescript`).
   - If the brand isn't on Simple Icons, check `react-icons/di` (Devicons) instead — this project already uses one Devicon (`DiAws`) for AWS, which has no Simple Icons mark.
2. Open `subComponents/skillcons.jsx`.
3. Add the component to the `import { ... } from 'react-icons/si'` list at the top of the file (or add a separate `import { DiX } from 'react-icons/di'` line if it's a Devicon).
4. Add a new entry to the `SKILL_ICONS` object:
   ```js
   typescript: { Icon: SiTypescript, color: '#3178C6' },
   ```
   - The `color` should be the brand's official color (Simple Icons' site lists each brand's hex code).
5. Add the matching skill object to the `skills` array in `src/data/portfolio-data.json` as described above, using the same key (`"icon": "typescript"`).

## Adding a skill with no distinct brand mark

Some skills are a practice or spec rather than a product (e.g. `"DRF"` for Django REST Framework) and don't have a standalone logo worth rendering. For these:

1. In `subComponents/skillcons.jsx`, add an entry to `FALLBACK_LABELS` instead of `SKILL_ICONS`:
   ```js
   export const FALLBACK_LABELS = {
     drf: 'DRF',
     typescript: 'TS', // example
   }
   ```
2. Add the matching skill object to the `skills` array, using that same `icon` key. `SkillTile.jsx` automatically renders the `FALLBACK_LABELS` text badge instead of an icon whenever `SKILL_ICONS[skill.icon]` doesn't exist.

## Removing a skill

1. Open `src/data/portfolio-data.json`.
2. Delete the skill's object from the `skills` array.
3. Nothing else needs to change — the grid, category dropdown, and layout sizing all derive from the array's current contents, so removing an entry (or an entire category, if it was the last skill in that category) is reflected automatically.
4. Optional cleanup: if the removed skill's `icon` key isn't used by any other skill, you can also remove its entry from `SKILL_ICONS`/`FALLBACK_LABELS` and its now-unused import in `subComponents/skillcons.jsx` — this is just tidiness, not required for correctness.

## Verifying your change

Run the dev server (`npm run dev`), open the Skills section, and:
- Confirm the new/removed skill appears/disappears in the "All" filter.
- If you added a new category, select it from the dropdown and confirm only that skill (or group) shows.
- Confirm the icon renders with the right color, or the fallback text badge shows correctly if you used one.
