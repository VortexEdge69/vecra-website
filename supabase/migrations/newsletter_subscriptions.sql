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

-- Enable Row Level Security
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for new subscriptions)
CREATE POLICY "Allow public inserts" ON newsletter_subscriptions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads (for checking existing subscriptions)
CREATE POLICY "Allow public reads" ON newsletter_subscriptions
  FOR SELECT TO anon, authenticated
  USING (true);

-- Create policy to allow updates (for reactivating subscriptions)
CREATE POLICY "Allow public updates" ON newsletter_subscriptions
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);
