"use client";
import { motion } from "framer-motion";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-accent/30 transition-all duration-300 h-full"
        >
            {/* Icon */}
            <div className="text-accent text-4xl mb-4">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
} 