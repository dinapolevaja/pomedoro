export interface Task {
  id: string;
  name: string;
  completed: boolean;
  totalPomodoros: number;
  completedPomodoros: number;
  timeSpent: number;
  status: 'planned' | 'active' | 'done';
}

export interface TimerSettings {
  pomodoroTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
}

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';