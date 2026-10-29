import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Clients are created on first use, not at import time. Creating them at module
// load threw "supabaseKey is required" during `next build` whenever the env vars
// were not present in the build environment, which failed the whole deployment.

let anonClient: SupabaseClient | null = null
let adminClient: SupabaseClient | null = null

// Client-side anon client (browser use)
export function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Supabase is not configured: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are missing')
  }
  if (!anonClient) anonClient = createClient(url, key)
  return anonClient
}

// Server-side service-role client (API routes only)
export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase is not configured: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are missing')
  }
  if (!adminClient) {
    adminClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return adminClient
}
