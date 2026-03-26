import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Domain Registration | Transparent Renewal Pricing — VecraHost",
    description: "Search and register domain names with transparent pricing and no hidden renewal fees. Integrated DNS management for your web projects. Reliable domain services in India.",
};

export default function DomainsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
