"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [honey, setHoney] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Form-level honeypot check (redundant but good for UX if needed)
        if (honey) {
            setMessage({ type: 'success', text: 'Successfully subscribed! Check your email.' });
            setEmail("");
            setHoney("");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, firstName: honey })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Successfully subscribed! Check your email.' });
                setEmail("");
            } else {
                setMessage({ type: 'error', text: data.error || 'Subscription failed. Please try again.' });
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
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
                            {loading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>

                    {message && (
                        <p className={`mt-3 text-xs font-bold ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message.text}
                        </p>
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