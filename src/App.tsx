import { useState, useCallback, useEffect } from 'react';
import { Timer as TimerIcon, BarChart2, Settings } from 'lucide-react';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { Stats } from './components/Stats';
import { AuthButton } from './components/auth/AuthButton';
import { TimerSettings } from './components/settings/TimerSettings';
import { SettingsModal } from './components/settings/SettingsModal';
import { AnalyticsModal } from './components/analytics/AnalyticsModal';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import { useTaskStore } from './store/taskStore';
import { defaultSettings } from './constants/defaultData';
import { TimerMode } from './types';

export default function App() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [settings] = useState(defaultSettings);
  const [sessions, setSessions] = useState(3);
  const [duration, setDuration] = useState(25);
  const [volume, setVolume] = useState(80);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isAnalyticsOpen, setAnalyticsOpen] = useState(false);
  
  const setUser = useAuthStore((state) => state.setUser);
  const { tasks, fetchTasks, addTask, toggleTask } = useTaskStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchTasks();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, fetchTasks]);

  const handleTimerComplete = useCallback(() => {
    if (mode === 'focus') {
      setMode('shortBreak');
      setSessions(s => s + 1);
    } else {
      setMode('focus');
    }
  }, [mode]);

  return (
    <div className="bg-gray-900 text-white min-h-screen bg-[radial-gradient(circle_at_center,#111827_0%,#000000_100%)]">
      <div className="max-w-8xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <TimerIcon className="h-8 w-8" />
            <span className="text-xl font-semibold">Pomodoro</span>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setAnalyticsOpen(true)}
            >
              <BarChart2 size={24} />
            </button>
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings size={24} />
            </button>
            <AuthButton />
          </div>
        </nav>

        <main className="flex flex-col items-center justify-center space-y-8">
          <Timer
            mode={mode}
            duration={duration}
            onComplete={handleTimerComplete}
            onSkipNext={() => setMode(mode === 'focus' ? 'shortBreak' : 'focus')}
            onSkipPrevious={() => setMode(mode === 'focus' ? 'shortBreak' : 'focus')}
          />

          <Stats
            sessions={sessions}
            totalSessions={12}
            dailyProgress={37}
            streak={5}
            focusTime={2.5}
          />

          <TimerSettings
            duration={duration}
            volume={volume}
            onDurationChange={setDuration}
            onVolumeChange={setVolume}
          />

          <TaskList
            tasks={tasks}
            onTaskToggle={toggleTask}
            onAddTask={addTask}
          />
        </main>

        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={() => setSettingsOpen(false)}
        />

        <AnalyticsModal 
          isOpen={isAnalyticsOpen}
          onClose={() => setAnalyticsOpen(false)}
        />
      </div>
    </div>
  );
}