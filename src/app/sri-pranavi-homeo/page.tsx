import type { Metadata } from "next";
import PranaviClient from "./PranaviClient";

export const metadata: Metadata = {
  title: "Sri Pranavi Homeo Clinic | Homeopathy Clinic in Suryaraopet, Vijayawada",
  description:
    "Traditional homeopathy treatments for holistic wellness in Suryaraopet, Vijayawada. Visit Sri Pranavi Homeo Clinic for natural, gentle remedies.",
  openGraph: {
    title: "Sri Pranavi Homeo Clinic | Homeopathy Clinic in Suryaraopet, Vijayawada",
    description:
      "Traditional homeopathy treatments for holistic wellness in Suryaraopet, Vijayawada.",
    type: "website",
    url: "https://vecrahost.in/sri-pranavi-homeo",
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PranaviClient />;
}