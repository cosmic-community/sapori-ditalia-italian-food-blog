// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// Post interface
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
  };
}

// Page interface
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    page_title: string;
    subtitle?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    content: string;
    show_hero?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guard for posts
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

// Type guard for authors
export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

// Type guard for categories
export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Type guard for pages
export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}