import { createClient } from '@supabase/supabase-js'

// Fallback values for development (replace with your actual values)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// const supabaseUrl = 'https://dywimbkhjtkxmpmxdfru.supabase.co'
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5d2ltYmtoanRreG1wbXhkZnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMDU0MDUsImV4cCI6MjA3NDU4MTQwNX0.I1YyPJyVucYDmUqQN3YDAaztuS6XmFhtnKX7ZFEFNzo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
