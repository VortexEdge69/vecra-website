import React from 'react';

const RefundAndCancellationPolicy = () => {
  const today = new Date().toLocaleDateString('en-IN');
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 sm:pt-32">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Refund & Cancellation Policy</h1>
        <div className="prose prose-invert max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-lg">Effective Date: 25-08-2025</p>
          <p className="text-sm text-gray-400">Last Updated: {today}</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">1. Refund Policy</h2>
          <p>Vecra Host follows a strict no-refund policy. Payments made for any service are final and non-refundable, including:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>VPS hosting</li>
            <li>Minecraft/Game servers</li>
            <li>Web hosting</li>
            <li>Domain registrations</li>
            <li>Addons, upgrades, or custom services</li>
          </ul>
          <p className="mt-4">Refunds are not provided for:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Customer mistakes</li>
            <li>Incorrect plan purchase</li>
            <li>Change of mind</li>
            <li>Downtime</li>
            <li>Abuse-related termination</li>
            <li>Data loss caused by the customer</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">2. Cancellation Policy</h2>
          <p>You may cancel your service anytime through the client dashboard. Cancellation stops future billing only.</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Cancelling does not entitle you to a refund for the remaining time.</li>
            <li>Services may be terminated immediately or at the end of the billing cycle.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">3. Chargebacks</h2>
          <p>Filing a chargeback or payment dispute results in:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Immediate termination of all active services</li>
            <li>Permanent ban from Vecra Host</li>
            <li>Reporting to fraud databases (if needed)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">4. Trials</h2>
          <p>If a free trial or promotional offer is provided, it cannot be refunded or compensated.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">5. Contact</h2>
          <p>For billing issues or disputes, email: <a href="mailto:support@vecrahost.in" className="text-blue-400 hover:underline">support@vecrahost.in</a>. We will make our best effort to resolve concerns.</p>
        </div>
      </div>
    </div>
  );
};

export default RefundAndCancellationPolicy;