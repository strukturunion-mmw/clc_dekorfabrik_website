import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://dekorfabrik.de";
const siteTitle = "dekorfabrik.de";
const siteDescription =
  "Handgezogene Vektorisierung, Stickdatei-Digitalisierung und druckfertige Dateikonvertierung. From Frankfurt with ♥︎ — für Designer und Betriebe.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · dekorfabrik.de",
  },
  description: siteDescription,
  applicationName: "dekorfabrik.de",
  authors: [{ name: "Dekorfabrik GmbH" }],
  creator: "Dekorfabrik GmbH",
  publisher: "Dekorfabrik GmbH",
  keywords: [
    "Vektorisierung",
    "Stickdatei",
    "Logo Vektorisieren",
    "Druckfertige Datei",
    "Dekorfabrik",
    "Frankfurt",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-paper-100 font-sans text-navy-900 antialiased">
        {children}
      </body>
    </html>
  );
}
