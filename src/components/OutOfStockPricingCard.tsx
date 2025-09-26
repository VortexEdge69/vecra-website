"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface OutOfStockPricingCardProps {
    title: string;
    price: string;
    features: string[];
    icon?: React.ReactNode;
}

export default function OutOfStockPricingCard({
    title,
    price,
    features,
    icon
}: OutOfStockPricingCardProps) {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleNotifyMe = async () => {
        if (!email) return;
        
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:shadow-accent/30 transition-all duration-300 h-full relative">
                {/* Out of Stock Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="text-red-400 text-2xl mb-2">🚫</div>
                        <p className="text-red-400 font-semibold">Out of Stock</p>
                    </div>
                </div>

                <div className="space-y-4 opacity-50">
                    {/* Icon */}
                    <div className="text-accent text-4xl">
                        {icon || (
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        )}
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-semibold">{title}</h3>

                    {/* Price */}
                    <p className="text-4xl font-bold text-accent">{price}</p>

                    {/* Feature List */}
                    <ul className="text-sm text-gray-300 space-y-2">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                                <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Email Notification Section */}
                <div className="mt-6 space-y-3">
                    {!isSubmitted ? (
                        <>
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-2">Get notified when available</p>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-accent"
                                />
                            </div>
                            <button
                                onClick={handleNotifyMe}
                                disabled={!email || isLoading}
                                className="block text-center w-full py-3 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Submitting..." : "Notify Me"}
                            </button>
                        </>
                    ) : (
                        <div className="text-center py-3">
                            <div className="text-green-400 text-2xl mb-2">✓</div>
                            <p className="text-green-400 text-sm font-semibold">We&apos;ll notify you!</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
