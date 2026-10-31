# Decisions

| # | Date | Decision | Why |
|---|---|---|---|
| 1 | 31 Oct 2026 | Plain HTML/CSS/JS, no framework or build | Fast, free hosting, easy for any volunteer to maintain; judges can read the repo quickly |
| 2 | 31 Oct 2026 | Rule-based idea generator instead of an AI API | No keys to leak, zero cost, works offline, never breaks after the hackathon |
| 3 | 31 Oct 2026 | AI literacy taught through generated prompts users copy into free tools | Users learn by applying AI to their own project, matching the field insight |
| 4 | 31 Oct 2026 | GitHub Pages via GitHub Actions; no Vercel/Netlify | One platform, free, auto-deploy on push |
| 5 | 31 Oct 2026 | Google Forms for showcase and feedback | Keeps the site static and private; owner manages responses |
| 6 | 31 Oct 2026 | Builder includes team leader, members (first names), country, roles | Owner's request; data stays in the browser until the team chooses to submit |
| 7 | 31 Oct 2026 | Game data as `.js`, not `.json` | `fetch()` of JSON fails when opening from disk |
| 8 | 31 Oct 2026 | Header/footer duplicated per page (no JS injection) | Works without JS, better SEO, no build step |
| 9 | 31 Oct 2026 | Analytics deferred (GoatCounter ready to add) | Needs an account; privacy first |
| 10 | 31 Oct 2026 | Canvas and SMART game follow TIRYAQ worksheets 3 and 10, in English | Same method as TIRYAQ trainings; the site becomes their digital companion |
| 12 | 31 Oct 2026 | Design v2: dark void style with NAWAT colours, self-hosted Inter, constellation hero | Owner's chosen reference; self-hosting keeps the strict security policy and works offline |
| 13 | 31 Oct 2026 | Body text weight 300 instead of 200 | 200 is hard to read on many Windows screens (accessibility) |
| 14 | 31 Oct 2026 | Arabic as twin static pages in `/ar/` (not JS text swapping) | Works without JavaScript, proper RTL, each language indexable by search engines, shareable links |
| 15 | 31 Oct 2026 | Self-host Noto Kufi Arabic (NAWAT brand Arabic font) | Keeps strict CSP and offline use |
| 11 | 31 Oct 2026 | Canvas pre-fills only empty blocks from the Idea Game | Never overwrites what a team wrote |
