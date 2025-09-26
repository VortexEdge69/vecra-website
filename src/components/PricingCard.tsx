"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface PricingCardProps {
    id: string;
    title: string;
    price: string;
    features: string[];
    highlighted?: boolean;
    icon?: React.ReactNode;
    type: "minecraft" | "vps";
}

export default function PricingCard({
    id,
    title,
    price,
    features,
    highlighted = false,
    icon,
    type
}: PricingCardProps) {
    const router = useRouter();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:shadow-accent/30 transition-all duration-300 h-full ${highlighted ? "border-accent scale-[1.03] ring-1 ring-accent/20" : ""
                }`}>
                <div className="space-y-4">
                    {/* Icon */}
                    <div className="text-accent text-4xl">
                        {icon || (
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        )}
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-semibold">{title}</h3>

                    {/* Price */}
                    <p className="text-4xl font-bold text-accent">{price}</p>

                    {/* Feature List */}
                    <ul className="text-sm text-gray-300 space-y-2">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                                <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <div className="mt-6">
                    <button
                        onClick={() => router.push(`/checkout?plan=${id}`)}
                        className="block text-center w-full py-3 px-4 bg-accent text-white font-semibold rounded-lg hover:bg-[#005fcb] transition-colors duration-200"
                    >
                        {type === "minecraft" ? "Get Started" : "Buy Now"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}