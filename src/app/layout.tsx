import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome, { SiteFooter } from "@/components/layout/SiteChrome";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { SITE_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

// "optional": if a font isn't ready almost immediately the metric-matched fallback
// stays, so headings never repaint late (that repaint was the mobile LCP).
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "700", // headings are always bold; one weight keeps the preload small
  display: "optional",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  preload: false, // body text renders in the metric-matched fallback until Inter is cached
  variable: "--font-inter",
});

// Every public page sets its own canonical; the root does not, so 404s and
// admin pages never inherit the homepage canonical.
const rootDefaults: Metadata = { ...pageMetadata("/"), alternates: undefined };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...rootDefaults,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = {
  themeColor: "#FFF5F8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="flex flex-col min-h-screen">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <SiteChrome />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
