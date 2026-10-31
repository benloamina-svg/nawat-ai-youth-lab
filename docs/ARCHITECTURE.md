# Architecture

```
/
├── index.html, initiative-game.html, planning.html, ai-toolkit.html, workshops.html, about.html, poster.html
├── ar/                         Arabic (RTL) twins of the 6 main pages, loading ../assets
├── assets/
│   ├── css/styles.css          shared styles (tokens at top)
│   ├── data/game-data.js       Idea Game content (window.GAME_DATA)
│   ├── js/config.js            editable settings (window.SITE_CONFIG)
│   ├── js/main.js              shared: nav, config links, copy, PNG card (window.NAWAT)
│   ├── js/game.js              Initiative Idea Game
│   ├── js/builder.js           AI Makers team idea-builder
│   ├── js/planning.js          Initiative Canvas + SMART Court + SMART builder
│   ├── data/planning-data.js   canvas blocks, SMART Court goals
│   ├── data/ar/                Arabic game-data.js and planning-data.js (same keys)
│   ├── js/i18n.js              interface messages en/ar, window.t(key, vars)
│   ├── js/constellation.js     hero particle animation
│   ├── fonts/                  Inter + Noto Kufi Arabic (self-hosted)
│   ├── js/poster.js            poster print button
│   └── img/                    logos, favicon, WhatsApp QR, site QR
├── docs/                       PRD, design, architecture, tasks, testing, decisions
└── .github/workflows/pages.yml GitHub Pages deploy
```

## Script order on every page
`config.js` → `i18n.js` → `main.js` → page data/module. Data files are plain JS (not JSON) so the site works from `file://` without a server.

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

## Languages (i18n)
- `<html lang dir>` decides the language; `i18n.js` exposes `window.t(key, vars)`, `NAWAT_LANG`, `NAWAT_RTL`.
- Arabic data uses the same keys as English; `suffixFirst: true` builds names like «حملة الموجة الخضراء»; organisations carry an `inText` form for prompts.
- RTL: CSS `[dir="rtl"]` rules (Arabic font, no letter-spacing, mirrored bars/bullets); canvas PNGs draw right-aligned with `ctx.direction = 'rtl'`. All text fields use `dir="auto"` so mixed Arabic/English typing works.
- Never name a local variable `t` in scripts (it hides the translate function).

## Security
CSP meta: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'`. Form links are only activated if they start with `https://`.
