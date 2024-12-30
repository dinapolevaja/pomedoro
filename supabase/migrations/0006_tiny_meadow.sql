/*
  # Analytics System Implementation

  1. New Tables
    - `focus_sessions`: Records individual focus sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `duration` (integer, minutes)
      - `completed_at` (timestamptz)
      - `task_id` (uuid, optional reference to tasks)
    
    - `user_analytics`: Stores aggregated user statistics
      - `user_id` (uuid, primary key, references auth.users)
      - `total_focus_time` (integer, minutes)
      - `tasks_completed` (integer)
      - `focus_score` (integer)
      - `current_streak` (integer)
      - `best_streak` (integer)
      - `daily_progress` (integer)
      - `total_sessions` (integer)
      - `last_calculated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Focus Sessions Table
CREATE TABLE IF NOT EXISTS focus_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  duration integer NOT NULL,
  completed_at timestamptz DEFAULT now(),
  task_id uuid REFERENCES tasks,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;

-- User Analytics Table
CREATE TABLE IF NOT EXISTS user_analytics (
  user_id uuid PRIMARY KEY REFERENCES auth.users,
  total_focus_time integer DEFAULT 0,
  tasks_completed integer DEFAULT 0,
  focus_score integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  best_streak integer DEFAULT 0,
  daily_progress integer DEFAULT 0,
  total_sessions integer DEFAULT 0,
  last_calculated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can insert their own sessions"
  ON focus_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own sessions"
  ON focus_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own analytics"
  ON user_analytics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create analytics entry for new users
CREATE OR REPLACE FUNCTION public.create_user_analytics()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_analytics (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_analytics
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_analytics();

-- Update analytics when sessions are completed
CREATE OR REPLACE FUNCTION public.update_user_analytics()
RETURNS trigger AS $$
BEGIN
  -- Update total sessions and focus time
  UPDATE public.user_analytics
  SET 
    total_sessions = total_sessions + 1,
    total_focus_time = total_focus_time + NEW.duration,
    updated_at = now()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_focus_session_completed
  AFTER INSERT ON public.focus_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_user_analytics();