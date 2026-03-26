"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:right-8 md:max-w-md"
                >
                    <div className="bg-brand-surface border border-brand-border p-6 shadow-2xl backdrop-blur-xl">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 bg-brand-primary/10 border border-brand-primary/20 flex-shrink-0 flex items-center justify-center">
                                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-brand-text mb-1">Privacy Preference</h4>
                                <p className="text-brand-muted text-xs leading-relaxed">
                                    We use essential cookies to ensure the security and functionality of our infrastructure services. 
                                    By continuing, you agree to our <a href="/privacy-policy" className="text-brand-primary hover:underline">Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAccept}
                                className="btn-primary flex-1 py-3 text-xs font-black uppercase tracking-widest"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={handleDecline}
                                className="btn-secondary flex-1 py-3 text-xs font-black uppercase tracking-widest"
                            >
                                Essential Only
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
