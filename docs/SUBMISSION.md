# Hackathon submission — NAWAT AI Youth Lab

Copy each block into the matching field of the submission form.

---

## 1. Name and one-line summary

**Name:** NAWAT AI Youth Lab

**Summary (18 words):**
A free web platform helping youth NGOs and clubs design realistic initiatives while learning to use AI tools.

---

## 2. Description (≤150 words)

Youth NGOs and clubs have motivation but lack structure. Small, volunteer-run groups repeat the same activities, plan as if they had budgets they don't have, and use AI only to copy answers. In our field work with youth in Biskra, Algeria, young people rarely lacked ideas — they lacked a simple path from problem to plan.

NAWAT AI Youth Lab turns seven quick choices (theme, target group, skill, problem, format, organisation type, available materials) into a complete initiative: activity plan, team roles, success indicators and a zero-budget version. Teams then plan it on a 13-block Initiative Canvas, sharpen their objectives with a SMART Goals game, and use ready-made prompts for ChatGPT, Claude and Google AI Studio — learning AI by applying it to their own project.

It is for young people aged 18–45 in NGOs, clubs and solo initiatives. Free, in English and Arabic, no account, works on any phone.

---

## 3. Live demo link

https://benloamina-svg.github.io/nawat-ai-youth-lab/

Arabic version: https://benloamina-svg.github.io/nawat-ai-youth-lab/ar/

Judge path (2 minutes): **Play the Idea Game → "Try the Volunteer Passport example" → "Plan it on the Initiative Canvas" → scroll to the SMART Goals game.**

---

## 4. Code repository

https://github.com/benloamina-svg/nawat-ai-youth-lab

Public. The README explains what it is, how to run it (open `index.html`, no installation) and who built which part. Full docs in `/docs`.

---

## 5. Demo video

Link: _[paste your YouTube (Unlisted) or Google Drive (Anyone with the link) URL]_

Script: see `docs/DEMO_SCRIPT.md` (3 minutes).

---

## 6. Team and roles

| Name | Role and contribution |
|---|---|
| **Amina Benlouanas** | Founder of NAWAT AI Youth Lab and product owner: defined the problem from field work, wrote the requirements, workshop methodology and content, chose the design direction, created the Google Forms, tested and published the site. |
| _Add any teammate here_ | _One honest line on what they did._ |

AI assistance (disclosed): Claude (Anthropic) acted as development partner — wrote the code and documentation from Amina's requirements, and ran automated browser tests.

---

## 7. Tech stack

- **Languages:** HTML5, CSS3, vanilla JavaScript (no framework, no build step, no third-party JS libraries).
- **Browser APIs:** Canvas 2D (image download, animated constellation), Clipboard API, localStorage (autosave on the device only).
- **Social:** Instagram @nawat_ai_dz and Facebook page linked on every page.
- **Hosting:** GitHub Pages, auto-deployed with GitHub Actions.
- **Services:** Google Forms (idea showcase and feedback survey).
- **Languages of the site:** English and Arabic (full right-to-left version under `/ar/`).
- **Fonts:** Inter and Noto Kufi Arabic (self-hosted, SIL Open Font License).
- **AI tools:** Claude (Anthropic) for coding, documentation and testing; ChatGPT, Claude and Google AI Studio are the tools the platform teaches users to work with.
- **Security & privacy:** no backend, no API keys, no cookies or tracking; strict Content Security Policy.
- **Testing:** automated Chrome tests (Playwright) at 6 screen sizes; all 2,520 idea-template combinations checked.

---

## 8. What happens next (≤100 words)

In the next three months we will: use the platform as the companion tool in NAWAT AI peer-trainer workshops and TIRYAQ NGO initiative trainings in Biskra; run it live at the Pan African Youth Forum workshop "From AI Users to AI Makers" if accepted; release a French version (English and Arabic are live); add a facilitator mode with timers for workshops; open a showcase gallery of submitted team ideas; and invite partner NGOs to contribute new initiative templates. We will measure ideas generated, feedback scores and, most importantly, how many initiatives participants actually launch.

---

## Optional: pitch deck

`docs/NAWAT-AI-Youth-Lab-pitch.pdf` (8 slides).
