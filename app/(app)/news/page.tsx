import payload, { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { translations } from '@/constants/translations'

const language = 'vi'
const t = translations[language]

// Helper functions to extract plain text from Lexical JSON
function extractText(node: any): string {
  if (typeof node === 'string') return node
  if (node.text) return node.text
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractText).join(' ')
  }
  return ''
}

function extractRichText(content: any): string {
  if (content && content.root && content.root.children) {
    return content.root.children.map(extractText).join(' ')
  }
  return ''
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-4">
      <h1 className="mb-12 text-center text-6xl font-light text-gold-600 tracking-wider">
        {t.admin.posts.categories.news}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post: any) => (
          <Link key={post.id} href={`/news/${post.slug}`} className="group">
            <div className="flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-gold-400 shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:scale-105">
              {post.coverImage && post.coverImage.url && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.coverImage.url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col flex-grow p-6">
                <h2 className="mb-3 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gold-600">
                  {post.title}
                </h2>
                <div className="mb-3 text-sm text-gray-600">
                  {new Date(post.createdAt).toLocaleDateString(
                    language === 'vi' ? 'vi-VN' : 'en-US'
                  )}
                </div>
                <p className="text-gray-700 flex-grow leading-relaxed">
                  {extractRichText(post.content).substring(0, 120)}...
                </p>
                <div className="mt-4 text-right">
                  <span className="text-gold-600 font-medium">Read More →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}