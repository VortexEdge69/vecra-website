-- Newsletter subscriptions table
-- Run this migration in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_ip ON newsletter_subscriptions(ip_address);

-- Enable Row Level Security.
--
-- DO NOT add `TO anon` policies here. This table holds subscriber PII (email,
-- IP address, user-agent) and the anon key ships in the public JS bundle
-- (NEXT_PUBLIC_SUPABASE_ANON_KEY), so an `anon` policy IS a public policy: the
-- original `USING (true)` policies let anyone dump the whole subscriber list
-- and mass-insert rows via PostgREST, bypassing every control in
-- /api/newsletter.
--
-- Intentionally NO policies. With RLS enabled and no policies, anon and
-- authenticated are denied by default, while the server's service_role client
-- (BYPASSRLS) retains full access. All application access goes through
-- `supabaseAdmin` in src/lib/supabase.ts.
--
-- See 20261003000000_security_hardening.sql for the lockdown applied to
-- projects that already had the permissive policies.
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON newsletter_subscriptions FROM anon, authenticated;
