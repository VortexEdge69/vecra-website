import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Support and Sales",
  description:
    "Contact VecraHost for VPS hosting support, billing questions or custom configurations. Submit a ticket and our team replies by email.",
  alternates: { canonical: "/contactus" },
  openGraph: {
    title: "Contact VecraHost Support and Sales",
    description: "Get help with VPS hosting, billing or custom configurations from the VecraHost team.",
    url: `${SITE_URL}/contactus`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact VecraHost", url: `${SITE_URL}/contactus` },
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contactus" }]),
        ]}
      />
      {children}
    </>
  );
}
