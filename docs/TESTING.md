# Testing

## Automated browser check (31 Oct 2026, Chrome via Playwright) — PASS
| Check | Result |
|---|---|
| 6 pages at 360 / 768 / 1280 px: console errors | None |
| Horizontal scroll on any page/size | None (poster fixed at 768) |
| Broken images | None |
| Idea Game: Volunteer Passport example | Card "Volunteer Passport" generated |
| Idea Game: 7 choices + suggestion → generate | Full card, 5 steps, roles, indicators, 3 prompts |
| Shuffle | New name and twist |
| Empty submit | Clear message listing missing choices |
| Copy initiative / copy prompt / toolkit copy | Clipboard contains text |
| Download as image (game + builder) | PNG downloaded, checked visually |
| Builder autosave | Values restored after reload |
| HTML injection in builder (`<b>`) | Shown as text, not rendered |
| Form buttons without links | Disabled, "(link coming soon)" |
| Mobile menu | Opens/closes |
| Open from `file://` | Works, no errors |
| 7 pages at 360/768/1024/1280 | No errors, no horizontal scroll |
| Form buttons | Open Google Forms in a new tab |
| Game → "Plan it on the Initiative Canvas" | 9 blocks pre-filled |
| SMART Court 6 rounds | Correct scoring, feedback, replay |
| SMART builder | 5/5 badges, goal added to canvas, survives reload |
| Canvas image + print | PNG downloaded; print shows only the canvas on white |
| All 2,520 game template combinations | No leftover placeholders; "an ongoing programme" grammar |

## Manual checklist before each release
- [ ] Click every nav and footer link on every page
- [ ] Generate 3 different ideas; print one (only the card prints)
- [ ] Fill the builder on a real phone; reload; download image
- [ ] Form buttons open Google Forms in a new tab (after links are added)
- [ ] Keyboard only: Tab through the game, select chips with arrow keys/Space, generate with Enter
- [ ] Lighthouse (Chrome DevTools) on the live URL: Accessibility ≥ 95, SEO ≥ 90
- [ ] Scan both QR codes with a phone
- [ ] Search the repo for secrets: `git grep -iE "api[_-]?key|secret|token|password"` returns nothing sensitive
