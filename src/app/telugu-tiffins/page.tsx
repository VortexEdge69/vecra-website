import type { Metadata } from "next";
import TeluguTiffinsClient from "./TeluguTiffinsClient";

export const metadata: Metadata = {
  title: "Telugu Tiffins | Tiffin Delivery Service in Vijayawada",
  description:
    "Daily tiffin delivery service in Vijayawada serving Kedareswarapeta and Siddhartha Nagar. Fresh homemade meals delivered to your doorstep.",
  openGraph: {
    title: "Telugu Tiffins | Tiffin Delivery Service in Vijayawada",
    description:
      "Daily tiffin delivery service in Vijayawada serving Kedareswarapeta and Siddhartha Nagar. Fresh homemade meals delivered to your doorstep.",
    type: "website",
    url: "https://vecrahost.in/telugu-tiffins",
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TeluguTiffinsClient />;
}