import { getPosts, getCategories, getGalleryImages } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import ImageGallery from '@/components/ImageGallery'
import type { Post, Category, GalleryImage } from '@/types'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const posts = await getPosts() as Post[]
  const categories = await getCategories() as Category[]
  const galleryImages = await getGalleryImages() as GalleryImage[]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🍝 Sapori d&apos;Italia
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover authentic Italian recipes, regional cuisine, and culinary stories 
          from passionate Italian chefs
        </p>
      </section>

      {/* Image Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            📸 Culinary Gallery
          </h2>
          <ImageGallery images={galleryImages} />
        </section>
      )}

      {/* Category Filter */}
      <CategoryFilter categories={categories} />

      {/* Posts Grid */}
      <section className="mt-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recipes found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}