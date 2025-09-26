"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function VerificationInProgressPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white px-6 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80 z-0" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-3xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl text-center space-y-8"
      >
        <div className="flex justify-center">
          <Image
            src="/assets/vecrahost-logofull.svg"
            alt="VecraHost Logo"
            className="w-28 h-auto"
            width={112}
            height={112}
            priority
          />
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">Verification In Progress</h1>

          <p className="text-gray-300 text-lg max-w-lg">
            Your payment is being verified. We&apos;ll notify you via email once the verification is complete.
          </p>

          <p className="text-sm text-gray-400">
            For any questions or complaints, contact us at
            <a
              href="mailto:support@vecrahost.in"
              className="text-blue-500 hover:underline ml-1"
            >
              support@vecrahost.in
            </a>
            .
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}