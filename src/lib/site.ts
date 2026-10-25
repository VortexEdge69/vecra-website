// Single source of truth for SEO metadata, structured data and the sitemap.
export const SITE_URL = "https://vecrahost.in";
export const SITE_NAME = "VecraHost";
export const PORTAL_URL = "https://portal.vecrahost.in";
export const SUPPORT_EMAIL = "support@vecrahost.in";

export const SITE_DESCRIPTION =
  "VecraHost provides high-performance VPS hosting in India with NVMe storage, dedicated resources, Indian IP addresses, 99.9% uptime and responsive support.";

// Public, indexable routes. Keep in sync with src/app when pages are added or removed.
export const PUBLIC_ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/vps", priority: 0.9, changeFrequency: "weekly" },
  { path: "/web-hosting", priority: 0.6, changeFrequency: "monthly" },
  { path: "/domains", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contactus", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refund-and-cancellation-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/vecraSymbol.png`,
  description: SITE_DESCRIPTION,
  email: SUPPORT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vijayawada",
    addressRegion: "Andhra Pradesh",
    postalCode: "520003",
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SUPPORT_EMAIL,
    url: `${SITE_URL}/contactus`,
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Telugu"],
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
