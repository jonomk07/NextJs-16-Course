// ============================================
// HOME PAGE - app/(main)/page.tsx
// ============================================
// This page is located at: / (root URL)
//
// ROUTE GROUP:
// The (main) folder is a route group - it doesn't appear in the URL
// File: app/(main)/page.tsx → URL: /
//
// This page uses the MAIN LAYOUT (app/(main)/layout.tsx)
// which has the blue header with Home, About, Blog navigation

export default function Home() {
  return (
    <div className="text-5xl font-bold">
      This is Home Page
    </div>
  );
}
