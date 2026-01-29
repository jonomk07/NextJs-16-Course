// ============================================
// DYNAMIC BLOG POST PAGE - app/(main)/blog/[postId]/page.tsx
// ============================================
// This page uses a DYNAMIC ROUTE segment: [postId]
//
// DYNAMIC ROUTES EXPLAINED:
// Square brackets [] indicate a dynamic route segment
// This means ANY URL matching /blog/[something] will be handled here:
// - /blog/100 → postId = "100"
// - /blog/typescript-tips → postId = "typescript-tips"
// - /blog/nextjs-15-updates → postId = "nextjs-15-updates"
//
// The value inside the URL becomes available as a parameter

// Import Metadata type for the generateMetadata function
import type { Metadata } from "next";

// ============================================
// DYNAMIC METADATA WITH generateMetadata
// ============================================
// Static metadata (export const metadata = {...}) is fixed at build time
// But what if we need DIFFERENT metadata for each blog post?
//
// generateMetadata function allows us to:
// - Generate metadata DYNAMICALLY based on route parameters
// - Fetch data from an API and use it in metadata
// - Create unique titles/descriptions for each page
//
// This is essential for SEO on dynamic pages like:
// - Blog posts (each post needs unique title/description)
// - Product pages (each product has different info)
// - User profiles (personalized metadata)

// Define the params type for TypeScript
type Props = {
  params: Promise<{ postId: string }>;
};

// ============================================
// generateMetadata FUNCTION
// ============================================
// This function runs on the server BEFORE the page renders
// It receives the same props as the page component (params, searchParams)
// Must return a Metadata object (or Promise<Metadata>)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await the params (required in Next.js 16)
  const { postId } = await params;

  // In a real app, you might fetch post data from an API:
  // const post = await fetch(`/api/posts/${postId}`).then(res => res.json());
  // return { title: post.title, description: post.excerpt };

  // For this example, we generate metadata from the postId
  return {
    // Dynamic title - each post gets a unique title
    // /blog/typescript-tips → "Blog Post: typescript-tips"
    // /blog/nextjs-15-updates → "Blog Post: nextjs-15-updates"
    title: `Blog Post: ${postId}`,

    // Dynamic description - adapts to the post ID
    // Helps search engines understand each post's content
    description: `Read an in-depth blog post about ${postId}`,
  };
}

// ============================================
// WHY generateMetadata INSTEAD OF STATIC METADATA?
// ============================================
//
// STATIC METADATA (in layout or page):
// export const metadata: Metadata = {
//   title: "Blog Post",           ← Same for ALL posts
//   description: "A blog post",   ← Not useful for SEO
// };
//
// DYNAMIC METADATA (generateMetadata):
// /blog/react-hooks → title: "Blog Post: react-hooks"
// /blog/css-grid → title: "Blog Post: css-grid"
// /blog/api-design → title: "Blog Post: api-design"
//
// Each page gets UNIQUE metadata for better SEO!

// ============================================
// PAGE COMPONENT
// ============================================
// The page component also receives params as a prop
// We can use the postId to display relevant content

export default async function BlogPost({ params }: Props) {
  // Await the params (required in Next.js 16)
  const { postId } = await params;

  return (
    // Display the dynamic post ID
    // In a real app, you'd fetch and display the actual post content
    <div className="text-2xl">
      This is a Blog Post: {postId}
    </div>
  );
}

// ============================================
// HOW IT ALL WORKS TOGETHER
// ============================================
//
// When user visits /blog/typescript-tips:
//
// 1. Next.js matches the URL to this dynamic route
// 2. params = { postId: "typescript-tips" }
// 3. generateMetadata() runs first:
//    - Returns { title: "Blog Post: typescript-tips", ... }
// 4. Next.js injects metadata into <head>
// 5. BlogPost() component renders with the postId
//
// INSPECT THE PAGE (DevTools > Elements > <head>):
// <title>Blog Post: typescript-tips</title>
// <meta name="description" content="Read an in-depth blog post about typescript-tips">
//
// ============================================
// METADATA PRECEDENCE RECAP
// ============================================
//
// For /blog/typescript-tips, metadata comes from:
// 1. ✅ generateMetadata in THIS FILE (most specific - WINS)
// 2. ⏭️ Static metadata in blog/layout.tsx (skipped)
// 3. ⏭️ Static metadata in (main)/layout.tsx (skipped)
//
// The most specific metadata always takes precedence!
//
// ============================================
// REAL-WORLD USAGE
// ============================================
//
// In production, you'd typically:
//
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { postId } = await params;
//
//   // Fetch post data from database or CMS
//   const post = await getPostBySlug(postId);
//
//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       images: [post.coverImage],
//     },
//   };
// }
