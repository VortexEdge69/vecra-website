import React from 'react';
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-brand-muted font-bold text-xs uppercase tracking-widest">Effective Date: October 2025</p>
          </div>

          <div className="space-y-12 card-enterprise !p-8 md:!p-12">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">1. Information Collection</h2>
              <div className="text-brand-muted leading-relaxed space-y-4 text-sm">
                <p>We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us.</p>
                <ul className="space-y-3">
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span><strong className="text-brand-text">Personal Data:</strong> Email address, username, and billing information.</span></li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span><strong className="text-brand-text">Technical Data:</strong> IP addresses, browser types, and system logs.</span></li>
                  <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0"></div> <span><strong className="text-brand-text">Payment Info:</strong> Processed securely by our third-party payment gateways.</span></li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">2. Usage of Data</h2>
              <p className="text-brand-muted leading-relaxed text-sm">
                We use the collected data to provide, maintain, and improve our hosting services, process transactions, and send technical notices or support messages. We do not sell your personal data to third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">3. Data Security</h2>
              <p className="text-brand-muted leading-relaxed text-sm">
                We implement industry-standard security measures including SSL encryption and restricted server access to protect your data. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4 border-t border-brand-border pt-8">
              <h2 className="text-xl font-bold text-brand-primary uppercase tracking-wider">4. Contact & Complaints</h2>
              <p className="text-brand-muted leading-relaxed text-sm mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your data rights, please reach out to our privacy officer.
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

export default PrivacyPolicy;