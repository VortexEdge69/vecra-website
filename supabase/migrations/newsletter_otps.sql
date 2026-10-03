-- Newsletter OTPs table
-- Run this migration in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS newsletter_otps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  otp TEXT,
  otp_hash TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  consumed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address TEXT,
  verified BOOLEAN DEFAULT FALSE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_otps_email ON newsletter_otps(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_otps_expires ON newsletter_otps(expires_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_otps_lookup
  ON newsletter_otps (email, consumed_at, created_at DESC);

-- Enable Row Level Security.
--
-- DO NOT add `TO anon` policies here. This table holds verification
-- authenticators, and the anon key ships in the public JS bundle
-- (NEXT_PUBLIC_SUPABASE_ANON_KEY), so an `anon` policy IS a public policy:
-- `ENABLE ROW LEVEL SECURITY` plus `USING (true)` for anon is equivalent to no
-- RLS at all and let anyone read any OTP in plaintext via PostgREST.
--
-- Intentionally NO policies. With RLS enabled and no policies, anon and
-- authenticated are denied by default, while the server's service_role client
-- (BYPASSRLS) retains full access. All application access goes through
-- `supabaseAdmin` in src/lib/supabase.ts.
--
-- See 20261003000000_security_hardening.sql for the lockdown applied to
-- projects that already had the permissive policies.
ALTER TABLE newsletter_otps ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON newsletter_otps FROM anon, authenticated;
