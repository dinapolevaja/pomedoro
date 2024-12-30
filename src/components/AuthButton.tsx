import { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function AuthButton() {
  const [showSignIn, setShowSignIn] = useState(false);
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <>
      <button
        className="text-gray-400 hover:text-white transition-colors"
        onClick={() => setShowSignIn(true)}
      >
        <UserCircle size={24} />
      </button>

      {user && (
        <div className="absolute top-12 right-4 bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="text-sm text-gray-400 mb-2">{user.email}</div>
          <button
            className="text-[#39FF14] hover:text-[#39FF14]/80 text-sm"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}