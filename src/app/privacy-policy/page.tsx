import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 sm:pt-32">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="prose prose-invert max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-lg">Effective Date: 25-08-2025</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Personal Data:</strong> Email, username, payment details (processed via third-party providers).</li>
            <li><strong>Usage Data:</strong> Logs, IP addresses, device information.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">2. How We Use Data</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and improve our hosting services.</li>
            <li>To process payments and prevent fraud.</li>
            <li>To communicate with you about updates, invoices, and support.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">3. Data Sharing</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We do not sell personal data.</li>
            <li>We may share data with payment processors and legal authorities if required.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">4. Security</h2>
          <p>We implement industry-standard measures to secure your data, but cannot guarantee absolute security.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">5. Complaints & Queries</h2>
          <p>For any privacy-related requests, complaints, or data deletion queries, please contact <a href="mailto:support@vecrahost.in" className="text-blue-400 hover:underline">support@vecrahost.in</a>.</p>

          <h2 className="text-2xl font-semibold mt-8 border-b border-gray-700 pb-2">6. Updates</h2>
          <p>We may update this Privacy Policy. Updates will be posted on this page.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;