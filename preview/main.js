// ============================================================
//  SIP — shared interactions (accessible, performant)
// ============================================================

// Header solid background on scroll
const header = document.getElementById('siteHeader');
if (header) {
    const onScroll = () => { header.dataset.scrolled = window.scrollY > 24; };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Accessible mobile drawer (focus management + Escape + scrim)
const toggle = document.getElementById('navToggle');
const drawer = document.getElementById('drawer');
const scrim  = document.getElementById('scrim');
const closeB = document.getElementById('drawerClose');
if (toggle && drawer && scrim) {
    const open  = () => { drawer.dataset.open = scrim.dataset.open = 'true';  toggle.setAttribute('aria-expanded', 'true');  drawer.querySelector('a')?.focus(); };
    const close = () => { drawer.dataset.open = scrim.dataset.open = 'false'; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); };
    toggle.addEventListener('click', open);
    closeB?.addEventListener('click', close);
    scrim.addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.dataset.open === 'true') close(); });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

// Reveal on scroll — fast, one-way
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Process timeline: light up steps + grow the fill line as it enters view
const process = document.querySelector('.process');
if (process) {
    const fill  = process.querySelector('.process__fill');
    const steps = [...process.querySelectorAll('.process__step')];
    const sync = () => {
        const r = process.getBoundingClientRect();
        const progress = Math.min(Math.max((window.innerHeight * 0.6 - r.top) / r.height, 0), 1);
        if (fill) fill.style.height = `${progress * 100}%`;
        steps.forEach((s, i) => {
            const sr = s.querySelector('.process__dot').getBoundingClientRect();
            s.classList.toggle('in', sr.top < window.innerHeight * 0.65);
        });
    };
    addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
}
