import { ImageResponse } from "next/og";
import { sipLogoDataUri } from "@/lib/sip-logo";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// Con extensión .png: GitHub Pages sirve los archivos sin extensión como binario genérico,
// y WhatsApp o LinkedIn pueden no mostrar la vista previa.
// 100% del tráfico llega por link compartido — esta tarjeta ES el primer contacto.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sipLogoDataUri("#34C7A4")} alt="SIP" width={95} height={50} />
          <div style={{ fontSize: 28, color: "#9A9A9A", letterSpacing: 3 }}>
            [ SIP·Consulting ]
          </div>
        </div>
        <div style={{ fontSize: 84, letterSpacing: -3, lineHeight: 1.02 }}>
          Finanzas estratégicas para tu empresa.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#BDBDBD",
          }}
        >
          <div>Diagnóstico de 30 minutos, sin compromiso.</div>
          <div style={{ color: "#34C7A4" }}>CFO fraccional</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
