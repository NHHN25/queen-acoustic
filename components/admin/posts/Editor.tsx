import { Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';

interface EditorProps {
  editor: Editor | null;
  isLoading?: boolean;
  className?: string;
}

export default function EditorWrapper({ editor, isLoading, className }: EditorProps) {
  return (
    <div className="p-4 bg-gray-700/50 border-t border-gray-700 relative">
      <EditorContent 
        editor={editor} 
        className={`prose prose-invert prose-lg max-w-none min-h-[300px] focus:outline-none text-gray-100 ${className}`}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500"></div>
        </div>
      )}
    </div>
  );
}
