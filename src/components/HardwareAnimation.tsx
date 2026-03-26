"use client";

import React from "react";
import { motion } from "framer-motion";

const HardwareAnimation = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden flex items-center justify-center bg-brand-surface/30 border border-brand-border rounded-xl backdrop-blur-sm group">
            {/* Dynamic Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Abstract Grid - Minimal */}
            <div className="absolute inset-x-0 bottom-0 h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Central "Core" - Represents your startup app/server */}
            <div className="relative z-10 flex items-center justify-center">
                {/* Pulsing Ripples */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-brand-primary/30"
                        initial={{ width: "100%", height: "100%", opacity: 0.8 }}
                        animate={{
                            width: ["100%", "250%"],
                            height: ["100%", "250%"],
                            opacity: [0.5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 1, // Staggered delays
                            ease: "easeOut"
                        }}
                        style={{ width: 80, height: 80 }}
                    />
                ))}

                {/* Main Icon/Logo Container */}
                <motion.div
                    className="w-20 h-20 md:w-24 md:h-24 bg-brand-bg border border-brand-primary/50 text-brand-primary rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,118,254,0.15)] relative z-20"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Simple Abstract "App" Icon */}
                    <svg className="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_8px_rgba(0,118,254,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>

                    {/* Corner Accents */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-brand-primary/50 rounded-tl-sm" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-brand-primary/50 rounded-tr-sm" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-brand-primary/50 rounded-bl-sm" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-brand-primary/50 rounded-br-sm" />
                </motion.div>
            </div>

            {/* Connection Lines (Nodes) - Representing scale/users */}
            {/* Node 1 */}
            <motion.div
                className="absolute md:top-1/4 top-1/3 md:left-1/4 left-10"
                animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0 }}
            >
                <div className="w-3 h-3 bg-brand-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-brand-primary/30">
                    <div className="w-1 h-1 bg-brand-primary/80 rounded-full" />
                </div>
            </motion.div>

            {/* Node 2 */}
            <motion.div
                className="absolute md:bottom-1/3 bottom-1/4 md:right-1/4 right-10"
                animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            >
                <div className="w-4 h-4 bg-brand-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-brand-primary/30">
                    <div className="w-1.5 h-1.5 bg-brand-primary/80 rounded-full" />
                </div>
            </motion.div>

            {/* Status Badge */}
            <div className="absolute bottom-4 left-6 flex items-center gap-3 px-3 py-1.5 bg-brand-bg/50 backdrop-blur-md border border-brand-border rounded-full shadow-sm">
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-medium text-brand-text/80 tracking-wide uppercase">Systems Operational</span>
                </div>
            </div>

        </div>
    );
};

export default HardwareAnimation;
