-- Create enum type for trial status
CREATE TYPE trial_status AS ENUM ('active', 'expired', 'utilized');

-- Create free_trials table
CREATE TABLE IF NOT EXISTS free_trials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  trial_status trial_status NOT NULL DEFAULT 'active',
  server_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  
  CONSTRAINT unique_user_trial UNIQUE (user_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_free_trials_user_id ON free_trials(user_id);
CREATE INDEX IF NOT EXISTS idx_free_trials_status ON free_trials(trial_status);

-- Add RLS (Row Level Security) policies
ALTER TABLE free_trials ENABLE ROW LEVEL SECURITY;

-- Allow users to view only their own trials
CREATE POLICY "Users can view their own trials" 
  ON free_trials 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow users to insert their own trials (but only once due to unique constraint)
CREATE POLICY "Users can create their own trials" 
  ON free_trials 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Only allow admins to update trials
CREATE POLICY "Only admins can update trials" 
  ON free_trials 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Create function to automatically expire trials after 24 hours
CREATE OR REPLACE FUNCTION expire_free_trials()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE free_trials
  SET trial_status = 'expired'
  WHERE expires_at < NOW() AND trial_status = 'active';
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to run the function periodically
CREATE OR REPLACE TRIGGER expire_free_trials_trigger
AFTER INSERT OR UPDATE ON free_trials
EXECUTE FUNCTION expire_free_trials();