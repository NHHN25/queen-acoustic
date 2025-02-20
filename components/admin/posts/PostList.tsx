interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  slug: string;
}

interface PostListProps {
  posts: Post[];
  t: any;
}

export default function PostList({ posts, t }: PostListProps) {
  return (
    <div className="mt-8 space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
          <p className="mt-1 text-sm text-gray-600">
            {t.category}: {t.categories[post.category as keyof typeof t.categories]}
          </p>
          <div
            className="mt-4 prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      ))}
    </div>
  );
}
