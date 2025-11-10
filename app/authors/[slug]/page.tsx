// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Author, Post } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.metadata.name} - Sapori d'Italia`,
    description: author.metadata.bio || `Recipes by ${author.metadata.name}`,
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Author Header */}
      <header className="mb-12 text-center">
        {author.metadata.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
            alt={author.metadata.name}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-primary"
            width={150}
            height={150}
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {author.metadata.name}
        </h1>
        {author.metadata.bio && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {author.metadata.bio}
          </p>
        )}
      </header>

      {/* Author's Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recipes by {author.metadata.name}
        </h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recipes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-opacity-80 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all recipes
        </Link>
      </div>
    </div>
  )
}