import { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { AuthModal } from './AuthModal';
import { UserAvatar } from '../profile/UserAvatar';
import { ProfilePage } from '../profile/ProfilePage';

export function AuthButton() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowProfileModal(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <>
      {user ? (
        <button
          className="hover:opacity-80 transition-opacity"
          onClick={() => setShowProfileModal(true)}
        >
          <UserAvatar user={user} size={32} />
        </button>
      ) : (
        <button
          className="text-gray-400 hover:text-white transition-colors"
          onClick={() => {
            setAuthMode('signin');
            setShowAuthModal(true);
          }}
        >
          <UserCircle size={24} />
        </button>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onToggleMode={toggleMode}
      />

      <ProfilePage
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}