# Design system — v2 "Nucleus on a navy void"

Inspired by a dark "void" reference style (oversized light headlines, ultra-light body, a single pill accent, particle constellation), adapted to the NAWAT AI brand colours. Tokens live at the top of `assets/css/styles.css`.

## Colour
| Token | Value | Use |
|---|---|---|
| `--void` | `#050B16` | Page canvas everywhere (NAWAT deep navy, never grey panels) |
| `--white` / `--sky` | `#FFFFFF` / `#EBF4FF` | Headlines and body text |
| `--muted` / `--subtle` | `#A3B3C4` / `#8496AA` | Secondary / tertiary text |
| `--emerald` | `#00C07A` | **Only** filled buttons (pills), key words in headlines, selected chips |
| `--gold` | `#F0B429` | Small uppercase labels (eyebrows), numbers, links (≤10% of the page) |
| `--navy` | `#0A1628` | Text on emerald buttons |
| `--border` | `rgba(235,244,255,.12)` | Hairlines only |
| `--surface` | `rgba(235,244,255,.045)` | Interactive tool panels only (game, builder, canvas) |

## Typography
Inter Variable, self-hosted (`assets/fonts`, OFL licence).
- Headlines: **weight 400**, tight tracking (−0.035 to −0.045em). Display `clamp(46px, 8.2vw, 108px)`, section `clamp(36px, 5.6vw, 76px)`.
- Body: 18px, **weight 300** (light; 200 was too thin to read on Windows screens).
- Labels/nav/buttons: 12–14px, weight 600, uppercase, letter-spacing .03–.14em.
Hierarchy comes from size, not boldness.

## Shape & layout
- Radius 24px (panels, cards), full pills for buttons, chips and tags.
- Max width 1280px; section spacing `clamp(72px, 10vw, 128px)`.
- Content floats on the void: no boxed cards. Blocks are separated by a 1px hairline on top (`.card`), emerald or gold for emphasis.
- Two-column split layouts (`.split`, `.hero-grid`) that collapse to one column under 960px.

## Signature visual
`assets/js/constellation.js`: an animated cloud of ~700 tiny outlined triangles (emerald, gold, sky, teal) forming the "nucleus" around the logo. Pauses off-screen; static when the visitor prefers reduced motion. Ambient triangles (`.pattern`) appear at very low opacity in heroes.

## Components
Emerald pill (one main action per view) · ghost pill (secondary) · gold eyebrow · hairline card · chip (radio) · tool panel · light result card (`.idea-card`, `.builder-output`) for things people copy, print or download.

## Breakpoints
960px (single column, mobile menu) · 600px (full-width buttons, compact stats). Tested at 360 / 390 / 768 / 1024 / 1280 / 1440.
