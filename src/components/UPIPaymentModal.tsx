"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/context/UserContext"
import Image from 'next/image';
import { useRouter } from "next/navigation";

interface UPIPaymentModalProps {
    isOpen: boolean
    onClose: () => void
    planName: string
    planId: string
    billingPeriod: number
    totalAmount: number
}

export default function UPIPaymentModal({
    isOpen,
    onClose,
    planName,
    planId,
    billingPeriod,
    totalAmount
}: UPIPaymentModalProps) {
    const { user } = useUser()
    const router = useRouter();
    const [utrNumber, setUtrNumber] = useState("")
    const [selectedMethod, setSelectedMethod] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)

    // Close modal on ESC key and prevent body scroll
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setUtrNumber("")
            setSelectedMethod("")
            setError("")
            setShowSuccess(false)
            setIsSubmitting(false)
            setCopied(false)
        }
    }, [isOpen])

    const submitPaymentConfirmation = async () => {
        if (!utrNumber.trim()) {
            setError("Please enter the UTR/Transaction ID")
            return
        }

        if (!user) {
            setError("User not authenticated")
            return
        }

        // Check for existing pending transactions
        try {
            const { data: pendingTransactions, error: pendingError } = await supabase
                .from('payments')
                .select('id')
                .eq('user_id', user.id)
                .eq('status', 'PENDING');

            if (pendingError) {
                console.error('Error checking pending transactions:', pendingError);
                setError("Could not verify your pending transactions. Please try again.");
                return;
            }

            if (pendingTransactions && pendingTransactions.length > 0) {
                setError("You have a pending transaction. Please wait for it to be processed, or cancel it from your transactions page.");
                return;
            }
        } catch (error) {
            console.error('Error during pending transaction check:', error);
            setError("An unexpected error occurred while checking your transactions.");
            return;
        }

        setIsSubmitting(true)
        setError("")

        try {
            // Get user profile for email
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('email')
                .eq('id', user.id)
                .single()

            if (profileError) {
                console.error('Profile fetch error:', profileError)
                setError("Failed to fetch user profile. Please try again.")
                return
            }

            const email = profileData?.email || user.email

            // Prepare payment data
            const paymentData = {
                user_id: user.id,
                email: email,
                plan_name: planName,
                plan_id: planId,
                billing_period: billingPeriod,
                amount: totalAmount,
                utr_number: utrNumber.trim(),
                status: 'pending',
                payment_method: selectedMethod,
                created_at: new Date().toISOString()
            }

            console.log('Submitting payment data:', paymentData)

            // Save payment data to Supabase
            const { data: paymentResult, error: paymentError } = await supabase
                .from('payments')
                .insert(paymentData)
                .select()

            if (paymentError) {
                console.error('Payment submission error:', paymentError)
                console.error('Error details:', {
                    message: paymentError.message,
                    details: paymentError.details,
                    hint: paymentError.hint,
                    code: paymentError.code
                })
                setError(`Failed to submit payment info: ${paymentError.message}`)
                return
            }

            console.log('Payment submitted successfully:', paymentResult)

            // Send email notification to admin
            try {
                const emailResponse = await fetch('/api/payment-confirmation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        utr: utrNumber.trim(),
                        amount: totalAmount.toString(),
                        planName: planName
                    }),
                });

                if (emailResponse.ok) {
                    console.log('✅ Payment notification email sent successfully');
                } else {
                    console.log('❌ Failed to send payment notification email');
                }
            } catch (emailError) {
                console.error('Email notification error:', emailError);
                // Don't fail the payment if email fails
            }

            // Show success message
            router.push('/verification-in-progress');

        } catch (error) {
            console.error('Unexpected error:', error)
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const copyAmountToClipboard = async () => {
        await copyToClipboard(totalAmount.toString())
    }

    const renderError = () => {
        if (!error) return null

        const isPendingError = error.includes("pending transaction")

        return (
            <div className={`mt-4 text-center text-red-400 bg-red-900/20 border border-red-600/30 rounded-lg p-3 text-sm transition-all duration-300 ease-in-out`}>
                <p>{error}</p>
                {isPendingError && (
                    <p className="mt-2">
                        <a href="/my-transactions" className="underline hover:text-red-300 font-semibold">
                            View My Transactions
                        </a>
                        <span className="mx-2 text-gray-400">or</span>
                        <a href="mailto:support@vecrahost.in" className="underline hover:text-red-300 font-semibold">
                            Contact Support
                        </a>
                    </p>
                )}
            </div>
        )
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed inset-0 z-[91] flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Content */}
                        <div className="w-[90%] max-w-md md:max-w-xl max-h-[90vh] overflow-y-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl custom-scrollbar">
                            {/* Header */}
                            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-lg rounded-t-2xl">
                                <h2 className="text-xl font-bold text-white">Complete Payment</h2>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors duration-200"
                                    aria-label="Close modal"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                {showSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Payment submitted!</h3>
                                        <p className="text-gray-300">
                                            We&apos;ll verify your payment and notify you at your registered email.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Payment Method Selection */}
                                        <div className="flex flex-col gap-3 text-white">
                                            <label className="text-lg font-semibold">Select Payment Method</label>

                                            <div className="flex flex-col gap-3">
                                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="payment_method"
                                                        value="upi"
                                                        checked={selectedMethod === 'upi'}
                                                        onChange={() => setSelectedMethod('upi')}
                                                        className="accent-[#0076fe] w-4 h-4"
                                                    />
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-[#0076fe]/20 rounded-lg flex items-center justify-center">
                                                            <svg className="w-4 h-4 text-[#0076fe]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <span className="text-white font-medium">UPI (Recommended)</span>
                                                            <p className="text-xs text-gray-400">Instant payment via UPI apps</p>
                                                        </div>
                                                    </div>
                                                </label>

                                                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg opacity-50 cursor-not-allowed">
                                                    <input
                                                        type="radio"
                                                        name="payment_method"
                                                        disabled
                                                        className="accent-gray-400 w-4 h-4"
                                                    />
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center">
                                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-400 font-medium">Debit/Credit Card</span>
                                                            <p className="text-xs text-gray-500">Coming Soon</p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        {/* UPI Payment Details - Only show when UPI is selected */}
                                        <AnimatePresence>
                                            {selectedMethod === 'upi' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, y: -20 }}
                                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                                    exit={{ opacity: 0, height: 0, y: -20 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                    className="mt-6 space-y-6"
                                                >
                                                    {/* UPI Details Section */}
                                                    <div className="bg-[#101c2c]/70 p-4 rounded-xl text-white border border-blue-500/20">
                                                        {/* UPI ID Section */}
                                                        <div className="mb-4">
                                                            <p className="text-lg font-medium mb-2">UPI ID:</p>
                                                            <div className="flex items-center gap-2">
                                                                <p className="flex-1 bg-[#0e1c33] px-3 py-2 rounded-md text-white border border-blue-500 font-mono text-center">
                                                                    vecrahost@kbl
                                                                </p>
                                                                <button
                                                                    onClick={() => copyToClipboard('vecrahost@kbl')}
                                                                    className="px-3 py-2 bg-[#0076fe]/20 border border-[#0076fe]/30 text-[#0076fe] rounded-md hover:bg-[#0076fe]/30 transition-colors duration-200"
                                                                    title="Copy UPI ID"
                                                                >
                                                                    {copied ? (
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                        </svg>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Amount Section */}
                                                        <div className="text-center mb-4">
                                                            <p className="text-lg font-semibold">Amount to Pay</p>
                                                            <div className="relative inline-block mt-2">
                                                                <p className="text-2xl md:text-3xl font-bold text-white bg-blue-950 px-5 py-2 rounded-lg shadow border border-blue-500 select-all">
                                                                    ₹{totalAmount.toFixed(2)}
                                                                </p>
                                                                <button
                                                                    onClick={copyAmountToClipboard}
                                                                    className="absolute -right-2 -top-2 w-6 h-6 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white text-xs transition-colors duration-200"
                                                                    title="Copy amount"
                                                                >
                                                                    {copied ? (
                                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                        </svg>
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <p className="text-sm mt-2 text-red-400">
                                                                ⚠ Please pay the exact amount. Incorrect payments will not be processed.
                                                            </p>
                                                        </div>

                                                        {/* QR Code Section */}
                                                        <div className="flex justify-center mb-4">
                                                            <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                                                                <Image
                                                                    src="/images/qr-code-placeholder.png"
                                                                    alt="UPI QR Code"
                                                                    width={160}
                                                                    height={160}
                                                                    className="w-40 h-40 object-contain rounded-xl border border-blue-700 shadow"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.style.display = 'none';
                                                                        target.nextElementSibling?.classList.remove('hidden');
                                                                    }}
                                                                />
                                                                <div className="hidden w-40 h-40 mx-auto bg-gradient-to-br from-[#0076fe]/20 to-blue-500/20 rounded-xl border border-blue-700 shadow flex items-center justify-center">
                                                                    <div className="text-center">
                                                                        <svg className="w-10 h-10 text-[#0076fe] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z" />
                                                                        </svg>
                                                                        <p className="text-[#0076fe] text-sm font-medium">QR Code</p>
                                                                        <p className="text-gray-400 text-xs">vecrahost@kbl</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Payment Instructions */}
                                                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                                                            <h4 className="text-sm font-semibold text-white mb-2">Payment Instructions:</h4>
                                                            <ol className="text-xs text-gray-300 space-y-1">
                                                                <li>1. Open your UPI payment app (GPay, PhonePe, Paytm, etc.)</li>
                                                                <li>2. Send ₹{totalAmount.toFixed(2)} to <span className="font-mono text-[#0076fe]">vecrahost@kbl</span></li>
                                                                <li>3. Copy the UTR/Transaction ID from your payment app</li>
                                                                <li>4. Paste it in the field below and submit</li>
                                                            </ol>
                                                        </div>
                                                    </div>

                                                    {/* UTR Submission Section */}
                                                    <div className="bg-[#101c2c]/70 p-4 rounded-xl text-white border border-blue-500/20">
                                                        <div className="mb-4">
                                                            <label className="text-white font-medium text-lg">Enter UTR / Reference Number</label>
                                                            <input
                                                                type="text"
                                                                value={utrNumber}
                                                                onChange={(e) => setUtrNumber(e.target.value)}
                                                                className="w-full mt-2 p-3 bg-[#0e1c33] text-white rounded-md border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                                                placeholder="e.g. 238114571XX"
                                                            />
                                                        </div>

                                                        {renderError()}

                                                        <button
                                                            onClick={submitPaymentConfirmation}
                                                            disabled={!utrNumber.trim() || isSubmitting}
                                                            className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                        >
                                                            {isSubmitting ? (
                                                                <>
                                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg>
                                                                    Submitting...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                    </svg>
                                                                    Submit Payment Confirmation
                                                                </>
                                                            )}
                                                        </button>

                                                        <p className="text-sm text-blue-300 mt-4 text-center">
                                                            📩 We&apos;ll verify your payment and notify you at your registered email.
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Warning if no payment method selected */}
                                        {!selectedMethod && (
                                            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                                <div className="flex items-center gap-2 text-yellow-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                    </svg>
                                                    <span className="text-sm font-medium">Please select a payment method to continue</span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}