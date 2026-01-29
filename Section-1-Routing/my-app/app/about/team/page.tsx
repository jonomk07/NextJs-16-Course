// =============================================================================
// TEAM PAGE - DEEPLY NESTED ROUTE EXAMPLE
// =============================================================================
// This file is located at: app/about/team/page.tsx
// It renders at the URL: /about/team
//
// This demonstrates DEEPLY NESTED ROUTING in Next.js:
//   - Each folder level creates a new URL segment
//   - app/about/team/page.tsx = /about/team
//
// Route hierarchy:
//   /                  -> app/page.tsx
//   /about             -> app/about/page.tsx
//   /about/team        -> app/about/team/page.tsx (this file)
//   /about/team/member -> app/about/team/member/page.tsx (if it existed)
//
// Benefits of nested routing:
//   - URL structure mirrors folder structure (intuitive)
//   - Easy to understand and maintain
//   - Layouts can be shared at any level
//   - Code splitting happens automatically per route
//
// This is a SIBLING route to /about, not a child layout.
// Both /about and /about/team are independent pages.
// =============================================================================

/**
 * TeamPage Component
 * Displays information about the team members.
 * This is a nested page under the /about route.
 */
export default function TeamPage() {
  return (
    <main>
      {/* Page heading with bottom margin */}
      <h1 className="text-5xl font-bold mb-4">Meet Our Team</h1>

      {/* Team description */}
      <p>Meet the amazing team behind our application.</p>
    </main>
  );
}