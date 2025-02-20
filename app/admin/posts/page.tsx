"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { editorExtensions } from '@/lib/editorExtensions';
import EditorToolbar from '@/components/admin/posts/EditorToolbar';
import ImageUploader from '@/components/admin/posts/ImageUploader';
import PostList from '@/components/admin/posts/PostList';
import PageHeader from '@/components/admin/posts/PageHeader';
import PostForm from '@/components/admin/posts/PostForm';
import Editor from '@/components/admin/posts/Editor';
import SubmitButton from '@/components/admin/posts/SubmitButton';
import PreviewDialog from '@/components/admin/posts/PreviewDialog';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  slug: string;
}

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
  const [imageUrl, setImageUrl] = useState('');

  const editor = useEditor({
    extensions: editorExtensions,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[300px] focus:outline-none prose-headings:text-gray-100 prose-p:text-gray-100 prose-li:text-gray-100 prose-strong:text-gray-50 bg-gray-800/50 p-4 rounded-lg border border-gray-600',
      },
    },
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }

    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch('/api/posts');
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch posts');
          }
          
          setPosts(data);
        } catch (error) {
          console.error('Failed to fetch posts:', error instanceof Error ? error.message : 'Unknown error');
          // Optionally show error to user
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    setIsLoading(true);
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const content = editor.getHTML();

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category, slug }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      const updatedPostsResponse = await fetch('/api/posts');
      const updatedData = await updatedPostsResponse.json();
      
      if (!updatedPostsResponse.ok) {
        throw new Error(updatedData.error || 'Failed to fetch updated posts');
      }
      
      setPosts(updatedData);
      setTitle('');
      editor.commands.clearContent();
    } catch (error) {
      console.error('Failed to handle post:', error instanceof Error ? error.message : 'Unknown error');
      // Optionally show error to user
    } finally {
      setIsLoading(false);
    }
  };

  const addImage = () => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
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

  if (status === "loading") {
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
                <ImageUploader
                  imageUrl={imageUrl}
                  onImageUrlChange={setImageUrl}
                  onAddImage={addImage}
                  t={t}
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

          <div className="mt-8 space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-800/50 backdrop-blur-sm shadow-xl rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors">
                <h2 className="text-xl font-bold text-gray-100">{post.title}</h2>
                <p className="mt-1 text-sm text-gray-400">
                  {t.category}: {t.categories[post.category as keyof typeof t.categories]}
                </p>
                <div 
                  className="mt-4 prose prose-invert prose-sm max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            ))}
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