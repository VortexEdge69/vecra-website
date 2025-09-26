"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PaymentProcessingPage() {
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
          
          <h1 className="text-3xl md:text-4xl font-bold">Payment Processing</h1>
          
          <p className="text-gray-300 text-lg max-w-lg">
            Your payment is being processed. We&apos;ll notify you via email once your account is activated.
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
          
          <div className="w-full max-w-md bg-white/10 rounded-lg p-6 mt-4">
            <h3 className="text-xl font-semibold mb-4">What happens next?</h3>
            <ul className="text-left space-y-3 text-gray-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Our team will verify your payment details</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>You&apos;ll receive a confirmation email once verified</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Your server will be set up and ready to use</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link 
              href="/dashboard"
              className="px-6 py-3 bg-accent text-white font-semibold rounded-xl shadow-md hover:bg-[#005fcb] transition duration-300"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/"
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition duration-300"
            >
              Return to Home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}