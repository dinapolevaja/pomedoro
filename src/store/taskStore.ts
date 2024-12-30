import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Task } from '../types';

interface TaskState {
  tasks: Task[];
  activeTaskId: string | null;
  loading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (task: { name: string; description: string; pomodoros: number }) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  setActiveTask: (taskId: string) => Promise<void>;
  updateTaskOrder: (taskIds: string[]) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  activeTaskId: null,
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('position');

      if (error) throw error;

      const formattedTasks: Task[] = data.map(task => ({
        id: task.id,
        name: task.name,
        description: task.description || '',
        completed: task.status === 'done',
        totalPomodoros: task.total_pomodoros,
        completedPomodoros: task.completed_pomodoros,
        timeSpent: task.total_pomodoros * 25,
        status: task.status,
      }));

      set({ tasks: formattedTasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase.from('tasks').insert({
        user_id: user.id,
        name: task.name,
        description: task.description,
        total_pomodoros: task.pomodoros,
        status: 'planned',
      });

      if (error) throw error;

      get().fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          name: updates.name,
          description: updates.description,
          status: updates.status,
          completed_pomodoros: updates.completedPomodoros,
        })
        .eq('id', taskId);

      if (error) throw error;

      get().fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  toggleTask: async (taskId) => {
    const { tasks, activeTaskId } = get();
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status === 'planned') {
      // If there's an active task, move it back to planned
      if (activeTaskId) {
        await get().updateTask(activeTaskId, { status: 'planned' });
      }
      await get().updateTask(taskId, { status: 'active' });
      set({ activeTaskId: taskId });
    } else if (task.status === 'active') {
      await get().updateTask(taskId, { status: 'done' });
      set({ activeTaskId: null });
    } else if (task.status === 'done') {
      await get().updateTask(taskId, { status: 'planned' });
    }
  },

  setActiveTask: async (taskId) => {
    const { tasks, activeTaskId } = get();
    
    if (activeTaskId) {
      await get().updateTask(activeTaskId, { status: 'planned' });
    }
    
    await get().updateTask(taskId, { status: 'active' });
    set({ activeTaskId: taskId });
  },

  updateTaskOrder: async (taskIds) => {
    try {
      const updates = taskIds.map((id, index) => ({
        id,
        position: index,
      }));

      const { error } = await supabase
        .from('tasks')
        .upsert(updates, { onConflict: 'id' });

      if (error) throw error;

      get().fetchTasks();
    } catch (error) {
      console.error('Error updating task order:', error);
    }
  },
}));