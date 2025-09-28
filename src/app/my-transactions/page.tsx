"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import EditUtrModal from '@/components/EditUtrModal';
import CancelTransactionModal from '@/components/CancelTransactionModal';

const MyTransactionsPage = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching transactions:', error);
        } else {
          setTransactions(data);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const handleEditUtr = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleCancelTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsCancelModalOpen(true);
  };

  const handleUtrUpdated = (updatedTransaction: any) => {
    setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
  };

  const handleTransactionCancelled = (cancelledTransactionId: any) => {
    setTransactions(transactions.filter(t => t.id !== cancelledTransactionId));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-4 text-white">My Transactions</h1>
        {loading ? (
          <p className="text-white">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="text-white">You have no transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg text-white">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">UTR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.plan_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{transaction.utr}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'PENDING'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : transaction.status === 'APPROVED'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.status === 'PENDING' && (
                        <div className="flex space-x-2">
                          <button onClick={() => handleEditUtr(transaction)} className="text-blue-400 hover:text-blue-600">Edit UTR</button>
                          <button onClick={() => handleCancelTransaction(transaction)} className="text-red-400 hover:text-red-600">Cancel</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8 text-center text-gray-400">
          <p>For any queries, please contact our support team at <a href="mailto:support@vecrahost.in" className="text-blue-400 hover:underline">support@vecrahost.in</a></p>
        </div>
      </div>
      {isEditModalOpen && selectedTransaction && (
        <EditUtrModal
          transaction={selectedTransaction}
          onClose={() => setIsEditModalOpen(false)}
          onUtrUpdated={handleUtrUpdated}
        />
      )}
      {isCancelModalOpen && selectedTransaction && (
        <CancelTransactionModal
          transaction={selectedTransaction}
          onClose={() => setIsCancelModalOpen(false)}
          onTransactionCancelled={handleTransactionCancelled}
        />
      )}
    </>
  );
};

export default MyTransactionsPage;