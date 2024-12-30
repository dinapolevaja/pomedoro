import { FC } from 'react';

interface TimerSettingsProps {
  duration: number;
  volume: number;
  onDurationChange: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

export const TimerSettings: FC<TimerSettingsProps> = ({
  duration,
  volume,
  onDurationChange,
  onVolumeChange,
}) => {
  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Timer Duration</span>
        <span className="text-white">{duration} min</span>
      </div>
      <input
        type="range"
        min="1"
        max="60"
        value={duration}
        onChange={(e) => onDurationChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#39FF14] [&::-webkit-slider-thumb]:rounded-full"
      />

      <div className="flex items-center justify-between mt-6">
        <span className="text-gray-400">Volume</span>
        <span className="text-white">{volume}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#39FF14] [&::-webkit-slider-thumb]:rounded-full"
      />
    </div>
  );
};