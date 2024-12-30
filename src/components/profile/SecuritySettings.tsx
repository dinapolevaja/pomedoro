import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      // Show error
      return;
    }

    try {
      // Implement password update logic
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Security</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Enable Two-Factor Authentication</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#39FF14]"></div>
          </label>
        </div>
      </div>

      <button
        onClick={handleUpdatePassword}
        className="w-full bg-[#39FF14] text-gray-900 py-3 rounded-lg hover:bg-[#39FF14]/90 transition-colors"
      >
        Update Password
      </button>
    </div>
  );
}