// =============================================================================
// CONTACT PAGE - NESTED ROUTE EXAMPLE
// =============================================================================
// This file is located at: app/contact/page.tsx
// It renders at the URL: /contact
//
// Nested routing in Next.js:
//   - Folders in the app directory create URL segments
//   - page.tsx inside a folder makes that segment accessible
//
// Route structure example:
//   app/
//   ├── page.tsx           -> /
//   ├── contact/
//   │   └── page.tsx       -> /contact (this file)
//   ├── about/
//   │   ├── page.tsx       -> /about
//   │   └── team/
//   │       └── page.tsx   -> /about/team
//
// This demonstrates the simplest form of a page component:
//   - No props needed
//   - No dynamic routing
//   - Just static content
// =============================================================================

/**
 * ContactPage Component
 * Displays the contact information page.
 * This is a simple static page with no dynamic data.
 */
export default function ContactPage() {
  return (
    <main>
      {/* Page heading */}
      <h1 className="text-5xl font-bold">Contact Us</h1>

      {/* Page content */}
      <p>This page contains our contact information.</p>
    </main>
  );
}