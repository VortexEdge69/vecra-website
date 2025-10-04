"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"
import CountryCodeSelector from "@/components/CountryCodeSelector"
import { getDefaultCountry, formatPhoneNumber } from "@/lib/countryCodes"
import Image from "next/image"
import Link from "next/link"
import logger from '@/lib/logger'

export default function FreeTrialPage() {
  const router = useRouter()
  const { user, loading: userLoading } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(getDefaultCountry())
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState("")
  const [trialStatus, setTrialStatus] = useState<"available" | "utilized" | "checking">("checking")

  // Check if user already has a free trial
  useEffect(() => {
    const checkExistingTrial = async () => {
      if (userLoading) return
      
      if (user) {
        try {
          // Check if user already has a trial
          const { data, error } = await supabase
            .from('free_trials')
            .select('trial_status')
            .eq('user_id', user.id)
            .single()
          
          if (error && error.code !== 'PGRST116') {
            logger.error("Error checking trial status:", error)
            setErrorMsg("Failed to check trial eligibility. Please try again.")
          }
          
          if (data) {
            setTrialStatus("utilized")
          } else {
            setTrialStatus("available")
          }
        } catch (error) {
          logger.error("Unexpected error checking trial status:", error)
          setErrorMsg("An unexpected error occurred. Please try again.")
        }
      } else {
        setTrialStatus("available")
      }
    }
    
    checkExistingTrial()
  }, [user, userLoading])

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateMobile = (mobile: string) => {
    return mobile.length >= 10
  }

  const handleSignup = async (e: React.FormEvent) => {
    // Prevent default form submission
    if (e) e.preventDefault();
    
    if (!email || !password || !confirmPassword || !mobile) {
      setErrorMsg("Please fill in all fields.")
      return
    }

    if (!agreedToTerms) {
      setErrorMsg("You must agree to the Terms and Conditions.")
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

    setIsLoading(true)
    try {
      logger.log("Attempting signup with email:", email)
      const fullMobileNumber = formatPhoneNumber(selectedCountry.dialCode, mobile)
      const username = email.split('@')[0]

      // Check if user already exists
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (existingUser?.user) {
        // User exists, check if they already have a trial
        const { data: existingTrial } = await supabase
          .from('free_trials')
          .select('trial_status')
          .eq('user_id', existingUser.user.id)
          .single()
        
        if (existingTrial) {
          setErrorMsg("Free Trial Already Utilized. Please check our paid plans.")
          setTrialStatus("utilized")
          setIsLoading(false)
          return
        }
        
        // User exists but no trial yet, proceed with OTP verification
        setShowOtpInput(true)
        // TODO: Implement OTP sending via Supabase
        setSuccessMsg("Please enter the OTP sent to your mobile number.")
        setIsLoading(false)
        return
      }

      // New user, proceed with signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            mobile: fullMobileNumber,
            country_code: selectedCountry.dialCode,
            username: username,
          }
        }
      })

      if (error) {
        logger.error("Signup error:", error)
        if (error.message.includes("already registered")) {
          setErrorMsg("An account with this email already exists. Please try logging in.")
        } else {
          setErrorMsg(error.message)
        }
        return
      }

      // Show OTP verification screen
      setShowOtpInput(true)
      // TODO: Implement OTP sending via Supabase
      setSuccessMsg("Please enter the OTP sent to your mobile number.")
      
    } catch (error) {
      logger.error("Unexpected signup error:", error)
      setErrorMsg("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (!otp || otp.length < 6) {
      setErrorMsg("Please enter a valid OTP.")
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement OTP verification via Supabase
      
      // For now, simulate successful verification
      // In production, this would be replaced with actual OTP verification
      
      // Create free trial entry
      const { error: trialError } = await supabase
        .from('free_trials')
        .insert({
          user_id: user?.id,
          email: email,
          phone_number: formatPhoneNumber(selectedCountry.dialCode, mobile),
          trial_status: 'active',
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        })
        .select()

      if (trialError) {
        logger.error("Error creating free trial:", trialError)
        setErrorMsg("Failed to create your free trial. Please try again.")
        return
      }

      // TODO: Call ctrlpanel.gg API to create server
      
      // Send admin notification email
      // TODO: Implement email notification

      setSuccessMsg("Your free trial has been created successfully! Redirecting to dashboard...")
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
      
    } catch (error) {
      logger.error("OTP verification error:", error)
      setErrorMsg("Failed to verify OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/vecrahost-logo.svg"
              alt="VecraHost Logo"
              width={60}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
            Start Your 24-Hour Free Trial
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Instant setup. Verify your mobile to begin.
          </p>

          {errorMsg && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
              {successMsg}
            </div>
          )}

          {trialStatus === "checking" ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : trialStatus === "utilized" ? (
            <div className="text-center py-4">
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400">
                <h3 className="font-bold text-lg mb-2">Free Trial Already Utilized</h3>
                <p>You have already used your free trial. Please check our paid plans.</p>
              </div>
              <Link 
                href="/#pricing" 
                className="inline-block px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors"
              >
                See Paid Plans
              </Link>
            </div>
          ) : showOtpInput ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-1">
                  Enter OTP sent to your mobile
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                  maxLength={6}
                />
              </div>
              
              <button
                onClick={verifyOtp}
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/80 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Verifying...
                  </span>
                ) : (
                  "Verify & Start Free Trial"
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-1">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <CountryCodeSelector
                      selectedCountry={selectedCountry}
                      onCountryChange={setSelectedCountry}
                    />
                    <input
                      id="mobile"
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Mobile Number"
                      className="flex-1 bg-white/10 p-3 rounded-lg border border-white/10 focus:outline-none text-white"
                    />
                  </div>
                </div>
                
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                    I agree to the{" "}
                    <Link href="/terms-of-service" className="text-accent hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <button
                  type="button"
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="w-full bg-accent hover:bg-accent/80 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                      Processing...
                    </span>
                  ) : (
                    "Start Free Trial Now"
                  )}
                </button>
              
              <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/" className="text-accent hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}