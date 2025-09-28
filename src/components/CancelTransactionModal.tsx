"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface CancelTransactionModalProps {
  transaction: any;
  onClose: () => void;
  onTransactionCancelled: (cancelledTransactionId: any) => void;
}

const CancelTransactionModal: React.FC<CancelTransactionModalProps> = ({ transaction, onClose, onTransactionCancelled }) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    setIsCancelling(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('payments')
        .delete()
        .eq('id', transaction.id);

      if (error) {
        throw error;
      }

      onTransactionCancelled(transaction.id);
      onClose();
    } catch (error: any) {
      setError('Failed to cancel transaction. Please try again.');
      console.error('Error cancelling transaction:', error.message);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Cancel Transaction</h2>
        <p className="text-gray-400 mb-4">Are you sure you want to cancel this transaction? This action cannot be undone.</p>
        <p className="text-gray-400 mb-2"><span className="font-semibold">Transaction ID:</span> {transaction.id}</p>
        <p className="text-gray-400 mb-4"><span className="font-semibold">Plan:</span> {transaction.plan_name}</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            disabled={isCancelling}
          >
            No, keep it
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-400"
            disabled={isCancelling}
          >
            {isCancelling ? 'Cancelling...' : 'Yes, cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelTransactionModal;