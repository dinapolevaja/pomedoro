import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export function DangerZone() {
  const [showConfirm, setShowConfirm] = useState(false);
  const signOut = useAuthStore(state => state.signOut);

  const handleDeleteAccount = async () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    try {
      // Implement account deletion logic
      await signOut();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
      
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
        <p className="text-sm text-red-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          {showConfirm ? 'Click again to confirm' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
}