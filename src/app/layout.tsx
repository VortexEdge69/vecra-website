import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "VecraHost | Enterprise VPS & Cloud Hosting Solutions",
    template: "%s | VecraHost",
  },
  description:
    "VecraHost provides high-performance enterprise VPS, Cloud hosting, and Domain services in India. Low latency, 99.9% uptime, and 24/7 dedicated support for mission-critical infrastructure.",
  keywords:
    "vecrahost, enterprise vps india, cloud hosting india, high performance vps, dedicated resources, low latency hosting mumbai, business cloud servers, nvme storage hosting",
  icons: {
    icon: "/vecraSymbol.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vecrahost.in",
    siteName: "VecraHost",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-brand-bg text-brand-text font-sans antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HXENC12H61"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HXENC12H61');
          `}
        </Script>
        <Navbar />
        <main>{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}
