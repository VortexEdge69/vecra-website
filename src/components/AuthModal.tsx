"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import Notification from "./Notification"
import { useUser } from "@/context/UserContext"
import CountryCodeSelector from "./CountryCodeSelector"
import { getDefaultCountry, formatPhoneNumber } from "@/lib/countryCodes"
import logger from '../lib/logger';

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
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry())
    const [errorMsg, setErrorMsg] = useState("")
    const [googleLoading, setGoogleLoading] = useState(false)
    const [emailLoading, setEmailLoading] = useState(false)
    const [showResendVerification, setShowResendVerification] = useState(false)
    const [redirectPath, setRedirectPath] = useState("/")
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
            setRedirectPath(window.location.pathname + window.location.search)
            setEmail("")
            setMobile("")
            setPassword("")
            setConfirmPassword("")
            setAgreedToTerms(false)
            setSelectedCountry(getDefaultCountry())
            setErrorMsg("")
            setShowResendVerification(false)
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
            setErrorMsg("Please fill in all fields.");
            return;
        }

        if (!agreedToTerms) {
            setErrorMsg("You must agree to the Terms and Conditions.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMsg("Please enter a valid email.");
            return;
        }

        if (!validateMobile(mobile)) {
            setErrorMsg(`Please enter a valid mobile number for ${selectedCountry.name}.`);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters.");
            return;
        }

        setEmailLoading(true);
        try {
            logger.log("Attempting signup with email:", email);
            const fullMobileNumber = formatPhoneNumber(selectedCountry.dialCode, mobile);
            const username = email.split('@')[0];

            // Only do the signup - let the trigger handle profile creation
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        mobile: fullMobileNumber,
                        country_code: selectedCountry.dialCode,
                        username: username,
                    }
                }
            });

            if (error) {
                logger.error("Signup error:", error);
                if (error.message.includes("already registered")) {
                    setErrorMsg("An account with this email already exists. Please try logging in instead.");
                    setMode("login");
                } else {
                    setErrorMsg(error.message);
                }
                return;
            }

            // Handle UI feedback
            if (data.user && !data.session) {
                showNotification("Please check your email for a confirmation link before signing in.", "info");
                window.location.href = '/email-verification';
            } else if (data.session) {
                setUser(data.user);
                showNotification("Account created successfully!");
                onLoginSuccess();
                onClose();
            }
        } catch (error) {
            logger.error("Unexpected signup error:", error);
            setErrorMsg("An unexpected error occurred. Please try again.");
        } finally {
            setEmailLoading(false);
        }
    }

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMsg("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMsg("Please enter a valid email.");
            return;
        }

        setEmailLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setErrorMsg(error.message);
                if (error.message.includes("Email not confirmed")) {
                    setShowResendVerification(true);
                }
                setEmailLoading(false);
                return;
            }

            // On successful login, redirect. The page will reload and pick up the new session.
            window.location.href = redirectPath;
        } catch (error) {
            logger.error("Login error:", error);
            setErrorMsg("An unexpected error occurred. Please try again.");
            setEmailLoading(false);
        }
    }

    const handleResendVerification = async () => {
        if (!email) {
            setErrorMsg("Please enter your email address first.");
            return;
        }

        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
            });

            if (error) {
                setErrorMsg(error.message);
            } else {
                showNotification("A new verification email has been sent.", "success");
                setShowResendVerification(false);
            }
        } catch (error) {
            logger.error("Resend verification error:", error);
            setErrorMsg("An unexpected error occurred. Please try again.");
        }
    };

    const handleSignInWithGoogle = async () => {
        setGoogleLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}${redirectPath}`,
                },
            });

            if (error) {
                logger.error("Google sign-in error:", error);
                setErrorMsg(error.message);
            }
        } catch (error) {
            logger.error("Unexpected Google sign-in error:", error);
            setErrorMsg("An unexpected error occurred during Google sign-in.");
        } finally {
            setGoogleLoading(false);
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
                            className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md mx-4 text-white shadow-xl max-h-[90vh] flex flex-col overflow-y-auto"
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
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="terms-agree"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="rounded bg-white/10 border-white/20 text-accent focus:ring-accent"
                                        />
                                        <label htmlFor="terms-agree" className="text-sm text-gray-400">
                                            I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Terms and Conditions</a>
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleSignup}
                                        disabled={emailLoading}
                                        className="w-full bg-accent hover:bg-[#005fcb] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center"
                                    >
                                        {emailLoading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : "Create Account"}
                                    </button>

                                    <div className="my-4 flex items-center">
                                        <div className="flex-grow border-t border-white/20"></div>
                                        <span className="mx-4 text-sm text-gray-400">OR</span>
                                        <div className="flex-grow border-t border-white/20"></div>
                                    </div>

                                    <button
                                        onClick={handleSignInWithGoogle}
                                        disabled={googleLoading}
                                        className="w-full bg-white hover:bg-gray-200 text-black py-3 rounded-lg font-semibold transition flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.8 0-5.18-1.88-6.04-4.42H2.03v2.84C3.86 20.98 7.64 23 12 23z" fill="#34A853"/>
                                            <path d="M5.96 14.05c-.23-.66-.36-1.36-.36-2.09s.13-1.43.36-2.09V7.03H2.03C1.37 8.41 1 10.14 1 12s.37 3.59 1.03 4.97l3.93-2.92z" fill="#FBBC05"/>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.64 1 3.86 3.02 2.03 6.29l3.93 2.92C6.82 7.26 9.2 5.38 12 5.38z" fill="#EA4335"/>
                                        </svg>
                                        {googleLoading ? "Signing in..." : "Sign up with Google"}
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
                                        disabled={emailLoading}
                                        className="w-full bg-accent hover:bg-[#005fcb] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center"
                                    >
                                        {emailLoading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : "Login"}
                                    </button>

                                    {showResendVerification && (
                                        <button
                                            onClick={handleResendVerification}
                                            className="w-full mt-2 text-sm text-accent hover:underline"
                                        >
                                            Resend verification email
                                        </button>
                                    )}

                                    <div className="my-4 flex items-center">
                                        <div className="flex-grow border-t border-white/20"></div>
                                        <span className="mx-4 text-sm text-gray-400">OR</span>
                                        <div className="flex-grow border-t border-white/20"></div>
                                    </div>

                                    <button
                                        onClick={handleSignInWithGoogle}
                                        disabled={googleLoading}
                                        className="w-full bg-white hover:bg-gray-100 text-black py-3 rounded-lg font-semibold transition flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.8 0-5.18-1.88-6.04-4.42H2.03v2.84C3.86 20.98 7.64 23 12 23z" fill="#34A853"/>
                                            <path d="M5.96 14.05c-.23-.66-.36-1.36-.36-2.09s.13-1.43.36-2.09V7.03H2.03C1.37 8.41 1 10.14 1 12s.37 3.59 1.03 4.97l3.93-2.92z" fill="#FBBC05"/>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.64 1 3.86 3.02 2.03 6.29l3.93 2.92C6.82 7.26 9.2 5.38 12 5.38z" fill="#EA4335"/>
                                        </svg>
                                        {googleLoading ? "Signing in..." : "Sign in with Google"}
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