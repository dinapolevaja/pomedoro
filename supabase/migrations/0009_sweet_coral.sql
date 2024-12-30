/*
  # Add position column for task ordering

  1. Changes
    - Add position column to tasks table
    - Update existing tasks with sequential positions
    - Add index on position column for better performance
*/

-- Add position column
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS position integer;

-- Update existing tasks with sequential positions
WITH numbered_tasks AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) - 1 as row_num
  FROM tasks
)
UPDATE tasks
SET position = numbered_tasks.row_num
FROM numbered_tasks
WHERE tasks.id = numbered_tasks.id;

-- Create index on position
CREATE INDEX IF NOT EXISTS tasks_position_idx ON tasks(position);