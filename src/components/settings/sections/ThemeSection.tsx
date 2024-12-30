import { useSettingsStore } from '../../../store/settingsStore';

export function ThemeSection() {
  const {
    theme,
    clockFormat,
    autoTheme,
    compactMode,
    setTheme,
    setClockFormat,
    setAutoTheme,
    setCompactMode,
  } = useSettingsStore();

  return (
    <section className="space-y-4">
      <h4 className="text-lg font-medium text-white">Theme</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Color Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">24-hour Format</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={clockFormat === '24h'}
              onChange={(e) => setClockFormat(e.target.checked ? '24h' : '12h')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Auto Theme by Time</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoTheme}
              onChange={(e) => setAutoTheme(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Compact Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={compactMode}
              onChange={(e) => setCompactMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>
      </div>
    </section>
  );
}