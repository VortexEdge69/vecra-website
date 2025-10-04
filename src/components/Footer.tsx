import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-white/5 backdrop-blur-md border-t border-white/10 text-white py-10 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Logo & Name */}
                <div className="flex items-center space-x-3">
                    <Image
                        src="/assets/vecrahost-logo.svg"
                        alt="VecraHost"
                        className="w-8 h-8"
                        width={32}
                        height={32}
                    />
                    <span className="font-semibold text-lg">VecraHost</span>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                    <a href="#minecraft-hosting" className="hover:text-accent transition-colors duration-200">
                        Minecraft Hosting
                    </a>
                    <a href="#vps-hosting" className="hover:text-accent transition-colors duration-200">
                        VPS Hosting
                    </a>
                    {/* <a
                        href="https://store.vortexedge.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors duration-200"
                    >
                        Store
                    </a> */}
                    <a
                        href="/terms-of-service"
                        className="hover:text-accent transition-colors duration-200"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="/refund-and-cancellation-policy"
                        className="hover:text-accent transition-colors duration-200"
                    >
                        Refund & Cancellation Policy
                    </a>
                    <a
                        href="/privacy-policy"
                        className="hover:text-accent transition-colors duration-200"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="/contactus"
                        className="hover:text-accent transition-colors duration-200"
                    >
                        Contact Us
                    </a>
                    <a
                        href="https://panel.vecrahost.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors duration-200"
                    >
                        Panel
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-xs text-gray-500 text-center md:text-right">
                    © {new Date().getFullYear()} Vecra Host · All rights reserved.
                </div>
            </div>
        </footer>
    );
}