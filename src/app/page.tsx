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

export default function Home() {
  const [domainQuery, setDomainQuery] = useState("");
  const [homePlans, setHomePlans] = useState<VpsPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data, error } = await supabase
          .from('vps_plans')
          .select('*')
          .eq('is_active', true);

        if (!error && data) {
          const sorted = (data as VpsPlan[]).sort((a, b) => a.base_price - b.base_price);
          const forHome = sorted.filter((p) => p.show_on_home === true);
          setHomePlans(forHome.length > 0 ? forHome : sorted.slice(0, 2));
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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-sm mb-8"
            >
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-primary">Enterprise Infrastructure</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold leading-[1.05] mb-8"
            >
              Reliable hosting <br />
              <span className="text-brand-primary">built for production.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            >
              Deploy your infrastructure on enterprise-grade hardware with transparent pricing, low latency, and 99.9% uptime guaranteed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/vps" className="btn-primary px-8 py-4 text-lg">
                View VPS Plans
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/web-hosting" className="btn-secondary px-8 py-4 text-lg">
                Explore Services
              </Link>
            </motion.div>
          </div>

          {/* Hero Animation - Hidden on Mobile */}
          <div className="hidden lg:block relative h-full min-h-[500px]">
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Domain Search Section */}
      {false && (
        <section className="py-24 px-6 bg-brand-surface/50 border-b border-brand-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Find Your Domain</h2>
            <p className="text-brand-muted text-lg mb-10">Search and register your perfect domain name with transparent pricing.</p>

            <form onSubmit={handleDomainSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value)}
                  placeholder="Search your domain name"
                  className="flex-1 px-6 py-4 bg-brand-bg border border-brand-border text-brand-text text-lg focus:outline-none focus:border-brand-primary transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary px-10 py-4 text-lg whitespace-nowrap"
                >
                  Check Availability
                </button>
              </div>
              <p className="text-brand-muted text-xs mt-4 text-left">No hidden renewal fees. Transparent pricing from day one.</p>
            </form>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="py-24 px-6 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-enterprise group">
              <div className="w-12 h-12 bg-white/5 border border-brand-border flex items-center justify-center mb-6 group-hover:border-brand-primary transition-colors">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">VPS Hosting</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">High-performance SSD Virtual Private Servers with dedicated resources and full root access.</p>
              <Link href="/vps" className="text-brand-primary font-bold text-sm uppercase tracking-wider hover:underline">Learn More →</Link>
            </div>

            <div className="card-enterprise group">
              <div className="w-12 h-12 bg-white/5 border border-brand-border flex items-center justify-center mb-6 group-hover:border-brand-primary transition-colors">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Web Hosting</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">Engineered for businesses and small websites. Fast, secure, and reliable hosting for your online presence.</p>
              <span className="text-brand-muted font-bold text-sm uppercase tracking-wider">Coming Soon</span>
            </div>

            <div className="card-enterprise group">
              <div className="w-12 h-12 bg-white/5 border border-brand-border flex items-center justify-center mb-6 group-hover:border-brand-primary transition-colors">
                <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Domains</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">Register your brand with transparent renewal pricing and expert level DNS management tools.</p>
              <span className="text-brand-muted font-bold text-sm uppercase tracking-wider">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* VPS Preview */}
      <section className="py-24 px-6 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Virtual Machines</h2>
            <p className="text-brand-muted">Scalable resources for every workload. Scaled for production.</p>
          </div>

          <div className={`grid gap-8 mx-auto mb-16 w-full ${isLoadingPlans || homePlans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' :
            homePlans.length === 1 ? 'grid-cols-1 max-w-md' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl'
            }`}>
            {isLoadingPlans ? (
              <div className="col-span-full py-12 text-center text-brand-muted">Loading configurations...</div>
            ) : homePlans.map((plan, index) => {
              const isOutOfStock = plan.is_active === false || plan.is_out_of_stock === true || plan.out_of_stock === true;
              return (
                <div key={plan.plan_id} className={`card-enterprise flex flex-col relative ${index === 1 ? 'border-brand-primary/40' : ''}`}>
                  {index === 1 && !isOutOfStock && <div className="absolute -top-3 left-6 px-3 py-1 bg-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-sm z-10">Performance Tier</div>}
                  {isOutOfStock && <div className="absolute -top-3 left-6 px-3 py-1 bg-red-500/80 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm z-10">Out of Stock</div>}
                  <div className="flex justify-between items-start mb-6">
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
                    <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Dedicated Resources</li>
                  </ul>
                  <div className="mt-auto">
                    {isOutOfStock ? (
                      <button disabled className="btn-secondary w-full opacity-50 cursor-not-allowed">Out of Stock</button>
                    ) : (
                      <Link href="/vps" className={`btn-${index === 1 ? 'primary' : 'secondary'} w-full block text-center`}>View Configuration</Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/vps" className="text-brand-muted hover:text-brand-text transition-colors flex items-center justify-center gap-2 font-medium">
              View all configurations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Web Hosting Preview */}
      {false && (
        <section className="py-24 px-6 bg-brand-bg border-y border-brand-border">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Web Hosting Solutions</h2>
              <p className="text-brand-muted">Reliable hosting for business websites and applications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="card-enterprise">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Starter Hosting</h3>
                  <p className="text-brand-muted text-sm">Perfect for small businesses and personal websites</p>
                </div>
                <div className="mb-6">
                  <span className="text-xs text-brand-muted uppercase tracking-wider">Starting from</span>
                  <p className="text-3xl font-bold text-white mt-1">₹299<span className="text-sm font-normal text-brand-muted">/mo</span></p>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-brand-muted">
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> NVMe SSD Storage</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Free SSL Certificate</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Email Support</li>
                </ul>
              </div>

              <div className="card-enterprise border-brand-primary/40">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Business Hosting</h3>
                  <p className="text-brand-muted text-sm">High-traffic websites and e-commerce platforms</p>
                </div>
                <div className="mb-6">
                  <span className="text-xs text-brand-muted uppercase tracking-wider">Starting from</span>
                  <p className="text-3xl font-bold text-white mt-1">₹799<span className="text-sm font-normal text-brand-muted">/mo</span></p>
                </div>
                <ul className="space-y-3 mb-8 text-sm text-brand-muted">
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Enhanced Performance</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Priority Support</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Daily Backups</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link href="/web-hosting" className="text-brand-muted hover:text-brand-text transition-colors flex items-center justify-center gap-2 font-medium">
                View Web Hosting Plans
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Section */}
      <section className="py-24 px-6 border-y border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Engineering trust through <span className="text-brand-primary">transparent infrastructure.</span></h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Indian-tier Infrastructure</h4>
                  <p className="text-brand-muted text-sm">Strategically located data centers in Mumbai and Bangalore for minimal latency across the subcontinent.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Transparent Billing</h4>
                  <p className="text-brand-muted text-sm">No hidden fees or surprise renewal rates. What you see is exactly what you pay monthly or yearly.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Designed for Businesses</h4>
                  <p className="text-brand-muted text-sm">Professional dashboard and API access designed for SaaS founders and enterprise developers.</p>
                </div>
              </div>
            </div>
          </div>
          <HardwareAnimation />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-brand-surface border-t border-brand-border text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Scale your infrastructure today.</h2>
          <p className="text-brand-muted text-lg mb-10">Join professionals who trust VecraHost for their mission-critical applications.</p>
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
