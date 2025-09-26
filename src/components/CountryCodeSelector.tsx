"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { countryCodes, CountryCode } from "@/lib/countryCodes"

interface CountryCodeSelectorProps {
    selectedCountry: CountryCode
    onCountryChange: (country: CountryCode) => void
    className?: string
}

export default function CountryCodeSelector({
    selectedCountry,
    onCountryChange,
    className = ""
}: CountryCodeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setSearchTerm("")
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Filter countries based on search term
    const filteredCountries = countryCodes.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dialCode.includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleCountrySelect = (country: CountryCode) => {
        onCountryChange(country)
        setIsOpen(false)
        setSearchTerm("")
    }

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Selected Country Display */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white hover:bg-white/20 transition-colors duration-200 min-w-[120px]"
            >
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-80 max-h-64 bg-[#1a1d24]/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="p-3 border-b border-white/10">
                            <input
                                type="text"
                                placeholder="Search countries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#0e1013]/80 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                                autoFocus
                            />
                        </div>

                        {/* Countries List */}
                        <div className="max-h-48 overflow-y-auto">
                            {filteredCountries.length === 0 ? (
                                <div className="p-4 text-center text-gray-400 text-sm">
                                    No countries found
                                </div>
                            ) : (
                                filteredCountries.map((country) => (
                                    <button
                                        key={country.code}
                                        onClick={() => handleCountrySelect(country)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-150 ${selectedCountry.code === country.code ? 'bg-accent/20 text-accent' : 'text-white'
                                            }`}
                                    >
                                        <span className="text-lg">{country.flag}</span>
                                        <div className="flex-1">
                                            <div className="font-medium">{country.name}</div>
                                            <div className="text-sm text-gray-400">{country.dialCode}</div>
                                        </div>
                                        {selectedCountry.code === country.code && (
                                            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 