"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface OutOfStockOverlayProps {
  isVisible: boolean;
  onNotify: (email: string) => void;
  onClose: () => void;
}

export default function OutOfStockOverlay({ isVisible, onNotify, onClose }: OutOfStockOverlayProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNotifyMe = async () => {
    if (!email) return;
    
    setIsLoading(true);
    
    try {
      // Send notification to admin
      const response = await fetch('/api/vps-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        onNotify(email);
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setEmail("");
        }, 3000);
      } else {
        console.error('Failed to send VPS notification');
      }
    } catch (error) {
      console.error('Error sending VPS notification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-red-400 text-4xl mb-4">🚫</div>
        <h3 className="text-xl font-semibold text-white mb-2">VPS Servers Temporarily Full</h3>
        <p className="text-gray-400 text-sm mb-4">
              All VPS plans are currently out of stock. Get notified when new slots open!
            </p>
        
        {!isSubmitted ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-accent mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleNotifyMe}
                disabled={!email || isLoading}
                className="flex-1 py-3 px-4 bg-accent text-white font-semibold rounded-lg hover:bg-[#005fcb] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Notify Me"}
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="py-3">
            <div className="text-green-400 text-2xl mb-2">✓</div>
            <p className="text-green-400 text-sm font-semibold">We&apos;ll notify you when VPS plans are available!</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}