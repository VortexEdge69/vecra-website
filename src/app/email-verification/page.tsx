'use client'
import { motion } from 'framer-motion'

export default function EmailVerificationPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
            <motion.div
                className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                >
                    <svg className="w-24 h-24 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </motion.div>
                <h1 className="text-3xl font-bold mt-6 mb-2">Check Your Inbox</h1>
                <p className="text-gray-400 mb-6">
                    We&apos;ve sent a verification link to your email address. Please click the link to complete your registration.
                </p>
                <motion.div
                    className="w-full bg-gray-700 rounded-full h-2.5 mb-4"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                >
                    <div className="bg-green-400 h-2.5 rounded-full"></div>
                </motion.div>
            </motion.div>
        </div>
    )
}