// ============================================
// BLOG INDEX PAGE - app/(main)/blog/page.tsx
// ============================================
// This page is located at: /blog
//
// METADATA FOR THIS PAGE:
// This page uses the metadata defined in blog/layout.tsx:
// - title: "Blog - Next.js App"
// - description: "Read the latest blog posts in Next.js 16"
//
// The blog layout's metadata OVERRIDES the main layout's metadata
// for all pages in the /blog section

import Link from "next/link";

export default function Blog() {
  return (
    <div>
      {/*
        Welcome message for the blog section
        This content appears inside the Blog Layout's {children}
      */}
      <div className="text-5xl font-bold">
        Welcome to the Blog. Check out our latest posts!
      </div>

      {/*
        ========== DYNAMIC ROUTE LINKS ==========
        These links navigate to the dynamic route: /blog/[postId]

        The [postId] folder creates a dynamic segment:
        - /blog/typescript-tips → postId = "typescript-tips"
        - /blog/nextjs-15-updates → postId = "nextjs-15-updates"
        - /blog/react-hooks-guide → postId = "react-hooks-guide"

        Each link will:
        1. Trigger generateMetadata() with the specific postId
        2. Generate unique title/description for SEO
        3. Render the BlogPost component with that postId
      */}
      <div className="mt-6 space-y-3">
        <Link
          href="/blog/typescript-tips"
          className="text-blue-500 text-xl block hover:underline"
        >
          📝 TypeScript Tips
        </Link>
        <Link
          href="/blog/nextjs-15-updates"
          className="text-blue-500 text-xl block hover:underline"
        >
          📝 Next.js 16 Updates
        </Link>
        <Link
          href="/blog/react-hooks-guide"
          className="text-blue-500 text-xl block hover:underline"
        >
          📝 React Hooks Guide
        </Link>
      </div>

      {/*
        Explanation of dynamic metadata
      */}
      <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-blue-500">
        <p className="font-bold mb-2">💡 Try inspecting the metadata!</p>
        <p>Click any post above, then open DevTools → Elements → head</p>
        <p>You&apos;ll see the title and description change dynamically based on the URL.</p>
      </div>
    </div>
  );
}

// ============================================
// METADATA HIERARCHY SUMMARY
// ============================================
//
// THREE WAYS TO DEFINE METADATA IN NEXT.JS:
//
// 1. GLOBAL METADATA (in root layout):
//    export const metadata: Metadata = { ... }
//    → Applies to ALL pages using that layout
//    → Defined in: app/(main)/layout.tsx, app/(auth)/layout.tsx
//
// 2. SECTION METADATA (in nested layout):
//    export const metadata: Metadata = { ... }
//    → Overrides parent layout for that section
//    → Defined in: app/(main)/blog/layout.tsx
//
// 3. DYNAMIC METADATA (in page with generateMetadata):
//    export async function generateMetadata() { ... }
//    → Most specific - overrides everything
//    → Defined in: app/(main)/blog/[postId]/page.tsx
//
// PRECEDENCE ORDER (most specific wins):
// Page generateMetadata > Page metadata > Layout metadata > Parent Layout metadata
//
// ============================================
// WHAT METADATA SHOWS WHERE
// ============================================
//
// /            → Main layout metadata (Next.js Main Layout)
// /about       → Main layout metadata (Next.js Main Layout)
// /blog        → Blog layout metadata (Blog - Next.js App)
// /blog/xyz    → generateMetadata (Blog Post: xyz)
// /login       → Auth layout metadata (Authentication - Next.js App)
// /register    → Auth layout metadata (Authentication - Next.js App)
