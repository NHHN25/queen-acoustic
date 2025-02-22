import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'

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

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  // Destructure slug immediately from params
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="mb-12 text-center text-6xl font-light text-gray-900 tracking-wider">
          {post.title}
        </h1>
        {post.coverImage && post.coverImage.url && (
          <div className="relative h-80 w-full mb-10 rounded-2xl border border-gold-400 shadow-lg overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="prose mx-auto bg-white/90 backdrop-blur-sm rounded-2xl border border-gold-400 p-8 shadow-lg text-left">
          <p className="text-gray-700 leading-relaxed text-xl">
            {extractRichText(post.content)}
          </p>
        </div>
      </div>
    </div>
  )
}