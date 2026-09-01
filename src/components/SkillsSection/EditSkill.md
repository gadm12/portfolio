# Adding, moving, or removing a skill

This is a step-by-step guide for changing which skills appear in the Skills section. No component code needs to change for a skill that already has a matching icon and belongs in one of the four existing sections — you only touch `src/data/portfolio-data.json` and, if needed, `subComponents/skillcons.jsx`. (`SkillsSection.jsx` itself reads this data via `useOutletContext()`, provided by the route loader in `src/utilities.jsx` — you don't need to touch that wiring.)

## The shape of a skill

```json
{ "name": "TypeScript", "section": "frontend", "icon": "typescript", "level": "secondary" }
```

| Field | What it does |
|---|---|
| `name` | The display name shown in the tile's tooltip. |
| `section` | Which of the four groups it renders in. **Must be one of `"backend"`, `"frontend"`, `"devops"`, `"tools"`** — see below. |
| `icon` | A key that must exist in `SKILL_ICONS` (or `FALLBACK_LABELS`) in `subComponents/skillcons.jsx`. |
| `level` | **Which row the skill lands in, and how big its tile renders**: `"primary"` (1st row, 96px), `"secondary"` (2nd row, 64px, the default), or `"supporting"` (3rd row, ~42px). Omit it and the skill is treated as `secondary`. |

Within a section, skills are split into one row per `level` — primary on top, then secondary, then supporting — and within a row they render in the order they appear in the JSON array. A level with no skills gets no row at all, so a section can hold any one or two tiers without leaving a gap.

### `section` is a closed set

The four valid values map to the `SECTIONS` array in `subComponents/utilities.jsx`:

| Value | Heading on the page |
|---|---|
| `"backend"` | Backend |
| `"frontend"` | Frontend |
| `"devops"` | DevOps |
| `"tools"` | Tools & Practices |

This is deliberately **not** auto-discovered from the data (the old `category` field was, and a typo would silently spawn a new one-item group). A value that doesn't match one of these four — or a missing `section` field — puts the skill in **Tools & Practices**, so a mistake shows up as a misfiled tile rather than a disappeared one.

To add a fifth section, add an entry to `SECTIONS` in `subComponents/utilities.jsx`:

```js
export const SECTIONS = [
  { key: 'backend', label: 'Backend' },
  // …
  { key: 'mobile', label: 'Mobile' },
]
```

The array's order is the on-page order of the sections, so this is also how you reorder them. A section with no skills is skipped entirely — no empty box left behind.

## Adding a skill that already has an icon in `skillcons.jsx`

1. Open `src/data/portfolio-data.json` and find the `skills` array.
2. Add a new object using the shape above, placing it wherever you want it to appear within its section.
3. Check `subComponents/skillcons.jsx` for that `icon` key inside the `SKILL_ICONS` object. If it's already there, you're done — save and reload the dev server.

## Adding a skill that needs a brand-new icon

1. Find the icon on [Simple Icons](https://simpleicons.org/) (react-icons' `si` set is what this project uses). Note its React component name — Simple Icons names are always `Si` + the brand name in PascalCase (e.g. "TypeScript" → `SiTypescript`).
   - If the brand isn't on Simple Icons — or react-icons' `si` set is missing it, which happens — check the other bundled sets: `di` (Devicons), `bs` (Bootstrap Icons), `ri` (Remix), `ai` (Ant Design). There are two live precedents: `DiAws` for AWS, which Simple Icons has no mark for, and `BsOpenai` for OpenAI, whose only `si` entry is `SiOpenaigym` (the RL toolkit, a different product). Prefer a *filled* glyph so it sits consistently beside the Simple Icons marks.
2. Open `subComponents/skillcons.jsx`.
3. Add the component to the `import { ... } from 'react-icons/si'` list at the top of the file (or add a separate import line for whichever other set it came from, next to the existing `react-icons/di` and `react-icons/bs` lines).
4. Add a new entry to the `SKILL_ICONS` object:
   ```js
   typescript: { Icon: SiTypescript, color: '#3178C6' },
   ```
   - The `color` should be the brand's official color. Look it up on [simpleicons.org](https://simpleicons.org/) even when the glyph came from another set — that's the canonical source used throughout this file (e.g. OpenAI is `#412991`, not black).
5. Add the matching skill object to the `skills` array as described above, using the same key (`"icon": "typescript"`).

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

## Moving a skill to a different section

Change its `section` value to one of the four keys. Nothing else — no component code, no icon changes.

## Changing how much a skill stands out

Change its `level` to `"primary"`, `"secondary"`, or `"supporting"`. This moves it to that tier's row *and* resizes it — the two always agree, because both go through `getLevel()` in `subComponents/utilities.jsx`.

This is the intended way to balance the groups visually: a section full of `supporting` skills stays compact on one small row, and promoting one skill to `primary` gives that group a prominent top row. Tile size depends *only* on level, so a `primary` skill is the same size no matter which section it sits in.

Promoting the only skill at some level creates a new row; demoting the last one removes that row and the rows below close up.

## Removing a skill

1. Delete the skill's object from the `skills` array in `src/data/portfolio-data.json`.
2. Nothing else needs to change — each section's grid derives from the array's current contents. If you remove the last skill at a given level, that level's row disappears and the remaining rows close up. If you remove the last skill in a section entirely, the whole section (heading and box) stops rendering.
3. Optional cleanup: if the removed skill's `icon` key isn't used by any other skill, you can also remove its entry from `SKILL_ICONS`/`FALLBACK_LABELS` and its now-unused import in `subComponents/skillcons.jsx` — this is just tidiness, not required for correctness.

## Verifying your change

Run the dev server (`npm run dev`), open the Skills section, and:
- Confirm the new/removed skill appears/disappears under the section heading you expect.
- If a skill lands under **Tools & Practices** when you didn't expect it to, check its `section` value for a typo — that's the fallback bucket.
- Confirm it sits in the row matching its `level` (primary top, supporting bottom) and at the matching size.
- If you gave a skill a level that isn't one of the three, it lands in the **secondary** row at 64px — check for a typo there too.
- Confirm the icon renders with the right color, or the fallback text badge shows correctly if you used one.
- Hover the tile to check the tooltip shows the right `name`.
