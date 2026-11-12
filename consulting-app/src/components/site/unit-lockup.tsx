import { SIP_LOGO_PATHS, SIP_LOGO_VIEWBOX } from "@/lib/sip-logo";

export function UnitLockup() {
  return (
    <div className="brand unit-lockup">
      <svg className="brand-logo" viewBox={SIP_LOGO_VIEWBOX} fill="currentColor" role="img" aria-label="SIP">
        {SIP_LOGO_PATHS.map((p) => (
          <path key={p.d} transform={p.transform} d={p.d} />
        ))}
      </svg>
      <span className="brand-unit">Consulting</span>
    </div>
  );
}
