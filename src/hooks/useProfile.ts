import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

export interface Profile {
  fullName: string;
  timezone: string;
  language: string;
}

export function useProfile() {
  const user = useAuthStore(state => state.user);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, timezone, language')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setProfile({
        fullName: data.full_name || '',
        timezone: data.timezone || 'Pacific Time (US & Canada)',
        language: data.language || 'English'
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      setError(null);
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.fullName,
          timezone: updates.timezone,
          language: updates.language,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      if (profile) {
        setProfile({ ...profile, ...updates });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      throw new Error('Failed to update profile');
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile
  };
}