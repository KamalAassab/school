import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Rubik } from "next/font/google";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FloatingCta } from "@/components/site/floating-cta";
import { siteConfig } from "@/lib/content";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// Only used for Arabic news titles, which sit below the fold. Keeping it out
// of the preload list leaves the critical path to the two fonts that paint first.
const rubik = Rubik({
  subsets: ["latin", "arabic"],
  variable: "--font-rubik",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  // Icon comes from the app/icon.png file convention, which Next serves
  // hashed and immutable. Pointing at /logo.webp made the browser download
  // the full 61 KB logo just for the tab icon.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbfaf7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${bricolage.variable} ${rubik.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
