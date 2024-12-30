import { forwardRef } from 'react';
import { MoreVertical } from 'lucide-react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  isDragging?: boolean;
}

export const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(
  ({ task, onToggle, isDragging }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-gray-800 rounded-lg p-4 flex items-center justify-between ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <div className="flex items-center space-x-3 flex-1">
          <button className="text-gray-400 hover:text-white cursor-grab">
            <MoreVertical size={20} />
          </button>
          <input
            type="checkbox"
            checked={task.status === 'done'}
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 rounded border-gray-600 text-[#39FF14] focus:ring-[#39FF14] focus:ring-offset-gray-800"
          />
          <span className="text-white">{task.name}</span>
        </div>
        <div className="flex items-center space-x-4 w-40 justify-end">
          <span className="text-gray-400 bg-[#0a0e16] rounded-lg px-3 py-1 w-16 text-center text-[10px]">
            {task.completedPomodoros}/{task.totalPomodoros}
          </span>
          <span className="text-gray-400 bg-[#0a0e16] rounded-lg px-3 py-1 w-16 text-center text-[10px]">
            {task.timeSpent} min
          </span>
        </div>
      </div>
    );
  }
);