'use client'

import { useState } from 'react'
import type { ProductOfTheDay } from '@/types'

interface ProductOfTheDayCardProps {
  product: ProductOfTheDay
}

export default function ProductOfTheDayCard({ product }: ProductOfTheDayCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(price)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Product Image */}
        {product.metadata.product_image && (
          <div className="md:w-1/2">
            <img
              src={`${product.metadata.product_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={product.metadata.product_name}
              className="w-full h-full object-cover"
              width={800}
              height={800}
            />
          </div>
        )}

        {/* Product Details */}
        <div className="md:w-1/2 p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Today&apos;s Special
            </span>
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.metadata.price, product.metadata.currency)}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {product.metadata.product_name}
          </h3>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.metadata.description}
          </p>

          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className={`w-full bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors ${
              isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-red-700 active:bg-red-800'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              <>🛒 Buy Now with Stripe</>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </div>
  )
}