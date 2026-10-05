import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display font: Sentient (Fontshare, ITF Free Font License), regular + italic,
// served from Fontshare's CDN. Chosen by Harry 2026-10-05 to replace
// Instrument Serif. Used via the --font-serif token in globals.css.
const SENTIENT_CSS = "https://api.fontshare.com/v2/css?f[]=sentient@400,401&display=swap";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usewriteup.co.uk"),
  title: {
    default: "WriteUp — RICS Tech Partner AI auditing for RICS reports",
    template: "%s · WriteUp",
  },
  description:
    "WriteUp is a RICS Tech Partner AI audit tool for RICS reports. Built by a practising MRICS Chartered Surveyor to support professional judgement — catching mismatched floor areas, inconsistent comparables, Red Book gaps and contradictions in 1–2 minutes.",
  applicationName: "WriteUp",
  authors: [{ name: "WriteUp Limited" }],
  keywords: [
    "RICS",
    "RICS Tech Partner",
    "valuation report audit",
    "Red Book",
    "MRICS",
    "valuation QA",
    "AI audit for surveyors",
    "WriteUp",
  ],
  openGraph: {
    type: "website",
    siteName: "WriteUp",
    title: "WriteUp — Auditing built to support professional judgement",
    description:
      "RICS Tech Partner AI audit tool for RICS reports. Built by a practising MRICS Chartered Surveyor.",
    url: "https://usewriteup.co.uk",
  },
  twitter: {
    card: "summary_large_image",
    title: "WriteUp — RICS Tech Partner AI auditing for RICS reports",
    description:
      "AI audit tool for RICS reports. Built by a practising MRICS Chartered Surveyor.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href={SENTIENT_CSS} />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
