import { Task, TimerSettings } from '../types';

export const defaultSettings: TimerSettings = {
  pomodoroTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
};

export const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Complete project presentation',
    completed: false,
    totalPomodoros: 10,
    completedPomodoros: 2,
    timeSpent: 250,
  },
  {
    id: '2',
    name: 'Review code changes',
    completed: false,
    totalPomodoros: 5,
    completedPomodoros: 1,
    timeSpent: 125,
  },
  {
    id: '3',
    name: 'Write documentation',
    completed: false,
    totalPomodoros: 1,
    completedPomodoros: 0,
    timeSpent: 25,
  },
];