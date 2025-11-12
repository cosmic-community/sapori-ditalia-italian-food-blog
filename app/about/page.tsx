import { getPageBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import type { Page } from '@/types'

export const revalidate = 60 // Revalidate every 60 seconds

export async function generateMetadata() {
  const page = await getPageBySlug('about') as Page | null

  if (!page) {
    return {
      title: 'About - Sapori d\'Italia',
    }
  }

  return {
    title: `${page.metadata.page_title} - Sapori d'Italia`,
    description: page.metadata.subtitle || 'Learn more about Sapori d\'Italia',
  }
}

export default async function AboutPage() {
  const page = await getPageBySlug('about') as Page | null

  if (!page) {
    notFound()
  }

  const heroImage = page.metadata.hero_image
  const showHero = page.metadata.show_hero !== false // Default to true if not set

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {showHero && heroImage && (
        <div className="relative h-[400px] mb-12">
          <img
            src={`${heroImage.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt={page.metadata.page_title}
            className="w-full h-full object-cover"
            width={2000}
            height={800}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl font-bold mb-4">{page.metadata.page_title}</h1>
              {page.metadata.subtitle && (
                <p className="text-xl max-w-2xl mx-auto">{page.metadata.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {!showHero && (
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {page.metadata.page_title}
            </h1>
            {page.metadata.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {page.metadata.subtitle}
              </p>
            )}
          </header>
        )}

        <div className="prose-custom">
          <ReactMarkdown>{page.metadata.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  )
}