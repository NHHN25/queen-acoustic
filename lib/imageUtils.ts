import { Editor } from '@tiptap/core';
import type { EditorView } from 'prosemirror-view';

export async function handleImagePaste(view: EditorView, event: ClipboardEvent, editor: Editor) {
  const items = Array.from(event.clipboardData?.items || []);
  const imageItems = items.filter(item => item.type.startsWith('image/'));

  if (imageItems.length === 0) return false;

  event.preventDefault();

  for (const item of imageItems) {
    const file = item.getAsFile();
    if (!file) continue;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      editor?.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      console.error('Image paste failed:', error);
      // Optionally show error to user
    }
  }

  return true;
}
