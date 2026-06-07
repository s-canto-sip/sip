# SIP Landing Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the SIP landing page (`index.html`) as a bold duotone, editorial, conversion-focused experience with a dedicated stylesheet — without touching the sub-pages.

**Architecture:** `index.html` is rewritten section-by-section and switched from the shared `css/style.css` to a new self-contained `css/landing.css`. New JS behavior (number counters, sticky CTA bar) is appended to `js/main.js` and guarded so it no-ops on the sub-pages. Teal×navy duotone is the structure; Bright Mint `#2FE6C6` is the single CTA accent; Playfair Display + Inter are the type system.

**Tech Stack:** Hand-written HTML5, CSS3 (custom properties, grid, IntersectionObserver-driven reveals), vanilla JS. Google Fonts. No build step. GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-06-06-sip-landing-redesign-design.md`

**How to verify (no test runner):** Serve locally with `python -m http.server 8000` from the repo root, open `http://localhost:8000/index.html`. For each task, do the listed visual/responsive checks (DevTools device toolbar at 375 / 768 / 1024 / 1440px). Accessibility checks use DevTools (contrast in the color picker, Lighthouse, and the Rendering tab's "Emulate prefers-reduced-motion").

**Constraints carried from spec:** preserve every partner logo incl. `img/MONIFIC_LOGO.svg`, the web3forms action + access key, the legal disclaimer verbatim, all Spanish meaning. No purple anywhere. Do not modify `sip.html`, `sip-wealth.html`, or `css/style.css`. Do not commit unless Santiago asks.

---

## File Structure

| File | Responsibility | Action |
|------|----------------|--------|
| `index.html` | Landing markup: header, hero, partners, bento, paths, steps, contact, footer | Rewrite |
| `css/landing.css` | Complete self-contained styles for the landing page (tokens, base, all components) | Create |
| `js/main.js` | Existing reveal + scroll-header logic, plus guarded counters + sticky CTA | Modify (append) |
| `img/*` | Existing assets reused as-is | None |

---

## Task 1: Scaffold — fonts, tokens, base, swap stylesheet

**Files:**
- Create: `css/landing.css`
- Modify: `index.html` (lines 9-12 `<head>` font + stylesheet links; `<body>` unchanged for now)

- [ ] **Step 1: Create `css/landing.css` with tokens + reset + base**

```css
/* ============ SIP Landing — design tokens ============ */
:root{
  --ink:#06080D; --teal:#13A394; --teal-deep:#063B37;
  --navy:#16335B; --navy-deep:#0A1C34;
  --mint:#2FE6C6; --mint-ink:#04241D;
  --surface:#0E1320; --surface-tint:#F3F4F2;
  --fg:#F8FAFC; --fg-muted:#9AA3B2; --border:#1C2230;
  --maxw:1180px;
  --r:16px; --r-pill:30px;
  --ease:cubic-bezier(.22,.61,.36,1);
  --font-head:'Playfair Display',Georgia,serif;
  --font-body:'Inter',system-ui,-apple-system,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font-body);background:var(--ink);color:var(--fg);
  line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3{font-family:var(--font-head);font-weight:600;line-height:1.08;letter-spacing:-.01em}
.container{max-width:var(--maxw);margin:0 auto;padding:0 24px}
.eyebrow{font-family:var(--font-body);font-size:11px;letter-spacing:.26em;
  text-transform:uppercase;font-weight:600;color:var(--mint)}
.section{padding:96px 0}
.skip-link{position:absolute;left:-9999px;top:0;background:var(--mint);color:var(--mint-ink);
  padding:10px 16px;border-radius:0 0 8px 0;z-index:1000;font-weight:600}
.skip-link:focus{left:0}
:focus-visible{outline:3px solid var(--mint);outline-offset:2px;border-radius:4px}

/* ============ reveal (js adds .in via existing main.js IntersectionObserver) ============ */
.reveal{opacity:0;transform:translateY(22px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.reveal.in{opacity:1;transform:none}

/* ============ buttons ============ */
.btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--font-body);
  font-size:14px;font-weight:600;padding:13px 24px;border-radius:var(--r-pill);
  border:1px solid transparent;cursor:pointer;transition:transform .2s var(--ease),
  box-shadow .2s var(--ease),background .2s,color .2s;white-space:nowrap}
.btn:hover{transform:translateY(-2px)}
.btn--mint{background:var(--mint);color:var(--mint-ink);box-shadow:0 8px 24px -8px #2fe6c688}
.btn--mint:hover{box-shadow:0 12px 32px -8px #2fe6c6aa}
.btn--light{background:#eafff9;color:var(--teal-deep)}
.btn--ghost{background:transparent;color:var(--fg);border-color:var(--border)}
.btn--ghost:hover{border-color:var(--mint);color:var(--mint)}
.btn .a{transition:transform .2s var(--ease)}
.btn:hover .a{transform:translateX(4px)}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *{transition:none!important;animation:none!important}
  .reveal{opacity:1!important;transform:none!important}
}
```

- [ ] **Step 2: Swap the `<head>` links in `index.html`**

Replace the existing font + stylesheet lines (current lines 11-12) with:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/landing.css">
```

(Keep the two `preconnect` lines above them.)

- [ ] **Step 3: Verify**

Serve and open `index.html`. Expected: page background is near-black `#06080D`, body text is Inter, no console errors, fonts load (Network tab shows Playfair + Inter). The page will look unstyled per-section — that's expected; only base + tokens exist so far.

- [ ] **Step 4: Checkpoint** — pause for review (no commit unless asked).

---

## Task 2: Header, mobile drawer, sticky mobile CTA bar

**Files:**
- Modify: `index.html` (header/drawer markup, lines ~17-39)
- Modify: `css/landing.css` (append header styles)

- [ ] **Step 1: Replace header + drawer markup in `index.html`**

```html
<header class="site-header" id="siteHeader">
  <a href="index.html" class="brand" aria-label="Inicio — Simple Investment Partners">
    <img src="img/SIP_ICON_W.png" alt="" width="30">
    <span>SIMPLE INVESTMENT PARTNERS</span>
  </a>
  <nav class="nav-desktop" aria-label="Principal">
    <a href="index.html">Inicio</a>
    <a href="sip.html">SIP</a>
    <a href="sip-wealth.html">SIP Wealth</a>
    <a href="#contacto" class="btn btn--mint">Contáctanos <span class="a">→</span></a>
  </nav>
  <button class="nav-toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="drawer">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  </button>
</header>
<div class="scrim" id="scrim"></div>
<nav class="drawer" id="drawer" aria-label="Menú">
  <button class="close" id="drawerClose" aria-label="Cerrar menú">&times;</button>
  <a href="index.html">Inicio</a>
  <a href="sip.html">SIP</a>
  <a href="sip-wealth.html">SIP Wealth</a>
  <a href="#contacto" class="btn btn--mint">Contáctanos <span class="a">→</span></a>
</nav>
<!-- sticky mobile CTA (shown after hero, mobile only) -->
<a href="#contacto" class="mobile-cta" id="mobileCta">Agenda tu llamada <span class="a">→</span></a>
```

- [ ] **Step 2: Append header CSS to `css/landing.css`**

```css
.site-header{position:sticky;top:0;z-index:100;display:flex;align-items:center;
  justify-content:space-between;padding:16px 24px;background:#06080dcc;
  backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:.3s var(--ease)}
.site-header[data-scrolled="true"]{border-bottom-color:var(--border);background:#06080df2}
.brand{display:flex;align-items:center;gap:12px}
.brand span{font-size:11px;letter-spacing:.22em;font-weight:600}
.nav-desktop{display:flex;align-items:center;gap:28px}
.nav-desktop a{font-size:14px;color:var(--fg-muted);transition:color .2s}
.nav-desktop a:hover{color:var(--fg)}
.nav-desktop a.btn{color:var(--mint-ink)}
.nav-toggle{display:none;background:none;border:none;color:var(--fg);cursor:pointer;width:44px;height:44px}
.nav-toggle svg{width:26px;height:26px}
.scrim{position:fixed;inset:0;background:#000a;opacity:0;visibility:hidden;
  transition:.3s;z-index:150}
.scrim[data-open="true"]{opacity:1;visibility:visible}
.drawer{position:fixed;top:0;right:0;height:100%;width:min(82vw,320px);background:var(--surface);
  z-index:200;display:flex;flex-direction:column;gap:8px;padding:80px 28px;
  transform:translateX(100%);transition:transform .3s var(--ease)}
.drawer[data-open="true"]{transform:translateX(0)}
.drawer a{font-size:18px;padding:10px 0;color:var(--fg)}
.drawer .close{position:absolute;top:20px;right:24px;background:none;border:none;
  color:var(--fg);font-size:34px;line-height:1;cursor:pointer;width:44px;height:44px}
.mobile-cta{position:fixed;left:16px;right:16px;bottom:16px;z-index:90;
  display:none;align-items:center;justify-content:center;gap:8px;
  background:var(--mint);color:var(--mint-ink);font-weight:700;padding:15px;
  border-radius:var(--r-pill);box-shadow:0 10px 30px -6px #000a;
  transform:translateY(140%);transition:transform .35s var(--ease)}
.mobile-cta.show{transform:translateY(0)}
@media(max-width:860px){
  .nav-desktop{display:none}
  .nav-toggle{display:flex;align-items:center;justify-content:center}
  .brand span{font-size:9px}
  .mobile-cta{display:flex}
}
```

- [ ] **Step 3: Verify**

Reload. Desktop: sticky header with mint "Contáctanos" pill; on scroll a hairline border appears (after Task 10 wires `.scrolled`). Resize to 375px: hamburger appears, desktop nav hides. The mobile sticky CTA exists (hidden until Task 10 wires `.show`). Drawer open/close is wired in Task 10.

- [ ] **Step 4: Checkpoint.**

---

## Task 3: Hero gateway + credibility stat-strip

**Files:**
- Modify: `index.html` (replace `<section class="gateway">`, lines ~43-66)
- Modify: `css/landing.css` (append hero styles)

- [ ] **Step 1: Replace hero markup**

```html
<main id="main">
<section class="hero" aria-label="Elige tu camino">
  <div class="hero__split">
    <div class="gate gate--sip">
      <span class="gate__glow"></span>
      <div class="gate__inner">
        <img class="gate__logo" src="img/SIP_LOGO_W.png" alt="SIP" width="120">
        <span class="eyebrow">Empieza hoy</span>
        <h1>Empieza a<br><em>invertir bien.</em></h1>
        <p>Tu fondo de emergencia, tus ahorros trabajando y tu retiro — acompañado paso a paso.</p>
        <a class="btn btn--light" href="sip.html">Descubre SIP <span class="a">→</span></a>
      </div>
    </div>
    <div class="gate gate--wealth">
      <span class="gate__glow"></span>
      <div class="gate__inner">
        <img class="gate__logo" src="img/WEALTH_LOGO_W.png" alt="SIP Wealth" width="120">
        <span class="eyebrow" style="color:#bcd4ff">Consolida</span>
        <h1>Haz crecer<br><em class="em-navy">tu patrimonio.</em></h1>
        <p>Protégelo, diversifícalo y multiplícalo con estrategia y soluciones a tu medida.</p>
        <a class="btn btn--light" href="sip-wealth.html">Conoce SIP Wealth <span class="a">→</span></a>
      </div>
    </div>
    <div class="hero__seam" aria-hidden="true"></div>
    <div class="hero__badge"><span class="s">ELIGE TU</span><span class="b">Camino</span></div>
  </div>
  <div class="hero__stats">
    <div class="stat"><div class="n" data-count="10" data-suffix="+">+10</div><div class="l">años de experiencia</div></div>
    <div class="stat"><div class="n" data-count="8">8</div><div class="l">instituciones aliadas</div></div>
    <div class="stat"><div class="n" data-count="100" data-suffix="%">100%</div><div class="l">independiente</div></div>
    <div class="stat"><div class="n">2</div><div class="l">caminos a tu medida</div></div>
  </div>
</section>
```

- [ ] **Step 2: Append hero CSS**

```css
.hero__split{display:flex;position:relative;min-height:min(82vh,720px)}
.gate{flex:1;position:relative;overflow:hidden;display:flex;align-items:center;
  transition:flex .5s var(--ease)}
.gate--sip{background:radial-gradient(130% 120% at 15% 25%,#0f8479,#0a5f57 42%,#063b37)}
.gate--wealth{background:radial-gradient(130% 120% at 85% 25%,#234a86,#16335b 42%,#0a1c34)}
.gate__glow{position:absolute;width:340px;height:340px;border-radius:50%;filter:blur(60px);opacity:.45;pointer-events:none}
.gate--sip .gate__glow{background:var(--mint);top:-100px;left:-60px}
.gate--wealth .gate__glow{background:#6ea8ff;bottom:-120px;right:-70px}
.gate__inner{position:relative;padding:56px clamp(28px,5vw,72px);max-width:520px;margin-left:auto;margin-right:0}
.gate--wealth .gate__inner{margin-left:0;margin-right:auto}
.gate__logo{margin-bottom:22px}
.gate h1{font-size:clamp(34px,4.4vw,52px);color:#fff;margin:16px 0}
.gate h1 em{font-style:italic;font-weight:500;color:#5af0d6}
.gate h1 em.em-navy{color:#9cc2ff}
.gate p{color:#cbd3df;font-size:16px;max-width:330px;margin-bottom:26px}
@media(min-width:861px){
  .gate:hover{flex:1.18}
}
.hero__seam{position:absolute;left:50%;top:0;bottom:0;width:1px;
  background:linear-gradient(#fff0,#ffffff55,#fff0);transform:translateX(-50%)}
.hero__badge{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  width:92px;height:92px;border-radius:50%;background:var(--ink);border:1px solid #2a3344;
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  z-index:3;box-shadow:0 14px 40px #0008}
.hero__badge .s{font-size:9px;letter-spacing:.18em;color:var(--fg-muted)}
.hero__badge .b{font-family:var(--font-head);font-size:16px;font-weight:700;color:#fff}
.hero__stats{display:grid;grid-template-columns:repeat(4,1fr);
  border-top:1px solid var(--border);background:var(--ink)}
.hero__stats .stat{padding:30px 24px;border-right:1px solid var(--border);text-align:center}
.hero__stats .stat:last-child{border-right:none}
.hero__stats .n{font-family:var(--font-head);font-size:clamp(28px,3.5vw,40px);font-weight:600;color:#fff}
.hero__stats .l{font-size:12px;color:var(--fg-muted);margin-top:6px;letter-spacing:.03em}
@media(max-width:860px){
  .hero__split{flex-direction:column}
  .gate__inner{margin:0 auto;text-align:center;padding:48px 28px}
  .gate p{margin-left:auto;margin-right:auto}
  .gate .btn{margin:0 auto}
  .hero__seam{left:0;right:0;top:50%;bottom:auto;width:auto;height:1px;
    background:linear-gradient(90deg,#fff0,#ffffff55,#fff0);transform:translateY(-50%)}
  .hero__badge{top:50%}
  .hero__stats{grid-template-columns:repeat(2,1fr)}
  .hero__stats .stat:nth-child(2){border-right:none}
  .hero__stats .stat:nth-child(1),.hero__stats .stat:nth-child(2){border-bottom:1px solid var(--border)}
}
```

- [ ] **Step 3: Verify**

Reload. Two duotone halves (teal left / navy right), editorial Playfair headlines with italic accent words, light CTA buttons, glow blobs, center badge over a vertical seam, and a 4-column stat strip beneath. Desktop hover expands a half. At 375px the halves stack and the seam goes horizontal, stats become 2×2.

- [ ] **Step 4: Checkpoint.**

---

## Task 4: Partners trust strip

**Files:**
- Modify: `index.html` (replace `.marquee-wrap`, lines ~84-93)
- Modify: `css/landing.css` (append)

- [ ] **Step 1: Replace markup (PRESERVE all 8 logos incl. Monific)**

```html
<section class="partners" aria-label="Instituciones aliadas">
  <p class="partners__lab">Instituciones aliadas</p>
  <div class="marquee">
    <div class="marquee__track">
      <img src="img/MONIFIC_LOGO.svg" alt="Monific"><img src="img/GBM_LOGO.svg" alt="GBM"><img src="img/FINIX_LOGO.png" alt="Finix"><img src="img/HANSARD_LOGO.svg" alt="Hansard"><img src="img/DOOPRIMER_LOGO.webp" alt="Dooprimer"><img src="img/ALLIANZ_LOGO.svg" alt="Allianz"><img src="img/SKANDIA_LOGO.png" alt="Skandia"><img src="img/DINEROENACCION_LOGO.png" alt="Dinero en Acción">
      <img src="img/MONIFIC_LOGO.svg" alt=""><img src="img/GBM_LOGO.svg" alt=""><img src="img/FINIX_LOGO.png" alt=""><img src="img/HANSARD_LOGO.svg" alt=""><img src="img/DOOPRIMER_LOGO.webp" alt=""><img src="img/ALLIANZ_LOGO.svg" alt=""><img src="img/SKANDIA_LOGO.png" alt=""><img src="img/DINEROENACCION_LOGO.png" alt="">
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
.partners{padding:40px 0;border-bottom:1px solid var(--border);background:var(--ink)}
.partners__lab{text-align:center;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--fg-muted);margin-bottom:26px}
.marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.marquee__track{display:flex;align-items:center;gap:64px;width:max-content;animation:scroll 38s linear infinite}
.marquee__track img{height:30px;width:auto;opacity:.62;filter:brightness(0) invert(1);
  transition:opacity .25s}
.marquee:hover .marquee__track{animation-play-state:paused}
.marquee__track img:hover{opacity:1}
@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.marquee__track{animation:none;flex-wrap:wrap;justify-content:center}}
```

- [ ] **Step 3: Verify**

Reload. A single row of partner logos (white-knockout, ~62% opacity) scrolls leftward; hovering pauses it and brightens the hovered logo. **Confirm the Monific logo renders** as the first item. With reduced-motion emulated, logos wrap static and centered.

- [ ] **Step 4: Checkpoint.**

---

## Task 5: ¿Qué es SIP? — bento grid

**Files:**
- Modify: `index.html` (replace the `¿Qué es SIP?` section, lines ~68-82)
- Modify: `css/landing.css` (append)

- [ ] **Step 1: Replace markup**

```html
<section class="section bento-sec">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow">Nuestra forma de trabajar</span>
      <h2>¿Qué es <span class="hl">SIP</span>?</h2>
      <p class="sec-sub">Tres principios que definen cómo trabajamos contigo.</p>
    </div>
    <div class="bento">
      <article class="bento__card bento__card--lead reveal">
        <span class="bento__num">01</span>
        <h3>Simple</h3>
        <p>Nuestro equipo de expertos te traduce las finanzas como nadie — sin tecnicismos, sin letra chica.</p>
        <a href="#contacto" class="bento__cta">Conversemos <span class="a">→</span></a>
      </article>
      <article class="bento__card reveal">
        <span class="bento__num">02</span>
        <h3>Inteligente</h3>
        <p>Estrategias diseñadas de acuerdo a las necesidades de cada cliente.</p>
      </article>
      <article class="bento__card reveal">
        <span class="bento__num">03</span>
        <h3>Profesional</h3>
        <p>Más de 10 años de experiencia en conjunto respaldan nuestra forma de trabajar.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
.sec-head{text-align:center;max-width:640px;margin:0 auto 56px}
.sec-head h2{font-size:clamp(30px,4vw,44px);margin:14px 0 12px}
.sec-head .hl{color:var(--mint)}
.sec-sub{color:var(--fg-muted);font-size:17px}
.bento{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:18px}
.bento__card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);
  padding:34px 30px;position:relative;overflow:hidden;transition:transform .25s var(--ease),border-color .25s}
.bento__card:hover{transform:translateY(-4px);border-color:#2c3650}
.bento__card--lead{grid-row:span 1;background:
  radial-gradient(120% 140% at 0% 0%,#0f5048 0%,var(--surface) 55%)}
.bento__num{font-family:var(--font-head);font-size:30px;color:var(--mint);opacity:.85}
.bento__card h3{font-size:24px;margin:10px 0 10px;color:#fff}
.bento__card p{color:var(--fg-muted);font-size:15px}
.bento__cta{display:inline-flex;gap:7px;align-items:center;margin-top:18px;
  color:var(--mint);font-weight:600;font-size:14px;font-family:var(--font-body)}
.bento__cta .a{transition:transform .2s var(--ease)}
.bento__cta:hover .a{transform:translateX(4px)}
@media(max-width:860px){.bento{grid-template-columns:1fr}}
```

- [ ] **Step 3: Verify**

Reload. A three-card bento: a larger teal-tinted "Simple" lead card (with a mint "Conversemos →" inline CTA) plus two supporting cards, big Playfair numerals, hover lift. Stacks to one column at 375px.

- [ ] **Step 4: Checkpoint.**

---

## Task 6: Los dos caminos — SIP vs Wealth comparison

**Files:**
- Modify: `index.html` (insert new section after bento, before partners or before contact — place after bento)
- Modify: `css/landing.css` (append)

- [ ] **Step 1: Insert markup**

```html
<section class="section paths" aria-label="Los dos caminos">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow">Dos caminos, un mismo acompañamiento</span>
      <h2>¿Cuál es tu momento?</h2>
    </div>
    <div class="paths__grid">
      <article class="path path--sip reveal">
        <span class="path__glow"></span>
        <h3>SIP</h3>
        <p class="path__for">Para quien <strong>empieza a invertir</strong>.</p>
        <ul>
          <li>Construir tu fondo de emergencia</li>
          <li>Poner a trabajar tus ahorros</li>
          <li>Empezar a ver por tu retiro</li>
        </ul>
        <a href="sip.html" class="btn btn--mint">Descubre SIP <span class="a">→</span></a>
      </article>
      <article class="path path--wealth reveal">
        <span class="path__glow"></span>
        <h3>SIP Wealth</h3>
        <p class="path__for">Para quien <strong>ya tiene un patrimonio</strong>.</p>
        <ul>
          <li>Proteger y diversificar tu capital</li>
          <li>Estrategia patrimonial a tu medida</li>
          <li>Soluciones internacionales</li>
        </ul>
        <a href="sip-wealth.html" class="btn btn--mint">Conoce SIP Wealth <span class="a">→</span></a>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
.paths__grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.path{position:relative;overflow:hidden;border-radius:var(--r);padding:42px 38px;
  border:1px solid var(--border)}
.path--sip{background:radial-gradient(120% 130% at 10% 0%,#0f5b53,#08322e 70%)}
.path--wealth{background:radial-gradient(120% 130% at 90% 0%,#1d3f72,#0a1c34 70%)}
.path__glow{position:absolute;width:240px;height:240px;border-radius:50%;filter:blur(60px);opacity:.35;top:-90px}
.path--sip .path__glow{background:var(--mint);left:-40px}
.path--wealth .path__glow{background:#6ea8ff;right:-40px}
.path h3{font-size:30px;color:#fff;position:relative}
.path__for{color:#dbe4ef;margin:6px 0 18px;font-size:16px;position:relative}
.path ul{list-style:none;margin:0 0 26px;position:relative}
.path li{color:#cbd3df;padding:9px 0 9px 26px;position:relative;border-bottom:1px solid #ffffff14;font-size:15px}
.path li::before{content:"";position:absolute;left:0;top:16px;width:12px;height:7px;
  border-left:2px solid var(--mint);border-bottom:2px solid var(--mint);transform:rotate(-45deg)}
.path--wealth li::before{border-color:#9cc2ff}
@media(max-width:860px){.paths__grid{grid-template-columns:1fr}}
```

- [ ] **Step 3: Verify**

Reload. Two side-by-side cards (SIP teal / Wealth navy) each listing who it's for, three checkmarked benefits, and a mint CTA. Stacks at 375px.

- [ ] **Step 4: Checkpoint.**

---

## Task 7: Cómo trabajamos — 3-step path

**Files:**
- Modify: `index.html` (insert after paths)
- Modify: `css/landing.css` (append)

- [ ] **Step 1: Insert markup**

```html
<section class="section steps-sec section--tint">
  <div class="container">
    <div class="sec-head reveal">
      <span class="eyebrow" style="color:var(--teal)">Sin complicaciones</span>
      <h2 class="on-light">Cómo trabajamos</h2>
    </div>
    <div class="steps">
      <div class="step reveal"><span class="step__n">1</span><h3>Conversamos</h3><p>Entendemos tu momento, tus metas y tus dudas.</p></div>
      <div class="step reveal"><span class="step__n">2</span><h3>Diseñamos</h3><p>Una estrategia clara, a la medida de lo que necesitas.</p></div>
      <div class="step reveal"><span class="step__n">3</span><h3>Acompañamos</h3><p>Estamos contigo en cada paso, ajustando en el camino.</p></div>
    </div>
    <div class="steps__cta reveal"><a href="#contacto" class="btn btn--mint">Agenda tu llamada <span class="a">→</span></a></div>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
.section--tint{background:var(--surface-tint);color:#1b2430}
.section--tint .sec-sub{color:#5d6470}
h2.on-light{color:#13202e}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;counter-reset:s}
.step{background:#fff;border:1px solid #e6e3db;border-radius:var(--r);padding:32px 28px}
.step__n{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;
  border-radius:50%;background:var(--teal);color:#fff;font-family:var(--font-head);font-size:20px;font-weight:700}
.step h3{color:#16202c;font-size:21px;margin:16px 0 8px}
.step p{color:#5d6470;font-size:15px}
.steps__cta{text-align:center;margin-top:40px}
@media(max-width:860px){.steps{grid-template-columns:1fr}}
```

- [ ] **Step 3: Verify**

Reload. A light "tint" section (editorial contrast against the dark page) with three numbered teal-circle steps and a centered mint "Agenda tu llamada" CTA. Stacks at 375px. Confirm text contrast on the light background is ≥4.5:1 (DevTools).

- [ ] **Step 4: Checkpoint.**

---

## Task 8: Contacto — conversion form

**Files:**
- Modify: `index.html` (replace contact section, lines ~95-113 — KEEP web3forms action + access key)
- Modify: `css/landing.css` (append)

- [ ] **Step 1: Replace markup**

```html
<section class="section contact" id="contacto">
  <div class="container contact__grid">
    <div class="contact__copy reveal">
      <span class="eyebrow">Demos el siguiente paso</span>
      <h2>Contáctanos</h2>
      <p class="intro">Cuéntanos en qué etapa estás y te acompañamos a dar el siguiente paso. Sin compromiso.</p>
      <div class="contact__pop"><b>+10</b><span>años acompañando<br>a inversionistas</span></div>
    </div>
    <form class="contact__form reveal" id="contactForm" action="https://api.web3forms.com/submit" method="POST" novalidate>
      <input type="hidden" name="access_key" value="1d5d84d8-8985-4d07-b79d-55a7f25f7383">
      <div class="field"><label for="name">Nombre</label>
        <input type="text" id="name" name="name" autocomplete="name" required>
        <span class="err" data-for="name"></span></div>
      <div class="field"><label for="email">Correo electrónico</label>
        <input type="email" id="email" name="email" autocomplete="email" required>
        <span class="err" data-for="email"></span></div>
      <div class="field"><label for="message">Mensaje</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        <span class="err" data-for="message"></span></div>
      <button type="submit" class="btn btn--mint" style="width:100%;justify-content:center">Enviar mensaje <span class="a">→</span></button>
      <p class="form-status" id="formStatus" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Append CSS**

```css
.contact__grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:start}
.contact__copy h2{font-size:clamp(30px,4vw,44px);margin:14px 0 14px}
.contact__copy .intro{color:var(--fg-muted);font-size:17px;max-width:340px}
.contact__pop{display:inline-flex;align-items:center;gap:16px;margin-top:34px;
  background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px 24px}
.contact__pop b{font-family:var(--font-head);font-size:38px;color:var(--mint)}
.contact__pop span{color:var(--fg-muted);font-size:13px;line-height:1.4}
.contact__form{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:34px}
.field{margin-bottom:18px}
.field label{display:block;font-size:13px;font-weight:600;margin-bottom:7px;color:var(--fg)}
.field input,.field textarea{width:100%;background:var(--ink);border:1px solid var(--border);
  border-radius:10px;padding:13px 15px;color:var(--fg);font-family:var(--font-body);font-size:15px;
  transition:border-color .2s}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--mint)}
.field.invalid input,.field.invalid textarea{border-color:#ff6b6b}
.err{display:block;color:#ff8a8a;font-size:12px;margin-top:6px;min-height:14px}
.form-status{margin-top:14px;font-size:14px;text-align:center}
.form-status.ok{color:var(--mint)}.form-status.bad{color:#ff8a8a}
@media(max-width:860px){.contact__grid{grid-template-columns:1fr;gap:32px}}
```

- [ ] **Step 3: Verify**

Reload. Two-column contact: copy + "+10 años" trust card on the left, form on the right with dark inputs, mint focus rings, a full-width mint submit, and empty error slots. Validation/submit behavior is wired in Task 10. Stacks at 375px. **Confirm the `access_key` hidden input is intact.**

- [ ] **Step 4: Checkpoint.**

---

## Task 9: Footer + aviso legal

**Files:**
- Modify: `index.html` (replace footer, lines ~117-135 — KEEP disclaimer verbatim)
- Modify: `css/landing.css` (append)

- [ ] **Step 1: Replace markup (disclaimer text unchanged)**

```html
<footer class="foot">
  <div class="container">
    <div class="foot__top">
      <div class="foot__brand">
        <img src="img/SIP_LOGO_W.png" alt="SIP" width="120">
        <p>Simple, inteligente y profesional. Te acompañamos en cada etapa de tu vida financiera.</p>
      </div>
      <nav class="foot__nav">
        <div><h4>Explora</h4><a href="index.html">Inicio</a><a href="sip.html">SIP</a><a href="sip-wealth.html">SIP Wealth</a></div>
        <div><h4>Contacto</h4><a href="#contacto">Escríbenos</a><a href="mailto:hola@sipartners.com.mx">hola@sipartners.com.mx</a></div>
      </nav>
    </div>
    <div class="disclaimer">
      <h4>Aviso legal</h4>
      <p>Simple Investment Partners es una firma independiente. No somos una entidad financiera ni un asesor en inversiones registrado ante la Comisión Nacional Bancaria y de Valores (CNBV). Nuestro rol se enfoca en orientación general, educación financiera y vinculación con instituciones autorizadas por las autoridades competentes. No ofrecemos productos financieros propios ni garantizamos rendimientos.</p>
    </div>
    <div class="foot__bottom">© 2025 Simple Investment Partners · Todos los derechos reservados.</div>
  </div>
</footer>
</main>
```

- [ ] **Step 2: Append CSS**

```css
.foot{background:var(--ink);border-top:1px solid var(--border);padding:64px 0 32px}
.foot__top{display:grid;grid-template-columns:1.3fr 1fr;gap:40px;padding-bottom:36px;border-bottom:1px solid var(--border)}
.foot__brand p{color:var(--fg-muted);font-size:14px;max-width:320px;margin-top:16px}
.foot__nav{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.foot__nav h4{font-family:var(--font-body);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--fg);margin-bottom:14px}
.foot__nav a{display:block;color:var(--fg-muted);font-size:14px;padding:5px 0;transition:color .2s}
.foot__nav a:hover{color:var(--mint)}
.disclaimer{padding:28px 0;border-bottom:1px solid var(--border)}
.disclaimer h4{font-family:var(--font-body);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--fg-muted);margin-bottom:10px}
.disclaimer p{color:#6f7787;font-size:12.5px;line-height:1.7;max-width:780px}
.foot__bottom{text-align:center;color:#6f7787;font-size:12.5px;padding-top:28px}
@media(max-width:860px){.foot__top{grid-template-columns:1fr;gap:28px}}
```

- [ ] **Step 3: Verify**

Reload. Footer with brand blurb, two nav columns, the **legal disclaimer verbatim**, and copyright. Stacks at 375px. Note: the original used `<h2>Aviso legal</h2>`; this plan uses `<h4>` to keep heading hierarchy sane (single h1 in hero). Confirm disclaimer wording matches the original exactly.

- [ ] **Step 4: Checkpoint.**

---

## Task 10: Motion JS — header, drawer, counters, sticky CTA, form validation

**Files:**
- Modify: `js/main.js` (append guarded landing behaviors; do not remove existing logic)

- [ ] **Step 1: Confirmed contents of existing `js/main.js` (42 lines, do NOT remove)**

The existing IIFE already handles, and these are REUSED (the new markup uses the same IDs/classes intentionally):
- Header scroll → sets `header.dataset.scrolled = 'true'|'false'` (CSS targets `[data-scrolled="true"]`). **Do not re-add header scroll logic.**
- Mobile drawer → sets `drawer.dataset.open` / `scrim.dataset.open` (CSS targets `[data-open="true"]`), with Esc-to-close and focus handling. **Do not re-add drawer logic.**
- Reveal → IntersectionObserver adds `.in` to `.reveal` elements. **Do not re-add reveal logic.**
- A `.process` timeline block — harmless no-op on the landing (no `.process` element exists).

Only the three behaviors below are MISSING and must be appended: sticky mobile CTA, number counters, form validation.

- [ ] **Step 2: Append guarded behaviors to `js/main.js`**

```js
/* ===== Landing-only behaviors (guarded; no-op on sub-pages) ===== */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // NOTE: header scroll + drawer + reveal already handled by the existing IIFE above. Do not duplicate.

  // Sticky mobile CTA: show after hero scrolls past
  var mcta = document.getElementById('mobileCta');
  var hero = document.querySelector('.hero');
  if (mcta && hero && 'IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      mcta.classList.toggle('show', !es[0].isIntersecting);
    },{threshold:0}).observe(hero);
  }

  // Animated number counters
  var nums = document.querySelectorAll('.hero__stats .n[data-count]');
  if (nums.length && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix||'';
        io.unobserve(el);
        if(reduce){ el.textContent = (el.dataset.prefix||'')+target+suffix; return; }
        var start=0, t0=performance.now(), dur=1100;
        (function tick(now){
          var p=Math.min((now-t0)/dur,1), v=Math.round(start+(target-start)*p);
          el.textContent=(el.dataset.prefix||'')+v+suffix;
          if(p<1) requestAnimationFrame(tick);
        })(t0);
      });
    },{threshold:.5});
    nums.forEach(function(n){ io.observe(n); });
  }

  // Contact form: inline validation + web3forms AJAX submit
  var form = document.getElementById('contactForm');
  if (form){
    var status = document.getElementById('formStatus');
    var setErr = function(input, msg){
      var field = input.closest('.field');
      field.classList.toggle('invalid', !!msg);
      var slot = field.querySelector('.err'); if(slot) slot.textContent = msg||'';
    };
    var validate = function(input){
      if(input.validity.valueMissing) return setErr(input,'Este campo es obligatorio.'),false;
      if(input.type==='email' && input.validity.typeMismatch) return setErr(input,'Escribe un correo válido.'),false;
      return setErr(input,''),true;
    };
    form.querySelectorAll('input[required],textarea[required]').forEach(function(input){
      input.addEventListener('blur', function(){ validate(input); });
    });
    form.addEventListener('submit', async function(ev){
      ev.preventDefault();
      var inputs = form.querySelectorAll('input[required],textarea[required]'), ok=true, first=null;
      inputs.forEach(function(i){ if(!validate(i)){ ok=false; first=first||i; } });
      if(!ok){ if(first) first.focus(); return; }
      var btn=form.querySelector('button[type=submit]'); btn.disabled=true;
      status.className='form-status'; status.textContent='Enviando…';
      try{
        var res = await fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
        if(res.ok){ form.reset(); status.className='form-status ok'; status.textContent='¡Gracias! Te contactaremos pronto.'; }
        else throw new Error('bad');
      }catch(e){ status.className='form-status bad'; status.textContent='Algo salió mal. Escríbenos a hola@sipartners.com.mx'; }
      finally{ btn.disabled=false; }
    });
  }
})();
```

- [ ] **Step 3: Verify**

Reload. (a) Header gains a hairline border after scrolling 8px. (b) On a 375px viewport, scrolling past the hero slides up the mint sticky CTA; scrolling back to top hides it. (c) Stat numbers count up once when the strip enters view. (d) Submitting the empty form shows inline errors and focuses the first invalid field; a valid submit shows "Enviando…" then a success message and resets. (e) With reduced-motion emulated, counters jump straight to final values and nothing animates.

- [ ] **Step 4: Verify sub-pages still work**

Open `sip.html` and `sip-wealth.html`. Expected: unchanged appearance and no console errors (the new IIFE finds none of its elements and no-ops). This is the critical isolation check.

- [ ] **Step 5: Checkpoint.**

---

## Task 11: Responsive + accessibility QA pass

**Files:** none (review/fix only; fixes go into `css/landing.css` / `index.html`)

- [ ] **Step 1: Breakpoint sweep**

At 375 / 768 / 1024 / 1440px confirm: no horizontal scroll; hero stacks at ≤860px; bento/paths/steps collapse to one column; stat strip is 2×2 on mobile; tap targets ≥44px (nav toggle, drawer links, CTAs, form inputs).

- [ ] **Step 2: Contrast audit**

Using DevTools color picker, verify ≥4.5:1 for: `--fg-muted` (#9AA3B2) on `--ink`; step text on light tint; disclaimer #6f7787 on --ink (bump to a lighter gray if it fails — adjust token and re-check). Mint text on dark is for accents/buttons (button uses dark text on mint — verify that pair too).

- [ ] **Step 3: Keyboard + reduced-motion + screen-reader basics**

Tab through the whole page: focus rings visible everywhere (mint outline), skip-link works, drawer is reachable and `Esc`/close works, form errors announce via `aria-live`. Emulate reduced-motion: no reveals/marquee/counters animate. Run Lighthouse (Accessibility) and address any flagged issues.

- [ ] **Step 4: Asset integrity check**

Confirm every partner logo loads (Network tab, no 404s), **`img/MONIFIC_LOGO.svg` included**, favicon present, both hero logos present.

- [ ] **Step 5: Final checkpoint**

Summarize results. Do NOT commit — hand back to Santiago to decide on committing/deploying the redesign as one changeset.

---

## Self-Review

**Spec coverage:** Hero (T3), partners+Monific (T4), bento pillars (T5), two-paths value (T6), how-we-work (T7), contact (T8), footer/disclaimer (T9), tokens/type/color system (T1), motion + counters + sticky CTA + form (T2/T10), accessibility/responsive (T11), sub-page isolation (T1 stylesheet swap + T10 Step 4). ~9 CTA touchpoints: nav (T2), 2 hero doors (T3), bento (T5), 2 paths (T6), steps (T7), form submit (T8), sticky mobile (T2/T10) = 9. ✓ All spec sections mapped.

**Placeholder scan:** No TBD/TODO; every code step contains complete code. ✓

**Type consistency:** IDs/classes used by `js/main.js` in T10 (`#siteHeader`, `#navToggle`, `#drawer`, `#scrim`, `#drawerClose`, `#mobileCta`, `.hero`, `.hero__stats .n[data-count]`, `#contactForm`, `#formStatus`, `.field`, `.err`) all match the markup defined in T2/T3/T8. Button classes (`btn`, `btn--mint`, `btn--light`, `btn--ghost`) defined in T1 and reused consistently. ✓
