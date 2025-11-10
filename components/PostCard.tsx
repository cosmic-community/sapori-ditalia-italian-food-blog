import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata.featured_image
  const author = post.metadata.author
  const category = post.metadata.category

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        {featuredImage && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={400}
              height={300}
            />
          </div>
        )}
        
        <div className="p-6">
          {category && (
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
              {category.metadata.name}
            </span>
          )}
          
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
            {post.metadata.title}
          </h2>
          
          {author && (
            <div className="flex items-center gap-2 mt-4">
              {author.metadata.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  className="w-8 h-8 rounded-full object-cover"
                  width={40}
                  height={40}
                />
              )}
              <p className="text-sm text-gray-600">
                by <span className="font-medium text-gray-900">{author.metadata.name}</span>
              </p>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}