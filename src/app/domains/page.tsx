"use client";
import { useState, useRef } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

// TLD Data with prices in Rs
const TLD_DATA = [
    { tld: ".com", price: 1100, renewal: 1100 },
    { tld: ".online", price: 950, renewal: 950 },
    { tld: ".in", price: 600, renewal: 600 },
    { tld: ".info", price: 350, renewal: 350 },
    { tld: ".net", price: 1300, renewal: 1300 },
    { tld: ".xyz", price: 210, renewal: 210 },
];

interface DomainResult {
    domain: string;
    available: boolean;
    price: number;
    tld: string;
}

export default function DomainsPage() {
    const [domainQuery, setDomainQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<DomainResult | null>(null);
    const [moreOptions, setMoreOptions] = useState<DomainResult[]>([]);
    const [showWhois, setShowWhois] = useState<string | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const checkDomainAvailability = async (query: string) => {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const parts = query.trim().toLowerCase().split('.');
        const cleanQuery = parts[0];
        const mainTld = parts.length > 1 ? `.${parts[parts.length - 1]}` : ".com";

        const isTaken = /test|google|amazon|apple|microsoft|facebook|vecra/.test(cleanQuery);

        const mainResult: DomainResult = {
            domain: `${cleanQuery}${mainTld}`,
            tld: mainTld,
            available: !isTaken,
            price: TLD_DATA.find(t => t.tld === mainTld)?.price || 1100
        };

        const alternatives = TLD_DATA
            .filter(t => t.tld !== mainTld)
            .map(t => ({
                domain: `${cleanQuery}${t.tld}`,
                tld: t.tld,
                available: true,
                price: t.price
            }))
            .slice(0, 3);

        return { mainResult, alternatives };
    };

    const handleDomainSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!domainQuery.trim() || isSearching) return;

        setIsSearching(true);
        setSearchResult(null);
        setMoreOptions([]);

        try {
            const { mainResult, alternatives } = await checkDomainAvailability(domainQuery);
            setSearchResult(mainResult);
            setMoreOptions(alternatives);

            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handlePurchase = (domain: string) => {
        window.location.href = `https://portal.vecrahost.in/cart.php?a=add&domain=register&query=${encodeURIComponent(domain)}&source=domains_page&intent=buy_domain`;
    };

    const handleTransfer = (domain: string) => {
        window.location.href = `https://portal.vecrahost.in/cart.php?a=add&domain=transfer&query=${encodeURIComponent(domain)}`;
    };

    return (
        <div className="bg-brand-bg text-brand-text min-h-screen selection:bg-brand-primary/30">


            <main className="flex-grow flex flex-col items-center justify-center py-40 px-6">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Domain Registry</h1>
                    <div className="inline-flex items-center px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-sm mb-8">
                        <span className="text-sm uppercase font-black tracking-widest text-brand-primary">Coming Soon</span>
                    </div>
                    <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                        We are currently engineering our enterprise-grade domain registration platform. Check back shortly to secure your digital identity.
                    </p>
                </div>
            </main>

            {false && (
                <div className="hidden-content">
                    {/* WHOIS Modal Overlay */}
                    <AnimatePresence>
                        {showWhois && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    className="bg-brand-surface border border-brand-border w-full max-w-2xl overflow-hidden rounded-sm shadow-2xl"
                                >
                                    <div className="p-6 border-b border-brand-border flex justify-between items-center bg-black/20">
                                        <h3 className="text-xl font-bold uppercase tracking-tight">WHOIS Record: <span className="text-brand-primary">{showWhois}</span></h3>
                                        <button
                                            onClick={() => setShowWhois(null)}
                                            className="p-2 hover:bg-white/5 rounded-sm transition-colors text-brand-muted"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <div className="p-8 font-mono text-sm space-y-4 max-h-[60vh] overflow-y-auto">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-brand-border/50">
                                            <div>
                                                <p className="text-brand-muted uppercase text-[10px] font-black tracking-widest mb-1">Registrar</p>
                                                <p className="text-white">VecraHost Pvt Ltd (IANA ID: 1234)</p>
                                            </div>
                                            <div>
                                                <p className="text-brand-muted uppercase text-[10px] font-black tracking-widest mb-1">Creation Date</p>
                                                <p className="text-white">2021-03-05T14:22:11Z</p>
                                            </div>
                                            <div>
                                                <p className="text-brand-muted uppercase text-[10px] font-black tracking-widest mb-1">Registry Expiry</p>
                                                <p className="text-white">2027-03-05T14:22:11Z</p>
                                            </div>
                                            <div>
                                                <p className="text-brand-muted uppercase text-[10px] font-black tracking-widest mb-1">Status</p>
                                                <p className="text-red-400">clientTransferProhibited</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4 pt-4">
                                            <p className="text-brand-muted">Domain Name: {showWhois?.toUpperCase()}</p>
                                            <p className="text-brand-muted">Registry Domain ID: 2595082003_DOMAIN_COM-VRSN</p>
                                            <p className="text-brand-muted">Registrar WHOIS Server: whois.vecrahost.in</p>
                                            <p className="text-brand-muted italic">--- Data protected by WHOIS privacy services ---</p>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-black/20 border-t border-brand-border flex justify-end">
                                        <button
                                            onClick={() => setShowWhois(null)}
                                            className="btn-secondary px-8 py-2 text-sm uppercase"
                                        >
                                            Close Record
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Hero & Professional Search */}
                    <section className="pt-40 pb-24 px-6 border-b border-brand-border bg-brand-bg relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
                        <div className="max-w-7xl mx-auto text-center relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 mb-8 rounded-sm"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Global Domain Registry</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-7xl font-bold mb-8 uppercase tracking-tighter"
                            >
                                Secure Your <span className="text-brand-primary">Digital Identity.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-brand-muted text-lg max-w-2xl mx-auto leading-relaxed mb-12"
                            >
                                Enterprise-grade domain registration with transparent renewals,
                                DNSSEC support, and professional privacy protection as standard.
                            </motion.p>

                            <form onSubmit={handleDomainSearch} className="max-w-3xl mx-auto mb-16 relative">
                                <div className="group relative flex flex-col sm:flex-row p-1.5 bg-brand-surface/50 border border-brand-border focus-within:border-brand-primary/50 transition-all rounded-sm backdrop-blur-md">
                                    <input
                                        type="text"
                                        value={domainQuery}
                                        onChange={(e) => setDomainQuery(e.target.value)}
                                        placeholder="Search your company domain name..."
                                        className="flex-1 px-6 py-4 bg-transparent text-white text-xl placeholder:text-brand-muted focus:outline-none"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSearching}
                                        className="px-10 py-4 bg-brand-primary text-white font-black text-sm uppercase tracking-widest hover:bg-brand-secondary transition-all flex items-center justify-center gap-3 disabled:opacity-70 rounded-sm"
                                    >
                                        {isSearching ? (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : "Search"}
                                    </button>
                                </div>
                                <div className="mt-6 flex flex-wrap justify-center gap-6 opacity-60">
                                    {TLD_DATA.slice(0, 4).map(t => (
                                        <div key={t.tld} className="flex items-center gap-2">
                                            <span className="text-white font-bold">{t.tld}</span>
                                            <span className="text-xs text-brand-muted">₹{t.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </section>

                    {/* Results Section */}
                    <section ref={resultsRef} className="py-24 px-6 bg-brand-bg relative min-h-[400px]">
                        <div className="max-w-7xl mx-auto">
                            <AnimatePresence mode="wait">
                                {isSearching ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-20 space-y-6"
                                    >
                                        <div className="flex gap-2">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                    className="w-3 h-3 bg-brand-primary rounded-full"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-brand-muted uppercase font-black tracking-widest text-xs">Querying Global Databases...</p>
                                    </motion.div>
                                ) : searchResult ? (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-12"
                                    >
                                        {/* Main Result */}
                                        <div className="card-enterprise border-l-4 border-l-brand-primary p-0 overflow-hidden">
                                            <div className={`p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 ${searchResult?.available ? "bg-brand-primary/5" : "bg-red-500/5"
                                                }`}>
                                                <div className="flex-1 text-center lg:text-left">
                                                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                                                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border ${searchResult?.available
                                                            ? "text-green-500 border-green-500/20 bg-green-500/10"
                                                            : "text-red-500 border-red-500/20 bg-red-500/10"
                                                            }`}>
                                                            {searchResult?.available ? "Success" : "Already Registered"}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-2">
                                                        {searchResult?.domain}
                                                    </h2>
                                                    <p className="text-brand-muted lg:max-w-xl">
                                                        {searchResult?.available
                                                            ? "This domain is premium and ready for immediate deployment to your VecraHost ecosystem."
                                                            : "This identity is currently not available for purchase. You can view the owner details below."}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col items-center lg:items-end gap-6">
                                                    {searchResult?.available ? (
                                                        <>
                                                            <div className="text-center lg:text-right">
                                                                <span className="text-brand-muted text-xs uppercase tracking-widest block mb-1">Standard Price</span>
                                                                <span className="text-4xl font-bold text-white tracking-tighter">₹{searchResult?.price}</span>
                                                                <span className="text-brand-muted text-sm ml-2">/yr</span>
                                                            </div>
                                                            <button
                                                                onClick={() => handlePurchase(searchResult?.domain || "")}
                                                                className="btn-primary px-12 py-4 text-sm font-black uppercase tracking-widest rounded-sm"
                                                            >
                                                                Register Identity
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <div className="flex flex-wrap justify-center gap-4">
                                                            <button
                                                                onClick={() => setShowWhois(searchResult?.domain || null)}
                                                                className="btn-secondary px-8 py-3 text-xs font-black uppercase tracking-widest rounded-sm border-red-500/30 hover:bg-red-500/10 text-red-500"
                                                            >
                                                                View WHOIS Record
                                                            </button>
                                                            <button
                                                                onClick={() => handleTransfer(searchResult?.domain || "")}
                                                                className="btn-secondary px-8 py-3 text-xs font-black uppercase tracking-widest rounded-sm"
                                                            >
                                                                Initiate Transfer
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Alternatives */}
                                        {moreOptions.length > 0 && (
                                            <div className="mt-20">
                                                <div className="flex items-center gap-4 mb-10">
                                                    <div className="h-[1px] flex-1 bg-brand-border" />
                                                    <h3 className="text-xs uppercase font-black tracking-[0.3em] text-brand-muted">Recommended Alternatives</h3>
                                                    <div className="h-[1px] flex-1 bg-brand-border" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    {moreOptions.map((opt) => (
                                                        <div key={opt.domain} className="card-enterprise p-8 flex flex-col justify-between group hover:border-brand-primary transition-all">
                                                            <div>
                                                                <span className="text-green-500 text-[10px] font-black uppercase tracking-widest mb-4 block">Available</span>
                                                                <h4 className="text-xl font-bold text-white mb-2">{opt.domain}</h4>
                                                                <p className="text-xs text-brand-muted mb-8 italic">Professional {opt.tld} extension</p>
                                                            </div>
                                                            <div className="flex items-center justify-between pt-6 border-t border-brand-border">
                                                                <span className="text-lg font-bold text-white">₹{opt.price}</span>
                                                                <button
                                                                    onClick={() => handlePurchase(opt.domain)}
                                                                    className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:text-white transition-colors"
                                                                >
                                                                    Add to Cart →
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="border border-brand-border border-dashed p-20 text-center rounded-sm"
                                    >
                                        <svg className="w-12 h-12 text-brand-muted/30 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        <p className="text-brand-muted uppercase font-black tracking-widest text-xs">Awaiting search query...</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Professional Features */}
                    <section className="py-32 px-6 border-t border-brand-border bg-brand-surface/30">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-6">
                                <div className="w-10 h-10 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-bold text-lg">01</div>
                                <h3 className="text-xl font-bold uppercase tracking-tight">Zero-Markup Pricing</h3>
                                <p className="text-brand-muted text-sm leading-relaxed">
                                    We provide domain registration at wholesale rates.
                                    Our renewal prices are identical to registration costs—no bait and switch tactics.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="w-10 h-10 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-bold text-lg">02</div>
                                <h3 className="text-xl font-bold uppercase tracking-tight">Privacy by Default</h3>
                                <p className="text-brand-muted text-sm leading-relaxed">
                                    WHOIS privacy protection is bundled natively with every eligible TLD.
                                    Your personal contact data remains shielded from automated scrapers.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="w-10 h-10 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-bold text-lg">03</div>
                                <h3 className="text-xl font-bold uppercase tracking-tight">Global Anycast DNS</h3>
                                <p className="text-brand-muted text-sm leading-relaxed">
                                    Leverage our global Anycast DNS network for lightning-fast resolution
                                    and 100% resolution uptime for your mission-critical web assets.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            <Footer />
        </div>
    );
}
