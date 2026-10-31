---
name: add-initiative-template
description: Use when adding or editing themes, formats, materials, organisation types or AI prompts in the NAWAT AI Initiative Idea Game.
---

# Add content to the Initiative Idea Game

All content lives in `assets/data/game-data.js`. Do not change `assets/js/game.js` for content.

1. **New theme:** add a key under `themes` with `label`, 3 `problems`, 3 `twists` (creative activity angles, written to follow "through …"), and 4 `names`.
2. **New format:** add under `formats` with `label`, `suffix` (used in the name), 5 `steps` and 3 `indicators`. Use only these placeholders: `{theme} {target} {skill} {problem} {twist} {format}`, plus `{aformat}` / `{Aformat}` for "a/an + format".
3. **New prompt:** add to `prompts` with `title` and `text`; prompts may also use `{name} {org} {materials}`. Follow Role + Context + Task + Format + Constraints.
4. Keep strings in simple English, ≤ 200 characters per step.
5. Verify: open `initiative-game.html`, select the new option, generate twice, check no `{placeholder}` remains visible, and the console has no errors.
6. Update `docs/TASKS.md` and `progress.md`.
