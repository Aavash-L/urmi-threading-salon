import type { Metadata } from "next";

// Admin-only install/PWA metadata. Kept here so public pages never advertise the
// staff dashboard manifest or its Apple web-app title.
export const metadata: Metadata = {
  title: { absolute: "Urmi Admin" },
  manifest: "/manifest.json",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "Urmi Admin", statusBarStyle: "default" },
  icons: { apple: "/icons/apple-touch-icon.png" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
