import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export function useFocusSession() {
  const user = useAuthStore(state => state.user);

  const recordSession = useCallback(async (duration: number, taskId?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('focus_sessions')
        .insert({
          user_id: user.id,
          duration,
          task_id: taskId,
        });

      if (error) throw error;
    } catch (err) {
      console.error('Error recording focus session:', err);
      throw new Error('Failed to record focus session');
    }
  }, [user]);

  return { recordSession };
}