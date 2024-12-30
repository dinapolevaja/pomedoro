import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Camera } from 'lucide-react';
import { ImageCropper } from './ImageCropper';
import { useAvatar } from '../../hooks/useAvatar';

interface UserAvatarProps {
  user: User;
  size?: number;
  showUploadButton?: boolean;
}

export function UserAvatar({ user, size = 128, showUploadButton = false }: UserAvatarProps) {
  const { avatarUrl, loading, uploadAvatar } = useAvatar();
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setTempImageUrl(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    try {
      await uploadAvatar(croppedBlob as File);
      setShowCropper(false);
      setTempImageUrl(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  if (loading) {
    return (
      <div 
        className="bg-gray-700 rounded-full flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#39FF14] border-t-transparent" />
      </div>
    );
  }

  if (!avatarUrl) {
    const initials = user.email?.[0].toUpperCase() || '?';
    return (
      <div className="relative">
        <div 
          className="bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: size, height: size, fontSize: size * 0.4 }}
        >
          {initials}
        </div>
        {showUploadButton && (
          <label className="absolute bottom-0 right-0 bg-[#39FF14] rounded-full p-2 cursor-pointer hover:bg-[#39FF14]/90 transition-colors">
            <Camera size={20} className="text-gray-900" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        )}
        {showCropper && tempImageUrl && (
          <ImageCropper
            imageUrl={tempImageUrl}
            onCropComplete={handleCropComplete}
            onClose={() => {
              setShowCropper(false);
              setTempImageUrl(null);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={avatarUrl}
        alt="User avatar"
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
      {showUploadButton && (
        <label className="absolute bottom-0 right-0 bg-[#39FF14] rounded-full p-2 cursor-pointer hover:bg-[#39FF14]/90 transition-colors">
          <Camera size={20} className="text-gray-900" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      )}
      {showCropper && tempImageUrl && (
        <ImageCropper
          imageUrl={tempImageUrl}
          onCropComplete={handleCropComplete}
          onClose={() => {
            setShowCropper(false);
            setTempImageUrl(null);
          }}
        />
      )}
    </div>
  );
}