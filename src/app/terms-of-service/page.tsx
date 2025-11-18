import React from 'react';

const TermsOfService = () => {
  const today = new Date().toLocaleDateString('en-IN');
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 sm:pt-32">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service (Vecra Host)</h1>
        <div className="prose prose-invert max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-lg">Effective Date: 25-08-2025</p>
          <p className="text-sm text-gray-400">Last Updated: {today}</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">1. Introduction</h2>
          <p>Welcome to Vecra Host (“we”, “our”, “us”). By purchasing or using any of our services, you (“customer”, “client”) agree to these Terms of Service. If you do not agree, please do not use our services.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">2. Services Offered</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>VPS hosting</li>
            <li>Minecraft/Game hosting</li>
            <li>Web hosting</li>
            <li>Cloud & storage services</li>
            <li>Additional addons (backups, IPs, management, migrations, etc.)</li>
          </ul>
          <p className="mt-4">All services are provided on a best-effort basis.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">3. Account Requirements</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must be 13 years or older.</li>
            <li>You must provide accurate information during registration.</li>
            <li>You are fully responsible for all activity under your account.</li>
            <li>Sharing accounts or credentials is not recommended.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">4. Acceptable Use Policy (AUP)</h2>
          <p>You agree NOT to use our services for:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Illegal activities (hacking, phishing, malware, exploitation).</li>
            <li>Hosting copyrighted content without permission.</li>
            <li>Sending spam, scams, bulk emails, or running mass-mailing servers.</li>
            <li>Crypto mining, unless explicitly allowed in your plan.</li>
            <li>DDoS attacks or hosting stress-testing services.</li>
            <li>Excessive resource abuse that impacts other clients.</li>
          </ul>
          <p className="mt-4">We reserve the right to immediately suspend or terminate any service violating the AUP without refund.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">5. Payments & Billing</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>All services must be paid in advance.</li>
            <li>Non-payment may result in suspension after 24 hours and termination after 72 hours.</li>
            <li>Prices may change, but active subscriptions remain unchanged until renewal.</li>
            <li>Chargebacks and payment disputes will result in permanent account termination.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">6. Data & Backups</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Customers are fully responsible for their data.</li>
            <li>Unless specified, Vecra Host does not guarantee automatic backups.</li>
            <li>Any data loss due to hardware failure, user error, or external factors is not our responsibility.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">7. Uptime & Maintenance</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We aim to provide 99% uptime, but it is not guaranteed.</li>
            <li>Scheduled or emergency maintenance may cause downtime.</li>
            <li>Credits or refunds are NOT given for downtime.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">8. Support</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Support is available via email or ticket.</li>
            <li>Response time may vary depending on workload.</li>
            <li>Priority support features apply only to plans that include it.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">9. Termination & Suspension</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You violate the AUP or TOS</li>
            <li>You attempt fraud, abuse, or cause harm to our network</li>
            <li>You perform actions that risk our IP reputation</li>
            <li>There is non-payment</li>
          </ul>
          <p className="mt-4">No refunds will be issued upon termination.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">10. Liability Disclaimer</h2>
          <p>Vecra Host is not responsible for:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Data loss</li>
            <li>Downtime (planned or unplanned)</li>
            <li>Security breaches caused by customer misconfiguration</li>
            <li>Loss of revenue caused by service issues</li>
          </ul>
          <p className="mt-4">Maximum liability is limited to the amount paid for the current billing cycle.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">11. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be resolved under Indian jurisdiction.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">12. Changes to Terms</h2>
          <p>We may update these Terms at any time. Updated terms will be posted on the website. Continued use means acceptance of the new Terms.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;