import { SIP_LOGO_PATHS, SIP_LOGO_VIEWBOX } from "@/lib/sip-logo";

// Same four columns as the footer of sipartners.com.mx, in this unit's colors.
const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Personas",
    links: [
      ["SIP", "/sip.html"],
      ["SIP Wealth", "/sip-wealth.html"],
      ["Escríbenos", "/#contacto"],
    ],
  },
  {
    title: "Empresas",
    links: [
      ["Finanzas estratégicas", "/consulting/"],
      ["¿Qué es un CFO fraccional?", "/consulting/que-es-un-cfo-fraccional"],
      ["Solicitar diagnóstico", "/consulting/#contacto"],
    ],
  },
  {
    title: "Contacto",
    links: [
      ["contacto@sipartners.com.mx", "mailto:contacto@sipartners.com.mx"],
      ["investments@sipartners.com.mx", "mailto:investments@sipartners.com.mx"],
      ["consulting@sipartners.com.mx", "mailto:consulting@sipartners.com.mx"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand">
              <svg className="brand-logo" viewBox={SIP_LOGO_VIEWBOX} fill="currentColor" role="img" aria-label="SIP">
                {SIP_LOGO_PATHS.map((p) => (
                  <path key={p.d} transform={p.transform} d={p.d} />
                ))}
              </svg>
              <span className="brand-unit">Consulting</span>
            </div>
            <p>Finanzas estratégicas para empresas que escalan.</p>
          </div>
          <nav className="footer-nav" aria-label="Pie de página">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2>{col.title}</h2>
                {col.links.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <p className="footer-bottom">
          © 2026 Simple Investment Partners · SIP, SIP Wealth y SIP Consulting · Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
