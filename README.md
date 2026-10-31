# NAWAT AI Youth Lab

**A free platform that helps youth NGOs, clubs and solo changemakers design creative, realistic initiatives — and learn to use AI tools while doing it.**

Live site: https://benloamina-svg.github.io/nawat-ai-youth-lab/

| | |
|---|---|
| **Problem** | Youth groups have motivation but lack a structure to turn "we want to do something" into a realistic plan that fits their resources. Most members use AI only to copy answers, not to plan. |
| **Solution** | An Initiative Idea Game that turns 7 choices into a full initiative card (steps, roles, indicators, zero-budget version) plus ready AI prompts, an AI Toolkit for NGOs, and the *From AI Users to AI Makers* workshop with a team idea-builder. |
| **Who** | Young people aged 18–45 in NGOs, clubs and solo initiatives worldwide. Starting with NAWAT AI and TIRYAQ NGO networks in Biskra, Algeria. |
| **Cost to run** | Zero. Static site, no server, no accounts, no API keys. |

## What's inside

| Page | What it does |
|---|---|
| `index.html` | Home: the problem, the offer, the method, impact |
| `initiative-game.html` | **Core product.** Choose theme, target group, skill, problem, format, organisation type and materials. Generates an Initiative Card with copy, print, image download, shuffle and 3 AI prompts |
| `planning.html` | **Initiative Canvas** (13-block one-page plan, pre-fills from the Idea Game, autosave, copy/print/image) and **SMART Goals game** (SMART Court quiz + live SMART goal builder that adds goals to the canvas). Based on TIRYAQ NGO participant worksheets |
| `ai-toolkit.html` | What AI is good/bad at, ChatGPT / Claude / Google AI Studio, prompt formula, prompt library, responsible use |
| `workshops.html` | *From AI Users to AI Makers* (6 activities) + team idea-builder with autosave, image download and Google Form links |
| `about.html` | Founder, NAWAT AI × TIRYAQ, email and WhatsApp QR |
| `poster.html` | Printable A4 poster with a QR code to the site |

## Languages

English at the root (`/`) and a full Arabic right-to-left version in `/ar/` (same features). A switch in the header moves between twin pages. Interface messages live in `assets/js/i18n.js`; Arabic game and planning content in `assets/data/ar/`.

## Run it locally

No installation needed.

1. Download or clone this repository.
2. Double-click `index.html` to open it in your browser.

Optional local server (closer to the live site):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Edit content (no coding knowledge needed)

| To change… | Edit this file |
|---|---|
| Google Form links, contact email, site URL | `assets/js/config.js` |
| Game themes, problems, formats, prompts, Volunteer Passport example | `assets/data/game-data.js` |
| Canvas blocks, SMART Court goals | `assets/data/planning-data.js` |
| Arabic content for the game and planning tools | `assets/data/ar/` |
| Button and message texts (English + Arabic) | `assets/js/i18n.js` |
| Instagram / Facebook links | `assets/js/config.js` |
| Page text | the matching `.html` file |
| Colours and layout | `assets/css/styles.css` (tokens at the top) |

The header and footer are repeated in every `.html` file. If you change one, change them all (search for `site-header` / `site-footer`).

## Publish on GitHub Pages

1. Create a **public** repository named `nawat-ai-youth-lab` under `benloamina-svg`.
2. Upload all files (or `git push` — see below) to the `main` branch.
3. Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` now redeploys automatically (`.github/workflows/pages.yml`). The first deploy takes 1–2 minutes.
5. Open https://benloamina-svg.github.io/nawat-ai-youth-lab/

```bash
git init -b main
git add .
git commit -m "Initial release: NAWAT AI Youth Lab"
git remote add origin https://github.com/benloamina-svg/nawat-ai-youth-lab.git
git push -u origin main
```

If you use a different repository name, update `siteUrl` in `assets/js/config.js`, the canonical/Open Graph URLs in the `.html` files, and regenerate `assets/img/site-qr.png`.

## Security and privacy

- No API keys, passwords or tokens exist in this project, and none are needed. `.gitignore` blocks `.env` and key files anyway.
- No cookies, no tracking, no backend. The idea-builder draft is stored only in the visitor's own browser (`localStorage`).
- A Content Security Policy blocks external scripts; all user text is inserted with `textContent` (no HTML injection).
- External links open in a new tab with `rel="noopener noreferrer"`.

## Project docs

`CLAUDE.md` (AI assistant guide) · `docs/PRD.md` · `docs/DESIGN_SYSTEM.md` · `docs/ARCHITECTURE.md` · `docs/TASKS.md` · `docs/TESTING.md` · `docs/DECISIONS.md` · `progress.md`

## Team and who built what

| Who | What they did |
|---|---|
| **Amina Benlouanas** — founder, NAWAT AI Youth Lab | Product owner: problem and insight from field work in Biskra, requirements (`docs/PRD.md`), workshop methodology, all content and initiative templates, design direction, Google Forms, testing and publishing. |
| **Claude (Anthropic), AI assistant** | Development partner: wrote the HTML/CSS/JavaScript and documentation from Amina's requirements, ran automated browser tests. Disclosed openly in the spirit of the platform: use AI, don't hide it. |

Partner: **TIRYAQ NGO** (Biskra) — the Initiative Canvas and SMART game are based on its participant worksheets.

Hackathon submission texts: `docs/SUBMISSION.md` · demo script: `docs/DEMO_SCRIPT.md` · pitch deck: `docs/NAWAT-AI-Youth-Lab-pitch.pdf`

## Credits

Fonts: Inter and Noto Kufi Arabic (SIL Open Font License, `assets/fonts/`). Licence: MIT (see `LICENSE`).
