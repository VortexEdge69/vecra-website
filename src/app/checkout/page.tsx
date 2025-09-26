"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import AuthModal from "@/components/AuthModal";
import UserProfile from "@/components/UserProfile";
import { useUser } from "@/context/UserContext";
import UPIPaymentModal from "@/components/UPIPaymentModal";
import Link from 'next/link'
import { Suspense } from "react";

const plans = {
    "mc-starter": {
        id: "mc-starter",
        type: "minecraft",
        name: "MC Starter",
        price: 149,
        features: ["1 GB RAM", "10 Player Slots", "Basic Support"],
    },
    "mc-10-day": {
        id: "mc-10-day",
        type: "minecraft",
        name: "MC 10-Day Plan",
        price: 69,
        features: ["1 GB RAM", "10 Player Slots", "10 Days Only"],
    },
    "mc-pro": {
        id: "mc-pro",
        type: "minecraft",
        name: "MC Pro",
        price: 249,
        features: ["2 GB RAM", "25 Player Slots", "Daily Backups"],
    },
    "mc-ultra": {
        id: "mc-ultra",
        type: "minecraft",
        name: "MC Ultra",
        price: 349,
        features: ["3 GB RAM", "Unlimited Slots", "Premium Support"],
    },
    "vps-starter": {
        id: "vps-starter",
        type: "vps",
        name: "VPS Starter",
        price: 399,
        features: ["1 vCPU", "2 GB RAM", "25 GB SSD"],
    },
    "vps-pro": {
        id: "vps-pro",
        type: "vps",
        name: "VPS Pro",
        price: 699,
        features: ["2 vCPU", "4 GB RAM", "50 GB SSD"],
    },
    "vps-ultra": {
        id: "vps-ultra",
        type: "vps",
        name: "VPS Ultra",
        price: 999,
        features: ["4 vCPU", "8 GB RAM", "100 GB SSD"],
    },
};

interface AddonOption {
    id: string;
    name: string;
    description: string;
    pricePerUnit: number;
    unit: "toggle" | "number" | "bundle";
    max?: number;
}

const addonOptions: Record<string, AddonOption[]> = {
    minecraft: [
        {
            id: "extraSlots",
            name: "Extra Player Slots",
            description: "+10 slots (₹30/mo)",
            pricePerUnit: 30,
            unit: "bundle", // each selection = 10 players
            max: 5,
        },
        {
            id: "dailyBackup",
            name: "Daily Backup",
            description: "Automated backups every 24 hrs",
            pricePerUnit: 49,
            unit: "toggle",
        },
    ],
    vps: [
        {
            id: "extraPorts",
            name: "Extra Ports",
            description: "Add external ports (₹25/port)",
            pricePerUnit: 25,
            unit: "number",
            max: 10,
        },
        {
            id: "subdomain",
            name: "Subdomain",
            description: "Get a free .vecra.vortexedge.in subdomain (₹99/year)",
            pricePerUnit: 99,
            unit: "toggle",
        },
    ],
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const planId = searchParams.get("plan");
    const selectedPlan = plans[planId as keyof typeof plans];

    const [term, setTerm] = useState<1 | 3 | 6 | 12>(1);
    const [selectedAddons, setSelectedAddons] = useState<{ [key: string]: number | boolean }>({});
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showPaymentSection, setShowPaymentSection] = useState(false);
    const { user } = useUser();

    if (!selectedPlan) {
        return (
            <div className="min-h-screen w-full px-6 pt-32 pb-16 bg-gradient-to-br from-[#0e1013] to-[#1b1f27] text-white flex flex-col items-center justify-center">
                <div className="max-w-md w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg text-center">
                    <h1 className="text-2xl font-bold mb-4 text-red-400">Invalid Plan</h1>
                    <p className="text-gray-300 mb-6">
                        The plan you selected could not be found. Please return to the homepage and select a valid plan.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-[#005fcb] transition-colors duration-200"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    const base = selectedPlan.price;
    const discount = selectedPlan.id === "mc-10-day" ? 0 : 
        (term === 3 ? 0.05 : term === 6 ? 0.075 : term === 12 ? 0.1 : 0);

    const basePrice = selectedPlan.id === "mc-10-day" ? base : base * term * (1 - discount);

    const addonsTotal = Object.entries(selectedAddons).reduce((sum, [id, val]) => {
        const addon = addonOptions[selectedPlan.type]?.find((a) => a.id === id);
        if (!addon) return sum;

        const unitCount =
            addon.unit === "toggle" ? (val ? 1 : 0) : typeof val === "number" ? val : 0;

        const addonPrice =
            addon.unit === "toggle" && addon.id === "subdomain" && term < 12
                ? 0 // only charge subdomain if buying yearly
                : addon.pricePerUnit * unitCount * term;

        return sum + addonPrice;
    }, 0);

    const finalPrice = Math.round(basePrice + addonsTotal);

    return (
        <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-32 pb-16 bg-gradient-to-br from-[#0e1013] to-[#1b1f27] text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto"
            >
                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left Column - Plan Summary & Addons */}
                    <main className="space-y-6">
                        {/* Plan Header */}
                        <section className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 lg:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-3 h-3 rounded-full ${selectedPlan.type === 'minecraft' ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                                <h1 className="text-2xl font-bold">
                                    Checkout: {selectedPlan.name}
                                </h1>
                            </div>

                            {/* Features */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-400 mb-3">Plan Features</h3>
                                <ul className="text-sm text-gray-300 space-y-2">
                                    {selectedPlan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Term Selector */}
                            <div className="mb-6">
                                <label className="block mb-3 text-sm font-medium text-gray-400">
                                    Billing Term
                                </label>
                                {selectedPlan.id === "mc-10-day" ? (
                                    <div className="w-full bg-white/5 text-white border border-white/20 rounded-lg p-3">
                                        <span className="text-white">10 Days - ₹{base}</span>
                                    </div>
                                ) : (
                                    <select
                                        value={term}
                                        onChange={(e) => setTerm(parseInt(e.target.value) as 1 | 3 | 6 | 12)}
                                        className="w-full bg-white/5 text-white border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0076fe] hover:bg-white/10 transition [&>option]:bg-[#1b1f27] [&>option]:text-white"
                                    >
                                        <option value={1}>1 Month - ₹{base}</option>
                                        <option value={3}>3 Months - ₹{Math.round(base * 3 * 0.95)} (5% off)</option>
                                        <option value={6}>6 Months - ₹{Math.round(base * 6 * 0.925)} (7.5% off)</option>
                                        <option value={12}>1 Year - ₹{Math.round(base * 12 * 0.9)} (10% off)</option>
                                    </select>
                                )}
                            </div>
                        </section>

                        {/* Add-ons Section */}
                        {user && (
                            <section className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 lg:p-8 shadow-lg">
                                <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#0076fe]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                    </svg>
                                    Optional Add-ons
                                </h3>
                                <div className="space-y-4">
                                    {addonOptions[selectedPlan.type]?.map((addon) => {
                                        const addonValue = selectedAddons[addon.id] ?? (addon.unit === "toggle" ? false : 0);
                                        const isPlayerSlots = addon.id === "extraSlots";

                                        return (
                                            <div
                                                key={addon.id}
                                                className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${isPlayerSlots
                                                    ? 'bg-gradient-to-r from-[#0076fe]/10 to-blue-500/10 border-[#0076fe]/30 animate-pulse-glow hover:from-[#0076fe]/15 hover:to-blue-500/15'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/8'
                                                    } p-4 lg:p-6 rounded-xl border backdrop-blur-md`}
                                            >
                                                {/* Glow effect for player slots */}
                                                {isPlayerSlots && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0076fe]/5 to-blue-500/5 rounded-xl"></div>
                                                )}

                                                <div className="relative flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            {isPlayerSlots ? (
                                                                <div className="w-8 h-8 bg-gradient-to-br from-[#0076fe] to-blue-500 rounded-lg flex items-center justify-center">
                                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                    </svg>
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                                                    <svg className="w-4 h-4 text-[#0076fe]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                            <h4 className="font-semibold text-white text-lg">{addon.name}</h4>
                                                        </div>
                                                        <p className="text-sm text-gray-400 ml-11">{addon.description}</p>

                                                        {/* Price display */}
                                                        <div className="ml-11 mt-2">
                                                            <span className="text-[#0076fe] font-semibold">
                                                                ₹{addon.pricePerUnit}/mo
                                                            </span>
                                                            {addon.unit === "bundle" && (
                                                                <span className="text-gray-500 text-xs ml-1">per bundle</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Enhanced Input Controls */}
                                                    <div className="flex items-center gap-3">
                                                        {addon.unit === "toggle" ? (
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={addonValue as boolean}
                                                                    onChange={(e) =>
                                                                        setSelectedAddons({ ...selectedAddons, [addon.id]: e.target.checked })
                                                                    }
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0076fe]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0076fe]"></div>
                                                            </label>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-2">
                                                                {/* Counter controls */}
                                                                <div className="flex items-center gap-2">
                                                                    {/* Decrease button */}
                                                                    <button
                                                                        onClick={() => {
                                                                            const currentValue = (addonValue as number) || 0;
                                                                            if (currentValue > 0) {
                                                                                setSelectedAddons({
                                                                                    ...selectedAddons,
                                                                                    [addon.id]: currentValue - 1,
                                                                                });
                                                                            }
                                                                        }}
                                                                        className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-200 text-white hover:text-[#0076fe] active:animate-bounce-subtle"
                                                                        disabled={(addonValue as number) <= 0}
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                                        </svg>
                                                                    </button>

                                                                    {/* Number input */}
                                                                    <input
                                                                        type="number"
                                                                        min={0}
                                                                        max={addon.max ?? 10}
                                                                        value={addonValue as number}
                                                                        onChange={(e) =>
                                                                            setSelectedAddons({
                                                                                ...selectedAddons,
                                                                                [addon.id]: parseInt(e.target.value) || 0,
                                                                            })
                                                                        }
                                                                        className={`w-16 h-8 text-center font-semibold rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0076fe] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isPlayerSlots
                                                                            ? 'bg-[#0076fe]/20 border-[#0076fe]/40 text-[#0076fe]'
                                                                            : 'bg-white/10 border-white/20 text-white'
                                                                            }`}
                                                                    />

                                                                    {/* Increase button */}
                                                                    <button
                                                                        onClick={() => {
                                                                            const currentValue = (addonValue as number) || 0;
                                                                            const maxValue = addon.max ?? 10;
                                                                            if (currentValue < maxValue) {
                                                                                setSelectedAddons({
                                                                                    ...selectedAddons,
                                                                                    [addon.id]: currentValue + 1,
                                                                                });
                                                                            }
                                                                        }}
                                                                        className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center transition-all duration-200 text-white hover:text-[#0076fe] active:animate-bounce-subtle"
                                                                        disabled={(addonValue as number) >= (addon.max ?? 10)}
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                        </svg>
                                                                    </button>
                                                                </div>

                                                                {/* ×10 slots label */}
                                                                {isPlayerSlots && (
                                                                    <div className="text-xs text-[#0076fe] font-medium">
                                                                        ×10 slots
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Total price for this addon */}
                                                {(addon.unit === "toggle" ? (addonValue as boolean) : (addonValue as number) > 0) && (
                                                    <div className="mt-3 pt-3 border-t border-white/10">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-gray-400">
                                                                {addon.unit === "toggle" ? "Add-on" : `${addonValue} × ₹${addon.pricePerUnit}`}
                                                            </span>
                                                            <span className="text-[#0076fe] font-semibold">
                                                                ₹{addon.unit === "toggle" ? addon.pricePerUnit * term : addon.pricePerUnit * (addonValue as number) * term}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </main>

                    {/* Right Column - Payment Action */}
                    <aside className="lg:sticky lg:top-8 lg:h-fit">
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 lg:p-8 shadow-lg">
                            {/* Price Breakdown */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300">Base Price ({term} month{term > 1 ? 's' : ''})</span>
                                        <span className="text-white">₹{base * term}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-green-400">Discount ({Math.round(discount * 100)}%)</span>
                                            <span className="text-green-400">-₹{Math.round(base * term * discount)}</span>
                                        </div>
                                    )}
                                    {addonsTotal > 0 && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#0076fe]">Add-ons ({term} month{term > 1 ? 's' : ''})</span>
                                            <span className="text-[#0076fe]">+₹{addonsTotal}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                                        <span className="text-lg font-semibold text-white">Total</span>
                                        <span className="text-2xl font-bold text-[#0076fe]">₹{finalPrice}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Login/Signup Section */}
                            {!user ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/10 border border-white/20 p-6 rounded-lg mb-6"
                                >
                                    <h3 className="text-lg font-semibold mb-3 text-white">Account Required</h3>
                                    <p className="text-gray-300 mb-4 text-sm">
                                        Please log in or create an account to continue with your purchase.
                                    </p>
                                    <button
                                        onClick={() => setShowAuthModal(true)}
                                        className="w-full px-4 py-3 bg-[#0076fe] rounded-lg text-white font-semibold hover:bg-[#005fcb] transition-colors duration-200"
                                    >
                                        Login / Sign Up
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6"
                                >
                                    <UserProfile />
                                </motion.div>
                            )}

                            {/* Payment Button */}
                            {!showPaymentSection ? (
                                <button
                                    className="w-full py-4 bg-[#0076fe] text-white font-semibold rounded-xl hover:bg-[#005fcb] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={!user}
                                    onClick={() => {
                                        if (user) {
                                            setShowPaymentSection(true)
                                        }
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    {user ? `Proceed to Payment - ₹${finalPrice}` : 'Login to Continue'}
                                </button>
                            ) : null}

                            {/* Back to Home */}
                            <div className="mt-6 text-center">
                                <Link
                                    href="/"
                                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    ← Back to Homepage
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* UPI Payment Modal */}
                <UPIPaymentModal
                    isOpen={showPaymentSection}
                    onClose={() => setShowPaymentSection(false)}
                    planName={selectedPlan.name}
                    planId={selectedPlan.id}
                    billingPeriod={term}
                    totalAmount={finalPrice}
                />

                {/* Auth Modal */}
                <AuthModal
                    isOpen={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                    onLoginSuccess={() => setShowAuthModal(false)}
                />
            </motion.div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}