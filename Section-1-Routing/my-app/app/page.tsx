// =============================================================================
// HOME PAGE - THE ROOT PAGE OF YOUR APPLICATION
// =============================================================================
// This is the HOME PAGE (app/page.tsx) - it renders at the root URL (/).
//
// Key concepts:
//   - page.tsx files define the UI for a specific route
//   - app/page.tsx = "/" (root/home page)
//   - app/about/page.tsx = "/about"
//   - app/products/page.tsx = "/products"
//
// This is a Server Component by default:
//   - Rendered on the server
//   - Can be async and fetch data directly
//   - Cannot use React hooks (useState, useEffect, etc.)
//   - Better for SEO since content is rendered server-side
//
// To make it a Client Component, add "use client" at the top.
// =============================================================================

// Import the Link component from Next.js for client-side navigation
// Link provides:
//   - Prefetching: Automatically prefetches linked pages for faster navigation
//   - Client-side navigation: No full page reload when clicking
//   - Automatic code splitting: Only loads the JavaScript needed for each page
import Link from "next/link";

/**
 * HomePage Component
 * This is the main landing page of the application.
 * It displays a welcome message and navigation links to other sections.
 */
export default function HomePage() {
  return (
    <main>
      {/* Main heading for the home page */}
      <h1 className="text-6xl font-bold">Welcome to the Home Page</h1>

      {/* Navigation links container */}
      {/* flex: Display children in a row */}
      {/* gap-x-6: Add horizontal spacing between links */}
      <div className="flex gap-x-6">
        {/* Link to the About page */}
        {/* The href prop specifies the destination route */}
        <Link href="/about" className="text-lg text-blue-500 underline">
          About Us
        </Link>

        {/* Link to the Contact page */}
        <Link href="/contact" className="text-lg text-blue-500 underline">
          Contact Us
        </Link>

        {/* Link to the Products page */}
        <Link href="/products" className="text-lg text-blue-500 underline">
          Products
        </Link>
      </div>
    </main>
  );
}