"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
import HardwareAnimation from "@/components/HardwareAnimation";
import HeroAnimation from "@/components/HeroAnimation";

interface VpsPlan {
  plan_id: string;
  name: string;
  cpu: number;
  ram: number;
  base_price: number;
  base_storage: number;
  is_active: boolean;
  show_on_home?: boolean;
  is_out_of_stock?: boolean;
  out_of_stock?: boolean;
}

const fallbackPlans: VpsPlan[] = [
  {
    plan_id: "starter-vps",
    name: "Starter VPS",
    cpu: 2,
    ram: 4,
    base_price: 499,
    base_storage: 40,
    is_active: true,
    show_on_home: true,
  },
  {
    plan_id: "growth-vps",
    name: "Growth VPS",
    cpu: 4,
    ram: 8,
    base_price: 999,
    base_storage: 80,
    is_active: true,
    show_on_home: true,
  },
  {
    plan_id: "business-vps",
    name: "Business VPS",
    cpu: 6,
    ram: 16,
    base_price: 1899,
    base_storage: 160,
    is_active: true,
    show_on_home: true,
  },
];

const proofPoints = [
  { value: "99.9%", label: "uptime target" },
  { value: "<60 min", label: "migration consult" },
  { value: "India", label: "low-latency network" },
  { value: "24/7", label: "ticket monitoring" },
];

const conversionOffers = [
  "Free migration guidance for websites, panels, and small apps",
  "UPI, cards, and net-banking friendly checkout for Indian teams",
  "Transparent monthly pricing with no surprise renewal jumps",
  "Human onboarding help before you pay for bigger workloads",
];

const services = [
  {
    title: "VPS Hosting",
    description: "Dedicated KVM resources, NVMe storage, full root access, and predictable pricing for production apps.",
    href: "/vps",
    cta: "Compare VPS plans",
  },
  {
    title: "Managed Web Hosting",
    description: "A simpler path for WordPress, business sites, landing pages, and client projects that need support.",
    href: "/web-hosting",
    cta: "View web hosting",
  },
  {
    title: "Domains & DNS",
    description: "Search, register, and connect domains with clean DNS handoff through the VecraHost portal.",
    href: "/domains",
    cta: "Search domains",
  },
];

export default function Home() {
  const [domainQuery, setDomainQuery] = useState("");
  const [homePlans, setHomePlans] = useState<VpsPlan[]>(fallbackPlans);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from("vps_plans")
          .select("*")
          .eq("is_active", true);

        if (!error && data && data.length > 0) {
          const sorted = (data as VpsPlan[]).sort((a, b) => a.base_price - b.base_price);
          const forHome = sorted.filter((p) => p.show_on_home === true);
          setHomePlans(forHome.length > 0 ? forHome : sorted.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load plans", err);
      } finally {
        setIsLoadingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    const cleanDomain = domainQuery.trim().toLowerCase();
    window.location.href = `https://portal.vecrahost.in/domains/search?domain=${encodeURIComponent(cleanDomain)}&source=homepage&intent=domain_search`;
  };

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-sm mb-8"
            >
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-primary">VecraHost is back online</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-[1.05] mb-8"
            >
              Hosting that helps <br />
              <span className="text-brand-primary">clients launch faster.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            >
              Revived for founders, agencies, and businesses that need Indian VPS, web hosting, domains, and human onboarding without confusing renewal traps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="https://portal.vecrahost.in?source=homepage_hero&intent=buy" className="btn-primary px-8 py-4 text-lg">
                Start Hosting Today
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link href="/contactus" className="btn-secondary px-8 py-4 text-lg">
                Get Free Migration Help
              </Link>
            </motion.div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
              {proofPoints.map((point) => (
                <div key={point.label} className="border border-brand-border bg-brand-surface/70 p-4">
                  <p className="text-2xl font-bold text-white">{point.value}</p>
                  <p className="text-[11px] uppercase tracking-widest text-brand-muted mt-1">{point.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative h-full min-h-[500px]">
            <HeroAnimation />
          </div>
        </div>
      </section>

      <section className="py-14 px-6 bg-brand-surface/50 border-b border-brand-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Find the domain before someone else does.</h2>
            <p className="text-brand-muted">Keep domain discovery on the homepage so visitors can take action immediately.</p>
          </div>

          <form onSubmit={handleDomainSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={domainQuery}
                onChange={(e) => setDomainQuery(e.target.value)}
                placeholder="yourbrand.in"
                className="flex-1 px-6 py-4 bg-brand-bg border border-brand-border text-brand-text text-lg focus:outline-none focus:border-brand-primary transition-colors"
                required
              />
              <button type="submit" className="btn-primary px-10 py-4 text-lg whitespace-nowrap">
                Check Availability
              </button>
            </div>
            <p className="text-brand-muted text-xs mt-4 text-left">Search redirects to the secure VecraHost portal with campaign tracking enabled.</p>
          </form>
        </div>
      </section>

      <section className="py-24 px-6 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-brand-primary text-xs font-black uppercase tracking-widest mb-3">Conversion-first services</p>
              <h2 className="text-3xl md:text-5xl font-bold">Give every visitor a next step.</h2>
            </div>
            <p className="text-brand-muted max-w-2xl">The site now shows clear active services instead of dead-end coming-soon messaging, with CTAs that lead to plans, domain search, or support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="card-enterprise group flex flex-col">
                <div className="w-12 h-12 bg-white/5 border border-brand-border flex items-center justify-center mb-6 group-hover:border-brand-primary transition-colors">
                  <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                <Link href={service.href} className="text-brand-primary font-bold text-sm uppercase tracking-wider hover:underline">{service.cta} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-primary text-xs font-black uppercase tracking-widest mb-3">Ready-to-buy VPS plans</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful virtual machines with clear pricing.</h2>
            <p className="text-brand-muted">Fallback plans keep the page conversion-ready even if the live plan database is unavailable.</p>
          </div>

          <div className={`grid gap-8 mx-auto mb-16 w-full ${homePlans.length === 1 ? "grid-cols-1 max-w-md" : homePlans.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-4xl" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl"}`}>
            {homePlans.map((plan, index) => {
              const isOutOfStock = plan.is_active === false || plan.is_out_of_stock === true || plan.out_of_stock === true;
              const isFeatured = index === 1;
              return (
                <div key={plan.plan_id} className={`card-enterprise flex flex-col relative ${isFeatured ? "border-brand-primary/40" : ""}`}>
                  {isFeatured && !isOutOfStock && <div className="absolute -top-3 left-6 px-3 py-1 bg-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-sm z-10">Best for growth</div>}
                  {isOutOfStock && <div className="absolute -top-3 left-6 px-3 py-1 bg-red-500/80 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm z-10">Out of Stock</div>}
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-brand-muted text-sm">{plan.cpu} vCPU / {plan.ram} GB RAM</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-brand-muted uppercase tracking-tighter">Starting at</span>
                      <p className="text-2xl font-bold text-white">₹{plan.base_price}<span className="text-sm font-normal text-brand-muted">/mo</span></p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-brand-muted border-t border-brand-border pt-6 flex-grow">
                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> {plan.base_storage} GB NVMe Storage</li>
                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Indian IP Address</li>
                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Migration guidance included</li>
                  </ul>
                  <div className="mt-auto">
                    {isOutOfStock ? (
                      <button disabled className="btn-secondary w-full opacity-50 cursor-not-allowed">Out of Stock</button>
                    ) : (
                      <Link href="/vps" className={isFeatured ? "btn-primary w-full block text-center" : "btn-secondary w-full block text-center"}>View Configuration</Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isLoadingPlans && <p className="text-center text-xs text-brand-muted -mt-10 mb-12">Syncing latest portal configurations...</p>}

          <div className="text-center">
            <Link href="/vps" className="text-brand-muted hover:text-brand-text transition-colors flex items-center justify-center gap-2 font-medium">
              View all configurations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-brand-surface/30 border-y border-brand-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-primary text-xs font-black uppercase tracking-widest mb-3">Revival offer</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Remove the biggest reasons visitors hesitate.</h2>
            <p className="text-brand-muted text-lg mb-8">Conversion improves when the site answers price, migration, support, and trust questions before a buyer has to ask.</p>
            <div className="space-y-4">
              {conversionOffers.map((offer) => (
                <div key={offer} className="flex gap-3 items-start border border-brand-border bg-brand-bg/60 p-4">
                  <svg className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <p className="text-sm text-brand-muted">{offer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-enterprise">
            <h3 className="text-2xl font-bold mb-6">Suggested next growth moves</h3>
            <ol className="space-y-5 text-sm text-brand-muted list-decimal list-inside">
              <li>Add real uptime/status data and recent incident transparency.</li>
              <li>Publish 3 customer proof points or small case studies.</li>
              <li>Turn support response promises into measurable SLAs.</li>
              <li>Run a comeback offer for migrations and annual plans.</li>
              <li>Track every CTA with source and intent parameters.</li>
            </ol>
            <Link href="/contactus" className="btn-primary mt-8 w-full">Talk to VecraHost</Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Engineering trust through <span className="text-brand-primary">transparent infrastructure.</span></h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">India-first infrastructure</h4>
                  <p className="text-brand-muted text-sm">Position the product around low-latency hosting for Indian customers, agencies, and SMBs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Transparent billing</h4>
                  <p className="text-brand-muted text-sm">No hidden fees or surprise renewal rates. What buyers see is exactly what they expect to pay.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Designed for businesses</h4>
                  <p className="text-brand-muted text-sm">Clear onboarding paths for founders, agencies, and teams moving from unreliable shared hosting.</p>
                </div>
              </div>
            </div>
          </div>
          <HardwareAnimation />
        </div>
      </section>

      <section className="py-24 px-6 bg-brand-surface border-t border-brand-border text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to relaunch with confidence?</h2>
          <p className="text-brand-muted text-lg mb-10">Pick a plan, search a domain, or ask for migration help. Every CTA now points visitors toward a real buying conversation.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://portal.vecrahost.in?source=vecrahost_main&intent=buy" className="btn-primary px-10 py-4 text-lg">Access Billing Portal</a>
            <Link href="/contactus" className="btn-secondary px-10 py-4 text-lg">Contact Sales</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
