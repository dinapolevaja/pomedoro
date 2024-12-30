import { useSettingsStore } from '../../../store/settingsStore';

const ALARM_SOUNDS = ['Kitchen', 'Digital', 'Bell', 'Birds'] as const;
const TICK_SOUNDS = ['None', 'Soft', 'Mechanical', 'Digital'] as const;

export function SoundSection() {
  const {
    alarmSound,
    tickSound,
    setAlarmSound,
    setTickSound,
  } = useSettingsStore();

  return (
    <section className="space-y-4">
      <h4 className="text-lg font-medium text-white">Sound</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Alarm Sound</label>
          <select
            value={alarmSound}
            onChange={(e) => setAlarmSound(e.target.value as typeof ALARM_SOUNDS[number])}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          >
            {ALARM_SOUNDS.map((sound) => (
              <option key={sound} value={sound}>{sound}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Tick Sound</label>
          <select
            value={tickSound}
            onChange={(e) => setTickSound(e.target.value as typeof TICK_SOUNDS[number])}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
          >
            {TICK_SOUNDS.map((sound) => (
              <option key={sound} value={sound}>{sound}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}