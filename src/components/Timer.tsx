import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { CircularTimerProgress } from './timer/CircularTimerProgress';
import { useFocusSession } from '../hooks/useFocusSession';
import { TimerMode } from '../types';

interface TimerProps {
  mode: TimerMode;
  duration: number;
  onComplete: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
}

export function Timer({ mode, duration, onComplete, onSkipNext, onSkipPrevious }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const { recordSession } = useFocusSession();

  useEffect(() => {
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [duration, mode]);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            // Record the completed session only for focus mode
            if (mode === 'focus') {
              recordSession(duration)
                .then(() => onComplete())
                .catch(console.error);
            } else {
              onComplete();
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete, mode, duration, recordSession]);

  const toggleTimer = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (duration * 60)) * 100;

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-medium mb-2">
          {mode === 'focus' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
        </h2>
        <p className="text-gray-400">
          {mode === 'focus' ? 'Stay focused on your task' : 'Take a break'}
        </p>
      </div>
      
      <div className="relative w-80 h-80 flex items-center justify-center">
        <CircularTimerProgress 
          progress={progress}
          size={320}
          strokeWidth={8}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-gray-400">
              {mode === 'focus' ? 'Focus Time' : 'Break Time'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8">
        <button
          className="text-gray-400 hover:text-white transition-colors"
          onClick={onSkipPrevious}
        >
          <SkipBack size={24} />
        </button>
        <button
          onClick={toggleTimer}
          className="w-24 h-10 rounded-lg bg-gradient-to-r from-[#39FF14] via-[#00ff85] to-[#39FF14] hover:from-[#32ff0a] hover:via-[#00ff7a] hover:to-[#32ff0a] p-[2px] relative overflow-hidden group animate-gradient-shift flex items-center justify-center"
        >
          {isRunning ? (
            <Pause className="text-gray-900" size={20} />
          ) : (
            <Play className="text-gray-900" size={20} />
          )}
        </button>
        <button
          className="text-gray-400 hover:text-white transition-colors"
          onClick={onSkipNext}
        >
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
}