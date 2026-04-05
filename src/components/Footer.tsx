"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [honey, setHoney] = useState("");
    const [otp, setOtp] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Form-level honeypot check
        if (honey) {
            setMessage({ type: 'success', text: 'Verification code sent! Please check your email.' });
            setEmail("");
            setHoney("");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-requested-with': 'vecra-client'
                },
                body: JSON.stringify({ email, firstName: honey, action: 'request-otp' })
            });

            const data = await res.json();

            if (res.ok) {
                setIsVerifying(true);
                setMessage({ type: 'success', text: 'Verification code sent! Check your inbox.' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to send verification code.' });
            }
        } catch (error) {
            console.error('Newsletter OTP request error:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setMessage({ type: 'error', text: 'Please enter a valid 6-digit code.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-requested-with': 'vecra-client'
                },
                body: JSON.stringify({ email, otp, action: 'verify-otp' })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Successfully subscribed! Welcome aboard.' });
                setEmail("");
                setOtp("");
                setIsVerifying(false);
            } else {
                setMessage({ type: 'error', text: data.error || 'Verification failed.' });
            }
        } catch (error) {
            console.error('Newsletter verification error:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="w-full bg-brand-bg border-t border-brand-border py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
                {/* Brand Section */}
                <div className="col-span-1 md:col-span-1 space-y-6">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <Image
                            src="/vecraSymbol.png"
                            alt="VecraHost"
                            className="w-8 h-8"
                            width={32}
                            height={32}
                        />
                        <span className="font-bold text-xl tracking-tight uppercase">VecraHost</span>
                    </Link>
                    <p className="text-brand-muted text-sm leading-relaxed">
                        High-performance cloud infrastructure and transparent hosting solutions engineered for reliability and scale.
                    </p>
                </div>

                {/* Products */}
                <div className="space-y-6">
                    <h4 className="text-sm font-bold text-brand-text uppercase tracking-widest">Solutions</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/vps" className="text-brand-muted hover:text-brand-primary transition-colors">VPS Hosting</Link></li>
                        <li><Link href="/web-hosting" className="text-brand-muted hover:text-brand-primary transition-colors">Web Hosting</Link></li>
                        <li><Link href="/domains" className="text-brand-muted hover:text-brand-primary transition-colors">Domain Names</Link></li>
                    </ul>
                </div>

                {/* Company & Support */}
                <div className="space-y-6">
                    <h4 className="text-sm font-bold text-brand-text uppercase tracking-widest">Resources</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/contactus" className="text-brand-muted hover:text-brand-primary transition-colors">Support Center</Link></li>
                        <li><a href="https://portal.vecrahost.in" className="text-brand-muted hover:text-brand-primary transition-colors">Billing Portal</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="space-y-6">
                    <h4 className="text-sm font-bold text-brand-text uppercase tracking-widest">Legal</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/terms-of-service" className="text-brand-muted hover:text-brand-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/privacy-policy" className="text-brand-muted hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/refund-and-cancellation-policy" className="text-brand-muted hover:text-brand-primary transition-colors">Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Payment Methods */}
                <div className="space-y-6">
                    <h4 className="text-sm font-bold text-brand-text uppercase tracking-widest">Payments</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-brand-muted opacity-70">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                                <rect x="1" y="5" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
                                <path d="M1 8h18" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            <span className="text-xs">UPI</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-muted opacity-70">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                                <rect x="1" y="5" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
                                <path d="M1 8h18" stroke="currentColor" strokeWidth="1" />
                            </svg>
                            <span className="text-xs">Cards</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-muted opacity-70">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                                <path d="M3 17h14M4 17V9M7 17V9M10 17V9M13 17V9M16 17V9M10 3l7 5H3l7-5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            </svg>
                            <span className="text-xs">Net Banking</span>
                        </div>
                        <p className="text-xs text-brand-muted/60 mt-4 leading-relaxed">Secure payment processing for Indian customers</p>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-brand-border">
                <div className="max-w-xl">
                    <h4 className="text-sm font-bold text-brand-text uppercase tracking-widest mb-3">Stay Updated</h4>
                    <p className="text-brand-muted text-sm mb-6">Subscribe to receive product updates, infrastructure announcements, and exclusive offers.</p>

                    {!isVerifying ? (
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <div className="hidden" aria-hidden="true">
                                <input
                                    type="text"
                                    name="firstName"
                                    tabIndex={-1}
                                    value={honey}
                                    onChange={(e) => setHoney(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                disabled={loading}
                                className="flex-1 px-4 py-3 bg-brand-surface border border-brand-border text-brand-text text-sm focus:outline-none focus:border-brand-primary transition-colors disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary py-3 px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {loading ? 'Sending Code...' : 'Subscribe'}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-3">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="Enter 6-digit code"
                                    required
                                    disabled={loading}
                                    className={`flex-1 w-full px-4 py-3 bg-brand-surface border border-brand-primary text-brand-text text-sm focus:outline-none focus:border-brand-primary transition-all font-mono text-center disabled:opacity-50 ${otp ? 'tracking-[0.5em] font-bold' : 'tracking-normal'}`}
                                />
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary flex-1 sm:flex-none py-3 px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                    >
                                        {loading ? 'Verifying...' : 'Verify & Subscribe'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setIsVerifying(false); setMessage(null); }}
                                        className="text-brand-muted hover:text-brand-text text-[10px] uppercase tracking-widest font-bold px-2 whitespace-nowrap transition-colors"
                                    >
                                        Change Email
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {message && (
                        <div className={`mt-4 flex items-center gap-2 p-3 ${message.type === 'success' ? 'bg-green-500/10 border-l-2 border-green-500' : 'bg-red-500/10 border-l-2 border-red-500'}`}>
                            {message.type === 'success' ? (
                                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            <p className={`text-xs font-bold ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message.text}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-border">
                <p className="text-xs text-brand-muted text-center">
                    © {new Date().getFullYear()} VecraHost. All rights reserved.
                </p>
            </div>
        </footer>
    );
}