import React from 'react';
import Footer from "@/components/Footer";

const RefundPolicy = () => {
    return (
        <div className="bg-brand-bg text-brand-text min-h-screen">
            <div className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund & Cancellation</h1>
                        <p className="text-brand-muted font-bold text-xs uppercase tracking-widest">Effective Date: October 2025</p>
                    </div>

                    <div className="space-y-12 card-enterprise !p-8 md:!p-12">
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">1. Cancellation Policy</h2>
                            <p className="text-brand-muted leading-relaxed text-sm">
                                Customers can cancel their services at any time through the client portal. Cancellation requests must be submitted at least 24 hours before the renewal date to avoid being charged for the next billing cycle.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">2. Refund Eligibility</h2>
                            <div className="text-brand-muted leading-relaxed space-y-4 text-sm">
                                <p>Refunds are considered on a case-by-case basis under the following conditions:</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span>Service did not meet the guaranteed 99.9% uptime.</span></li>
                                    <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span>Technical issues on our end prevented usage within the first 48 hours.</span></li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">3. Non-Refundable Items</h2>
                            <p className="text-brand-muted leading-relaxed text-sm">
                                Domain registrations, setup fees, and services suspended due to TOS violations are non-refundable.
                            </p>
                        </section>

                        <section className="space-y-4 border-t border-brand-border pt-8">
                            <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">4. Contact Support</h2>
                            <p className="text-brand-muted leading-relaxed text-sm mb-4">
                                To request a refund or discuss cancellation, please open a ticket in the billing portal or email our billing department.
                            </p>
                            <a href="mailto:support@vecrahost.in" className="inline-block text-brand-text font-mono text-sm font-bold border-b border-brand-primary pb-1">
                                billing@vecrahost.in
                            </a>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RefundPolicy;