// =============================================================================
// ABOUT PAGE - PARENT ROUTE WITH NESTED CHILD ROUTES
// =============================================================================
// This file is located at: app/about/page.tsx
// It renders at the URL: /about
//
// This page demonstrates:
//   1. A parent route that has child routes (nested routing)
//   2. Using the Link component for internal navigation
//
// Folder structure:
//   app/about/
//   ├── page.tsx       -> /about (this file)
//   └── team/
//       └── page.tsx   -> /about/team (child route)
//
// The /about route exists independently from /about/team.
// Users can visit either:
//   - /about (shows this page)
//   - /about/team (shows the team page)
//
// Note: If you want to share layout between /about and /about/team,
// you can create app/about/layout.tsx
// =============================================================================

// Import Link for client-side navigation to child routes
import Link from "next/link";

/**
 * AboutPage Component
 * Displays information about the application and links to child pages.
 */
export default function AboutPage() {
  return (
    <main>
      {/* Page heading */}
      <h1 className="text-5xl font-bold">About Us</h1>

      {/* Link to the nested team page (/about/team) */}
      {/* This demonstrates navigation to a child route */}
      <Link
        href="/about/team"
        className="text-lg text-blue-500 underline mr-4"
      >
        Meet Our Team
      </Link>

      {/* Page content */}
      <p>This page contains information about our application.</p>
    </main>
  );
}