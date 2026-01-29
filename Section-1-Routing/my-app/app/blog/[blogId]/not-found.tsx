// =============================================================================
// BLOG-SPECIFIC NOT FOUND PAGE
// =============================================================================
// This is a custom 404 page specifically for the blog section.
// It is placed inside app/blog/[blogId]/not-found.tsx
//
// How it works:
//   - When notFound() is called from page.tsx in this folder, THIS page is shown
//   - It provides a blog-specific error message instead of the generic global 404
//   - This allows different sections of your app to have different 404 pages
//
// Route-specific not-found pages:
//   - app/not-found.tsx           -> Global 404 for the entire app
//   - app/blog/[blogId]/not-found.tsx -> 404 only for /blog/* routes (this file)
//   - You can create not-found.tsx in any route folder for custom 404s
//
// This page is triggered when:
//   - A user visits /blog/101 or higher (see page.tsx for the condition)
//   - The notFound() function is called from the page component
// =============================================================================

import Link from "next/link";

export default function BlogNotFound() {
  return (
    // Full-screen container with dark background and centered content
    <div className="h-screen flex flex-col items-center justify-center text-center bg-black/90">
      {/* Large 404 heading */}
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>

      {/* Blog-specific error message (different from global 404) */}
      <h2 className="text-2xl font-semibold text-white mb-2">
        Oops, this blog post doesn&apos;t exist
      </h2>

      {/* Helpful description for the user */}
      <p className="text-lg text-gray-200 mb-6">
        Looks like this blog post is missing or has been removed.
      </p>

      {/* Navigation link to return to home page */}
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded text-lg font-medium hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
