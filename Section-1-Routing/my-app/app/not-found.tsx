// =============================================================================
// GLOBAL NOT FOUND PAGE (404 ERROR PAGE)
// =============================================================================
// This file is located at: app/not-found.tsx
// It displays when users visit a URL that doesn't match any route.
//
// CUSTOM 404 PAGES in Next.js:
//   - Create not-found.tsx to replace the default 404 page
//   - app/not-found.tsx = Global 404 for the entire app
//   - app/blog/not-found.tsx = 404 only for /blog/* routes
//   - You can have route-specific 404 pages at any level
//
// When this page is shown:
//   1. User visits a URL that doesn't match any route (e.g., /random-page)
//   2. A page component calls notFound() function from "next/navigation"
//
// "use client" directive:
//   - Required because we use the usePathname hook
//   - Hooks only work in Client Components
//   - Without "use client", this would be a Server Component
//
// Server vs Client Components:
//   - Server Components (default): Rendered on server, no hooks, better SEO
//   - Client Components ("use client"): Rendered on client, can use hooks
//
// usePathname hook:
//   - Returns the current URL path as a string
//   - Allows us to show WHICH page the user tried to visit
//   - Makes the error message more helpful and informative
// =============================================================================

"use client"; // Required to use React hooks (usePathname)

// Link component for client-side navigation back to home
import Link from "next/link";

// usePathname hook to get the current URL path
import { usePathname } from "next/navigation";

/**
 * NotFound Component (Global 404 Page)
 *
 * Displays a custom 404 error page with:
 * - Large "404" heading
 * - The URL path that wasn't found
 * - A button to navigate back home
 */
export default function NotFound() {
  // Get the current URL path that the user tried to visit
  // Example: if user visits /random-page, pathname = "/random-page"
  const pathname = usePathname();

  return (
    // Full-screen container with dark background
    // h-screen: Full viewport height
    // flex flex-col: Stack children vertically
    // items-center justify-center: Center content both ways
    <div className="h-screen flex flex-col items-center justify-center text-center bg-black/90">
      {/* Large 404 heading */}
      <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>

      {/* Error title */}
      <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>

      {/* Error message showing the invalid path */}
      {/* This uses the pathname from usePathname hook */}
      <p className="text-lg text-gray-200 mb-6">
        Sorry, the page{" "}
        <span className="text-xl font-bold text-red-500">{pathname}</span>{" "}
        doesn&apos;t exist.
      </p>

      {/* Navigation link to return to home page */}
      {/* Styled as a button with hover effect */}
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded text-lg font-medium hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}