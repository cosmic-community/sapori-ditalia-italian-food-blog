import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="flex flex-wrap justify-center gap-4">
      <Link
        href="/"
        className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
      >
        All Recipes
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-medium hover:border-primary hover:text-primary transition-colors"
        >
          {category.metadata.name}
        </Link>
      ))}
    </section>
  )
}