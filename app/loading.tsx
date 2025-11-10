export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      <p className="mt-4 text-gray-600">Loading delicious recipes...</p>
    </div>
  )
}