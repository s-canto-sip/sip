// Hero visual: un pronóstico de caja que se dibuja. Historia hasta [ hoy ] y tres
// escenarios divergiendo hacia s+13. Argumenta el servicio (visibilidad de caja a
// 13 semanas) en lugar de decorar. SVG + CSS puro: nada de rAF.
// El viewBox tiene la proporción del panel, así las etiquetas se leen a su tamaño real.
const TODAY = 260;
const END = 620;
const week = (n: number) => TODAY + ((END - TODAY) * n) / 13;
const BASE_PATH = `M${TODAY},214 C360,194 480,170 ${END},140`;

export function Forecast({ className = "" }: { className?: string }) {
  return (
    <div className={`fviz ${className}`} aria-hidden="true">
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet">
        <g className="fgrid">
          <path d="M0,60 H640 M0,140 H640 M0,220 H640 M0,300 H640 M0,370 H640" />
          <path d={[4, 8, 13].map((n) => `M${week(n)},370 v6`).join(" ")} />
        </g>

        <path className="fdraw fhist" pathLength={100} d={`M20,250 C70,244 120,262 170,236 S230,222 ${TODAY},214`} />

        <g className="ffade" style={{ animationDelay: "1.1s" }}>
          <line className="ftoday" x1={TODAY} y1={34} x2={TODAY} y2={370} />
          <text className="flabel" x={TODAY} y={24} textAnchor="middle">
            [ hoy ]
          </text>
        </g>

        <path className="fdraw fbase" pathLength={100} d={BASE_PATH} style={{ animationDelay: "1.3s" }} />
        <path className="fdraw fup" pathLength={100} d={`M${TODAY},214 C360,180 480,110 ${END},64`} style={{ animationDelay: "1.55s" }} />
        <path className="fdraw fstress" pathLength={100} d={`M${TODAY},214 C350,238 480,272 ${END},300`} style={{ animationDelay: "1.7s" }} />

        <circle className="fdot" cx={TODAY} cy={214} r={3.5} />
        <circle className="fdot ftravel" r={3}>
          <animateMotion dur="5.2s" begin="2.6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.55;1" calcMode="linear" path={BASE_PATH} />
        </circle>

        <g className="ffade" style={{ animationDelay: "2.2s" }}>
          <text className="flabel" x={20} y={394}>s-8</text>
          {[4, 8, 13].map((n) => (
            <text key={n} className="flabel" x={week(n)} y={394} textAnchor={n === 13 ? "end" : "middle"}>
              s+{n}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
