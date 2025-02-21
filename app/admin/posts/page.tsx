"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { editorExtensions } from '@/lib/editorExtensions';
import EditorToolbar from '@/components/admin/posts/EditorToolbar';
import PostList from '@/components/admin/posts/PostList';
import PreviewDialog from '@/components/admin/posts/PreviewDialog';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Transaction } from '@tiptap/pm/state';

// Remove unused imports: PageHeader, PostForm, Editor, SubmitButton
// Import Post type from types
import type { Post } from '@/types/editor';

export default function PostsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language, translations } = useLanguage();
  const t = translations[language].admin.posts;
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('news');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageUpload = async (file: File, editor: any) => {
    if (!editor) return;
    
    const { from, to } = editor.state.selection;
    const wasEmpty = from === to;
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const loadingId = `loading-${Date.now()}`;
      editor.chain().focus().insertContent([
        {
          type: 'paragraph',
          content: [{
            type: 'text',
            marks: [{ type: 'loading', attrs: { id: loadingId } }],
            text: '⌛'
          }]
        }
      ]).run();

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const pos = from;
      
      editor.chain()
        .focus()
        .setMeta('preventUpdate', true)
        .command(({ tr }: { tr: Transaction }) => {
          const loadingPos = tr.doc.resolve(pos);
          const node = tr.doc.nodeAt(loadingPos.pos);
          if (node) {
            tr.delete(loadingPos.pos, loadingPos.pos + node.nodeSize);
          }
          return true;
        })
        .setImage({ src: data.url }) // Simplified image insertion
        .run();

      if (!wasEmpty) {
        editor.chain().focus().setTextSelection(pos + 1).run();
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      editor.chain().focus().undo().run();
    }
  };

  const editor = useEditor({
    extensions: editorExtensions,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[300px] focus:outline-none prose-headings:text-gray-100 prose-p:text-gray-100 prose-li:text-gray-100 prose-strong:text-gray-50 bg-gray-800/50 p-4 rounded-lg border border-gray-600',
      },
      handlePaste: (view, event) => {
        if (!event.clipboardData) return false;
        const files = Array.from(event.clipboardData.files);
        
        if (files.some(file => file.type.startsWith('image/'))) {
          event.preventDefault();
          const imageFile = files.find(file => file.type.startsWith('image/'));
          if (imageFile) {
            handleImageUpload(imageFile, editor);
          }
          return true;
        }
        return false;
      },
      handleDrop: (view, event) => {
        if (event.dataTransfer) {
          const files = Array.from(event.dataTransfer.files);
          if (files.some(file => file.type.startsWith('image/'))) {
            event.preventDefault();
            const imageFile = files.find(file => file.type.startsWith('image/'));
            if (imageFile) {
              handleImageUpload(imageFile, editor);
            }
            return true;
          }
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
      return;
    }

    let mounted = true;

    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/posts');
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch posts');
          }
          
          if (mounted) {
            setPosts(data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Failed to fetch posts:', error instanceof Error ? error.message : 'Unknown error');
          if (mounted) {
            setIsLoading(false);
          }
        }
      };

      fetchData();
    }

    return () => {
      mounted = false;
    };
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor || !session?.user?.id) return;

    setIsLoading(true);
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const content = editor.getHTML();

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content, 
          category, 
          slug,
          authorId: session.user.id // Explicitly include authorId
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create post');
      }

      // Refresh posts list
      const postsResponse = await fetch('/api/posts');
      if (!postsResponse.ok) {
        throw new Error('Failed to refresh posts');
      }

      const updatedPosts = await postsResponse.json();
      setPosts(updatedPosts);
      setTitle('');
      editor.commands.clearContent();
    } catch (error) {
      console.error('Failed to handle post:', error);
      // Add error notification here if needed
    } finally {
      setIsLoading(false);
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  if (status === "loading" || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">{t.title}</h1>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-md hover:from-gold-700 hover:to-gold-600 transition-colors"
            >
              {t.preview}
            </button>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-lg border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.postTitle}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                  required
                />
                
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="news">{t.categories.news}</option>
                  <option value="events">{t.categories.events}</option>
                </select>
              </div>

              <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800">
                <EditorToolbar
                  editor={editor}
                  t={t}
                  onAddLink={addLink}
                  onAddTable={addTable}
                />
                <div className="relative">
                  <EditorContent 
                    editor={editor}
                    className="prose prose-invert prose-lg max-w-none min-h-[300px] focus:outline-none"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-md font-medium hover:from-gold-700 hover:to-gold-600 disabled:opacity-50 transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isLoading ? t.creating : t.save}
                </button>
              </div>
            </form>
          </div>

          <PostList posts={posts} t={t} />
        </div>
      </div>
      <PreviewDialog
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={title}
        content={editor?.getHTML()}
      />
    </div>
  );
}