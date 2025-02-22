import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
  })
  const posts = result.docs

  if (!posts || posts.length === 0) {
    notFound()
  }

  const post = posts[0]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Modern Gradient */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0">
          {/* Modern mesh gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(217,175,98,0.15),transparent_45%)]" /> {/* Gold accent */}
          </div>
          {/* Subtle noise texture for depth */}
          <div className="absolute inset-0 opacity-[0.015] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_65%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-wider mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-300 text-sm">
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative -mt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8 md:p-12">
              {/* Mobile Article Header */}
              <header className="md:hidden mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </time>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </header>

              {/* Main Content using lexicalHTML conversion */}
              <div className="prose prose-lg mx-auto">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.htmlcontent }}
                />
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Category: <span className="text-gold-600">News</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-gold-600 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}