import type { Metadata } from "next";

// contactus/page.tsx is a client component, so its metadata lives in this server layout.
export const metadata: Metadata = {
  title: { absolute: "Contact VecraHost | Website Quote and Support" },
  description:
    "Get a fixed-price quote for your website or hosting, or contact VecraHost support. Reply on WhatsApp or by email.",
  alternates: { canonical: "https://vecrahost.in/contactus" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
