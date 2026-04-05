-- Newsletter OTPs table
-- Run this migration in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS newsletter_otps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  otp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ip_address TEXT,
  verified BOOLEAN DEFAULT FALSE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_otps_email ON newsletter_otps(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_otps_expires ON newsletter_otps(expires_at);

-- Enable Row Level Security
ALTER TABLE newsletter_otps ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for requesting OTPs)
CREATE POLICY "Allow public inserts" ON newsletter_otps
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads (for verifying OTPs)
CREATE POLICY "Allow public reads" ON newsletter_otps
  FOR SELECT TO anon, authenticated
  USING (true);

-- Create policy to allow updates (for marking as verified)
CREATE POLICY "Allow public updates" ON newsletter_otps
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);
