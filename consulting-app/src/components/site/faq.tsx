import { Reveal } from "./reveal";

// Native <details> so it works without JS, stays keyboard-accessible, and keeps the
// answers in the initial HTML where crawlers can read them.
export const faqItems: { q: string; a: string }[] = [
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance. Preferimos trabajar con un plan mensual, que da acompañamiento continuo; también hacemos proyectos cuando hay un objetivo con fecha. El monto sale de la primera llamada, una vez que entendemos tu empresa. Cotizar antes sería inventar.",
  },
  {
    q: "¿En qué se diferencia de mi contador?",
    a: "Tu contador registra lo que ya pasó y te mantiene en cumplimiento. Nosotros usamos esa información para decidir lo que sigue: a dónde va la caja las próximas 13 semanas, qué margen aguanta la siguiente contratación, qué escenario resiste. Son papeles distintos y se complementan.",
  },
  {
    q: "¿Reemplazan a mi equipo de contabilidad?",
    a: "No. Trabajamos encima de él y, en general, lo hacemos rendir más: cuando el cierre tiene una fecha fija y un destino claro, la contabilidad deja de ser un trámite y se vuelve insumo de decisión.",
  },
  {
    q: "¿Qué tan rápido se ve algo?",
    a: "Desde el primer mes ves avances concretos. El trabajo de fondo toma unos tres meses: es lo que lleva recibir tu información, entenderla y procesarla. No hay plazo forzoso, pero ese es el tiempo que recomendamos.",
  },
  {
    q: "¿Para qué tamaño de empresa es?",
    a: "Para empresas que ya tienen operación, nómina y decisiones financieras de peso, pero todavía no justifican un CFO de tiempo completo. Si tus decisiones de caja ya no caben en una hoja de cálculo, es el momento.",
  },
];

export function Faq() {
  return (
    <div className="faq">
      {faqItems.map((it) => (
        <Reveal key={it.q} className="faq-item">
          <details>
            <summary>
              <span>{it.q}</span>
              <i aria-hidden="true" />
            </summary>
            <p>{it.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
