# 🍝 Sapori d'Italia - Italian Food Blog

![App Preview](https://imgix.cosmicjs.com/40101f80-bdc9-11f0-a34a-efbcf979242c-photo-1571877227200-a0d98ea607e9-1762733250431.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive Italian food blog built with Next.js 16 and powered by Cosmic CMS. Discover authentic Italian recipes, regional cuisine, and culinary stories from passionate Italian chefs.

## ✨ Features

- 🍝 **Recipe Collection** - Browse beautiful Italian recipes with high-quality imagery
- 👨‍🍳 **Chef Profiles** - Learn about the authors behind each recipe
- 🏷️ **Category Navigation** - Filter recipes by Pasta, Desserts, and Regional Cuisine
- 📱 **Responsive Design** - Perfect experience on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized with Next.js 16 App Router and Server Components
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- 🖼️ **Image Optimization** - Automatic image optimization with imgix

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69112c745f36282002396f8d&clone_repository=69112d8e5f36282002396fa8)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for an Italy food blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for an Italy food blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework** - Next.js 16 with App Router
- **Language** - TypeScript
- **Styling** - Tailwind CSS
- **CMS** - Cosmic (Headless CMS)
- **Image Optimization** - imgix
- **Package Manager** - Bun

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the Italy Food Blog bucket

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd sapori-italia
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=italy-food-blog-production
COSMIC_READ_KEY=your_read_key_here
```

Your Cosmic environment variables are automatically configured for this project.

4. **Run the development server**
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📚 Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'authentic-carbonara-the-roman-way'
  })
  .depth(1)
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🔗 Cosmic CMS Integration

This application uses the Cosmic SDK to fetch content. The main integration points are:

- **Posts** - Recipe articles with title, content (markdown), featured image, author, and category
- **Authors** - Chef profiles with name, bio, and profile photo
- **Categories** - Recipe categories with name and description

All content is fetched server-side for optimal performance and SEO.

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy with Vercel" button
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the "Deploy to Netlify" button
2. Connect your GitHub repository
3. Add your environment variables in the Netlify dashboard
4. Deploy!

## 📁 Project Structure

```
sapori-italia/
├── app/
│   ├── page.tsx              # Homepage with recipe grid
│   ├── layout.tsx            # Root layout with header
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx      # Individual recipe pages
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx      # Category filtered pages
│   └── authors/
│       └── [slug]/
│           └── page.tsx      # Author profile pages
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── PostCard.tsx          # Recipe card component
│   ├── CategoryFilter.tsx    # Category navigation
│   └── CosmicBadge.tsx       # Built with Cosmic badge
├── lib/
│   └── cosmic.ts             # Cosmic SDK configuration
├── types.ts                  # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console logging for dashboard
```

## 🎨 Customization

- **Colors** - Edit `tailwind.config.js` and `app/globals.css`
- **Fonts** - Modify the font imports in `app/layout.tsx`
- **Layout** - Adjust components in the `components/` directory
- **Content Types** - Add new object types in your Cosmic dashboard

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Credits

- Built with [Cosmic](https://www.cosmicjs.com?utm_source=bucket_italy-food-blog-production&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic)
- Powered by [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)

<!-- README_END -->