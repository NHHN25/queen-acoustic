import payload, { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations } from '@/constants/translations'

const language = 'vi'
const t = translations[language]

// Helper to convert HTML string to plain text for excerpts
function extractPlainText(html: string): string {
  return html.replace(/<[^>]+>/g, '')
}

export default async function NewsPage() {
  // Ensure Payload is initialized so that the collections (including posts) are loaded
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'posts',
    where: { category: { equals: 'news' } },
    sort: '-createdAt',
  })

  const posts = result.docs

  if (!posts) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - More Compact */}
      <section className="relative h-[40vh] md:h-[50vh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover brightness-75"
            priority
          />
          {/* Overlay with gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-wider mb-4">
              {t.admin.posts.categories.news}
            </h1>
            <div className="h-1 w-24 bg-gold-400 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Posts Cards Section - Refined Design */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              // Strip HTML tags from converted HTML to use as an excerpt
              const plainTextExcerpt = extractPlainText(post.htmlcontent || '')
              return (
                <Link key={post.id} href={`/news/${post.slug}`} className="group">
                  <article className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y--1">
                    {/* Image Container - Fixed Height */}
                    <div className="relative h-48 w-full">
                      {post.coverImage && post.coverImage.url ? (
                        <Image
                          src={post.coverImage.url}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Content Container - Fixed Layout */}
                    <div className="flex flex-col flex-grow p-6">
                      {/* Post Meta */}
                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(post.createdAt).toLocaleDateString(
                          language === 'vi' ? 'vi-VN' : 'en-US'
                        )}
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {plainTextExcerpt.substring(0, 150)}...
                      </p>
                      
                      {/* Read More Link */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <span className="text-gold-600 text-sm font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                          Read More 
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}