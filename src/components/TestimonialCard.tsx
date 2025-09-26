"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialCardProps {
    avatar: string;
    name: string;
    role: string;
    quote: string;
}

export default function TestimonialCard({ avatar, name, role, quote }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-accent/30 transition-all duration-300 h-full"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full border border-white/20 overflow-hidden bg-gray-700 flex items-center justify-center">
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-white font-semibold text-lg">
                            {name.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
                <div>
                    <h4 className="font-semibold text-white">{name}</h4>
                    <p className="text-xs text-gray-400">{role}</p>
                </div>
            </div>

            <p className="text-gray-300 text-sm italic leading-relaxed">
                &ldquo;{quote}&rdquo;
            </p>
        </motion.div>
    );
} 