"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { motion } from "framer-motion"
import { useUser } from "@/context/UserContext"

interface UserProfile {
    id: string
    email: string
    mobile?: string
    countryCode?: string
    username?: string
}

export default function UserProfile() {
    const { user: authUser, loading: authLoading } = useUser()
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProfile = async () => {
            if (!authUser) {
                setProfile(null)
                setLoading(false)
                return
            }

            try {
                // Try to get profile data from the profiles table
                const { data: profileData, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', authUser.id)
                    .single()

                if (error) {
                    console.log('Profile not found, using auth user data:', error.message)
                }

                console.log('Profile data from database:', profileData)
                console.log('Auth user metadata:', authUser.user_metadata)

                setProfile({
                    id: authUser.id,
                    email: authUser.email || '',
                    mobile: profileData?.mobile || authUser.user_metadata?.mobile,
                    countryCode: profileData?.countryCode || authUser.user_metadata?.countryCode,
                    username: profileData?.username || authUser.user_metadata?.username || authUser.email?.split('@')[0]
                })
            } catch (profileError) {
                console.log('Profile fetch error, using auth user data:', profileError)
                setProfile({
                    id: authUser.id,
                    email: authUser.email || '',
                    mobile: authUser.user_metadata?.mobile,
                    countryCode: authUser.user_metadata?.countryCode,
                    username: authUser.user_metadata?.username || authUser.email?.split('@')[0]
                })
            } finally {
                setLoading(false)
            }
        }

        getProfile()
    }, [authUser])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
    }

    if (authLoading || loading) {
        return (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4">
                <div className="animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
            </div>
        )
    }

    if (!authUser || !profile) {
        return null
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-white font-semibold">
                        Welcome, {profile.username || 'User'}!
                    </h3>
                    <p className="text-gray-400 text-sm">{profile.email}</p>
                    {profile.mobile && (
                        <p className="text-gray-400 text-sm">
                            📱 {profile.mobile.includes('+') ? profile.mobile : `+91 ${profile.mobile}`}
                        </p>
                    )}
                </div>
                <button
                    onClick={handleSignOut}
                    className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </motion.div>
    )
} 