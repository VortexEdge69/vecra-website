"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
    question: string;
    answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl mb-4 overflow-hidden shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-medium focus:outline-none hover:text-accent transition-colors duration-200"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <span>{question}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key={`faq-content-${question.replace(/\s+/g, '-').toLowerCase()}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="px-6 pb-4 text-gray-300 text-sm leading-relaxed"
                        id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                        {answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 