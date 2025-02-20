"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useEditor } from '@tiptap/react';
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
        class: 'prose prose-lg max-w-none min-h-[300px] focus:outline-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-900 bg-white p-4',
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
          if (!response.ok) throw new Error('Failed to fetch posts');
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error('Failed to fetch posts:', error);
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

      if (!response.ok) throw new Error('Failed to create post');
      
      const updatedPostsResponse = await fetch('/api/posts');
      if (updatedPostsResponse.ok) {
        const updatedPosts = await updatedPostsResponse.json();
        setPosts(updatedPosts);
      }
      
      setTitle('');
      editor.commands.clearContent();
    } catch (error) {
      console.error('Failed to create post:', error);
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <PageHeader title={t.title} onPreview={() => setShowPreview(true)} t={t} />
          
          <div className="bg-white shadow-lg rounded-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <PostForm
                title={title}
                category={category}
                onTitleChange={setTitle}
                onCategoryChange={setCategory}
                t={t}
              />

              <div className="border rounded-lg overflow-hidden">
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
                <Editor editor={editor} isLoading={isLoading} />
              </div>

              <SubmitButton isLoading={isLoading} t={t} />
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
