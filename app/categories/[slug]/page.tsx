// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Category, Post } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories() as Category[]
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata.name} - Sapori d'Italia`,
    description: category.metadata.description || `Browse ${category.metadata.name} recipes`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <header className="mb-12 text-center">
        <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
          {category.metadata.name}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.metadata.name} Recipes
        </h1>
        {category.metadata.description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.metadata.description}
          </p>
        )}
      </header>

      {/* Posts Grid */}
      <section>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recipes in this category yet.</p>
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