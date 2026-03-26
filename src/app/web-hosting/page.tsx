import Footer from "@/components/Footer";

export const metadata = {
    title: "Web Hosting in India | Reliable Enterprise Hosting — VecraHost",
    description: "Enterprise-grade web hosting for businesses and blogs. Scalable, secure, and WordPress-optimized hosting solutions with 24/7 support. Dedicated Indian infrastructure.",
};

export default function WebHostingPage() {
    return (
        <div className="bg-brand-bg text-brand-text min-h-screen">

            <main className="flex-grow flex flex-col items-center justify-center py-40 px-6">
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Web Hosting</h1>
                    <div className="inline-flex items-center px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-sm mb-8">
                        <span className="text-sm uppercase font-black tracking-widest text-brand-primary">Coming Soon</span>
                    </div>
                    <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                        We are currently engineering our enterprise-grade web hosting solutions. Check back shortly for high-performance hosting designed for scale.
                    </p>
                </div>
            </main>

            {false && (
                <div className="hidden-content">
                    <section className="pt-32 pb-20 px-6 border-b border-brand-border bg-brand-surface/20">
                        <div className="max-w-7xl mx-auto text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">Business-Grade Web Hosting</h1>
                            <p className="text-brand-muted text-lg max-w-3xl mx-auto leading-relaxed mb-10">
                                Fast, secure, and reliable hosting for your online presence.
                                From personal blogs to high-traffic business portals, we provide the infrastructure needed to grow.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://portal.vecrahost.in/web-hosting?source=web_hosting_page&intent=buy&product=web"
                                    className="btn-primary px-10 py-4 text-lg"
                                >
                                    View Plans & Pricing
                                </a>
                                <a
                                    href="https://portal.vecrahost.in/web-hosting?source=web_hosting_page&intent=trial&product=web"
                                    className="btn-secondary px-10 py-4 text-lg"
                                >
                                    Start Free Trial
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">Engineered for <span className="text-brand-primary">Performance.</span></h2>
                                <p className="text-brand-muted max-w-2xl mx-auto">
                                    Our web hosting platform is built on high-speed NVMe storage and LiteSpeed web servers,
                                    ensuring your website loads instantly for users across India and the globe.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                                <div className="card-enterprise text-center">
                                    <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold mb-2">NVMe Storage</h4>
                                    <p className="text-brand-muted text-sm">Ultra-fast SSD storage for instant page loads</p>
                                </div>
                                <div className="card-enterprise text-center">
                                    <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold mb-2">Free SSL</h4>
                                    <p className="text-brand-muted text-sm">Auto-renewing SSL certificates included</p>
                                </div>
                                <div className="card-enterprise text-center">
                                    <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold mb-2">Daily Backups</h4>
                                    <p className="text-brand-muted text-sm">Automated daily backups for peace of mind</p>
                                </div>
                                <div className="card-enterprise text-center">
                                    <div className="w-12 h-12 bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-bold mb-2">24/7 Support</h4>
                                    <p className="text-brand-muted text-sm">Expert technical support anytime</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-6">Perfect for Every Use Case</h3>
                                    <ul className="space-y-4 text-sm font-medium">
                                        <li className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                            </svg>
                                            <div>
                                                <strong className="text-brand-text">WordPress Optimized</strong>
                                                <p className="text-brand-muted mt-1">Managed WordPress environments with staged updates and high-concurrency handling.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                            </svg>
                                            <div>
                                                <strong className="text-brand-text">E-commerce Ready</strong>
                                                <p className="text-brand-muted mt-1">PCI-DSS compliant infrastructure optimized for WooCommerce and other shopping carts.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                            </svg>
                                            <div>
                                                <strong className="text-brand-text">Business Websites</strong>
                                                <p className="text-brand-muted mt-1">Professional email and reliable uptime for local businesses establishing online presence.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                            </svg>
                                            <div>
                                                <strong className="text-brand-text">Developer Friendly</strong>
                                                <p className="text-brand-muted mt-1">SSH access, Git integration, and support for PHP, Node.js, Python, and more.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-brand-surface border border-brand-border p-8 rounded-sm">
                                    <div className="space-y-6">
                                        <div className="pb-6 border-b border-brand-border">
                                            <h4 className="text-sm font-black uppercase tracking-widest text-brand-muted mb-4">Starter Hosting</h4>
                                            <p className="text-3xl font-bold mb-2">Starting from ₹299<span className="text-sm font-normal text-brand-muted">/mo</span></p>
                                            <p className="text-brand-muted text-sm">Perfect for small businesses and personal websites</p>
                                        </div>
                                        <div className="pb-6 border-b border-brand-border">
                                            <h4 className="text-sm font-black uppercase tracking-widest text-brand-muted mb-4">Business Hosting</h4>
                                            <p className="text-3xl font-bold mb-2">Starting from ₹799<span className="text-sm font-normal text-brand-muted">/mo</span></p>
                                            <p className="text-brand-muted text-sm">High-traffic websites and e-commerce platforms</p>
                                        </div>
                                        <a
                                            href="https://portal.vecrahost.in/web-hosting?source=web_hosting_page&intent=buy&product=web"
                                            className="btn-primary w-full block text-center"
                                        >
                                            View All Plans
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 px-6 bg-brand-surface border-y border-brand-border text-center">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">Ready to launch?</h2>
                            <p className="text-brand-muted mb-10">Start with our shared hosting and scale as you grow. All plans include 24/7 technical support.</p>
                            <a
                                href="https://portal.vecrahost.in/web-hosting?source=web_hosting_page&intent=buy&product=web"
                                className="btn-primary px-10 py-4 text-lg inline-block"
                            >
                                View All Hosting Plans
                            </a>
                        </div>
                    </section>
                </div>
            )}

            <Footer />
        </div>
    );
}
