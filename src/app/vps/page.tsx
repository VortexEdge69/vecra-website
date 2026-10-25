import type { Metadata } from "next";
import VpsClient from "./VpsClient";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/site";

const vpsServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "VPS Hosting in India",
  serviceType: "Virtual Private Server hosting",
  url: `${SITE_URL}/vps`,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "India" },
  description:
    "KVM virtual private servers in India with dedicated vCPU and RAM, NVMe storage, an Indian IP address, full root access and a 99.9% uptime target.",
};

export const metadata: Metadata = {
  title: "VPS Hosting in India | Enterprise Cloud Servers",
  description: "Deploy reliable VPS hosting in India with enterprise-grade hardware, dedicated resources, 1Gbps uplink, instant provisioning, and 99.9% uptime SLA.",
  keywords: "VPS hosting India, cloud VPS, Indian VPS hosting, dedicated resources, NVMe VPS, Linux VPS, enterprise hosting",
  openGraph: {
    title: "VPS Hosting in India | Enterprise Cloud Servers",
    description: "Deploy reliable VPS hosting in India with enterprise-grade hardware, dedicated resources, and 99.9% uptime SLA.",
    type: "website",
    url: `${SITE_URL}/vps`,
  },
  alternates: {
    canonical: "/vps",
  },
};

export default function VpsPage() {
  return (
    <>
      <JsonLd data={[vpsServiceJsonLd, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "VPS Hosting", path: "/vps" }])]} />
      <VpsClient />
    </>
  );
}
