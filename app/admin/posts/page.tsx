"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { editorExtensions } from '@/lib/editorExtensions';
import EditorToolbar from '@/components/admin/posts/EditorToolbar';
import PreviewDialog from '@/components/admin/posts/PreviewDialog';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Transaction } from '@tiptap/pm/state';
import { FaNewspaper, FaCalendarAlt, FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import type { Post } from '@/types/editor';

type PostCategory = 'news' | 'events';
type EditorMode = 'create' | 'edit';

export default function PostsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language, translations } = useLanguage();
  const t = translations[language].admin.posts;
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PostCategory>('news');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editorMode, setEditorMode] = useState<EditorMode>('create');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeView, setActiveView] = useState<'editor' | PostCategory>('editor');

  const handleImageUpload = async (file: File, editor: Editor | null) => {
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
          if (imageFile && editor) {
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
            if (imageFile && editor) {
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

    if (status === "authenticated" && activeView !== 'editor') {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/posts?category=${activeView}`);
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch posts');
          }
          
          if ( mounted) {
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
  }, [status, router, activeView]);

  const resetEditor = () => {
    setTitle('');
    setCategory('news');
    setSelectedPost(null);
    setEditorMode('create');
    editor?.commands.clearContent();
  };

  const editPost = (post: Post) => {
    setTitle(post.title);
    setCategory(post.category as PostCategory);
    setSelectedPost(post);
    setEditorMode('edit');
    setActiveView('editor');
    editor?.commands.setContent(post.content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor || !session?.user?.id) return;

    setIsLoading(true);
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const content = editor.getHTML();
    const method = editorMode === 'create' ? 'POST' : 'PATCH';
    const endpoint = '/api/posts' + (editorMode === 'edit' && selectedPost ? `/${selectedPost.id}` : '');

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(editorMode === 'edit' ? { id: selectedPost?.id } : {}),
          title,
          content,
          category,
          slug,
          authorId: session.user.id
        }),
      });

      if (!response.ok) throw new Error('Failed to save post');

      // Refresh posts
      await fetchPosts();
      resetEditor();
    } catch (error) {
      console.error('Failed to handle post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm(t.deleteConfirm)) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: postId }),
      });

      if (!response.ok) throw new Error('Failed to delete post');
      await fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = useCallback(async () => {
    if (activeView === 'editor') return;
    
    try {
      const response = await fetch(`/api/posts?category=${activeView}`);
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to fetch posts');
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  }, [activeView]);

  useEffect(() => {
    if (activeView !== 'editor') {
      fetchPosts();
    }
  }, [activeView, fetchPosts]);

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  const navigationItems = [
    { id: 'editor', label: t.editor.title, icon: <FaPlus /> },
    { id: 'news', label: t.categories.news, icon: <FaNewspaper /> },
    { id: 'events', label: t.categories.events, icon: <FaCalendarAlt /> },
  ];

  if (status === "loading" || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-gray-900/50 border-r border-gray-700">
          <nav className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id as typeof activeView);
                    if (item.id === 'editor') resetEditor();
                  }}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-gold-600/20 text-gold-400'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {activeView === 'editor' ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">
                      {editorMode === 'create' ? t.createPost : t.editPost}
                    </h1>
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
                          onChange={(e) => setCategory(e.target.value as PostCategory)}
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
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">
                      {t.categories[activeView as PostCategory]}
                    </h1>
                  </div>
                  <div className="space-y-4">
                    {posts.filter(post => post.category === activeView).map((post) => (
                      <div key={post.id} className="bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-lg p-6 border border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl font-bold text-gray-100">{post.title}</h2>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => editPost(post)}
                              className="p-2 text-gray-400 hover:text-gold-400 transition-colors"
                              title={t.edit}
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                              title={t.delete}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </div>
                        <div 
                          className="prose prose-invert prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
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