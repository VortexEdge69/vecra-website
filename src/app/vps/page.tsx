import type { Metadata } from "next";
import VpsClient from "./VpsClient";

export const metadata: Metadata = {
  title: "VPS Hosting in India | Enterprise Cloud Servers | VecraHost",
  description: "Deploy reliable VPS hosting in India with enterprise-grade hardware, dedicated resources, 1Gbps uplink, instant provisioning, and 99.9% uptime SLA.",
  keywords: "VPS hosting India, cloud VPS, Indian VPS hosting, dedicated resources, NVMe VPS, Linux VPS, enterprise hosting",
  openGraph: {
    title: "VPS Hosting in India | Enterprise Cloud Servers | VecraHost",
    description: "Deploy reliable VPS hosting in India with enterprise-grade hardware, dedicated resources, and 99.9% uptime SLA.",
    type: "website",
    url: "https://vecrahost.in/vps",
  },
  alternates: {
    canonical: "https://vecrahost.in/vps",
  },
};

export default function VpsPage() {
  return <VpsClient />;
}
