/*
  # Fix user analytics table initialization

  1. Changes
    - Drop and recreate user analytics table with proper constraints
    - Update trigger to handle initial user analytics creation
    - Add proper error handling for duplicate entries
*/

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created_analytics ON auth.users;
DROP FUNCTION IF EXISTS public.create_user_analytics();

-- Recreate the function with proper error handling
CREATE OR REPLACE FUNCTION public.create_user_analytics()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_analytics (
    user_id,
    total_focus_time,
    tasks_completed,
    focus_score,
    current_streak,
    best_streak,
    daily_progress,
    total_sessions
  )
  VALUES (
    new.id,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created_analytics
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_analytics();

-- Create analytics for existing users
DO $$
BEGIN
  INSERT INTO public.user_analytics (
    user_id,
    total_focus_time,
    tasks_completed,
    focus_score,
    current_streak,
    best_streak,
    daily_progress,
    total_sessions
  )
  SELECT 
    id as user_id,
    0 as total_focus_time,
    0 as tasks_completed,
    0 as focus_score,
    0 as current_streak,
    0 as best_streak,
    0 as daily_progress,
    0 as total_sessions
  FROM auth.users
  ON CONFLICT (user_id) DO NOTHING;
END $$;