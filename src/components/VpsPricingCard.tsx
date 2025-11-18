"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface VpsPlan {
  id: string;
  name: string;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth?: string;
    ip?: string;
    support?: string;
  };
  monthlyPrice: number;
  yearlyPrice: number; // 1-year price
  twoYearPrice: number; // 2-year price
  isOutOfStock?: boolean;
  isBestValue?: boolean;
  icon: React.ReactNode;
}

interface VpsPricingCardProps {
  plan: VpsPlan;
  selectedDuration: "monthly" | "yearly" | "twoYear";
}

export default function VpsPricingCard({ plan, selectedDuration }: VpsPricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Primary per-month price (displayed big)
  const getPrimaryMonthly = () => {
    switch (selectedDuration) {
      case "monthly":
        return plan.monthlyPrice;
      case "yearly":
        return Math.round(plan.yearlyPrice / 12);
      case "twoYear":
        return Math.round(plan.twoYearPrice / 24);
      default:
        return plan.monthlyPrice;
    }
  };

  const getSavingsPercentage = () => {
    const monthlyTotal = plan.monthlyPrice * (selectedDuration === "yearly" ? 12 : 24);
    const discountedTotal = selectedDuration === "yearly" ? plan.yearlyPrice : plan.twoYearPrice;
    return Math.round(((monthlyTotal - discountedTotal) / monthlyTotal) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Best Value Ribbon */}
      {plan.isBestValue && selectedDuration === "twoYear" && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          BEST VALUE
        </div>
      )}

      {/* Savings Badge */}
      {selectedDuration !== "monthly" && (
        <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
          Save {getSavingsPercentage()}%
        </div>
      )}

      <div className={`
        bg-white/5 backdrop-blur-lg border rounded-2xl shadow-xl p-6 flex flex-col justify-between h-full
        transition-all duration-300
        ${plan.isBestValue && selectedDuration === "twoYear" 
          ? 'border-accent/50 shadow-accent/20' 
          : 'border-white/10'
        }
        ${isHovered ? 'transform scale-105' : ''}
      `}>
        {/* Plan Header */}
        <div className="space-y-4">
          <div className="text-accent text-4xl">
            {plan.icon}
          </div>
          
          <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>

      {/* Pricing: Big per-month, small total */}
      <div className="space-y-2">
        <p className="text-5xl font-extrabold text-accent">
          ₹{getPrimaryMonthly()}
          <span className="text-lg text-gray-400 ml-2">per month</span>
        </p>
        {selectedDuration === "yearly" && (
          <p className="text-sm text-gray-400">Total for 1 year: ₹{plan.yearlyPrice}</p>
        )}
        {selectedDuration === "twoYear" && (
          <p className="text-sm text-gray-400">Total for 2 years: ₹{plan.twoYearPrice}</p>
        )}
      </div>

          {/* Specs */}
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-center">
              <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {plan.specs.cpu}
            </li>
            <li className="flex items-center">
              <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {plan.specs.ram}
            </li>
            <li className="flex items-center">
              <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {plan.specs.storage}
            </li>
            {plan.specs.bandwidth && (
              <li className="flex items-center">
                <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {plan.specs.bandwidth}
              </li>
            )}
            {plan.specs.ip && (
              <li className="flex items-center">
                <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {plan.specs.ip}
              </li>
            )}
            {plan.specs.support && (
              <li className="flex items-center">
                <svg className="text-green-400 w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {plan.specs.support}
              </li>
            )}
          </ul>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          {plan.isOutOfStock ? (
            <button
              disabled
              className="w-full py-3 px-4 bg-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : (
            <Link
              href={`/checkout?plan=${plan.id}&duration=${selectedDuration}`}
              className="block w-full py-3 px-4 bg-accent text-white font-semibold rounded-lg hover:bg-[#005fcb] transition-colors duration-200 text-center"
            >
              Get This Plan
            </Link>
          )}
        </div>

        {/* Save More Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Save more when you subscribe for longer terms
          </p>
        </div>
      </div>
    </motion.div>
  );
}