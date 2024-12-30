import { useSettingsStore } from '../../../store/settingsStore';

export function NotificationsSection() {
  const {
    reminderTime,
    mobileAlerts,
    setReminderTime,
    setMobileAlerts,
  } = useSettingsStore();

  return (
    <section className="space-y-4">
      <h4 className="text-lg font-medium text-white">Notifications</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Reminder Time (minutes)</label>
          <input
            type="number"
            min="1"
            max="60"
            value={reminderTime}
            onChange={(e) => setReminderTime(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Mobile Alerts</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={mobileAlerts}
              onChange={(e) => setMobileAlerts(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>
      </div>
    </section>
  );
}