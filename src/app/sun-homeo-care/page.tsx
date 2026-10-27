import { metadata } from "next";
import PranaviClient from "./PranaviClient";

export const metadata: Metadata = {
  title: "Sun Homeo Care | Homeopathy Clinic in Vijayawada",
  description:
    "Traditional homeopathy clinic offering holistic wellness treatments in Maruthi Nagar, Eluru Road, Vijayawada. Open Mon-Sat for your health needs.",
  openGraph: {
    title: "Sun Homeo Care | Homeopathy Clinic in Vijayawada",
    description:
      "Traditional homeopathy clinic in Maruthi Nagar, Eluru Road, Vijayawada. Mon-Sat hours. Natural, gentle remedies for holistic wellness.",
    type: "website",
    url: "https://vecrahost.in/sun-homeo-care",
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PranaviClient />;
}
