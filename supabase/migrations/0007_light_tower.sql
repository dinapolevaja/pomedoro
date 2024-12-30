/*
  # Fix RLS policies for user analytics

  1. Changes
    - Drop existing policies if they exist
    - Add RLS policies for user_analytics table
    - Add trigger for updated_at timestamp
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can insert their own analytics" ON user_analytics;
  DROP POLICY IF EXISTS "Users can update their own analytics" ON user_analytics;
  DROP POLICY IF EXISTS "Users can view their own analytics" ON user_analytics;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create policies
CREATE POLICY "Users can insert their own analytics"
  ON user_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics"
  ON user_analytics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own analytics"
  ON user_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_analytics_updated_at ON user_analytics;
DROP FUNCTION IF EXISTS update_analytics_updated_at();

-- Create trigger function
CREATE OR REPLACE FUNCTION update_analytics_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_analytics_updated_at
  BEFORE UPDATE
  ON user_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_analytics_updated_at();