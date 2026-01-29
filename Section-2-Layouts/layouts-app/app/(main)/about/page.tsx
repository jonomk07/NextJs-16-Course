// ============================================
// ABOUT PAGE - app/(main)/about/page.tsx
// ============================================
// This page is located at: /about
//
// ROUTE GROUP:
// The (main) folder is a route group - it doesn't appear in the URL
// File: app/(main)/about/page.tsx → URL: /about
//
// This page uses the MAIN LAYOUT (app/(main)/layout.tsx)
// which is separate from the AUTH LAYOUT

export default function About() {
  return (
    <div className="text-5xl font-bold">
      This is About Page
    </div>
  );
}
