-- VEC-16 security hardening migration
--
-- Run this in the Supabase SQL editor (or via `supabase db push`) for the
-- production project. It is idempotent and safe to re-run.
--
-- This migration DELETES NO ROWS. It only changes access control and adds
-- columns/tables. Purging expired OTP rows is deliberately left to a separate,
-- explicitly-scoped cleanup task.
--
-- IMPORTANT ORDERING: this migration removes the permissive anon policies that
-- /api/newsletter used to depend on. It must land together with the app code
-- that talks to these tables through `supabaseAdmin` (the service-role client),
-- otherwise the newsletter flow breaks. service_role has the BYPASSRLS
-- attribute, so it keeps working with zero policies present.

BEGIN;

-- ---------------------------------------------------------------------------
-- Finding 1 (CRITICAL) - Broken Access Control / Cryptographic Failures
--
-- `ENABLE ROW LEVEL SECURITY` plus `USING (true)` for the `anon` role is
-- equivalent to no RLS at all. The anon key ships in the public JS bundle
-- (NEXT_PUBLIC_*), so these policies let any unauthenticated visitor read every
-- subscriber's email + IP + user-agent, read any verification OTP in plaintext,
-- and insert/update rows directly through PostgREST - bypassing every control
-- in the /api/newsletter route handler.
--
-- Fix: remove the policies AND revoke the table grants (two independent layers,
-- per Defense in Depth). With RLS enabled and no policies, non-BYPASSRLS roles
-- are denied by default.
-- ---------------------------------------------------------------------------

DROP POLICY IF EXISTS "Allow public inserts" ON newsletter_otps;
DROP POLICY IF EXISTS "Allow public reads"   ON newsletter_otps;
DROP POLICY IF EXISTS "Allow public updates" ON newsletter_otps;

DROP POLICY IF EXISTS "Allow public inserts" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow public reads"   ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow public updates" ON newsletter_subscriptions;

ALTER TABLE newsletter_otps          ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON newsletter_otps          FROM anon, authenticated;
REVOKE ALL ON newsletter_subscriptions FROM anon, authenticated;

-- ---------------------------------------------------------------------------
-- Findings 2, 5, 8 - OTP is a bearer authenticator and must be treated as one.
--
--   * store only an HMAC of the OTP, never the plaintext (Finding 1 fallout:
--     plaintext OTPs were anon-readable; hashing means a future read primitive
--     does not hand over a working authenticator)
--   * single-use via `consumed_at`
--   * bounded guessing via `attempts`
-- ---------------------------------------------------------------------------

ALTER TABLE newsletter_otps ADD COLUMN IF NOT EXISTS otp_hash    TEXT;
ALTER TABLE newsletter_otps ADD COLUMN IF NOT EXISTS attempts    INTEGER NOT NULL DEFAULT 0;
ALTER TABLE newsletter_otps ADD COLUMN IF NOT EXISTS consumed_at TIMESTAMP WITH TIME ZONE;

-- The legacy plaintext column is no longer written by the application. Make it
-- nullable so inserts stop having to supply it. Existing rows are left alone
-- (no deletes in this migration); they expire on their own within 10 minutes.
ALTER TABLE newsletter_otps ALTER COLUMN otp DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_newsletter_otps_lookup
  ON newsletter_otps (email, consumed_at, created_at DESC);

-- ---------------------------------------------------------------------------
-- Finding 3 - Unrestricted resource consumption.
--
-- Durable sliding-window counters. The previous limit lived in the
-- newsletter_otps table itself (3 per 10 seconds, ~26k emails/day/IP) and was
-- keyed on an attacker-controlled header. This table backs per-IP, per-email
-- and global buckets that survive process restarts and work across the
-- multiple server instances a Render deploy may run.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS security_rate_limits (
  id         BIGSERIAL PRIMARY KEY,
  bucket     TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_security_rate_limits_bucket
  ON security_rate_limits (bucket, created_at DESC);

-- ---------------------------------------------------------------------------
-- Proof-of-work challenge replay protection.
--
-- Challenges are issued statelessly (HMAC-signed, so no storage on issue), but
-- a solved challenge must not be reusable - otherwise one solve amortises over
-- an unlimited number of requests and the control is worthless. The primary key
-- makes redemption single-use: a duplicate insert is a replay.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS security_pow_challenges (
  challenge   TEXT PRIMARY KEY,
  redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_security_pow_redeemed
  ON security_pow_challenges (redeemed_at);

-- ---------------------------------------------------------------------------
-- Abuse monitoring / alert de-duplication.
--
-- Records that an alert of a given kind was already raised, so a sustained
-- attack produces one alert per cooldown window instead of one per request
-- (which would turn our own monitoring into an outbound mail flood and burn
-- more sender reputation).
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS security_alerts (
  id         BIGSERIAL PRIMARY KEY,
  alert_key  TEXT NOT NULL,
  detail     JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_security_alerts_key
  ON security_alerts (alert_key, created_at DESC);

-- All three security tables are server-side only: service_role bypasses RLS,
-- and anon/authenticated get RLS-with-no-policies plus no grants.
ALTER TABLE security_rate_limits    ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_pow_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_alerts         ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON security_rate_limits    FROM anon, authenticated;
REVOKE ALL ON security_pow_challenges FROM anon, authenticated;
REVOKE ALL ON security_alerts         FROM anon, authenticated;

COMMIT;

-- ---------------------------------------------------------------------------
-- Post-apply verification. Expect ZERO rows from the first query and
-- `rowsecurity = true` for every table in the second.
--
--   SELECT tablename, policyname, roles, cmd
--     FROM pg_policies
--    WHERE schemaname = 'public'
--      AND tablename IN ('newsletter_otps', 'newsletter_subscriptions');
--
--   SELECT relname, relrowsecurity
--     FROM pg_class
--    WHERE relname IN ('newsletter_otps', 'newsletter_subscriptions',
--                      'security_rate_limits', 'security_pow_challenges',
--                      'security_alerts');
--
-- And confirm the anon key is actually locked out, from outside the app:
--   curl -s "$SUPABASE_URL/rest/v1/newsletter_subscriptions?select=email" \
--        -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY"
--   # expect a permission-denied error, NOT a JSON array
-- ---------------------------------------------------------------------------
