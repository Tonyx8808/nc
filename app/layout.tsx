import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/curved-menu";
import Footer from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { AccessibilityProvider } from "@/components/accessibility/accessibility-context";
import { AccessibilityPanel } from "@/components/accessibility/accessibility-panel";
import { GoogleTranslateLoader } from "@/components/accessibility/google-translate";

const SITE_URL = "https://www.esaarco-consulting.it"; // 👈 sostituisci con il dominio reale della nuova landing

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ES.A.AR.CO. Consulting | Confederazione Agricoltura, Artigianato, Commercio",
    template: "%s | ES.A.AR.CO. Consulting",
  },
  description:
    "ES.A.AR.CO. Consulting rappresenta e tutela le imprese agricole, artigiane e commerciali. Formazione sicurezza, CAF e Patronato, finanziamenti, CCNL, certificazioni ISO e servizi alle aziende in tutta Italia.",
  keywords: [
    "ES.A.AR.CO.",
    "confederazione agricoltura artigianato commercio",
    "CAF e Patronato",
    "formazione sicurezza lavoro",
    "CCNL contratti collettivi",
    "finanziamenti e credito imprese",
    "certificazioni ISO",
    "fondo interprofessionale",
    "buste paga gratis",
    "internazionalizzazione PMI",
    "Lamezia Terme",
  ],
  authors: [{ name: "Confederazione ES.A.AR.CO." }],
  creator: "Confederazione ES.A.AR.CO.",
  publisher: "Confederazione ES.A.AR.CO.",
  applicationName: "ES.A.AR.CO. Consulting",
  category: "business",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "ES.A.AR.CO. Consulting",
    title: "ES.A.AR.CO. Consulting | Il partner ideale per la tua azienda",
    description:
      "Un mondo di servizi all'avanguardia per l'azienda moderna leader di settore: formazione, CAF, Patronato, finanziamenti, CCNL e certificazioni ISO.",
    images: [
      {
        url: "/og-image.jpg", // 👈 crea un'immagine 1200x630 dedicata
        width: 1200,
        height: 630,
        alt: "ES.A.AR.CO. Consulting",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ES.A.AR.CO. Consulting",
    description:
      "Confederazione che rappresenta e tutela le imprese agricole, artigiane e commerciali in tutta Italia.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  manifest: "/site.webmanifest",

  verification: {
    google: "", // 👈 codice di verifica Google Search Console, quando lo hai
  },
};

export const viewport = {
  themeColor: "#1B2740",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="antialiased">
        <AccessibilityProvider>
          <Header />
          {children}
          <Footer />
          <CookieConsent />
          <AccessibilityPanel />
          <GoogleTranslateLoader />
        </AccessibilityProvider>
      </body>
    </html>
  );
}