"use client";

import { useEffect, useRef, useState } from "react";

// "Con SIP": cuatro análisis de ejemplo que se dibujan uno tras otro (caja, ciclo de efectivo,
// margen por sucursal y punto de equilibrio). Todos los números son ilustrativos.
// Avanza solo cada pocos segundos; se detiene al pasar el mouse o con el teclado dentro,
// y sin movimiento si la persona lo tiene desactivado.

const ADVANCE_MS = 6500;

type Analysis = { tab: string; title: string; alert: React.ReactNode; note: string; chart: React.ReactNode; label: string };

const ANALYSES: Analysis[] = [
  {
    tab: "Caja",
    title: "Pronóstico de caja · 13 semanas",
    label: "Ejemplo: el saldo cae por debajo del mínimo en la semana 7 y se recupera",
    chart: (
      <>
        <path className="a-grid" d="M0,30H400M0,75H400M0,120H400" />
        <path className="a-floor" d="M0,108H400" />
        <text className="a-t a-t--warn" x="400" y="100" textAnchor="end">Mínimo de caja</text>
        <path className="a-line a-draw" pathLength={100} d="M0,52 C40,58 70,50 100,66 S170,96 210,118 S290,84 330,62 S380,46 400,42" />
        <circle className="a-dot a-pop" cx="210" cy="118" r="6" />
      </>
    ),
    alert: (
      <>
        <b>Semana 7</b> · nómina y proveedores. Faltan $85,000.
      </>
    ),
    note: "Lo ves con semanas de anticipación y decides a tiempo.",
  },
  {
    tab: "Ciclo de efectivo",
    title: "Ciclo de conversión de efectivo",
    label: "Ejemplo: 45 días de inventario más 38 de cobranza menos 30 de proveedores dan un ciclo de 53 días",
    chart: (
      <>
        <text className="a-t" x="0" y="14">Inventario · 45 días</text>
        <rect className="a-bar a-grow" x="0" y="20" width="195" height="16" rx="3" />
        <text className="a-t" x="195" y="52">Cobranza · 38 días</text>
        <rect className="a-bar a-grow a-d1" x="195" y="58" width="165" height="16" rx="3" />
        <text className="a-t a-t--warn" x="0" y="90">Pago a proveedores · 30 días</text>
        <rect className="a-bar a-bar--warn a-grow a-d2" x="0" y="96" width="130" height="16" rx="3" />
        <text className="a-t a-t--hi" x="130" y="128">Tu dinero tarda 53 días en regresar</text>
        <rect className="a-bar a-bar--hi a-grow a-d3" x="130" y="134" width="230" height="16" rx="3" />
      </>
    ),
    alert: (
      <>
        <b>53 días</b> · cobrar 10 días antes lo acorta casi una quinta parte.
      </>
    ),
    note: "Sabes cuánto tiempo tu dinero está atorado y dónde se puede soltar.",
  },
  {
    tab: "Margen por sucursal",
    title: "Margen por sucursal",
    label: "Ejemplo: Centro deja 24 por ciento, Norte 17 y Sur 4; el promedio es 15",
    chart: (
      <>
        <path className="a-grid" d="M0,150H400" />
        <rect className="a-bar a-rise" x="40" y="22" width="70" height="128" rx="4" />
        <rect className="a-bar a-rise a-d1" x="165" y="59" width="70" height="91" rx="4" />
        <rect className="a-bar a-bar--warn a-rise a-d2" x="290" y="129" width="70" height="21" rx="4" />
        <path className="a-floor" d="M0,70H400" />
        <text className="a-t" x="400" y="64" textAnchor="end">Promedio 15%</text>
        <text className="a-t a-t--big" x="75" y="16" textAnchor="middle">24%</text>
        <text className="a-t a-t--big" x="200" y="53" textAnchor="middle">17%</text>
        <text className="a-t a-t--big a-t--warn" x="325" y="123" textAnchor="middle">4%</text>
        <text className="a-t" x="75" y="168" textAnchor="middle">Centro</text>
        <text className="a-t" x="200" y="168" textAnchor="middle">Norte</text>
        <text className="a-t" x="325" y="168" textAnchor="middle">Sur</text>
      </>
    ),
    alert: (
      <>
        <b>Sucursal Sur</b> · deja 4%. Antes de abrir otra, conviene revisar esta.
      </>
    ),
    note: "Sabes qué parte del negocio deja dinero y cuál se lo come.",
  },
  {
    tab: "Punto de equilibrio",
    title: "Ventas contra costos · 12 meses",
    label: "Ejemplo: las ventas alcanzan a los costos en el mes 8",
    chart: (
      <>
        <path className="a-grid" d="M0,30H400M0,75H400M0,120H400" />
        <path className="a-line a-line--warn a-draw" pathLength={100} d="M0,70 L400,46" />
        <path className="a-line a-draw a-d1" pathLength={100} d="M0,140 C80,128 160,104 260,62 S360,22 400,14" />
        <circle className="a-dot a-pop" cx="262" cy="61" r="6" />
        <text className="a-t a-t--warn" x="0" y="62">Costos</text>
        <text className="a-t a-t--hi" x="150" y="140">Ventas</text>
      </>
    ),
    alert: (
      <>
        <b>Mes 8</b> · a este ritmo, a partir de ahí cubres todos tus costos.
      </>
    ),
    note: "Sabes cuánto necesitas vender y cuándo lo vas a lograr.",
  },
];

export function Analyses() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [still, setStill] = useState(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(reduce.matches);
    const onChange = () => setStill(reduce.matches);
    reduce.addEventListener("change", onChange);
    return () => reduce.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (hold || still) return;
    const t = setTimeout(() => setI((n) => (n + 1) % ANALYSES.length), ADVANCE_MS);
    return () => clearTimeout(t);
  }, [i, hold, still]);

  const a = ANALYSES[i];
  return (
    <div
      ref={root}
      className={`c-analysis${still ? " is-still" : ""}`}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      <div className="c-analysis__tabs" role="tablist" aria-label="Análisis de ejemplo">
        {ANALYSES.map((x, n) => (
          <button
            key={x.tab}
            type="button"
            role="tab"
            aria-selected={n === i}
            className={n === i ? "is-on" : undefined}
            onClick={() => setI(n)}
          >
            {x.tab}
          </button>
        ))}
      </div>
      {/* la key reinicia la animación de dibujo cada vez que cambia el análisis */}
      <div key={i} className="c-analysis__panel" role="tabpanel" aria-label={a.title}>
        <p className="c-analysis__title">{a.title}</p>
        <svg className="c-mini" viewBox="0 0 400 172" role="img" aria-label={a.label}>
          {a.chart}
        </svg>
        <p className="c-alert">{a.alert}</p>
        <p className="c-card__note">
          {a.note} <span>Ejemplo</span>
        </p>
      </div>
      {!still && (
        <div className="c-analysis__timer" aria-hidden="true">
          <i key={`${i}-${hold}`} className={hold ? "is-held" : undefined} style={{ animationDuration: `${ADVANCE_MS}ms` }} />
        </div>
      )}
    </div>
  );
}
