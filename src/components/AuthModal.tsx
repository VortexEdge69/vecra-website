"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import Notification from "./Notification"
import { useUser } from "@/context/UserContext"
import CountryCodeSelector from "./CountryCodeSelector"
import { getDefaultCountry, formatPhoneNumber } from "@/lib/countryCodes"

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: {
    isOpen: boolean
    onClose: () => void
    onLoginSuccess: () => void
}) {
    const { setUser } = useUser()
    const [mode, setMode] = useState<"login" | "signup">("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry())
    const [errorMsg, setErrorMsg] = useState("")
    const [notification, setNotification] = useState<{
        message: string
        type: "success" | "error" | "info"
        isVisible: boolean
    }>({
        message: "",
        type: "success",
        isVisible: false
    })

    useEffect(() => {
        if (isOpen) {
            setEmail("")
            setMobile("")
            setPassword("")
            setConfirmPassword("")
            setSelectedCountry(getDefaultCountry())
            setErrorMsg("")
            setNotification(prev => ({ ...prev, isVisible: false }))
        }
    }, [isOpen])

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validateMobile = (mobile: string) => {
        // For India, validate 10 digits
        if (selectedCountry.code === 'IN') {
            const mobileRegex = /^\d{10}$/
            return mobileRegex.test(mobile)
        }
        // For other countries, allow 7-15 digits
        const mobileRegex = /^\d{7,15}$/
        return mobileRegex.test(mobile)
    }

    const showNotification = (message: string, type: "success" | "error" | "info" = "success") => {
        setNotification({
            message,
            type,
            isVisible: true
        })
    }

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword || !mobile) {
            setErrorMsg("Please fill in all fields.")
            return
        }

        if (!validateEmail(email)) {
            setErrorMsg("Please enter a valid email.")
            return
        }

        if (!validateMobile(mobile)) {
            setErrorMsg(`Please enter a valid mobile number for ${selectedCountry.name}.`)
            return
        }

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match.")
            return
        }

        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters.")
            return
        }

        // Use Supabase authentication
        try {
            console.log("Attempting signup with email:", email, "mobile:", mobile)

            // First try signup without metadata to avoid database errors
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            })

            console.log("Signup response:", { data, error })

            if (error) {
                console.error("Signup error:", error)

                // Provide more helpful error messages
                if (error.message.includes("Database error")) {
                    setErrorMsg("Database configuration issue. Please contact support or try again later.")
                } else if (error.message.includes("already registered") || error.message.includes("User already registered")) {
                    setErrorMsg("An account with this email already exists. Please try logging in instead.")
                    // Automatically switch to login mode
                    setMode("login")
                    showNotification("Switched to login mode. Please enter your password.", "info")
                } else if (error.message.includes("Invalid email")) {
                    setErrorMsg("Please enter a valid email address.")
                } else {
                    setErrorMsg(error.message)
                }
                return
            }

            // Check if email confirmation is required
            if (data.user && !data.session) {
                showNotification("Please check your email for a confirmation link before signing in.", "info")
                return
            }

            // If we have a session, user is automatically signed in
            if (data.session && data.user) {
                console.log("User created successfully:", data.user.email)

                // Always update the user metadata with mobile number
                try {
                    const fullMobileNumber = formatPhoneNumber(selectedCountry.dialCode, mobile)
                    const { error: updateError } = await supabase.auth.updateUser({
                        data: {
                            mobile: fullMobileNumber,
                            countryCode: selectedCountry.dialCode,
                            username: email.split('@')[0]
                        }
                    })

                    if (updateError) {
                        console.log("Failed to update user metadata:", updateError)
                    } else {
                        console.log("User metadata updated successfully")
                    }

                    // Always upsert the profile (robust fix)
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .upsert({
                            id: data.user.id,
                            email: data.user.email,
                            mobile: fullMobileNumber,
                            username: email.split('@')[0]
                        })

                    if (profileError) {
                        console.error("Profile upsert error details:", profileError)
                        if (profileError.code === '42501') {
                            setErrorMsg("Permission denied. Please contact support to fix database permissions.")
                        } else if (profileError.code === '23505') {
                            setErrorMsg("Profile already exists. Please try logging in instead.")
                        } else {
                            setErrorMsg(`Failed to save mobile number: ${profileError.message}`)
                        }
                        return
                    } else {
                        console.log("Profile updated successfully")
                    }
                } catch (updateError) {
                    setErrorMsg("Failed to save mobile number. Please contact support.")
                    console.log("Error updating user metadata:", updateError)
                    return
                }

                setUser(data.user)
                showNotification("Account created successfully!")
                onLoginSuccess()
                onClose()
            } else if (data.user) {
                // If user is created but not logged in (email confirmation required), still upsert profile
                try {
                    const fullMobileNumber = formatPhoneNumber(selectedCountry.dialCode, mobile)
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .upsert({
                            id: data.user.id,
                            email: data.user.email,
                            mobile: fullMobileNumber,
                            username: email.split('@')[0]
                        })
                    if (profileError) {
                        console.error("Profile upsert error details:", profileError)
                        if (profileError.code === '42501') {
                            setErrorMsg("Permission denied. Please contact support to fix database permissions.")
                        } else if (profileError.code === '23505') {
                            setErrorMsg("Profile already exists. Please try logging in instead.")
                        } else {
                            setErrorMsg(`Failed to save mobile number: ${profileError.message}`)
                        }
                        return
                    } else {
                        console.log("Profile updated successfully (pending email confirmation)")
                    }
                } catch (updateError) {
                    setErrorMsg("Failed to save mobile number. Please contact support.")
                    console.log("Error updating user metadata:", updateError)
                    return
                }
                showNotification("Please check your email for a confirmation link before signing in.", "info")
                return
            }
        } catch (error) {
            console.error("Unexpected signup error:", error)
            setErrorMsg("An unexpected error occurred. Please try again.")
        }
    }

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMsg("Please fill in all fields.")
            return
        }

        if (!validateEmail(email)) {
            setErrorMsg("Please enter a valid email.")
            return
        }

        // Use Supabase authentication
        try {
            console.log("Attempting login with email:", email)

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                console.error("Login error:", error)
                setErrorMsg(error.message)
                return
            }

            console.log("Login successful, getting session")

            // Get the current session to set the user
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user) {
                console.log("Setting user in context:", session.user.email)
                setUser(session.user)
            }

            showNotification("Logged in successfully!")
            onLoginSuccess()
            onClose()
        } catch (error) {
            console.error("Unexpected login error:", error)
            setErrorMsg("An unexpected error occurred. Please try again.")
        }
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="auth-modal"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md mx-4 text-white shadow-xl"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                        >
                            <div className="flex justify-between mb-4">
                                <h2 className="text-xl font-bold">
                                    {mode === "login" ? "Login to Continue" : "Create an Account"}
                                </h2>
                                <button onClick={onClose} className="text-white hover:text-accent">&times;</button>
                            </div>

                            <div className="mb-4 space-x-2">
                                <button
                                    onClick={() => setMode("login")}
                                    className={`px-4 py-2 rounded-lg ${mode === "login" ? "bg-accent text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setMode("signup")}
                                    className={`px-4 py-2 rounded-lg ${mode === "signup" ? "bg-accent text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {errorMsg && (
                                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                    {errorMsg}
                                </div>
                            )}

                            {mode === "signup" ? (
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                                    />
                                    <div className="flex gap-2">
                                        <CountryCodeSelector
                                            selectedCountry={selectedCountry}
                                            onCountryChange={setSelectedCountry}
                                        />
                                        <input
                                            type="tel"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            placeholder={selectedCountry.code === 'IN' ? "10-digit mobile number" : "Mobile number"}
                                            className="flex-1 bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                                        />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                                    />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                                    />
                                    <button
                                        onClick={handleSignup}
                                        className="w-full bg-accent hover:bg-[#005fcb] text-white py-3 rounded-lg font-semibold transition"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                                    />
                                    <button
                                        onClick={handleLogin}
                                        className="w-full bg-accent hover:bg-[#005fcb] text-white py-3 rounded-lg font-semibold transition"
                                    >
                                        Login
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notification */}
            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
            />
        </>
    )
} 