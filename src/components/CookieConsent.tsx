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
                    <div className="rounded-3xl border border-[oklch(0.34_0.02_265)] bg-[oklch(0.19_0.014_265)]/95 p-6 text-[oklch(0.97_0.006_95)] shadow-2xl backdrop-blur-xl">
                        <h4 className="mb-2 text-base font-semibold">We use cookies</h4>
                        <p className="mb-5 text-sm leading-relaxed text-[oklch(0.75_0.015_265)]">
                            Essential cookies keep our services secure and working. By continuing, you agree to our{" "}
                            <a href="/privacy-policy" className="text-[oklch(0.9_0.19_128)] hover:underline">Privacy Policy</a>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleAccept}
                                className="flex-1 rounded-full bg-[oklch(0.9_0.19_128)] px-5 py-3 text-sm font-semibold text-[oklch(0.17_0.02_265)] transition hover:bg-[oklch(0.95_0.15_128)] active:scale-[.97]"
                            >
                                Accept all
                            </button>
                            <button
                                onClick={handleDecline}
                                className="flex-1 rounded-full border border-[oklch(0.34_0.02_265)] px-5 py-3 text-sm font-semibold transition hover:border-[oklch(0.97_0.006_95)] active:scale-[.97]"
                            >
                                Essential only
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
