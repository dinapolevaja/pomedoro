import { useState, useRef } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X } from 'lucide-react';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedBlob: Blob) => void;
  onClose: () => void;
}

export function ImageCropper({ imageUrl, onCropComplete, onClose }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5,
    aspect: 1
  });
  
  const imgRef = useRef<HTMLImageElement>(null);

  const getCroppedImg = async () => {
    if (!imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );

    return new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
        },
        'image/jpeg',
        0.95
      );
    });
  };

  const handleCropComplete = async () => {
    const croppedBlob = await getCroppedImg();
    if (croppedBlob) {
      onCropComplete(croppedBlob);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Crop Image</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            aspect={1}
            circularCrop
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop preview"
              className="max-h-[60vh] w-auto"
            />
          </ReactCrop>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleCropComplete}
            className="px-4 py-2 rounded-lg bg-[#39FF14] text-gray-900 hover:bg-[#39FF14]/90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}