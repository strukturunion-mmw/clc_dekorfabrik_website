import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLC Dekorfabrik",
  description: "CLC Dekorfabrik website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
