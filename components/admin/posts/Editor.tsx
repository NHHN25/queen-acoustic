import { Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';

interface EditorProps {
  editor: Editor | null;
  isLoading?: boolean;
}

export default function EditorWrapper({ editor, isLoading }: EditorProps) {
  return (
    <div className="p-4 bg-white border-t relative">
      <EditorContent editor={editor} className="text-gray-900 min-h-[300px]" />
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}
