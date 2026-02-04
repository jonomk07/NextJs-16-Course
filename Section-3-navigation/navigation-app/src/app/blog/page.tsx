/**
 * Blog Page - Programmatic Navigation with useRouter
 *
 * This page demonstrates multiple navigation concepts:
 * 1. Search params filtering (from previous lesson)
 * 2. Programmatic navigation with useRouter hook
 *
 * PROGRAMMATIC NAVIGATION:
 * ------------------------
 * Sometimes we need to navigate based on:
 * - Button clicks
 * - Form submissions
 * - Conditional logic
 * - After some async operation completes
 *
 * The Link component is great for static navigation, but
 * useRouter gives us full control over WHEN and HOW to navigate.
 *
 * useRouter METHODS:
 * -----------------
 * - router.push(url)    → Navigate and ADD to history stack
 * - router.replace(url) → Navigate and REPLACE current history entry
 * - router.back()       → Go back (like browser back button)
 * - router.forward()    → Go forward
 * - router.refresh()    → Refresh current route (re-fetch data)
 *
 * push vs replace:
 * ----------------
 * push:    Home → Blog → Post (back goes to Blog)
 * replace: Home → Blog → Post (back goes to Home, Blog is replaced)
 *
 * Use replace when you don't want users to go back to the
 * current page (e.g., after login, after form submission).
 * 
 * 
 * What is useRouter hook?:
 * ------------------------
 * The useRouter hook in Next.js is a built in function that allows you to programmatically control navigation inside client components.
 * It gives you access to the router object, which provides methods like push, replace, refresh, and so on.
 */

"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Blog posts data - in real apps, this would come from a database/API
const blogPosts = [
  { id: 1, title: "Understanding Next.js Routing" },
  { id: 2, title: "Exploring Metadata in Next.js 16" },
  { id: 3, title: "How Layouts Improve UI Consistency" },
];

// Type for the searchParams prop
type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default function BlogPage({ searchParams }: Props) {
  /**
   * useRouter Hook
   *
   * Gives us access to the router object for programmatic navigation.
   * Only works in Client Components (needs "use client").
   */
  const router = useRouter();

  // Unwrap searchParams Promise using use() hook
  const resolvedSearchParams = use(searchParams);
  const query = resolvedSearchParams.query?.toLowerCase() || "";

  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(query)
  );

  /**
   * Handle navigation with router.push()
   *
   * This function demonstrates programmatic navigation.
   * We can add any logic here before navigating:
   * - Validation
   * - Analytics tracking
   * - Data saving
   * - Confirmation dialogs
   */
  const handleGoToPost = (postId: number) => {
    // You could add logic here before navigating
    // e.g., track analytics, validate something, etc.
    router.push(`/blog/${postId}`);
  };

  /**
   * Handle navigation with router.replace()
   *
   * Same as push, but replaces the current history entry.
   * User won't be able to go "back" to this page.
   */
  const handleGoToPostReplace = (postId: number) => {
    router.replace(`/blog/${postId}`);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>

      {/* Show search feedback when a query is present */}
      {query && (
        <p className="mb-4 text-gray-600">
          Showing results for: <span className="font-semibold">{query}</span>
        </p>
      )}

      {/* Blog posts list with programmatic navigation buttons */}
      <ul className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.id} className="flex items-center gap-4">
              {/* Static Link - traditional navigation */}
              <Link
                href={`/blog/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>

              {/*
                Programmatic Navigation Buttons
                These demonstrate router.push() and router.replace()
              */}
              <button
                onClick={() => handleGoToPost(post.id)}
                className="ml-4 px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Go (push)
              </button>

              <button
                onClick={() => handleGoToPostReplace(post.id)}
                className="px-3 py-1 bg-orange-600 text-white rounded text-sm"
              >
                Go (replace)
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </ul>

      {/* Educational info box - Search Params */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
        <h3 className="font-bold text-green-800 mb-2">
          Try Search Queries:
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>
            <Link href="/blog?query=next" className="underline">
              /blog?query=next
            </Link>
          </li>
          <li>
            <Link href="/blog?query=metadata" className="underline">
              /blog?query=metadata
            </Link>
          </li>
          <li>
            <Link href="/blog" className="underline">
              /blog
            </Link>{" "}
            → All posts
          </li>
        </ul>
      </div>

      {/* Educational info box - Programmatic Navigation */}
      <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
        <h3 className="font-bold text-purple-800 mb-2">
          Programmatic Navigation:
        </h3>
        <ul className="text-sm text-purple-700 space-y-2">
          <li>
            <strong className="text-blue-600">Blue button (push):</strong>{" "}
            Navigates and ADDS to history. Press back → returns here.
          </li>
          <li>
            <strong className="text-orange-600">Orange button (replace):</strong>{" "}
            Navigates and REPLACES history. Press back → skips this page!
          </li>
        </ul>
      </div>

      {/* Technical explanation */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">useRouter Hook:</h3>
        <pre className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded overflow-x-auto">
{`const router = useRouter();

// Navigate and add to history
router.push('/blog/1');

// Navigate and replace history
router.replace('/blog/1');

// Go back/forward
router.back();
router.forward();`}
        </pre>
      </div>
    </div>
  );
}
