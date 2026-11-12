// Same markup and classes as the header of every sipartners.com.mx page (styled by ./site.css).
// Links are plain <a>: the other sections are a separate static site under the same domain.
// "Contáctanos" opens the conversation directly (WhatsApp, or mail until the number is set).
import { DIAGNOSTIC_MESSAGE, contactLink } from "@/lib/contact";
import { NavGroup } from "./nav-group";

export function Nav() {
  const cta = contactLink(DIAGNOSTIC_MESSAGE);
  return (
    <header className="topbar">
      <a href="/" className="topbar__brand" aria-label="Ir al inicio de Simple Investment Partners">
        <img src="/img/SIP_ICON_W.png" alt="" width={28} height={28} />
        <span>Simple Investment Partners</span>
      </a>
      <nav className="topbar__nav" aria-label="Principal">
        <a href="/">Inicio</a>
        <NavGroup id="menuPersonas" label="Personas">
          <p className="topbar__menu-label">SIP Investments</p>
          <a href="/sip.html">
            SIP<small>Para quien empieza a invertir</small>
          </a>
          <a href="/sip-wealth.html">
            SIP Wealth<small>Para quien ya tiene un patrimonio</small>
          </a>
        </NavGroup>
        <NavGroup id="menuEmpresas" label="Empresas" current>
          <p className="topbar__menu-label">SIP Consulting</p>
          <a href="/consulting/" aria-current="page">
            Finanzas estratégicas<small>CFO fraccional para tu empresa</small>
          </a>
          <span className="topbar__soon">
            Mentat<small>Próximamente</small>
          </span>
        </NavGroup>
      </nav>
      <a {...cta} className="topbar__cta">
        Contáctanos
      </a>
      <details className="topbar-menu">
        <summary aria-label="Abrir menú">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </summary>
        <div className="topbar-menu-panel">
          <a href="/">Inicio</a>
          <p className="topbar-menu-label">Personas · SIP Investments</p>
          <a href="/sip.html">SIP</a>
          <a href="/sip-wealth.html">SIP Wealth</a>
          <p className="topbar-menu-label">Empresas · SIP Consulting</p>
          <a href="/consulting/" aria-current="page">
            Finanzas estratégicas
          </a>
          <span className="topbar-menu-soon">
            Mentat <small>Próximamente</small>
          </span>
          <a {...cta} className="topbar-menu-cta">
            Contáctanos
          </a>
        </div>
      </details>
    </header>
  );
}
