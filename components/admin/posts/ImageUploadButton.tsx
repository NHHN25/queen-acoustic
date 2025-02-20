import { FaImage } from 'react-icons/fa';
import { Editor } from '@tiptap/react';
import { useState, useRef } from 'react';

interface ImageUploadButtonProps {
  editor: Editor | null;
  t: any;
}

export default function ImageUploadButton({ editor, t }: ImageUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="p-2 rounded hover:bg-gray-700 text-gray-300 hover:text-gold-400 disabled:opacity-50"
        title={t.editor.addImage}
      >
        {isUploading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gold-500 border-t-transparent" />
        ) : (
          <FaImage />
        )}
      </button>
    </div>
  );
}
