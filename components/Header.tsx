import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">🍝</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sapori d&apos;Italia</h1>
              <p className="text-xs text-gray-500">Authentic Italian Recipes</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Recipes
            </Link>
            <Link 
              href="/categories/pasta" 
              className="text-gray-700 hover:text-primary transition-colors font-medium hidden sm:block"
            >
              Pasta
            </Link>
            <Link 
              href="/categories/desserts" 
              className="text-gray-700 hover:text-primary transition-colors font-medium hidden sm:block"
            >
              Desserts
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}