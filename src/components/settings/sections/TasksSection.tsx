import { useSettingsStore } from '../../../store/settingsStore';

export function TasksSection() {
  const {
    autoCheckTasks,
    autoSwitchTasks,
    setAutoCheckTasks,
    setAutoSwitchTasks,
  } = useSettingsStore();

  return (
    <section className="space-y-4">
      <h4 className="text-lg font-medium text-white">Tasks</h4>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Auto-check Tasks</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoCheckTasks}
              onChange={(e) => setAutoCheckTasks(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Auto-switch Tasks</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoSwitchTasks}
              onChange={(e) => setAutoSwitchTasks(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>
      </div>
    </section>
  );
}