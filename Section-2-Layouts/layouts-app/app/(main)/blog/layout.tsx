// ============================================
// BLOG NESTED LAYOUT - app/(main)/blog/layout.tsx
// ============================================
// This is a NESTED LAYOUT inside the (main) route group
//
// LAYOUT HIERARCHY:
// 1. Main Root Layout (app/(main)/layout.tsx) - blue header, footer
// 2. Blog Nested Layout (THIS FILE) - "Blog Section" heading
// 3. Page Content (page.tsx) - actual blog content
//
// This nested layout INHERITS from the main root layout
// It does NOT have its own <html> and <body> tags

// Import Metadata type for page-specific metadata
import type { Metadata } from "next";

// ============================================
// PAGE-SPECIFIC METADATA
// ============================================
// While the main layout provides global metadata, we can OVERRIDE
// specific metadata properties at the page/layout level.
//
// METADATA INHERITANCE:
// - Main layout defines: title, description, keywords, etc.
// - Blog layout can OVERRIDE any of these properties
// - The most specific metadata wins (closest to the page)
//
// WHY DEFINE METADATA IN A NESTED LAYOUT?
// - Provides section-specific defaults
// - All blog pages share this metadata unless they override it
// - More relevant SEO for the blog section

export const metadata: Metadata = {
  // This title REPLACES the main layout's title for all blog pages
  // Unless individual blog pages define their own title
  title: "Blog - Next.js App",

  // Blog-specific description for better SEO
  description: "Read the latest blog posts in Next.js 16",
};

// ============================================
// METADATA PRECEDENCE (MOST SPECIFIC WINS)
// ============================================
//
// When visiting /blog:
// 1. Check page.tsx for metadata → if found, use it
// 2. Check blog/layout.tsx for metadata → THIS FILE (used as fallback)
// 3. Check (main)/layout.tsx for metadata → global fallback
//
// When visiting /blog/[postId]:
// 1. Check [postId]/page.tsx for metadata → generateMetadata (dynamic)
// 2. Check blog/layout.tsx for metadata → fallback
// 3. Check (main)/layout.tsx for metadata → global fallback
//
// This allows fine-grained control over metadata at every level!

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      {/*
        Blog section header - appears on ALL blog pages
        This is a NESTED layout element, not a root layout
      */}
      <h1 className="text-4xl font-bold mb-4">Blog Section</h1>

      {/*
        Blog page content renders here
        - /blog → blog index page
        - /blog/post → blog post page
      */}
      <div className="border-t pt-4">
        {children}
      </div>
    </div>
  );
}

// ============================================
// NESTED vs ROOT LAYOUTS
// ============================================
//
// NESTED LAYOUT (this file):
// - NO <html> or <body> tags
// - Inherits from parent root layout
// - Adds ADDITIONAL structure
// - Located at: app/(main)/blog/layout.tsx
//
// ROOT LAYOUT (main or auth):
// - HAS <html> and <body> tags
// - Completely independent
// - Defines entire page structure
// - Located at: app/(main)/layout.tsx or app/(auth)/layout.tsx
//
// The blog nested layout works WITH the main root layout,
// while auth root layout works SEPARATELY from main root layout
