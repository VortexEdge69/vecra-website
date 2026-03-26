"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { name: "VPS Hosting", href: "/vps" },
        { name: "Web Hosting", href: "/web-hosting" },
        { name: "Domains", href: "/domains" },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-brand-bg/95 border-brand-border py-3 shadow-lg backdrop-blur-sm' : 'bg-transparent border-transparent py-5'
                }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <Image
                            src="/vecraSymbol.png"
                            alt="VecraHost Logo"
                            className="w-8 h-8"
                            width={32}
                            height={32}
                            priority
                        />
                        <span className="text-brand-text font-bold text-lg tracking-tight uppercase">VecraHost</span>
                    </Link>

                    {/* Nav Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${pathname === link.href ? 'text-brand-primary' : 'text-brand-muted hover:text-brand-text'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="w-px h-4 bg-brand-border mx-4" />
                        <a
                            href="https://portal.vecrahost.in"
                            className="btn-primary py-2 px-5 text-sm"
                        >
                            Client Portal
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-brand-text p-2 hover:bg-white/5 rounded-sm transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 pt-20 bg-brand-bg">
                    <div className="p-6 flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-xl font-semibold py-2 border-b border-brand-border ${pathname === link.href ? 'text-brand-primary' : 'text-brand-text'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href="https://portal.vecrahost.in"
                            className="btn-primary w-full text-center py-4 mt-6"
                        >
                            Client Portal
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}