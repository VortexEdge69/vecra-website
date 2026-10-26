import type { Metadata } from "next";
import Landing from "@/components/landing/Landing";

const description =
  "VecraHost designs, builds and hosts fast, mobile-first websites for Indian businesses. Fixed prices from ₹9,999, SEO built in and a year of hosting in India included. Get a free quote.";

export const metadata: Metadata = {
  title: { absolute: "Website Design Company in India | Websites from ₹9,999 – VecraHost" },
  description,
  alternates: { canonical: "https://vecrahost.in" },
  openGraph: {
    title: "We build websites that sell | VecraHost Web Design",
    description: "Fixed-price web design for Indian businesses, from ₹9,999 with hosting included. Get a free quote.",
    url: "https://vecrahost.in",
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "VecraHost Web Design",
      url: "https://vecrahost.in",
      logo: "https://vecrahost.in/vecraSymbol.png",
      areaServed: "IN",
      priceRange: "₹9,999 – ₹49,999",
      makesOffer: [
        { "@type": "Offer", name: "Starter Website", price: "9999", priceCurrency: "INR" },
        { "@type": "Offer", name: "Business Website", price: "24999", priceCurrency: "INR" },
        { "@type": "Offer", name: "E-commerce Store", price: "49999", priceCurrency: "INR" },
        { "@type": "Offer", name: "Web Hosting", price: "99", priceCurrency: "INR" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ["How long does a website take?", "A Starter website takes about 7 days, a Business website about 14 days, and an online store 21 to 30 days."],
        ["Can I edit the website myself?", "Business and E-commerce packages include an easy-to-edit CMS and a training session."],
        ["How do payments work?", "50% advance to start and the balance at launch, via UPI, cards or net banking."],
      ].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Landing />
    </>
  );
}
