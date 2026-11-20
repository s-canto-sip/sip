import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

const PAGE_URL = "https://sipartners.com.mx/consulting/que-es-un-cfo-fraccional";
const HEADLINE = "¿Qué es un CFO fraccional?";
const DESCRIPTION =
  "Un CFO fraccional es un director de finanzas con experiencia que se hace cargo de los números de tu empresa solo el tiempo que hace falta. Qué hace, en qué se diferencia de tu contador y cuándo conviene.";

export const metadata: Metadata = {
  title: "¿Qué es un CFO fraccional? Qué hace y cuándo conviene | SIP·Consulting",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: HEADLINE, description: DESCRIPTION, url: PAGE_URL, type: "article", locale: "es_MX" },
};

const ROLES = [
  ["Contador", "Registra y cumple. Mira el mes que ya cerró."],
  ["Administración o controller", "Opera el día a día: cobranza, pagos, control interno."],
  ["Consultor por proyecto", "Entrega un documento y se va. Nadie lo mantiene vivo."],
  ["CFO fraccional", "Te ayuda a decidir, de forma constante y dentro de tu operación."],
];

const SIGNS = [
  "Sabes cuánto vendiste, pero no cuánto ganaste ni en qué.",
  "Tu caja vive en tu cabeza, no en un pronóstico.",
  "Tu contabilidad mira hacia atrás y nadie mira hacia adelante.",
  "Las decisiones grandes se toman con lo que había ese día en el banco.",
];

const WORK = [
  ["Tu dinero disponible", "Cuánto dinero tienes, cuánto entra, cuánto sale y hasta dónde alcanza."],
  ["Qué te deja dinero", "Qué producto, línea o canal gana dinero y cuál lo está perdiendo."],
  ["Cierre y reportes", "Cerrar el mes a tiempo, con un reporte que cualquier socio entiende."],
  ["Plan y escenarios", "Tu plan del negocio traducido a números, con escenarios distintos."],
  ["Listos para inversionistas o banco", "Números, indicadores y documentos en orden antes de que te los pidan."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  inLanguage: "es-MX",
  mainEntityOfPage: PAGE_URL,
  author: { "@id": "https://sipartners.com.mx/consulting/#consulting" },
  publisher: { "@id": "https://sipartners.com.mx/#organization" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main className="article wrap">
        <header>
          <h1 className="display">{HEADLINE}</h1>
          <p className="article-lead">
            Un CFO fraccional es un director de finanzas con experiencia que se hace cargo de los
            números de tu empresa solo el tiempo que hace falta, sin sumarlo a la nómina de tiempo
            completo.
          </p>
        </header>

        <section>
          <h2>En qué se diferencia de tu contador</h2>
          <p>
            Cada persona alrededor de tus finanzas resuelve algo distinto. Lo que casi siempre falta
            no es quién registre ni quién opere el día a día, sino quién te ayude a decidir. Un CFO
            fraccional no reemplaza a tu contador: lo coordina.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Quién</th>
                <th scope="col">Qué resuelve</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map(([who, what]) => (
                <tr key={who}>
                  <th scope="row">{who}</th>
                  <td>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Cómo saber si tu empresa lo necesita</h2>
          <p>
            Suele tener sentido cuando la empresa creció más rápido que la forma en que lleva sus
            números. Estas son las señales más comunes:
          </p>
          <ul>
            {SIGNS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p>
            No es para ti si buscas a alguien que registre facturas y presente impuestos, o si solo
            necesitas un documento para el banco.
          </p>
        </section>

        <section>
          <h2>Qué hace un CFO fraccional</h2>
          <dl>
            {WORK.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>CFO fraccional o CFO de tiempo completo</h2>
          <p>
            Un CFO de tiempo completo tiene sentido cuando la empresa necesita a esa persona todos
            los días y puede sostener su costo. Mientras eso no ocurre, un CFO fraccional da acceso a
            ese criterio con la dedicación que el momento de la empresa pide.
          </p>
        </section>

        <section className="article-cta">
          <h2>El primer paso es un diagnóstico</h2>
          <p>Treinta minutos, sin compromiso. Sales con las decisiones que más impactan tu caja.</p>
          <Button href="/consulting/#contacto" variant="accent">
            Solicitar diagnóstico
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
