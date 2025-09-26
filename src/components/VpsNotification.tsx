"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface VpsNotificationProps {
    onNotify: (email: string) => void;
}

export default function VpsNotification({ onNotify }: VpsNotificationProps) {
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
            } else {
                console.error('Failed to send VPS notification');
            }
        } catch (error) {
            console.error('Error sending VPS notification:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-w-md mx-auto mb-8"
        >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-red-400 text-3xl mb-4">🚫</div>
                <h3 className="text-xl font-semibold text-white mb-2">VPS Plans Currently Unavailable</h3>
                <p className="text-gray-400 text-sm mb-4">
                    Our VPS hosting is temporarily out of stock. Get notified when we&apos;re back!
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
                        <button
                            onClick={handleNotifyMe}
                            disabled={!email || isLoading}
                            className="w-full py-3 px-4 bg-accent text-white font-semibold rounded-lg hover:bg-[#005fcb] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Submitting..." : "Notify Me When Available"}
                        </button>
                    </>
                ) : (
                    <div className="py-3">
                        <div className="text-green-400 text-2xl mb-2">✓</div>
                        <p className="text-green-400 text-sm font-semibold">We&apos;ll notify you when VPS plans are available!</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
