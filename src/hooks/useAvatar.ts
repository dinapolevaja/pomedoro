import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

export function useAvatar() {
  const user = useAuthStore(state => state.user);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadAvatar();
    }
  }, [user]);

  const loadAvatar = async () => {
    if (!user) return;

    try {
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(`${user.id}/avatar.jpg`);

      // Check if the avatar exists
      const response = await fetch(data.publicUrl, { method: 'HEAD' });
      if (response.ok) {
        setAvatarUrl(data.publicUrl);
      }
    } catch (error) {
      console.error('Error loading avatar:', error);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const filePath = `${user.id}/avatar.jpg`;

      // Delete existing avatar if it exists
      await supabase.storage
        .from('avatars')
        .remove([filePath]);

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          contentType: 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('Failed to upload avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    avatarUrl,
    loading,
    error,
    uploadAvatar
  };
}