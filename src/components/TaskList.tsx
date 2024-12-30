import { useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { Task } from '../types';
import { AddTaskModal } from './tasks/AddTaskModal';

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onAddTask: (task: { name: string; description: string; pomodoros: number }) => void;
}

export function TaskList({ tasks, onTaskToggle, onAddTask }: TaskListProps) {
  const [filter, setFilter] = useState<'active' | 'planned' | 'done'>('active');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <>
      <div className="w-full max-w-3xl space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Tasks</h3>
          <div className="flex items-center space-x-4">
            <button
              className={`px-3 py-1 rounded-lg ${
                filter === 'active'
                  ? 'text-[#39FF14] bg-gray-700'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`px-3 py-1 rounded-lg ${
                filter === 'planned'
                  ? 'text-[#39FF14] bg-gray-700'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setFilter('planned')}
            >
              Planned
            </button>
            <button
              className={`px-3 py-1 rounded-lg ${
                filter === 'done'
                  ? 'text-[#39FF14] bg-gray-700'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setFilter('done')}
            >
              Done
            </button>
          </div>
          <button
            className="text-[#39FF14] hover:text-[#39FF14]/80 transition-colors"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="inline-block mr-2" />
            Add Task
          </button>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3 flex-1">
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical size={20} />
                </button>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onTaskToggle(task.id)}
                  className="w-5 h-5 rounded border-gray-600 text-[#39FF14] focus:ring-[#39FF14]"
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
          ))}
        </div>
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={onAddTask}
      />
    </>
  );
}