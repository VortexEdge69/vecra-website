import React from 'react';

const RefundAndCancellationPolicy = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-24 sm:pt-32">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Refund & Cancellation Policy</h1>
        <div className="prose prose-invert max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-lg">Effective Date: 25-08-2025</p>

          <p className="mt-4">No refunds are offered at this time for any service.</p>
          <p className="mt-4">All payments made to Vecra Host are final and non-refundable.</p>
          <p className="mt-4">Customers may cancel their services at any time via the client dashboard. Cancellations will stop future billing but do not entitle you to a refund.</p>
          <p className="mt-4">For any issues or disputes, please contact <a href="mailto:support@vecrahost.in" className="text-blue-400 hover:underline">support@vecrahost.in</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default RefundAndCancellationPolicy;