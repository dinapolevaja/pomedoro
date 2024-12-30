import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useProfile } from '../../hooks/useProfile';

const TIMEZONES = [
  'Pacific Time (US & Canada)',
  'Eastern Time (US & Canada)',
  'Central Time (US & Canada)',
  'Mountain Time (US & Canada)',
  'UTC'
] as const;

const LANGUAGES = ['English', 'Spanish', 'French', 'German'] as const;

export function AccountSettings() {
  const user = useAuthStore(state => state.user);
  const { profile, loading, error: profileError, updateProfile } = useProfile();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveChanges = async () => {
    if (!profile) return;

    setIsSaving(true);
    setError(null);

    try {
      await updateProfile({
        fullName: profile.fullName,
        timezone: profile.timezone,
        language: profile.language
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading profile...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Account Settings</h2>
      
      {(error || profileError) && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3">
          {error || profileError}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Full Name</label>
          <input
            type="text"
            value={profile.fullName}
            onChange={(e) => updateProfile({ fullName: e.target.value })}
            placeholder="Enter your full name"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-[#39FF14]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Email Address</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Time Zone</label>
          <select
            value={profile.timezone}
            onChange={(e) => updateProfile({ timezone: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          >
            {TIMEZONES.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Language</label>
          <select
            value={profile.language}
            onChange={(e) => updateProfile({ language: e.target.value })}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        disabled={isSaving}
        className="w-full bg-[#39FF14] text-gray-900 py-3 rounded-lg hover:bg-[#39FF14]/90 transition-colors disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}