import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 sm:pt-32">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service (Vecra Host)</h1>
        <div className="prose prose-invert max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-lg">Effective Date: 25-08-2025</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">1. Introduction</h2>
          <p>Welcome to Vecra Host. By using our services, you agree to comply with and be bound by these Terms of Service. If you do not agree, you may not use our services.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">2. Services</h2>
          <p>Vecra Host provides hosting solutions, including VPS rental, Minecraft/game servers, web hosting, and related services.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">3. Accounts</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must be at least 13 years old to register.</li>
            <li>You are responsible for maintaining the confidentiality of your account.</li>
            <li>Any activity under your account is your responsibility.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Use our services for illegal activities (e.g., phishing, malware distribution, spamming).</li>
            <li>Abuse server resources, causing disruption to others.</li>
            <li>Violate intellectual property laws.</li>
          </ul>
          <p className="mt-4">Vecra Host reserves the right to suspend or terminate accounts violating these rules.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">5. Payments & Billing</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Payment is required in advance for all services.</li>
            <li>Services may be suspended or terminated for non-payment.</li>
            <li>Pricing is subject to change, but existing subscriptions will be honored until renewal.</li>
            <li>All payments are non-refundable.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">6. Complaints & Support</h2>
          <p>For any complaints, queries, or disputes, please contact <a href="mailto:support@vecrahost.in" className="text-blue-400 hover:underline">support@vecrahost.in</a>.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">7. Limitation of Liability</h2>
          <p>Vecra Host is not liable for:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Data loss, service interruptions, or damages caused by third-party actions.</li>
            <li>Downtime due to maintenance or unforeseen issues.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">8. Termination</h2>
          <p>We may suspend or terminate your account if you violate these Terms.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">9. Governing Law</h2>
          <p>These Terms shall be governed by the laws of India.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;