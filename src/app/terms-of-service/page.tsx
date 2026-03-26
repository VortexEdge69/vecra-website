import React from 'react';
import Footer from "@/components/Footer";

const TermsOfService = () => {
    return (
        <div className="bg-brand-bg text-brand-text min-h-screen font-sans antialiased">
            <div className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Terms of Service</h1>
                        <p className="text-brand-muted font-bold text-xs uppercase tracking-widest leading-none">Agreement Updated: August 25, 2025</p>
                    </div>

                    <div className="space-y-12 card-enterprise !p-8 md:!p-12">
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">1. Acceptance of Terms</h2>
                            <p className="text-brand-muted leading-relaxed text-sm">
                                By accessing or using VecraHost services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">2. Service Usage</h2>
                            <div className="text-brand-muted leading-relaxed space-y-4 text-sm">
                                <p>You are responsible for all activities that occur under your account. Prohibited activities include but are not limited to:</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span>Hosting illegal content or malware.</span></li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span>Participating in Dos/DDoS attacks.</span></li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span>Using services for crypto mining (on shared/VPS resources).</span></li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span>Violating any local or international laws.</span></li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">3. Termination</h2>
                            <p className="text-brand-muted leading-relaxed text-sm">
                                We reserve the right to suspend or terminate your services at any time, with or without notice, if we believe you have violated these Terms. Suspended accounts may be subject to data deletion after a certain period.
                            </p>
                        </section>

                        <section className="space-y-4 border-t border-brand-border pt-8">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">4. Limitation of Liability</h2>
                            <p className="text-brand-muted leading-relaxed text-sm italic border-l-4 border-brand-primary pl-6">
                                VecraHost shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services, including data loss or service outages.
                            </p>
                        </section>

                        <section className="space-y-4 border-t border-brand-border pt-8">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">5. Contact Information</h2>
                            <p className="text-brand-muted leading-relaxed text-sm mb-4">
                                For legal inquiries regarding these terms, please contact:
                            </p>
                            <a href="mailto:support@vecrahost.in" className="inline-block text-brand-text font-mono text-sm font-bold border-b border-brand-primary pb-1">
                                support@vecrahost.in
                            </a>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default TermsOfService;