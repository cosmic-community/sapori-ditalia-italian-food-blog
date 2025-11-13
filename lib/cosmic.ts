import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all posts with depth to include authors and categories
export async function getPosts() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts'
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts');
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug
      })
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch post');
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'categories'
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'categories',
        slug
      });
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// Fetch posts by category ID
export async function getPostsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by category');
  }
}

// Fetch author by slug
export async function getAuthorBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'authors',
        slug
      });
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
  }
}

// Fetch posts by author ID
export async function getPostsByAuthor(authorId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by author');
  }
}

// Fetch page by slug
export async function getPageBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'pages',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch page');
  }
}

// Fetch all newsletter subscribers
export async function getNewsletterSubscribers() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'newsletter-subscribers'
      })
      .props(['id', 'title', 'metadata', 'created_at']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch newsletter subscribers');
  }
}

// Fetch carousel images (automatic slideshow)
export async function getCarouselImages() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'homepage-carousel',
        slug: 'homepage-carousel'
      })
      .props(['id', 'title', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch carousel images');
  }
}

// Fetch all gallery images (clickable grid with lightbox)
export async function getGalleryImages() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'gallery-images'
      })
      .props(['id', 'title', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch gallery images');
  }
}

// Fetch product of the day
export async function getProductOfTheDay() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'product-of-the-day',
        slug: 'product-of-the-day'
      })
      .props(['id', 'title', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product of the day');
  }
}