import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";

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
  alternates: {
    canonical: "https://vecrahost.in",
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
      <head>
        {/* JSON-LD Schema - Organization */}
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "VecraHost",
              url: "https://vecrahost.in",
              logo: "https://vecrahost.in/vecraSymbol.png",
              description: "Enterprise VPS and Cloud Hosting Solutions",
              sameAs: [
                "https://www.linkedin.com/company/vecrahost",
                "https://twitter.com/vecrahost"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                telephone: "+91-XXXXXXXXXX",
                email: "support@vecrahost.in"
              }
            })
          }}
        />

        {/* JSON-LD Schema - LocalBusiness */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "VecraHost",
              image: "https://vecrahost.in/vecraSymbol.png",
              description: "Enterprise-grade VPS and Cloud Hosting in India with 99.9% uptime SLA",
              url: "https://vecrahost.in",
              telephone: "+91-XXXXXXXXXX",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Vijayawada",
                addressLocality: "Vijayawada",
                addressRegion: "AP",
                postalCode: "520003",
                addressCountry: "IN"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "16.5062",
                longitude: "80.6480"
              },
              areaServed: ["IN", "AP"],
              priceRange: "₹",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150"
              }
            })
          }}
        />

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
