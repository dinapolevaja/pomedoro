import { useState } from 'react';

export function TimerPreferences() {
  const [duration, setDuration] = useState(25);
  const [volume, setVolume] = useState(80);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Timer Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Default Timer Duration</span>
            <span className="text-sm text-gray-400">{duration} min</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#39FF14] [&::-webkit-slider-thumb]:rounded-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">5 min</span>
            <span className="text-xs text-gray-500">60 min</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Sound Volume</span>
            <span className="text-sm text-gray-400">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#39FF14] [&::-webkit-slider-thumb]:rounded-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Off</span>
            <span className="text-xs text-gray-500">Max</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>
      </div>
    </div>
  );
}