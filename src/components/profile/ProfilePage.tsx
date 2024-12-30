import { useState } from 'react';
import { X, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UserAvatar } from './UserAvatar';
import { ProfileStats } from './ProfileStats';
import { AccountSettings } from './AccountSettings';
import { SecuritySettings } from './SecuritySettings';
import { TimerPreferences } from './TimerPreferences';
import { DangerZone } from './DangerZone';

interface ProfilePageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfilePage({ isOpen, onClose }: ProfilePageProps) {
  const user = useAuthStore(state => state.user);
  const signOut = useAuthStore(state => state.signOut);
  const [memberSince] = useState(() => {
    const date = user?.created_at ? new Date(user.created_at) : new Date();
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-gray-900 rounded-xl w-full max-w-6xl mx-4">
        <div className="flex justify-between items-center p-4">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-8 p-8">
          {/* Left Column */}
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center">
              <UserAvatar user={user} size={160} showUploadButton />
              <h2 className="text-xl font-semibold mt-4">{user.email?.split('@')[0]}</h2>
              <p className="text-sm text-gray-400">Member since {memberSince}</p>
            </div>

            <ProfileStats
              totalFocusTime={156.5}
              longestStreak={15}
              goalsAchieved={87}
              avgSession={25}
            />
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-8">
            <AccountSettings />
            <SecuritySettings />
            <TimerPreferences />
            <DangerZone />
          </div>
        </div>
      </div>
    </div>
  );
}