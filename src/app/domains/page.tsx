import type { Metadata } from "next";
import DomainsClient from "./DomainsClient";

export const metadata: Metadata = {
  title: "Domain Registration India | .in, .com, .net Domains",
  description: "Register your domain with transparent pricing, zero-markup rates, WHOIS privacy by default, and global Anycast DNS. No hidden renewal fees.",
  keywords: "domain registration India, .in domains, .com domains, domain registrar, WHOIS privacy, domain transfer",
  openGraph: {
    title: "Domain Registration India | Transparent Pricing",
    description: "Register your domain with transparent pricing, zero-markup rates, and professional privacy protection.",
    type: "website",
    url: "https://vecrahost.in/domains",
  },
  alternates: {
    canonical: "https://vecrahost.in/domains",
  },
};

export default function DomainsPage() {
  return <DomainsClient />;
}
