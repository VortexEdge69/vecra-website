"use client"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NotificationProps {
    message: string
    type?: "success" | "error" | "info"
    isVisible: boolean
    onClose: () => void
    duration?: number
}

export default function Notification({
    message,
    type = "success",
    isVisible,
    onClose,
    duration = 3000
}: NotificationProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [isVisible, duration, onClose])

    const getIcon = () => {
        switch (type) {
            case "success":
                return (
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                )
            case "error":
                return (
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                )
            case "info":
                return (
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                )
            default:
                return null
        }
    }

    const getBorderColor = () => {
        switch (type) {
            case "success":
                return "border-green-400/20"
            case "error":
                return "border-red-400/20"
            case "info":
                return "border-blue-400/20"
            default:
                return "border-white/10"
        }
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`fixed bottom-6 right-6 z-50 bg-white/5 backdrop-blur-lg border ${getBorderColor()} rounded-lg p-4 shadow-xl max-w-sm`}
                >
                    <div className="flex items-center gap-3">
                        {getIcon()}
                        <p className="text-white text-sm font-medium">{message}</p>
                        <button
                            onClick={onClose}
                            className="ml-auto text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 