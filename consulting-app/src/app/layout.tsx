import type { Metadata } from "next";
import { JetBrains_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import "./site.css";
import "./consulting.css";

// Una sola familia en todo el sitio, como sipartners.com.mx: Urbanist en títulos, texto y números.
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jbmono",
  display: "swap",
});

const siteUrl = "https://sipartners.com.mx";
const pageUrl = `${siteUrl}/consulting/`;
const title = "Finanzas estratégicas y CFO fraccional en México | SIP·Consulting";
const shareImage = "/consulting/og.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description:
    "El equipo de finanzas que tu empresa por fin puede tener: estados financieros, efectivo, proyecciones y presupuesto, con un plan mensual. SIP Consulting, de Simple Investment Partners.",
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description:
      "La dirección financiera de un CFO, con todo un equipo detrás, sin el costo de uno de tiempo completo.",
    locale: "es_MX",
    type: "website",
    siteName: "Simple Investment Partners",
    url: pageUrl,
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "Finanzas estratégicas para tu empresa · SIP·Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "La dirección financiera de un CFO, con todo un equipo detrás, sin el costo de uno de tiempo completo.",
    images: [shareImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jbMono.variable} ${urbanist.variable}`}>
      <body className="v2" data-brand="consulting">
        {children}
      </body>
    </html>
  );
}
