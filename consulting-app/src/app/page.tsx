import { Nav } from "@/components/site/nav";
import { Forecast } from "@/components/site/forecast";
import { UnitLockup } from "@/components/site/unit-lockup";
import { serviceCards } from "@/components/site/services";
import { Faq, faqItems } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { Industries } from "@/components/site/industries";
import { Analyses } from "@/components/site/analyses";
import { Diagnostic } from "@/components/site/diagnostic";
import { CONTACT_EMAIL, DIAGNOSTIC_MESSAGE, contactLink } from "@/lib/contact";

// Built from the same pieces as sipartners.com.mx (css/site.css, mirrored in ./site.css),
// so both sites share widths, type, spacing and components; mint is this unit's color.
// Each section has its own shape (quotes, before/after, timeline, cards, mosaic) in ./consulting.css.

const PAGE_URL = "https://sipartners.com.mx/consulting/";

// Solo datos visibles en la página o confirmados: nada de cifras ni credenciales sin respaldo.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sipartners.com.mx/#organization",
      name: "Simple Investment Partners",
      alternateName: "SIP",
      url: "https://sipartners.com.mx/",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${PAGE_URL}#consulting`,
      name: "SIP·Consulting",
      url: PAGE_URL,
      email: CONTACT_EMAIL,
      description:
        "Unidad de finanzas estratégicas de Simple Investment Partners: la dirección financiera de un CFO, con todo un equipo detrás, para startups y pymes.",
      parentOrganization: { "@id": "https://sipartners.com.mx/#organization" },
      areaServed: { "@type": "Country", name: "México" },
    },
    {
      "@type": "Service",
      name: "Finanzas estratégicas (CFO fraccional)",
      serviceType: "CFO fraccional",
      url: PAGE_URL,
      provider: { "@id": `${PAGE_URL}#consulting` },
      areaServed: { "@type": "Country", name: "México" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ],
};

// Lo que un dueño se dice a sí mismo justo antes de llamarnos.
const THOUGHTS = [
  "Vendimos más que nunca y no hay dinero en la cuenta.",
  "¿Me alcanza para la nómina del 15?",
  "Quiero abrir otra sucursal, pero no sé si la que tengo deja dinero.",
  "Mi contador me manda los estados financieros y no les entiendo.",
  "El inversionista pidió el modelo financiero y no tenemos uno.",
  "Subimos precios y no sé si fue suficiente.",
];

// Los cuatro pasos y lo que viene después, en una sola línea de tiempo.
const TIMELINE: { h: string; p: string; when?: string; later?: boolean }[] = [
  { h: "Primera llamada", p: "Nos conocemos y hacemos un pre-diagnóstico. De ahí sale la propuesta: plan, alcance y precio." },
  { h: "Firma", p: "Si te hace sentido, firmamos la documentación necesaria." },
  { h: "Onboarding", p: "Una sesión con tu equipo y el de SIP para acordar cómo vamos a trabajar." },
  { h: "Empezamos", p: "Nos compartes la información que pida el equipo y arrancamos." },
  { h: "Primeros avances", p: "Mejoras concretas mientras ordenamos todo lo demás.", when: "Primer mes", later: true },
  { h: "Trabajo de fondo", p: "Tu información ya está digerida y procesada: decides con números.", when: "Tercer mes", later: true },
];

const WORKED = [
  "Restaurantes",
  "Naves industriales",
  "Fabricantes de alimentos",
  "Podcasts y medios digitales",
  "Escuelas en línea",
  "Tecnología para bancos",
  "Entregas de última milla",
  "Proyectos de inversión inmobiliaria",
];

// Mismos nombres y cargos que en el Inicio de sipartners.com.mx.
const PEOPLE: [string, string][] = [
  ["Diego Sosa García", "Co-Founder & CEO"],
  ["Santiago Salgado García", "Co-Founder & CFO"],
  ["Sergio Alejandro Canto Arizpe", "Co-Founder & COO"],
];

// Lo que se entrega, como archivos: queda en la empresa aunque terminemos de trabajar juntos.
const FILES: [string, string, string][] = [
  ["Modelo financiero", "XLS", "xls"],
  ["Presupuesto anual", "XLS", "xls"],
  ["Tablero de caja", "BI", "bi"],
  ["Reporte mensual para socios", "PPT", "ppt"],
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main id="main">
        <section className="h-hero c-hero" aria-labelledby="hero-title">
          <div className="h-wrap h-hero__grid">
            <div className="h-hero__copy">
              <UnitLockup />
              <h1 id="hero-title">
                El equipo de finanzas que tu empresa <em>por fin puede tener.</em>
              </h1>
              <Industries />
              <p>
                Ordenamos tus números para que dirijas con un plan y no a ciegas: estados
                financieros, efectivo, proyecciones y presupuesto. Nos metemos en la operación para
                entender tu negocio.
              </p>
              <div className="h-hero__cta">
                <a className="h-btn h-btn--solid" {...contactLink(DIAGNOSTIC_MESSAGE)}>
                  Agenda una llamada
                </a>
              </div>
            </div>
            <figure className="h-panel">
              <figcaption className="h-panel__head">
                <span>Caja · pronóstico a 13 semanas</span>
                <span className="h-legend">
                  <i className="lg-base">base</i>
                  <i className="lg-up">upside</i>
                  <i className="lg-stress">stress</i>
                </span>
              </figcaption>
              <Forecast className="h-chart__viz" />
              <p className="h-panel__foot">Ejemplo</p>
            </figure>
          </div>
        </section>

        {/* ¿Te suena? Lo que se dice un dueño antes de llamarnos */}
        <section className="c-section c-thoughts" aria-labelledby="thoughts-title">
          <div className="h-wrap">
            <Reveal>
              <h2 id="thoughts-title" className="c-big">
                ¿Te suena?
              </h2>
            </Reveal>
            <Reveal as="ul" className="c-thoughts__grid">
              {THOUGHTS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </Reveal>
            <Reveal>
              <p className="c-thoughts__out">Es justo cuando nos llaman.</p>
            </Reveal>
          </div>
        </section>

        {/* Antes y después: decidir con el saldo de hoy o con el pronóstico */}
        <section className="c-section c-blind" aria-labelledby="blind-title">
          <div className="h-wrap">
            <Reveal>
              <h2 id="blind-title" className="c-big">
                Dirige tu empresa con números, <em>no a ciegas.</em>
              </h2>
            </Reveal>
            <div className="c-blind__pair">
              <Reveal className="c-card c-card--before">
                <p className="c-card__label">Hoy · con el estado de cuenta</p>
                <ul className="c-moves" aria-label="Últimos movimientos de ejemplo">
                  <li><span>Depósito de cliente</span><b>+$58,200</b></li>
                  <li><span>Renta del local</span><b>−$45,000</b></li>
                  <li><span>Proveedor</span><b>−$23,900</b></li>
                  <li><span>Comisiones bancarias</span><b>−$1,240</b></li>
                </ul>
                <p className="c-balance__k">Saldo disponible</p>
                <p className="c-balance">$412,380</p>
                <p className="c-card__note">Sabes cuánto tienes hoy. No sabes si alcanza el día 15.</p>
              </Reveal>
              <Reveal className="c-card c-card--after">
                <p className="c-card__label">Con SIP · con números</p>
                <Analyses />
              </Reveal>
            </div>
            <Reveal>
              <p className="c-blind__out">
                Eso hace un CFO. Contratar uno de tiempo completo toma meses y entra a una nómina que
                ya no baja. Con SIP tienes la dirección financiera de un CFO, con todo un equipo detrás,
                por un pago mensual fijo.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Lo que hacemos: piezas sueltas, cada empresa toma las que necesita */}
        <section className="c-section h-services" id="servicio" aria-labelledby="services-title">
          <div className="h-wrap">
            <Reveal>
              <h2 id="services-title" className="c-big">
                Lo que hacemos.
              </h2>
              <p className="c-lead">
                Cada empresa toma lo que necesita. La primera llamada define el alcance: a veces es
                una pieza, a veces son varias.
              </p>
            </Reveal>
            <div className="h-services__grid">
              {serviceCards.map((c) => (
                <Reveal key={c.title} className="h-service h-service--art">
                  <div className="h-art" aria-hidden="true">
                    {c.art}
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                  {c.cta && (
                    <a className="h-link" href="#contacto">
                      Hablemos
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo arrancamos: una línea de tiempo, de la llamada al trabajo de fondo */}
        <section className="c-section c-time" id="como" aria-labelledby="steps-title">
          <div className="h-wrap">
            <Reveal>
              <h2 id="steps-title" className="c-big">
                De la primera llamada al trabajo de fondo.
              </h2>
            </Reveal>
            <Reveal as="ol" className="c-time__line">
              {TIMELINE.map((s, i) => (
                <li key={s.h} className={s.later ? "is-later" : undefined}>
                  <span className="c-time__tag">{s.when ?? `Paso ${i + 1}`}</span>
                  <i className="c-time__dot" aria-hidden="true" />
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </li>
              ))}
            </Reveal>
            <Reveal>
              <p className="c-time__note">
                No hay plazo forzoso. Recomendamos al menos tres meses: es lo que toma recibir tu
                información, entenderla y convertirla en trabajo de fondo.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Cómo se cotiza: dos tarjetas, el plan mensual al frente */}
        <section className="c-section c-price" aria-labelledby="pricing-title">
          <div className="h-wrap">
            <Reveal>
              <h2 id="pricing-title" className="c-big">
                Cómo se cotiza.
              </h2>
              <p className="c-lead">
                No publicamos tarifa porque el alcance no se repite: lo que necesita una empresa a
                punto de levantar capital no es lo que necesita una que va por su tercera sucursal.
              </p>
            </Reveal>
            <div className="c-price__pair">
              <Reveal className="c-plan c-plan--main">
                <p className="c-plan__tag">La que preferimos</p>
                <h3>Plan mensual</h3>
                <p>Acompañamiento continuo con un monto fijo al mes: cierre, pronóstico y decisiones, cada mes.</p>
              </Reveal>
              <Reveal className="c-plan">
                <p className="c-plan__tag">Con fecha de entrega</p>
                <h3>Por proyecto</h3>
                <p>Para un objetivo puntual: levantar capital, ordenar márgenes o dejar instalado el modelo y el tablero.</p>
              </Reveal>
            </div>
            <Reveal>
              <p className="c-price__note">
                El monto depende de la etapa de la empresa, la complejidad de la operación y la
                profundidad del acompañamiento. Sale de la primera llamada.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Quién está detrás: un mosaico en vez de una lista */}
        <section className="c-section c-team" id="quien" aria-labelledby="team-title">
          <div className="h-wrap">
            <div className="c-team__grid">
              <Reveal className="c-tile c-tile--lead">
                <h2 id="team-title" className="c-tile__k">Quién está detrás</h2>
                <p className="c-tile__big">
                  Venimos de las finanzas corporativas y del mundo tech. Hacemos el trabajo complejo
                  para que tú recibas algo claro.
                </p>
                <p className="c-tile__foot">Nos metemos en la operación y en el día a día para entender tu negocio.</p>
              </Reveal>
              <Reveal className="c-tile c-tile--team">
                <p className="c-tile__k">Todo un equipo</p>
                <div className="c-faces" aria-hidden="true">
                  <i>DS</i>
                  <i>SS</i>
                  <i>SC</i>
                  <i className="is-more">+</i>
                </div>
                <ul className="c-people">
                  {PEOPLE.map(([n, r]) => (
                    <li key={n}>
                      <b>{n}</b>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <p className="c-tile__small">Y un equipo detrás: tu empresa recibe el criterio de varias personas, no el tiempo de una sola.</p>
              </Reveal>
              <Reveal className="c-tile c-tile--files">
                <p className="c-tile__k">Lo que construimos se queda en tu empresa</p>
                <ul className="c-files">
                  {FILES.map(([name, kind, type]) => (
                    <li key={name}>
                      <em className={`is-${type}`}>{kind}</em>
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
                <p className="c-tile__small">En las herramientas que ya usas: Excel, PowerPoint y Power BI, con apoyo de IA.</p>
              </Reveal>
              <Reveal className="c-tile c-tile--worked">
                <p className="c-tile__k">Hemos trabajado con</p>
                <ul className="c-tags">
                  {WORKED.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal className="c-tile c-tile--mentat">
                <p className="c-tile__name">Mentat</p>
                <p className="c-tile__soon">
                  Próximamente<i className="c-cursor" aria-hidden="true" />
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="h-section" aria-labelledby="faq-title">
          <div className="h-wrap h-split">
            <Reveal>
              <h2 id="faq-title" className="h-title">
                Lo que siempre nos preguntan.
              </h2>
            </Reveal>
            <Faq />
          </div>
        </section>

        <section className="h-section h-contact" id="contacto" aria-labelledby="contact-title">
          <div className="h-wrap h-split">
            <Reveal>
              <h2 id="contact-title" className="h-title">
                Pongamos tu dinero bajo control.
              </h2>
              <p className="h-lead">
                Seis preguntas rápidas. Al final te decimos por dónde empezaríamos y abres la
                conversación por WhatsApp con tu caso ya explicado.
              </p>
              <p className="h-lead h-lead--small">
                ¿Prefieres correo? Escríbenos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </Reveal>
            <Diagnostic />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
