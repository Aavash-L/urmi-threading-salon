import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome, { SiteFooter } from "@/components/layout/SiteChrome";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { BUSINESS, SITE_URL } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.urmithreadingsalon.com"),
  title: {
    default: "Urmi Threading Salon — Eyebrow Threading in Wayne, NJ",
    template: "%s | Urmi Threading Salon",
  },
  description:
    "Wayne NJ's top-rated threading salon since 2010. Eyebrow threading, waxing, facials, lash extensions & henna. 4.7 ★ on Google · Walk-ins welcome · (973) 653-9322.",
  keywords: [
    "threading salon Wayne NJ",
    "eyebrow threading near me",
    "best eyebrow threading Wayne NJ",
    "eyebrow salon Wayne NJ",
    "threading salon near me",
    "waxing and threading Wayne NJ",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: "Urmi Threading Salon — Eyebrow Threading in Wayne, NJ",
    description:
      "Wayne NJ's top-rated threading salon since 2010. Precision eyebrow threading, waxing, facials & more. 4.7 ★ rating · Walk-ins welcome.",
    images: [{ url: "/og/storefront.jpg", width: 1200, height: 630, alt: "Urmi Threading Salon in Wayne NJ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urmi Threading Salon — Eyebrow Threading in Wayne, NJ",
    description: "Wayne NJ's top-rated threading salon since 2010. Precision eyebrow threading, waxing, facials & more.",
    images: ["/og/storefront.jpg"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Urmi Admin",
    statusBarStyle: "default",
  },
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
      <body className="flex flex-col min-h-screen pb-[72px] md:pb-0">
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
