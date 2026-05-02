import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  brandName,
  defaultDescription,
  getStructuredData,
  siteName,
  siteUrl,
} from "@/lib/metadata";

const structuredData = getStructuredData();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: brandName }],
  creator: brandName,
  publisher: brandName,
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
    title: siteName,
    description: defaultDescription,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
