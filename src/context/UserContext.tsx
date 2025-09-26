"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"

interface UserContextType {
    user: User | null
    session: Session | null
    loading: boolean
    setUser: (user: User | null) => void
    setSession: (session: Session | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const restoreSession = async () => {
            try {
                console.log("Restoring session...")
                const { data: { session } } = await supabase.auth.getSession()
                console.log("Session restore result:", session ? "Found session" : "No session")
                if (session?.user) {
                    console.log("Setting user from session:", session.user.email)
                    setUser(session.user)
                    setSession(session)
                }
            } catch (error) {
                console.error("Error restoring session:", error)
            } finally {
                setLoading(false)
            }
        }

        restoreSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth state change:", event, session ? "Session exists" : "No session")
            if (session?.user) {
                console.log("Setting user from auth change:", session.user.email)
                setUser(session.user)
                setSession(session)
            } else {
                console.log("Clearing user from auth change")
                setUser(null)
                setSession(null)
            }
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, session, loading, setUser, setSession }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
} 