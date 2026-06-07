# SIP Landing Page — Bold Redesign Spec

**Date:** 2026-06-06
**Author:** Santiago + Claude
**Status:** Draft for review
**Scope:** Landing page (`index.html`) + its own dedicated stylesheet and JS. Sub-pages (`sip.html`, `sip-wealth.html`) are explicitly **out of scope** for this pass and must remain visually intact (see Scope & Constraints).

---

## 1. Goal

Reimagine the SIP landing page to simultaneously: drive **more leads**, feel **more premium**, **communicate value** clearly, and build **trust**. Appetite: **bold reimagining** — new visual language and motion, not a paint job. Anchored on the SIP-vs-SIP Wealth duality as the core design system.

Success signals:
- A first-time visitor understands "what is SIP, who is it for, SIP vs SIP Wealth" within ~5 seconds.
- Multiple low-friction opportunities to convert (engage/contact) at every scroll depth.
- The page reads as a polished, modern, trustworthy financial-advisory brand.

## 2. Design Direction

Blend of three explored directions, anchored on **C (Confident Duotone)**:
- **C — structure:** the SIP (teal) vs SIP Wealth (navy) split is the spine of the whole page.
- **B — depth & motion:** dark backgrounds, radial gradient glow, subtle glassmorphism, scroll-reveal motion, animated number counters.
- **A — editorial restraint:** generous whitespace and serif display headlines keep it calm = credible.

## 3. Design System

### 3.1 Color tokens (semantic; defined as CSS custom properties)
| Token | Hex | Use |
|-------|-----|-----|
| `--ink` | `#06080D` | Near-black page background (dark sections) |
| `--teal` | `#13A394` | SIP brand (primary) |
| `--teal-deep` | `#063B37` | SIP gradient floor |
| `--navy` | `#16335B` | SIP Wealth brand (secondary) |
| `--navy-deep` | `#0A1C34` | Wealth gradient floor |
| `--mint` | `#2FE6C6` | **Action accent — CTAs only** |
| `--mint-ink` | `#04241D` | Text on mint buttons |
| `--surface` | `#0E1320` | Card surfaces on dark |
| `--surface-tint` | `#F3F4F2` | Optional light-section background (editorial) |
| `--fg` | `#F8FAFC` | Primary text on dark |
| `--fg-muted` | `#9AA3B2` | Secondary text on dark |
| `--border` | `#1C2230` | Hairline borders/dividers on dark |

**Accent discipline:** `--mint` is reserved for primary CTAs and key emphasis only — never decorative. Teal/navy carry brand; mint carries action. **No purple/violet anywhere** (avoids association with MDpartners).

### 3.2 Typography
- **Headings:** Playfair Display (500/600/700, incl. italic) — editorial serif for hero + section titles + big numerals.
- **Body / UI / labels:** Inter (300–700).
- Loaded via Google Fonts with `display=swap`. Replaces Montserrat **on the landing page only**.
- Scale (approx): display 40–64px, h2 28–40px, h3 20–24px, body 16–18px, label 11–12px uppercase tracked.

### 3.3 Style & effects
- **Bento-box grid** for the value/pillars section (asymmetric modular cards).
- Radial gradient glows behind hero halves; 1px luminous "seam" between SIP/Wealth.
- Glassmorphism used sparingly (cards over gradients), `border-radius` 14–18px.
- Hover: `translateY(-3px)` + soft shadow, 150–300ms, transform/opacity only.
- SVG icons only (Lucide/Heroicons style) — no emoji. Reuse the existing inline-SVG approach already in the project.

### 3.4 Motion
- Scroll-reveal (IntersectionObserver) staggered 30–50ms; reuse existing `main.js` reveal pattern.
- Number counters animate once on first view.
- **Must respect `prefers-reduced-motion`** — disable reveals/counters/parallax when set.

## 4. Page Architecture & CTA Map

Pattern: **Trust & Authority + Conversion** (Hero credibility → Proof → Value → low-friction CTA). The user explicitly wants **more CTAs**, so a primary CTA appears at every scroll depth, all using `--mint`, with secondary actions visually subordinate (one primary CTA per section).

| # | Section | Purpose | CTA(s) |
|---|---------|---------|--------|
| 0 | Sticky header | Persistent nav | `Contáctanos` (mint pill) + **NEW** sticky mobile CTA bar at bottom on small screens |
| 1 | Hero — "Elige tu camino" | Duotone gateway w/ depth, editorial type, stat-strip welded below | **2 CTAs:** `Descubre SIP →` (teal door) + `Conoce SIP Wealth →` (navy door) |
| 2 | Trust strip — partners | Social proof early (marquee of partner logos, incl. **Monific** + all others preserved) | label only, no CTA |
| 3 | ¿Qué es SIP? — bento | 3 pillars (Simple · Inteligente · Profesional) as asymmetric bento w/ big numerals + SVG icons | **NEW** inline CTA: `Conversemos →` |
| 4 | Los dos caminos | Explicit side-by-side: SIP (empezar) vs Wealth (consolidar) — who/what/why | **2 CTAs:** one per path |
| 5 | Cómo trabajamos | 3-step path (Conversamos → Diseñamos → Acompañamos) to lower friction | **NEW** CTA: `Agenda tu llamada →` |
| 6 | Contacto | Low-friction conversion form | Primary submit CTA (mint) + trust pop (+10 años) |
| 7 | Footer + aviso legal | Refined, same content | footer `Escríbenos` link |

CTA count rises from ~3 today to ~9 touchpoints, each primary action in mint, secondary/brand actions in teal/navy/light so they don't visually compete.

## 5. Scope & Constraints

- **Static site only** — hand-written HTML/CSS/JS, no build step, no framework. Must keep working on GitHub Pages (CNAME present).
- **Sub-pages untouched:** To avoid breaking `sip.html` / `sip-wealth.html` (which currently share `css/style.css` + `js/main.js`), the redesign ships as a **dedicated landing stylesheet** (`css/landing.css`) loaded only by `index.html`. The shared `css/style.css` is left in place for the sub-pages. `index.html` keeps loading `js/main.js` (its IntersectionObserver reveal + scroll-header logic is compatible); any new behavior (number counters, sticky CTA bar) is added to `main.js` guarded so it no-ops on pages without those elements, keeping sub-pages safe. A future pass can harmonize the sub-pages to the new system.
- **Preserve all assets:** every partner logo including `img/MONIFIC_LOGO.svg`, the web3forms form action + access key, all Spanish copy meaning, the legal disclaimer text verbatim, favicon, brand logos.
- **Accessibility:** WCAG AA contrast (verify mint/teal/navy pairs), visible focus states, 44px+ touch targets, semantic headings h1→h..., `prefers-reduced-motion`, labeled form fields with inline validation.
- **Responsive:** mobile-first; verified at 375 / 768 / 1024 / 1440px; no horizontal scroll; hero split stacks vertically on mobile.
- **Copy:** refine for clarity but stay truthful to SIP's positioning (orientation/education, independent, not a CNBV-registered advisor). New CTA labels in Spanish.

## 6. Components (testable units)

- `header` (sticky, scroll-responsive) + mobile drawer + **sticky mobile CTA bar**.
- `hero.gateway` — two `gate` halves, seam, center badge, stat-strip with counters.
- `marquee` — partner logos (existing, restyled).
- `bento` — pillar grid.
- `paths` — SIP vs Wealth comparison.
- `steps` — 3-step process.
- `contact` form — validation + success/error states.
- `footer`.

Each is independently styleable in `css/landing.css` and verifiable in isolation in the browser.

## 7. Out of Scope (explicit)

- Redesigning `sip.html` / `sip-wealth.html` (follow-up).
- Backend / form provider changes (keep web3forms).
- Analytics, A/B testing infrastructure, CMS.
- New photography/illustration commissioning (reuse existing `img/` assets).

## 8. Open Questions

- None blocking. Hero/CTA copy will be refined during implementation and shown for approval.
