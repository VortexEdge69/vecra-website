"use client";

import React from "react";
import { motion } from "framer-motion";

const HeroAnimation = () => {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center relative perspective-1000">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-brand-primary/5 blur-[100px] rounded-full transform translate-x-20 translate-y-20 pointer-events-none" />

            <div className="relative w-80 h-80 preserve-3d">

                {/* Central Server Stack - Smooth Floating Loop */}
                <motion.div
                    className="absolute inset-0 border border-brand-primary/30 rounded-2xl bg-brand-surface/20 backdrop-blur-sm"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                        rotateY: [10, -10, 10], // Simple sinusodial loop
                        rotateX: [5, -5, 5],
                        y: [-10, 10, -10]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Internal Layers */}
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute left-4 right-4 h-12 bg-gradient-to-r from-brand-border/50 to-brand-primary/10 border border-brand-primary/20 rounded-lg flex items-center px-4 justify-between"
                            style={{
                                top: `${20 + i * 70}px`,
                                transform: `translateZ(${20 * (i % 2 === 0 ? 1 : -1)}px)`
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.2 }}
                        >
                            <div className="flex gap-2">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-brand-primary"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                                />
                                <div className="w-2 h-2 rounded-full bg-brand-border" />
                            </div>
                            <div className="h-1 w-12 bg-brand-primary/20 rounded-full" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Orbiting Satellite Nodes - Rotating Container Method (Smoother) */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[0, 1, 2].map((i) => (
                        <div
                            key={`sat-${i}`}
                            className="absolute w-12 h-12"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 120}deg) translate(140px) rotate(-${i * 120}deg)` // Initial position
                            }}
                        >
                            {/* Counter-rotate individual items to keep them upright if desired, or let them spin. Let's keep them spinning with the container for a satellite vibe but update position relative to center */}
                            {/* Actually, to animate properly: */}
                            <motion.div
                                className="w-12 h-12 bg-brand-surface border border-brand-border rounded-xl shadow-xl flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                                // Counter rotation to keep icons upright
                                animate={{ rotateZ: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-brand-primary rounded-sm" />
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* Floating Data Particles - Fading out to avoid hard reset */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={`p-${i}`}
                        className="absolute w-1 h-1 bg-brand-primary rounded-full"
                        initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 300], // Start near center, move out
                            y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 300],
                            z: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 200]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeOut"
                        }}
                        style={{ left: '50%', top: '50%' }}
                    />
                ))}

            </div>
        </div>
    );
};

export default HeroAnimation;
