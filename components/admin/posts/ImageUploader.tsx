import { FaImage } from 'react-icons/fa';

interface ImageUploaderProps {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  onAddImage: () => void;
  t: any;
}

export default function ImageUploader({ imageUrl, onImageUrlChange, onAddImage, t }: ImageUploaderProps) {
  return (
    <div className="bg-gray-50 border-b p-3 flex gap-2">
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => onImageUrlChange(e.target.value)}
        placeholder={t.imageUrl}
        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500"
      />
      <button
        type="button"
        onClick={onAddImage}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
      >
        <FaImage /> {t.addImage}
      </button>
    </div>
  );
}
