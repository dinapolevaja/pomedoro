/*
  # Add task management columns
  
  1. Changes
    - Add description column for task details
    - Add status column with enum values (planned, active, done)
    - Add completed_pomodoros counter
  
  2. Security
    - Add check constraint for valid status values
*/

-- Add new columns with appropriate defaults
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'planned' 
  CHECK (status IN ('planned', 'active', 'done')),
ADD COLUMN IF NOT EXISTS completed_pomodoros INTEGER NOT NULL DEFAULT 0;