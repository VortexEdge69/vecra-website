import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { PHONE, CITY, telLink, waLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Local Business Plan | Website for ₹499/month – VecraHost Vijayawada",
  description: "A free website, hosting, updates, Google Business Profile setup and a WhatsApp button for ₹499/month. Built for local shops, clinics and services in Vijayawada.",
  alternates: { canonical: "https://vecrahost.in/local" },
};

const INCLUDED = [
  "Professional mobile-friendly website, no build fee",
  "Fast hosting in India with free SSL",
  "Updates whenever you need them: prices, photos, timings",
  "Google Business Profile setup so customers find you on Maps",
  "WhatsApp and click-to-call buttons on every page",
  "Support from a real person in Vijayawada",
];

export default function LocalPage() {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <main className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <p className="text-sm uppercase font-black tracking-widest text-brand-primary mb-4">Local Business Plan · {CITY}</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">A website for your shop, ₹499/month.</h1>
        <p className="text-lg text-brand-muted mb-2">We build it, host it and keep it updated. You just run your business.</p>
        <p className="text-lg text-brand-muted mb-10" lang="te">మీ వ్యాపారానికి వెబ్‌సైట్ – సెటప్ ఫీజు లేదు, నెలకు ₹499 మాత్రమే.</p>

        <div className="border border-brand-border rounded-2xl p-8 mb-10 bg-brand-surface/20">
          <div className="flex items-baseline gap-2 mb-6"><span className="text-5xl font-bold">₹499</span><span className="text-brand-muted">/month · no setup fee</span></div>
          <ul className="space-y-3">{INCLUDED.map((i) => <li key={i}>✓ {i}</li>)}</ul>
        </div>

        <div className="flex flex-wrap gap-3">
          {PHONE && <a href={waLink("Hi VecraHost, I am interested in the Local Business Plan.")} className="btn-primary py-3 px-6">WhatsApp us</a>}
          {PHONE && <a href={telLink} className="btn-secondary py-3 px-6">Call us</a>}
          <Link href="/#quote" className="btn-secondary py-3 px-6">Request a call back</Link>
        </div>
        <p className="text-sm text-brand-muted mt-6">Prices exclude GST. Cancel any time; the content is yours.</p>
      </main>
      <Footer />
    </div>
  );
}
