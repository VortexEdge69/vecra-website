"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

interface VpsPlan {
    plan_id: string;
    name: string;
    cpu: number;
    ram: number;
    base_price: number;
    base_storage: number;
    is_active: boolean;
    show_on_plans?: boolean;
    show_on_home?: boolean;
    is_out_of_stock?: boolean;
    out_of_stock?: boolean;
}

export default function VpsPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("quarterly");
    const [allPlans, setAllPlans] = useState<VpsPlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const { data, error } = await supabase
                    .from('vps_plans')
                    .select('*');

                if (!error && data) {
                    const sorted = (data as VpsPlan[]).sort((a, b) => a.base_price - b.base_price);
                    const allowedPlans = sorted.filter((p) => p.show_on_plans !== false);
                    setAllPlans(allowedPlans);
                }
            } catch (err) {
                console.error("Failed to fetch plans", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const getPlanUrl = (plan: VpsPlan) => {
        const baseUrl = "https://portal.vecrahost.in/vps";
        const params = new URLSearchParams({
            vps_plan: plan.plan_id,
            cpu: plan.cpu.toString(),
            ram: plan.ram.toString(),
            storage: plan.base_storage.toString() + "nvme",
            billing: billingCycle,
            source: "vecrahost_main"
        });
        return `${baseUrl}?${params.toString()}`;
    };

    return (
        <div className="bg-brand-bg text-brand-text min-h-screen">


            <section className="pt-32 pb-20 px-6 border-b border-brand-border bg-brand-surface/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">VPS Hosting in India</h1>
                    <p className="text-brand-muted text-lg max-w-3xl mx-auto leading-relaxed">
                        Deploy reliable, high-performance cloud infrastructure on enterprise-grade hardware.
                        Scalable resources, low-latency networking, and 99.9% uptime guaranteed.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-12 inline-flex items-center bg-brand-surface p-1 border border-brand-border rounded-sm">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${billingCycle === 'monthly' ? 'bg-brand-primary text-white' : 'text-brand-muted hover:text-brand-text'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("quarterly")}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${billingCycle === 'quarterly' ? 'bg-brand-primary text-white' : 'text-brand-muted hover:text-brand-text'}`}
                        >
                            Quarterly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${billingCycle === 'yearly' ? 'bg-brand-primary text-white' : 'text-brand-muted hover:text-brand-text'}`}
                        >
                            Yearly
                        </button>
                    </div>
                    {billingCycle === 'yearly' && (
                        <p className="mt-4 text-xs font-bold text-green-500 uppercase tracking-tighter">Save 15% + No Setup Fee</p>
                    )}
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className={`grid gap-8 mb-16 ${isLoading || allPlans.length === 3 ? 'grid-cols-1 lg:grid-cols-3' :
                        allPlans.length === 1 ? 'grid-cols-1 max-w-md mx-auto w-full' :
                            allPlans.length === 2 ? 'grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto w-full' :
                                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                        {isLoading ? (
                            <div className="col-span-full py-20 text-center text-brand-muted">Loading configurations...</div>
                        ) : allPlans.map((plan, index) => {
                            const isFeatured = index === Math.floor(allPlans.length / 2); // Highlight the middle plan by default if no explicit logic
                            const isOutOfStock = plan.is_active === false || plan.is_out_of_stock === true || plan.out_of_stock === true;
                            return (
                                <div
                                    key={plan.plan_id}
                                    className={`card-enterprise flex flex-col relative ${isFeatured ? 'border-brand-primary ring-1 ring-brand-primary/20 bg-brand-surface' : ''}`}
                                >
                                    {isOutOfStock && (
                                        <div className="absolute -top-3 right-6 px-3 py-1 bg-red-500/80 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm z-10">Out of Stock</div>
                                    )}
                                    {isFeatured && (
                                        <div className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">Recommended for Scale</div>
                                    )}
                                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                                    <p className="text-brand-muted text-sm mb-8">Professional Grade Infrastructure</p>
                                    <div className="mb-10 p-6 bg-black/20 border border-brand-border rounded-sm">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-brand-muted font-medium text-lg">₹</span>
                                            <span className="text-5xl font-bold text-white tracking-tighter">{plan.base_price}</span>
                                            <span className="text-brand-muted text-sm">/mo</span>
                                        </div>
                                        <p className="text-[10px] text-brand-muted uppercase font-bold mt-2 tracking-widest">Billed {billingCycle}</p>
                                    </div>
                                    <div className="space-y-4 mb-10 flex-grow">
                                        <div className="flex justify-between items-center py-2 border-b border-brand-border">
                                            <span className="text-brand-muted text-sm font-medium">Compute</span>
                                            <span className="text-white font-bold">{plan.cpu} vCPU</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-brand-border">
                                            <span className="text-brand-muted text-sm font-medium">Memory</span>
                                            <span className="text-white font-bold">{plan.ram} GB RAM</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-brand-border">
                                            <span className="text-brand-muted text-sm font-medium">Flash Storage</span>
                                            <span className="text-white font-bold">{plan.base_storage} GB NVMe</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 text-xs">
                                            <span className="text-brand-muted">SSD Alternative</span>
                                            <span className="text-brand-muted">{plan.base_storage * 2} GB SSD</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-3 mb-10 text-xs font-medium text-brand-muted">
                                        <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Instant Provisioning</li>
                                        <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> 1Gbps Uplink</li>
                                        <li className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Dedicated Indian IP</li>
                                    </ul>
                                    <div className="mt-auto">
                                        {isOutOfStock ? (
                                            <button disabled className="btn-secondary w-full py-4 text-lg opacity-50 cursor-not-allowed">Out of Stock</button>
                                        ) : (
                                            <a
                                                href={getPlanUrl(plan)}
                                                className={isFeatured ? "btn-primary w-full py-4 text-lg block text-center" : "btn-secondary w-full py-4 text-lg block text-center"}
                                            >
                                                Select Configuration
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tech Specs Table */}
            <section className="py-24 px-6 bg-brand-surface border-y border-brand-border">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12">Engineered Specifications</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-brand-border">
                                    <th className="py-4 font-bold uppercase tracking-wider text-xs text-brand-muted">Feature</th>
                                    <th className="py-4 font-bold uppercase tracking-wider text-xs text-brand-text">Standard</th>
                                    <th className="py-12 px-6"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-brand-border/50">
                                    <td className="py-4 text-sm font-medium text-brand-muted">Hypervisor</td>
                                    <td className="py-4 text-sm text-brand-text">KVM Managed</td>
                                </tr>
                                <tr className="border-b border-brand-border/50">
                                    <td className="py-4 text-sm font-medium text-brand-muted">Processor</td>
                                    <td className="py-4 text-sm text-brand-text">Latest Intel Xeon / AMD EPYC Nodes</td>
                                </tr>
                                <tr className="border-b border-brand-border/50">
                                    <td className="py-4 text-sm font-medium text-brand-muted">Network</td>
                                    <td className="py-4 text-sm text-brand-text">Direct Peering (Tier-1) + DDoS Protection</td>
                                </tr>
                                <tr className="border-b border-brand-border/50">
                                    <td className="py-4 text-sm font-medium text-brand-muted">OS Support</td>
                                    <td className="py-4 text-sm text-brand-text">Ubuntu, CentOS, Debian, Windows Server</td>
                                </tr>
                                <tr className="border-b border-brand-border/50">
                                    <td className="py-4 text-sm font-medium text-brand-muted">Scalability</td>
                                    <td className="py-4 text-sm text-brand-text">Hot-pluggable resources (no downtime)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
