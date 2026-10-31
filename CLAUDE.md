# CLAUDE.md — NAWAT AI Youth Lab

Static website (HTML + CSS + vanilla JS) on GitHub Pages. Product owner: Amina Benlouanas (non-developer — explain changes in plain language).

## Rules
- No frameworks, build steps, npm packages or third-party JS. Must work by opening `index.html` from disk.
- No secrets anywhere. No AI API calls. No cookies or tracking.
- Render user text with `textContent` only. Never use `innerHTML` with user input.
- No inline `<script>` or `style=""`: the CSP meta tag (`script-src 'self'; style-src 'self'`) blocks them.
- Header/footer/CSP are duplicated in each `.html` page: change all seven together.
- Follow `docs/DESIGN_SYSTEM.md` (v2: navy void, weight-400 headlines, emerald pills only for main actions, gold labels). Brand name is always NAWAT / نوات.
- Ask the product owner before pushing, changing repo visibility or any public action.

## Where things live
- `assets/js/config.js` — form links, email, site URL (editable by owner)
- `assets/data/game-data.js` — all Idea Game content (templates use `{theme} {target} {skill} {problem} {twist} {format}`)
- `assets/js/main.js` — nav, copy helper, canvas PNG card (`NAWAT.downloadCard`)
- `assets/data/planning-data.js` — canvas blocks and SMART Court goals
- `assets/js/game.js`, `builder.js`, `planning.js`, `poster.js` — one module per feature
- See `docs/ARCHITECTURE.md` for details.

## Workflow
After any change: run the checks in `docs/TESTING.md`, then update `docs/TASKS.md` and `progress.md`. Record decisions in `docs/DECISIONS.md`.
Skill: `.claude/skills/add-initiative-template` — adding themes/formats to the game.
