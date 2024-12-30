/*
  # Add profile fields

  1. Changes
    - Add fullName, timezone, and language columns to profiles table
    - Add update policy for users to modify their own profile
*/

-- Add new columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'Pacific Time (US & Canada)',
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English';

-- Add update policy
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);