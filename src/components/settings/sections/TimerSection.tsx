import { useSettingsStore } from '../../../store/settingsStore';

export function TimerSection() {
  const {
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    autoStartBreaks,
    autoStartPomodoros,
    longBreakInterval,
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    setAutoStartBreaks,
    setAutoStartPomodoros,
    setLongBreakInterval,
  } = useSettingsStore();

  return (
    <section className="space-y-4">
      <h4 className="text-lg font-medium text-white">Timer</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Pomodoro</label>
          <input
            type="number"
            min="1"
            max="60"
            value={pomodoroTime}
            onChange={(e) => setPomodoroTime(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Short Break</label>
          <input
            type="number"
            min="1"
            max="60"
            value={shortBreakTime}
            onChange={(e) => setShortBreakTime(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Long Break</label>
          <input
            type="number"
            min="1"
            max="60"
            value={longBreakTime}
            onChange={(e) => setLongBreakTime(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Auto-start Breaks</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoStartBreaks}
              onChange={(e) => setAutoStartBreaks(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Auto-start Pomodoros</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoStartPomodoros}
              onChange={(e) => setAutoStartPomodoros(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Long Break Interval</label>
          <input
            type="number"
            min="1"
            max="10"
            value={longBreakInterval}
            onChange={(e) => setLongBreakInterval(Number(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          />
        </div>
      </div>
    </section>
  );
}