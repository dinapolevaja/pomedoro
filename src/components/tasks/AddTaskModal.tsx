import { useState } from 'react';
import { X } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { name: string; description: string; pomodoros: number }) => void;
}

export function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pomodoros, setPomodoros] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({ name, description, pomodoros });
    // Clear form after submission
    setName('');
    setDescription('');
    setPomodoros(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Add Task</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14]"
          />
          
          <textarea
            placeholder="Task Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14] min-h-[100px]"
          />

          <div className="flex items-center justify-between">
            <span className="text-gray-400">Pomodoros:</span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPomodoros(Math.max(1, pomodoros - 1))}
                className="text-gray-400 hover:text-white px-3 py-1 rounded-lg bg-gray-700"
              >
                -
              </button>
              <span className="w-8 text-center">{pomodoros}</span>
              <button
                type="button"
                onClick={() => setPomodoros(pomodoros + 1)}
                className="text-gray-400 hover:text-white px-3 py-1 rounded-lg bg-gray-700"
              >
                +
              </button>
              <span className="text-gray-400 ml-2">(25 min each)</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#39FF14] text-gray-900 py-3 rounded-lg hover:bg-[#39FF14]/90 transition-colors mt-6"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}