import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { cosmic } from '@/lib/cosmic'
import type { ProductOfTheDay } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: Request) {
  try {
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Fetch the product from Cosmic
    const response = await cosmic.objects.findOne({
      type: 'product-of-the-day',
      id: productId,
    })

    const product = response.object as ProductOfTheDay

    if (!product || !product.metadata.available) {
      return NextResponse.json(
        { error: 'Product not available' },
        { status: 404 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.metadata.currency || 'usd',
            product_data: {
              name: product.metadata.product_name,
              description: product.metadata.description,
              images: product.metadata.product_image
                ? [`${product.metadata.product_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`]
                : [],
            },
            unit_amount: Math.round(product.metadata.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/?canceled=true`,
      metadata: {
        productId: product.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}