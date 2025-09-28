"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface EditUtrModalProps {
  transaction: any;
  onClose: () => void;
  onUtrUpdated: (updatedTransaction: any) => void;
}

const EditUtrModal: React.FC<EditUtrModalProps> = ({ transaction, onClose, onUtrUpdated }) => {
  const [newUtr, setNewUtr] = useState(transaction.utr);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (!newUtr.trim()) {
      setError('UTR cannot be empty.');
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('payments')
        .update({ utr: newUtr })
        .eq('id', transaction.id)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        onUtrUpdated(data[0]);
        onClose();
      }
    } catch (error: any) {
      setError('Failed to update UTR. Please try again.');
      console.error('Error updating UTR:', error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Edit UTR</h2>
        <p className="text-gray-400 mb-4">Transaction ID: {transaction.id}</p>
        
        <div className="mb-4">
          <label htmlFor="utr" className="block text-sm font-medium text-gray-300 mb-2">New UTR</label>
          <input
            type="text"
            id="utr"
            value={newUtr}
            onChange={(e) => setNewUtr(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUtrModal;