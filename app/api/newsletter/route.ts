import { NextRequest, NextResponse } from 'next/server'
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

interface NewsletterFormData {
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterFormData = await request.json()
    const { email } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    try {
      const existingResponse = await cosmic.objects.find({
        type: 'newsletter-subscribers',
        'metadata.email': email
      })

      if (existingResponse.objects && existingResponse.objects.length > 0) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        )
      }
    } catch (error: any) {
      // If 404, no existing subscriber found, which is what we want
      if (error.status !== 404) {
        throw error
      }
    }

    // Create newsletter subscriber in Cosmic CMS
    const { object } = await cosmic.objects.insertOne({
      title: email,
      type: 'newsletter-subscribers',
      metadata: {
        email: email,
        subscribed_at: new Date().toISOString(),
        status: 'Active'
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        id: object.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}