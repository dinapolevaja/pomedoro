import { X } from 'lucide-react';
import { TimerSection } from './sections/TimerSection';
import { TasksSection } from './sections/TasksSection';
import { SoundSection } from './sections/SoundSection';
import { ThemeSection } from './sections/ThemeSection';
import { NotificationsSection } from './sections/NotificationsSection';
import { useSettingsStore } from '../../store/settingsStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-8">
          <TimerSection />
          <TasksSection />
          <SoundSection />
          <ThemeSection />
          <NotificationsSection />
        </div>
      </div>
    </div>
  );
}