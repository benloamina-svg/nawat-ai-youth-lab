# Product Requirements Document (PRD)
## NAWAT AI Youth Lab — Initiative & AI Literacy Platform for NGOs and Youth Groups

**Version:** 2.0 (supersedes v1 "From AI Users to AI Makers — Workshop Website")
**Status:** Approved for build — hackathon submission deadline **tonight (31 Oct 2026)**
**Product owner:** Amina Benlouanas, Founder of NAWAT AI Youth Lab
**Brand:** NAWAT AI Youth Lab (primary) · TIRYAQ NGO (proposing organisation / partner)
**Product type:** Static, multi-page website hosted on GitHub Pages
**Language:** English

---

## 1. Product overview

A free, open website that helps youth-led NGOs, clubs and individual changemakers **come up with creative, realistic initiatives** and **learn to use AI tools well while doing it**.

The site combines four things:
1. **NAWAT AI Youth Lab**: who we are and why AI literacy matters for youth organisations.
2. **Initiative Idea Game**: the core product. Users pick a theme, target group, skills, problem, format, organisation type and available materials. The game proposes a complete, feasible initiative, including zero-budget versions.
3. **AI Toolkit for NGOs**: practical guidance and ready-to-copy prompts for ChatGPT, Claude and Google AI Studio, generated from the user's own initiative choices.
4. **Workshops and events**: including the flagship *From AI Users to AI Makers* workshop (proposed for the Pan African Youth Forum 2026), with its interactive team idea-builder.

## 2. Problem and insight (Judging criterion 1)

**The problem.** Youth NGOs and clubs, especially small, volunteer-run ones, repeat the same few activity types. They struggle to design initiatives that are creative, match a real community problem, and can be run with the resources they actually have. At the same time, most members use AI only to "ask for answers". They rarely use it as a thinking partner for planning, so AI tools don't help them design better projects.

**Who has it.**
- Youth NGO leaders and project coordinators planning their next activity.
- University and school clubs with motivated members but no programme design experience.
- Individual young changemakers ("solo") who want to start something but don't know where.

**Insight (from NAWAT AI and TIRYAQ field work in Algeria).**
- Young people rarely lack motivation. What they lack is a **structure** that turns "we want to do something" into a concrete, scoped plan.
- **Resources are the real constraint.** Ideas must start from what is available (a room, phones, volunteers) rather than assuming a budget.
- Youth learn AI best **by applying it to their own real project**, not through abstract lectures.

## 3. Goals

1. A first-time visitor understands what the site offers in under 30 seconds.
2. A user generates a usable initiative idea in **under 3 minutes**, with no account.
3. Every generated idea comes with **AI prompts** to develop it further, so AI literacy is learned by doing.
4. Workshop teams can complete the AI Makers idea-builder in 5–10 minutes on a phone.
5. Another developer can understand, run and extend the repo in under 15 minutes.

## 4. Target users

- **Primary:** young people aged 18–45 worldwide, active in NGOs, clubs, student associations or solo initiatives.
- **Secondary:** workshop participants (Pan African Youth Forum and NAWAT AI / TIRYAQ workshops), forum organisers, partners and potential funders.
- **Assumed context:** mixed AI experience, beginner to intermediate; mostly laptop/desktop for this release (demo video plus judges), but fully usable on phones.

## 5. Core message

**Don't just use AI. Make something meaningful with it.**
Method: **Problem → AI → Solution → Action**

## 6. Site map

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | NAWAT AI Youth Lab intro, problem, what the site offers, CTA to the game |
| Initiative Idea Game | `initiative-game.html` | Core product: selection-based initiative generator |
| Plan it | `planning.html` | Initiative Canvas (13 blocks) + SMART Goals game |
| AI Toolkit for NGOs | `ai-toolkit.html` | Responsible AI basics, tool guides, prompt library |
| Workshops & Events | `workshops.html` | AI Makers workshop (6 activities, idea-builder) + other workshops/events |
| About | `about.html` | Founder bio, NAWAT AI, TIRYAQ partnership, contact |
| QR Poster | `poster.html` | Printable A4 poster with QR code for rooms and events |

Shared navigation and footer on every page. The footer shows NAWAT AI Youth Lab with TIRYAQ NGO as partner, WhatsApp and email contact, and the privacy note.

## 7. Features and requirements

### 7.1 Initiative Idea Game (core, MUST)
Users choose from short option lists (chips/cards, keyboard accessible):

| Selection | Example options |
|---|---|
| Theme | Education, Employment, Entrepreneurship, Climate & environment, Health & wellbeing, Culture & heritage, Civic participation, Digital & AI literacy, Women's empowerment, Volunteering |
| Target group | Pupils, University students, Unemployed youth, Women & girls, Rural youth, Volunteers, Teachers, General public |
| Skills to build | Leadership, Communication & public speaking, Digital & AI skills, Teamwork, Critical thinking, Project management, Creativity |
| Problem to solve | Free text, plus suggestions filtered by theme |
| Format | Workshop, Event, Conference, Campaign, Competition/game, Ongoing programme |
| Organisation type | NGO, Club, Solo |
| Available materials | Nothing / phones only / room + projector / computers + internet / small budget / partners |

**Output, an "Initiative Card":**
- A catchy initiative name and one-line pitch.
- Problem it addresses, target group, skills built.
- Format plan: 3–5 concrete activity steps adapted to the chosen format.
- **Material mode:** a "with what you have" version, plus a "zero-budget" alternative when materials are limited.
- Team roles suited to the organisation type (NGO / club / solo).
- Success indicators (2–3 simple, measurable ones).
- **"Develop it with AI":** 3 ready-to-copy prompts pre-filled with the user's choices (plan, promo post, feedback survey).
- Buttons: *Shuffle another idea*, *Copy*, *Print*, *Download as image*.

**Built-in example:** *Volunteer Passport*, a programme where young volunteers collect stamps and reflections for each activity, building a verifiable record of skills.

**How it works:** rule-based generation from curated data. Templates combine the user's choices; there is no AI API, no key and no cost, so it works offline and is safe to host publicly.

### 7.2 AI Toolkit for NGOs (MUST)
- What AI is good and bad at for NGO work (short, practical).
- Tool cards: **ChatGPT, Claude, Google AI Studio**, with what each is useful for and free access notes.
- **Prompt library** by NGO task: planning an initiative, writing a funding concept note, social media posts, survey design, meeting summaries, translating materials.
- A prompt formula: *Role + Context + Task + Format + Constraints*.
- Responsible-use checklist: verify facts, protect personal data, check bias, keep human judgement.

### 7.3 Workshops & Events (MUST)
- **From AI Users to AI Makers** (flagship). Participatory, not a lecture; individual and small multicultural group challenges:
  1. AI Reality Check: quick interactive activity on how participants currently use AI.
  2. Challenge Mapping: identify a real problem affecting youth, education, employment, entrepreneurship or communities.
  3. AI Challenge Lab: experiment with AI tools and prompting techniques.
  4. Build & Create: develop a simple solution concept, prototype or action plan.
  5. African Solutions Showcase: present and receive peer feedback.
  6. Commitment to Action: one way to apply the learning after the forum.
  The methodology emphasises peer learning, cross-country collaboration and knowledge exchange. No activity timings shown.
- **Team idea-builder** (from v1, improved). Fields: team name, country/countries, team leader, team members (first names), roles in the team, challenge, who is affected, how AI could help, solution idea, next action. Actions: Copy, Print, **Download as image**. Placeholder examples use "Amina — Algeria".
- **Auto-save draft** in the visitor's own browser (localStorage). Nothing leaves the device.
- **Submit to showcase** button → Google Form link (opens in new tab).
- **Feedback survey** button → Google Form link.
- Other NAWAT AI / TIRYAQ workshops listed as cards (e.g. AI tools workshops, "From Idea to Initiative"). No dates or venues unless confirmed.

### 7.4 About & Contact (MUST)
- Founder bio: Amina Benlouanas (text provided by product owner).
- NAWAT AI Youth Lab mission; TIRYAQ NGO as partner.
- Contact: email (mailto link) and WhatsApp group QR image.

### 7.4b Initiative Canvas & SMART Goals game (MUST, added 31 Oct)
Page `planning.html`, based on TIRYAQ NGO participant worksheets 3 (SMART) and 10 (One-Page Canvas).
- **Initiative Canvas:** 13 blocks (Problem, Target group, Solution, Overall goal, SMART objectives, Activities, Team, Resources, Budget, Indicators, Communication, Documentation, Next step) with hints, progress bar and autosave on the device. "Fill from my Idea Game card" pre-fills empty blocks from the last generated idea (also via the game's "Plan it on the Initiative Canvas" button). Copy, Print (canvas only), Download as image.
- **SMART Court:** 6 weak goals; players select the letters each goal fails, get the explanation and a SMART version; score at the end.
- **SMART Builder:** who / where / what / measure / by when / need / achievable; live S-M-A-R-T badges, composed goal sentence, "Add to my canvas".

### 7.5 QR Poster (SHOULD)
- Printable A4 page: title, one-line pitch, QR code image linking to the live site, logos.

### 7.6 Facilitator mode (COULD, only if time allows)
- Full-screen activity view with a countdown timer for the six workshop steps.

### 7.7 Analytics (COULD)
- Privacy-friendly, cookie-free visitor counting (e.g. GoatCounter, free). Off unless an account is created; no personal data collected.

## 8. Out of scope (this release)
- User accounts, logins, databases or a backend.
- Live AI API calls (no secret keys anywhere in the project).
- Arabic/French versions (planned next).
- Official forum logos, dates, venue or registration.

## 9. Design direction
- Follow the **NAWAT AI design system** (navy `#0A1628`, green `#00C07A`, yellow `#F0B429`, ice `#EBF4FF`), with bold typography, cards and generous spacing.
- **Subtle geometric African-inspired patterns** as background accents only. No stock photos.
- Logos: NAWAT AI (primary) and TIRYAQ (partner).
- Details recorded in `docs/DESIGN_SYSTEM.md`.

## 10. Technical requirements (Judging criterion 3)
- **Stack:** HTML, CSS and vanilla JavaScript. No framework, no build step, no third-party JS libraries.
- **Structure:** `assets/css/`, `assets/js/` (one module per feature), `assets/data/` (themes, options, templates, prompts as editable JS data files, so the site also works when opened directly from disk).
- Content editable without coding knowledge: text in HTML, game options in clearly labelled data files.
- Image download built with the browser's native Canvas API (no library).
- **Hosting:** GitHub Pages from the `main` branch, auto-deployed on push via GitHub Actions. Public `*.github.io` address. Vercel/Netlify not needed.
- **Security:**
  - No API keys, passwords, tokens or admin secrets in the repo. None are needed.
  - `.gitignore` excludes `.env*`, OS/editor files and local notes.
  - No personal data collected; external links (Google Forms, WhatsApp) open in new tabs with `rel="noopener"`.
  - Content Security Policy meta tag; all user text rendered with `textContent` (no HTML injection).
- **Quality:** semantic HTML, keyboard navigation, visible focus, WCAG AA contrast, responsive at 360 px / 768 px / 1280 px, SEO meta and Open Graph tags, favicon, fast load (target < 300 KB per page).
- **Docs for handover:** `README.md`, `CLAUDE.md`, `docs/` (PRD, DESIGN_SYSTEM, ARCHITECTURE, TASKS, TESTING, DECISIONS), `progress.md`.

## 11. Impact and viability (Judging criterion 4)
- **Who it helps:** youth NGOs, clubs and solo changemakers, starting with NAWAT AI and TIRYAQ networks in Algeria and Pan African Youth Forum participants.
- **After October:**
  - Used as the companion tool in NAWAT AI peer-trainer workshops (ChatGPT, Claude, Google AI Studio) and TIRYAQ initiative workshops.
  - Used live at the Pan African Youth Forum workshop if the proposal is accepted.
  - Open-source and free to host. Zero running cost, so it survives without funding.
  - Roadmap: Arabic and French versions, more initiative templates contributed by partner NGOs, a showcase gallery of submitted ideas.
- **Measures:** number of ideas generated (if analytics enabled), Google Form submissions, workshop feedback scores, initiatives actually launched by participants.

## 12. Story, pitch and demo (Judging criterion 5)
- **3-minute demo video plan:** problem (30s) → generate an initiative live (60s) → AI prompts and toolkit (30s) → workshop idea-builder (30s) → impact and what's next (30s).
- The home page tells the same story, so judges can follow it without the video.

## 13. Delivery plan (tonight)

| Priority | Item |
|---|---|
| 1 | Docs + repo skeleton, shared layout, Home page |
| 2 | Initiative Idea Game (data + generator + card + copy/print/image) |
| 3 | Workshops page with improved idea-builder (autosave, forms, image) |
| 4 | AI Toolkit page, About page |
| 5 | QA (mobile/desktop, accessibility, links), README, GitHub publish *(with your confirmation)* |
| 6 | QR poster, then facilitator mode / analytics if time remains |

## 14. Success metrics
- A judge can open the live link and generate an initiative with no instructions.
- All buttons (copy, print, download image, forms, autosave) work in Chrome, Edge, Firefox and Safari.
- No console errors, no broken links, Lighthouse accessibility ≥ 95.
- A new developer can run it locally by opening `index.html`.

## 15. Inputs needed from the product owner
- [x] NAWAT AI and TIRYAQ logo files (PNG/SVG)
- [x] WhatsApp group QR image
- [x] Contact email address (nawat.ai.youthlab@gmail.com)
- [x] Google Form links: showcase submission, feedback survey
- [x] GitHub username/account to publish under (`benloamina-svg`)
- [ ] Hackathon name and submission link (for README/pitch)
- [ ] (Optional) Founder photo, GoatCounter account
