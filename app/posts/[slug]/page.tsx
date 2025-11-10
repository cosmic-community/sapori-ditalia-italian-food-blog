// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import type { Post } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts() as Post[]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    return {
      title: 'Recipe Not Found',
    }
  }

  return {
    title: `${post.metadata.title} - Sapori d'Italia`,
    description: post.metadata.content?.substring(0, 160) || 'Authentic Italian recipe',
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  const author = post.metadata.author
  const category = post.metadata.category
  const featuredImage = post.metadata.featured_image

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-auto"
            width={1200}
            height={600}
          />
        </div>
      )}

      {/* Post Header */}
      <header className="mb-8">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4 hover:bg-opacity-90 transition-colors"
          >
            {category.metadata.name}
          </Link>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.metadata.title}
        </h1>
        
        {/* Author Info */}
        {author && (
          <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
            {author.metadata.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                className="w-12 h-12 rounded-full object-cover"
                width={50}
                height={50}
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{author.metadata.name}</p>
              <p className="text-sm text-gray-500">Chef & Recipe Author</p>
            </div>
          </Link>
        )}
      </header>

      {/* Post Content */}
      <div className="prose-custom">
        <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
      </div>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-gray-200">
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
    </article>
  )
}