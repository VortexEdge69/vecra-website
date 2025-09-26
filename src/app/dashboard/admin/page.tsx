"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/context/UserContext"
import AdminNavbar from "@/components/AdminNavbar"

interface User {
    id: string
    email: string
    created_at: string
    account_status: string
    is_admin: boolean
}

interface Payment {
    id: string // UUID primary key
    user_id: string // UUID foreign key
    email: string
    plan_name: string
    plan_id: string
    billing_period: string // Changed to string as per your schema
    amount: number
    utr_number: string
    status: string
    payment_method: string
    created_at: string
}

interface NotificationSettings {
    adminEmails: string
    discordWebhook: string
    newUserNotifications: boolean
    paymentNotifications: boolean
}

export default function AdminDashboard() {
    const router = useRouter()
    const { user, loading: userLoading } = useUser()
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState<string>("")
    const [users, setUsers] = useState<User[]>([])
    const [payments, setPayments] = useState<Payment[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        adminEmails: "",
        discordWebhook: "",
        newUserNotifications: true,
        paymentNotifications: true
    })

    // Check admin status and protect the route
    useEffect(() => {
        const checkAdminStatus = async () => {
            // Wait for user context to load
            if (userLoading) {
                return
            }

            // If no user after loading, redirect
            if (!user) {
                setAuthError('Please log in to access admin dashboard')
                setLoading(false)
                setTimeout(() => router.push('/'), 2000)
                return
            }

            try {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('is_admin, email')
                    .eq('id', user.id)
                    .single()

                if (error) {
                    setAuthError(`Database error: ${error.message}`)
                    setLoading(false)
                    return
                }

                if (!profile) {
                    setAuthError('No profile found for user')
                    setLoading(false)
                    return
                }

                if (!profile.is_admin) {
                    setAuthError('Access denied: Admin privileges required')
                    setLoading(false)
                    setTimeout(() => router.push('/'), 2000)
                    return
                }

                setIsAdmin(true)
                setLoading(false)
                loadDashboardData()
            } catch (error) {
                setAuthError(`Authentication error: ${error}`)
                setLoading(false)
            }
        }

        checkAdminStatus()
    }, [user, userLoading, router])

    // Load dashboard data
    const loadDashboardData = async () => {
        try {
            // Load users
            const { data: usersData, error: usersError } = await supabase
                .from('profiles')
                .select('id, email, created_at, account_status, is_admin')
                .order('created_at', { ascending: false })

            if (usersError) throw usersError
            setUsers(usersData || [])

            // Load payments
            const { data: paymentsData, error: paymentsError } = await supabase
                .from('payments')
                .select('*')
                .order('created_at', { ascending: false })

            if (paymentsError) throw paymentsError
            setPayments(paymentsData || [])

            // Load notification settings from localStorage
            const savedSettings = localStorage.getItem('adminNotificationSettings')
            if (savedSettings) {
                setNotificationSettings(JSON.parse(savedSettings))
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error)
        }
    }

    // Update user account status
    const updateUserStatus = async (userId: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ account_status: newStatus })
                .eq('id', userId)

            if (error) throw error

            // Update local state
            setUsers(users.map(user =>
                user.id === userId ? { ...user, account_status: newStatus } : user
            ))

            // Send notification if enabled
            if (notificationSettings.newUserNotifications) {
                // TODO: Implement email notification
                console.log('User status updated notification would be sent')
            }
        } catch (error) {
            console.error('Error updating user status:', error)
        }
    }

    // Update payment status
    const updatePaymentStatus = async (paymentId: string, newStatus: string) => {
        try {
            console.log(`Updating payment ${paymentId} to status: ${newStatus}`)

            const { data, error } = await supabase
                .from('payments')
                .update({ status: newStatus })
                .eq('id', paymentId)
                .select()

            if (error) {
                console.error('Error updating payment status:', error)
                console.error('Error details:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code
                })
                throw new Error(`Failed to update payment: ${error.message}`)
            }

            console.log('Payment updated successfully:', data)

            // Update local state
            setPayments(payments.map(payment =>
                payment.id === paymentId ? { ...payment, status: newStatus } : payment
            ))

            // Send notification if enabled
            if (notificationSettings.paymentNotifications) {
                // TODO: Implement email notification
                console.log('Payment status updated notification would be sent')
            }

        } catch (error) {
            console.error('Error updating payment status:', error)
            alert(`Failed to update payment status: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    // Save notification settings
    const saveNotificationSettings = () => {
        localStorage.setItem('adminNotificationSettings', JSON.stringify(notificationSettings))
        // TODO: Save to database for persistence across sessions
    }



        // Filter users based on search term
    const filteredUsers = users.filter(user =>
        (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.account_status?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    )

    // Filter payments based on search term
    const filteredPayments = payments.filter(payment =>
        (payment.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (payment.plan_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (payment.status?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    )


    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-white text-xl mb-4">Loading admin dashboard...</div>
                    {authError && (
                        <div className="text-red-400 text-sm max-w-md">
                            {authError}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-400 text-xl mb-4">Access Denied</div>
                    <div className="text-gray-400 text-sm mb-4">
                        {authError || 'Admin privileges required'}
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <AdminNavbar />
            <div className="p-4 md:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                                <p className="text-gray-300">Manage users, payments, and system notifications</p>
                            </div>
                            <button
                                onClick={loadDashboardData}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Data
                            </button>
                        </div>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                    >
                        <input
                            type="text"
                            placeholder="Search users, payments, or status..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Users Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Users ({filteredUsers.length})</h2>
                            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                                {filteredUsers.map((user) => (
                                    <div key={user.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <p className="text-white font-medium">{user.email}</p>
                                                <p className="text-sm text-gray-400">
                                                    Joined: {new Date(user.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {user.is_admin && (
                                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <select
                                                value={user.account_status}
                                                onChange={(e) => updateUserStatus(user.id, e.target.value)}
                                                className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="pending">Pending</option>
                                                <option value="suspended">Suspended</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Payments Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Payments ({filteredPayments.length})</h2>
                            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                                {filteredPayments.map((payment) => (
                                    <div key={payment.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <div className="mb-3">
                                            <p className="text-white font-medium">{payment.email}</p>
                                            <p className="text-sm text-gray-400">
                                                {payment.plan_name} - ₹{payment.amount} ({payment.billing_period} months)
                                            </p>
                                            <p className="text-xs text-gray-500 font-mono">UTR: {payment.utr_number}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(payment.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 text-xs rounded-full ${payment.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                                payment.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                {payment.status}
                                            </span>
                                            {payment.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updatePaymentStatus(payment.id, 'approved')}
                                                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updatePaymentStatus(payment.id, 'rejected')}
                                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Notification Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Admin Email Addresses
                                </label>
                                <textarea
                                    value={notificationSettings.adminEmails}
                                    onChange={(e) => setNotificationSettings({
                                        ...notificationSettings,
                                        adminEmails: e.target.value
                                    })}
                                    placeholder="admin@example.com, support@example.com"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                />
                                <p className="text-xs text-gray-400 mt-1">Separate multiple emails with commas</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Discord Webhook URL
                                </label>
                                <input
                                    type="url"
                                    value={notificationSettings.discordWebhook}
                                    onChange={(e) => setNotificationSettings({
                                        ...notificationSettings,
                                        discordWebhook: e.target.value
                                    })}
                                    placeholder="https://discord.com/api/webhooks/..."
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-400 mt-1">Integration coming soon</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">New User Notifications</p>
                                    <p className="text-sm text-gray-400">Get notified when new users register</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notificationSettings.newUserNotifications}
                                        onChange={(e) => setNotificationSettings({
                                            ...notificationSettings,
                                            newUserNotifications: e.target.checked
                                        })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Payment Notifications</p>
                                    <p className="text-sm text-gray-400">Get notified when payments are submitted</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notificationSettings.paymentNotifications}
                                        onChange={(e) => setNotificationSettings({
                                            ...notificationSettings,
                                            paymentNotifications: e.target.checked
                                        })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={saveNotificationSettings}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                            Save Settings
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
} 