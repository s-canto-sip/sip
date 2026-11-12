
const CASH_PATH = "M0,128 C50,116 80,122 120,90 C160,58 195,70 240,26";

export const serviceCards: { title: string; body: string; tag?: string; cta?: string; art: React.ReactNode }[] = [
  {
    title: "Efectivo y pronóstico de caja",
    body: "Visibilidad de tu caja con anticipación y un pronóstico que se mantiene vivo.",
    tag: "[ pronóstico rodante de caja ]",
    art: (
      <svg viewBox="0 0 240 150" preserveAspectRatio="none">
        <path className="faint" d="M0,110 H240 M0,75 H240 M0,40 H240" />
        <path className="draw" pathLength={100} d={CASH_PATH} />
        <circle className="dot" r={3}>
          <animateMotion dur="3.6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.45;1" calcMode="linear" path={CASH_PATH} />
        </circle>
      </svg>
    ),
  },
  {
    title: "Márgenes y precios",
    body: "Disciplina de márgenes y precios. Qué deja dinero y qué lo fuga.",
    tag: "[ márgenes por producto y canal ]",
    art: (
      <svg viewBox="0 0 240 150">
        <line className="faint" x1={20} y1={130} x2={220} y2={130} />
        <rect className="bar" x={34} y={36} width={16} height={94} style={{ animationDelay: "0s" }} />
        <rect className="bar" x={80} y={36} width={16} height={94} style={{ animationDelay: ".3s" }} />
        <rect className="bar" x={126} y={36} width={16} height={94} style={{ animationDelay: ".6s" }} />
        <rect className="bar" x={172} y={36} width={16} height={94} style={{ animationDelay: ".9s" }} />
      </svg>
    ),
  },
  {
    title: "Estados financieros y cierre",
    body: "Estados financieros que se entienden, listos cada mes para ti y tus socios.",
    tag: "[ paquete mensual para socios ]",
    art: (
      <svg viewBox="0 0 240 150">
        <rect className="faint" x={52} y={26} width={136} height={98} />
        <line className="draw" pathLength={100} x1={70} y1={54} x2={170} y2={54} style={{ animationDelay: "0s" }} />
        <line className="draw" pathLength={100} x1={70} y1={78} x2={170} y2={78} style={{ animationDelay: ".45s" }} />
        <line className="draw" pathLength={100} x1={70} y1={102} x2={132} y2={102} style={{ animationDelay: ".9s" }} />
      </svg>
    ),
  },
  {
    title: "Listo para levantar",
    body: "Modelo, métricas y data room en orden antes de buscar capital.",
    tag: "[ modelo + data room ]",
    art: (
      <svg viewBox="0 0 240 150">
        <line className="faint" x1={120} y1={128} x2={120} y2={44} />
        <g className="rise">
          <path d="M120 34V96M94 60l26-26 26 26" />
        </g>
      </svg>
    ),
  },
  {
    title: "Proyecciones y presupuesto",
    body: "El modelo y los escenarios que convierten tu estrategia en números.",
    tag: "[ escenarios base · upside · stress ]",
    art: (
      <svg viewBox="0 0 240 150">
        <path className="draw" pathLength={100} d="M22,112 C90,102 150,72 232,30" style={{ animationDelay: "0s" }} />
        <path className="draw" pathLength={100} d="M22,112 C90,108 150,96 232,80" style={{ animationDelay: ".5s" }} />
        <path className="draw" pathLength={100} d="M22,112 C90,116 150,122 232,124" style={{ animationDelay: "1s" }} />
        <circle className="dot" cx={22} cy={112} r={3} />
      </svg>
    ),
  },
  {
    title: "¿Tu caso es distinto?",
    body: "El alcance se define alrededor de tu etapa.",
    cta: "Hablemos",
    art: (
      <svg viewBox="0 0 240 150">
        <circle className="faint" cx={120} cy={75} r={30} />
        <path className="faint" d="M120 38v74M83 75h74" />
        <circle className="ring" cx={120} cy={75} r={30} />
        <line className="scan" x1={120} y1={75} x2={120} y2={40} />
        <circle className="dot" cx={120} cy={75} r={2.5} />
      </svg>
    ),
  },
];
