import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

interface Analytics {
  totalFocusTime: number;
  sessionsCompleted: number;
  totalSessions: number;
  dailyProgress: number;
  currentStreak: number;
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (!user) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get existing analytics
        let { data, error: fetchError } = await supabase
          .from('user_analytics')
          .select('*')
          .eq('user_id', user.id)
          .single();

        // If no record exists, create one
        if (fetchError && fetchError.code === 'PGRST116') {
          const { data: newData, error: insertError } = await supabase
            .from('user_analytics')
            .insert({
              user_id: user.id,
              total_focus_time: 0,
              total_sessions: 0,
              daily_progress: 0,
              current_streak: 0,
              best_streak: 0
            })
            .select()
            .single();

          if (insertError) throw insertError;
          data = newData;
        } else if (fetchError) {
          throw fetchError;
        }

        setAnalytics({
          totalFocusTime: Math.round(data.total_focus_time / 60 * 10) / 10,
          sessionsCompleted: data.total_sessions,
          totalSessions: 12,
          dailyProgress: data.daily_progress,
          currentStreak: data.current_streak
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  return { analytics, loading, error };
}