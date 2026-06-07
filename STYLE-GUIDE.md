# SIP — Brand & Style Guide

> The single source of truth for building anything new on this site.
> Everything here is generated from the live `css/landing.css` — if the CSS changes, update this file.
> **Read this before creating any new page, section, or component.**

---

## 0. Hard Rules (non-negotiable)

1. **No purple.** Ever. The palette is teal / navy / mint only.
2. **No fabricated content.** Don't invent stats, testimonials, client names, or numbers. Use real copy or leave a placeholder flagged for Santiago.
3. **Use design tokens, never raw hex.** Write `var(--mint)`, not `#2FE6C6`. Hardcoded hex values cause the brand to break on Wealth pages (see §2).
4. **One stylesheet.** Every page links `css/landing.css`. Don't create per-page CSS files.
5. **Dark by default.** Background is near-black `--ink`. The only light section is `.section--tint`.

---

## 1. Color Tokens

Defined in `:root` at the top of `css/landing.css`. Reference them with `var(--token)`.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#06080D` | Page background, deepest base |
| `--surface` | `#0E1320` | Card / panel background |
| `--surface-tint` | `#F3F4F2` | The one light section background |
| `--teal` | `#13A394` | Core brand teal (avatars, step numbers) |
| `--teal-deep` | `#063B37` | Dark teal for gradients / light buttons |
| `--navy` | `#16335B` | SIP Wealth core color |
| `--navy-deep` | `#0A1C34` | Dark navy for gradients |
| `--mint` | `#2FE6C6` | **Primary accent** — CTAs, highlights, icons |
| `--mint-ink` | `#04241D` | Text color on mint backgrounds |
| `--fg` | `#F8FAFC` | Primary text |
| `--fg-muted` | `#9AA3B2` | Secondary / body text |
| `--border` | `#1C2230` | Hairline borders, dividers |

**Brand-side glow accents** (used on the homepage split + path cards):
- SIP side → mint glow `var(--mint)` / `#2FE6C6`
- Wealth side → blue glow `#6ea8ff`, blue text accent `#9cc2ff`

All color pairs in this palette pass WCAG AA contrast.

---

## 2. The SIP vs. SIP Wealth Brand Switch ⭐

This is the most important mechanic to understand. The site is **two brands sharing one stylesheet**:

- **SIP** = mint/teal accent (default)
- **SIP Wealth** = blue/navy accent

The switch is a single line:

```css
body[data-brand="wealth"]{ --mint:#6ea8ff; --mint-ink:#071326 }
```

Putting `data-brand="wealth"` on the `<body>` **re-points the `--mint` token to blue**, so every component that uses `var(--mint)` (buttons, accents, icon tiles, highlights) automatically turns blue — no other markup changes needed.

> **This is exactly why rule §0.3 exists.** If you hardcode `#2FE6C6` instead of `var(--mint)`, your element stays mint on Wealth pages and breaks the brand. Always use the token.

Section-level split backgrounds use explicit variant classes: `.gate--sip` / `.gate--wealth`, `.path--sip` / `.path--wealth`.

---

## 3. Typography

| Role | Font | Stack token |
|---|---|---|
| Headings (`h1,h2,h3`) | **Playfair Display** (serif, 600) | `var(--font-head)` |
| Body, UI, labels | **Inter** (sans) | `var(--font-body)` |

Headings: `line-height:1.08`, `letter-spacing:-.01em`.

**Type scale** (all responsive headings use `clamp()`):

| Element | Size |
|---|---|
| Portada / hero `h1` | `clamp(34px, 6vw, 60px)` |
| Gate `h1` (homepage split) | `clamp(34px, 4.4vw, 52px)` |
| Section `h2` | `clamp(28–30px, 4vw, 42–44px)` |
| Editorial statement | `clamp(26px, 4.4vw, 42px)` |
| Big stat number | `clamp(34px, 5vw, 52px)` |
| Card `h3` | 18–24px |
| Body / intro | 15–17px |
| Eyebrow / label | 11px, `letter-spacing:.26em`, uppercase |
| Disclaimer / fine print | 12.5px |

**Eyebrow pattern** — small mint kicker above headings:
```html
<span class="eyebrow">Por qué SIP</span>
```

**Inline highlight** — use `.hl` or `.accent` to color a word mint:
```html
<h2>Invierte con <span class="hl">claridad</span></h2>
```

---

## 4. Spacing, Geometry & Layout

| Token / value | Use |
|---|---|
| `--maxw` `1180px` | Max content width — wrap sections in `.container` |
| `.section` → `padding:96px 0` | Standard vertical section rhythm |
| `--r` `16px` | Standard card/panel radius |
| `--r-pill` `30px` | Button / pill radius |
| Card padding | ~22–34px |
| Grid gaps | 16–22px between cards |

**Layout wrapper:**
```html
<section class="section">
  <div class="container">
    <div class="section__head"> <!-- add .center to center it -->
      <span class="eyebrow">Eyebrow</span>
      <h2>Heading with <span class="accent">accent</span></h2>
      <p class="sub">Supporting subhead.</p>
    </div>
    <!-- content grid -->
  </div>
</section>
```

---

## 5. Motion

| Token | Value |
|---|---|
| `--ease` | `cubic-bezier(.22,.61,.36,1)` — use for all transitions |

- **Scroll reveal:** add class `.reveal` to animate in on scroll (handled by `main.js`).
- Hover lifts use `transform:translateY(-4px)` + border-color brighten.
- All motion is wrapped in `@media (prefers-reduced-motion:reduce)` guards — keep that respect when adding animations.

---

## 6. Components (copy these, don't reinvent)

### Buttons
```html
<a class="btn btn--mint">Primary action</a>   <!-- solid mint, main CTA -->
<a class="btn btn--ghost">Secondary</a>        <!-- outlined -->
<a class="btn btn--light">On dark gradient</a> <!-- pale fill -->
```

### Cards & sections — available building blocks

| Class | What it is |
|---|---|
| `.bento` / `.bento__card` | Asymmetric feature grid (1-col on mobile) |
| `.svc` / `.svc__card` | 3-up service cards with icon tile |
| `.trust__grid` / `.trust__item` | 4-up trust/stat cards |
| `.reasons` / `.reason` | Flex-wrap "why" cards (3+2 centered layout) |
| `.diff` / `.diff__item` | 2-up cards with mint left-border |
| `.path--sip` / `.path--wealth` | Brand-split gradient panels |
| `.steps` / `.step` | 3-up numbered process (light, on `.section--tint`) |
| `.process` / `.process__step` | Vertical timeline with progress fill |
| `.statband` / `.statband .stat` | Full-width 3-up big-number band |
| `.statement` | Centered editorial pull-quote section |
| `.tcards` / `.tcard` | Testimonial cards *(only with real testimonials — see §0.2)* |
| `.endcta` | Closing call-to-action band |
| `.portada` | Page-top hero with glow + logo |
| `.contact__grid` / `.field` | Contact form (web3forms) |

**Icon tiles** (`.svc__ic`, `.trust__ic`, `.reason__ic`): rounded square, mint icon, ~46–50px. Use `color-mix(in srgb, var(--mint) …)` for the tinted background so it follows the brand switch.

---

## 7. Responsive Breakpoints

The site is mobile-responsive primarily through **one breakpoint**:

| Breakpoint | Effect |
|---|---|
| `max-width:860px` | Primary: multi-col grids collapse to 1 col, mobile nav drawer + sticky CTA appear |
| `max-width:980px` | `.trust__grid` → 2 cols |
| `max-width:680px` | `.portada` / `.statband` tighten |
| `max-width:520px` | `.trust__grid` → 1 col |
| `min-width:861px` | Desktop-only split-gate padding |

When you add a multi-column grid, **always include a `@media(max-width:860px){ grid-template-columns:1fr }` rule** to match the existing pattern.

---

## 8. Accessibility baseline

- `.skip-link` skip-to-content is present — keep it.
- Focus states use `:focus-visible{ outline:3px solid var(--mint) }` — don't remove outlines.
- Tap targets (nav toggle, drawer close) are 44×44px minimum.
- Honor `prefers-reduced-motion` on any new animation.

---

## 9. File Map

| File | Role |
|---|---|
| `css/landing.css` | **The design system** — all tokens + components live here |
| `index.html` | Homepage (split SIP / Wealth gate) |
| `sip.html` | SIP brand page (`data-brand` default / mint) |
| `sip-wealth.html` | SIP Wealth page (`data-brand="wealth"` → blue) |
| `main.js` | Interactions: nav drawer, scroll reveal, counters, form, timeline fill |
| `img/` | Logos & assets (`MONIFIC_LOGO.svg` is actively used — do not delete) |

---

### Quick start: building a new page

1. Copy the `<head>` + nav + footer from `sip.html`.
2. Set `<body data-brand="wealth">` if it's a Wealth page; omit for SIP.
3. Compose from the §6 components inside `.section > .container` wrappers.
4. Use `var(--token)` for every color. Add the 860px collapse rule for any grid.
5. Headings = Playfair, body = Inter (already inherited — don't override).
