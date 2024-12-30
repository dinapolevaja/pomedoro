import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  // Timer settings
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  setPomodoroTime: (time: number) => void;
  setShortBreakTime: (time: number) => void;
  setLongBreakTime: (time: number) => void;
  setAutoStartBreaks: (enabled: boolean) => void;
  setAutoStartPomodoros: (enabled: boolean) => void;
  setLongBreakInterval: (interval: number) => void;

  // Task settings
  autoCheckTasks: boolean;
  autoSwitchTasks: boolean;
  setAutoCheckTasks: (enabled: boolean) => void;
  setAutoSwitchTasks: (enabled: boolean) => void;

  // Sound settings
  alarmSound: 'Kitchen' | 'Digital' | 'Bell' | 'Birds';
  tickSound: 'None' | 'Soft' | 'Mechanical' | 'Digital';
  setAlarmSound: (sound: 'Kitchen' | 'Digital' | 'Bell' | 'Birds') => void;
  setTickSound: (sound: 'None' | 'Soft' | 'Mechanical' | 'Digital') => void;

  // Theme settings
  theme: 'dark' | 'light';
  clockFormat: '12h' | '24h';
  autoTheme: boolean;
  compactMode: boolean;
  setTheme: (theme: 'dark' | 'light') => void;
  setClockFormat: (format: '12h' | '24h') => void;
  setAutoTheme: (enabled: boolean) => void;
  setCompactMode: (enabled: boolean) => void;

  // Notification settings
  reminderTime: number;
  mobileAlerts: boolean;
  setReminderTime: (time: number) => void;
  setMobileAlerts: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Timer settings
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      longBreakInterval: 4,
      setPomodoroTime: (time) => set({ pomodoroTime: time }),
      setShortBreakTime: (time) => set({ shortBreakTime: time }),
      setLongBreakTime: (time) => set({ longBreakTime: time }),
      setAutoStartBreaks: (enabled) => set({ autoStartBreaks: enabled }),
      setAutoStartPomodoros: (enabled) => set({ autoStartPomodoros: enabled }),
      setLongBreakInterval: (interval) => set({ longBreakInterval: interval }),

      // Task settings
      autoCheckTasks: false,
      autoSwitchTasks: false,
      setAutoCheckTasks: (enabled) => set({ autoCheckTasks: enabled }),
      setAutoSwitchTasks: (enabled) => set({ autoSwitchTasks: enabled }),

      // Sound settings
      alarmSound: 'Kitchen',
      tickSound: 'None',
      setAlarmSound: (sound) => set({ alarmSound: sound }),
      setTickSound: (sound) => set({ tickSound: sound }),

      // Theme settings
      theme: 'dark',
      clockFormat: '24h',
      autoTheme: false,
      compactMode: false,
      setTheme: (theme) => set({ theme }),
      setClockFormat: (format) => set({ clockFormat: format }),
      setAutoTheme: (enabled) => set({ autoTheme: enabled }),
      setCompactMode: (enabled) => set({ compactMode: enabled }),

      // Notification settings
      reminderTime: 5,
      mobileAlerts: false,
      setReminderTime: (time) => set({ reminderTime: time }),
      setMobileAlerts: (enabled) => set({ mobileAlerts: enabled }),
    }),
    {
      name: 'pomodoro-settings',
    }
  )
);