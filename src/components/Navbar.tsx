"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
    const { user } = useUser();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setMobileMenuOpen(false);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md transition-all duration-300 ${isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-5'
                }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/assets/vecrahost-logo.svg"
                            alt="VecraHost Logo"
                            className="w-10 h-auto"
                            width={40}
                            height={40}
                            priority
                        />
                        <span className="text-white font-bold text-xl">VecraHost</span>
                    </div>

                    {/* Nav Links - desktop only */}
                    <div className="hidden md:flex space-x-6">
                        <a
                            href="#minecraft-hosting"
                            onClick={(e) => handleSmoothScroll(e, 'minecraft-hosting')}
                            className="text-white hover:text-accent transition-colors duration-200 font-medium"
                        >
                            Minecraft Hosting
                        </a>
                        <a
                            href="#vps-hosting"
                            onClick={(e) => handleSmoothScroll(e, 'vps-hosting')}
                            className="text-white hover:text-accent transition-colors duration-200 font-medium"
                        >
                            VPS Hosting
                        </a>
                        {/* <a
                            href="https://store.vortexedge.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-accent transition-colors duration-200 font-medium"
                        >
                            Store
                        </a> */}
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-white text-sm">
                                    Hi, {user.email?.split('@')[0]}
                                </span>
                                <button
                                    onClick={handleSignOut}
                                    className="text-white hover:text-accent transition-colors duration-200 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <a
                                href="https://panel.vecrahost.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-accent transition-colors duration-200 font-medium "
                            >
                                Panel
                            </a>
                        )}
                    </div>

                    {/* Hamburger - mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white hover:text-accent transition-colors duration-200 p-2"
                            aria-label="Toggle mobile menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
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
                <div className="md:hidden fixed top-16 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg z-40 animate-slide-down">
                    <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
                        <a
                            onClick={(e) => handleSmoothScroll(e, 'minecraft-hosting')}
                            className="block text-white hover:text-accent transition-colors duration-200 font-medium py-2"
                        >
                            Minecraft Hosting
                        </a>
                        <a
                            onClick={(e) => handleSmoothScroll(e, 'vps-hosting')}
                            className="block text-white hover:text-accent transition-colors duration-200 font-medium py-2"
                        >
                            VPS Hosting
                        </a>
                        {/* <a
                            href="https://store.vortexedge.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-white hover:text-accent transition-colors duration-200 font-medium py-2"
                        >
                            Store
                        </a> */}
                        {user ? (
                            <>
                                <div className="text-white text-sm py-2">
                                    Hi, {user.email?.split('@')[0]}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="block text-white hover:text-accent transition-colors duration-200 font-medium py-2 w-full text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <a
                                href="https://dashboard.vecrahost.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-white hover:text-accent transition-colors duration-200 font-medium py-2"
                            >
                                Login
                            </a>
                        )}
                    </div>
                </div>
            )}
        </>
    );
} 