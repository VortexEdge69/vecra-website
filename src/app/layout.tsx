import "./globals.css";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VecraHost | High-Performance VPS Hosting in India",
    template: "%s | VecraHost",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "VecraHost",
    "VPS hosting India",
    "cloud VPS India",
    "NVMe VPS",
    "Indian IP VPS",
    "low latency hosting India",
    "Linux VPS",
    "business cloud servers",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/vecraSymbol.png", apple: "/vecraSymbol.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "VecraHost | High-Performance VPS Hosting in India",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "VecraHost | High-Performance VPS Hosting in India",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050a10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="dark scroll-smooth">
      <head>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HXENC12H61"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HXENC12H61');
          `}
        </Script>
      </head>
      <body className="bg-brand-bg text-brand-text font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}
