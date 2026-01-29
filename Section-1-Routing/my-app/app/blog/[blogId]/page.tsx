// =============================================================================
// BLOG POST PAGE - DYNAMIC ROUTE WITH PROGRAMMATIC NOT FOUND
// =============================================================================
// This file is located at: app/blog/[blogId]/page.tsx
// It renders at URLs like: /blog/1, /blog/42, /blog/100
//
// This page demonstrates several Next.js concepts:
//
// 1. DYNAMIC ROUTING:
//    - [blogId] captures the blog post ID from the URL
//    - /blog/42 -> blogId = "42"
//
// 2. PROGRAMMATIC NOT FOUND:
//    - The notFound() function triggers the 404 page
//    - Here we use it when blogId > 100 (simulating "post not found")
//    - In real apps, you'd check if the post exists in the database
//
// 3. FILE CO-LOCATION:
//    - BlogContent.tsx is in the same folder but doesn't create a route
//    - Only page.tsx, layout.tsx, and other special files create routes
//    - Visiting /blog/1/BlogContent returns 404
//
// 4. ROUTE-SPECIFIC NOT FOUND PAGE:
//    - When notFound() is called here, it shows app/blog/[blogId]/not-found.tsx
//    - NOT the global app/not-found.tsx
//    - This allows blog-specific error messages
//
// notFound() function:
//   - Imported from "next/navigation"
//   - Immediately stops rendering and shows the nearest not-found.tsx
//   - Useful for handling missing data, invalid IDs, unauthorized access
// =============================================================================

// Import notFound to programmatically trigger the 404 page
import { notFound } from "next/navigation";

// Import the co-located BlogContent component
// This is file co-location - related files in the same folder
import BlogContent from "./BlogContent";

/**
 * BlogPost Component
 *
 * Renders a blog post page based on the blogId from the URL.
 * If blogId > 100, triggers the blog-specific 404 page.
 *
 * @param params - Promise containing blogId from the URL
 */
export default async function BlogPost({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  // Await the params Promise (required in Next.js 15+)
  const { blogId } = await params;

  // Simulate checking if blog post exists
  // In a real app, you'd query a database here
  // If post doesn't exist, call notFound()
  if (parseInt(blogId) > 100) {
    // This triggers app/blog/[blogId]/not-found.tsx (route-specific 404)
    // The page stops rendering here - nothing below this line executes
    notFound();
  }

  // Render the blog content using the co-located component
  // BlogContent handles the actual UI rendering
  return <BlogContent blogId={blogId} />;
}
