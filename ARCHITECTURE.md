# Architecture

```
/
├── index.html, initiative-game.html, planning.html, ai-toolkit.html, workshops.html, about.html, poster.html
├── assets/
│   ├── css/styles.css          shared styles (tokens at top)
│   ├── data/game-data.js       Idea Game content (window.GAME_DATA)
│   ├── js/config.js            editable settings (window.SITE_CONFIG)
│   ├── js/main.js              shared: nav, config links, copy, PNG card (window.NAWAT)
│   ├── js/game.js              Initiative Idea Game
│   ├── js/builder.js           AI Makers team idea-builder
│   ├── js/planning.js          Initiative Canvas + SMART Court + SMART builder
│   ├── data/planning-data.js   canvas blocks, SMART Court goals
│   ├── js/poster.js            poster print button
│   └── img/                    logos, favicon, WhatsApp QR, site QR
├── docs/                       PRD, design, architecture, tasks, testing, decisions
└── .github/workflows/pages.yml GitHub Pages deploy
```

## Script order on every page
`config.js` → `main.js` → page data/module. Data files are plain JS (not JSON) so the site works from `file://` without a server.

## Idea Game (rule-based generator)
1. Chips are built from `GAME_DATA` as radio inputs (native keyboard support).
2. On submit, choices are combined: theme → random `twist` + name word; format → steps, indicators, name suffix; org → roles; materials → resource plan. `{placeholders}` are filled by `fill()`.
3. "Shuffle" re-picks the twist and name word, avoiding the previous ones.
4. Output is built with `createElement` + `textContent`.
5. Copy (Clipboard API with `execCommand` fallback), Print (CSS `@media print` hides `.print-hide`), PNG via `NAWAT.downloadCard` (Canvas 2D; logo is drawn with paths, so the canvas is never "tainted" and works from `file://`).

## Idea-builder
Autosaves to `localStorage` key `nawat-ai-makers-draft-v1` (debounced 400 ms, wrapped in try/catch). Reset asks for confirmation and deletes the draft.

## Plan it page
Canvas autosaves to `nawat-canvas-v1`. The game stores its last idea in `nawat-last-idea`; the canvas fills only empty blocks from it (on button click or `planning.html?from=game`). Boxes auto-grow; print uses `field-sizing: content`. SMART builder heuristics: S = who+what+where, M = a digit in measure/what, A = checkbox, R = need filled, T = date filled.

## Security
CSP meta: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'`. Form links are only activated if they start with `https://`.
