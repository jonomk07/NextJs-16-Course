// ============================================
// MAIN ROOT LAYOUT - app/(main)/layout.tsx
// ============================================
// This is the ROOT LAYOUT for all public/main website pages
//
// MULTIPLE ROOT LAYOUTS IN NEXT.JS:
// This project now has TWO root layouts:
// 1. MAIN LAYOUT (this file) - for public pages (/, /about, /blog)
// 2. AUTH LAYOUT (app/(auth)/layout.tsx) - for auth pages (/login, /register)
//
// Each root layout:
// - Has its own <html> and <body> tags
// - Is completely independent from other root layouts
// - Can have different headers, footers, styles, and metadata
//
// ROUTE GROUPS:
// - (main) folder contains public pages
// - (auth) folder contains authentication pages
// - Parentheses mean folders don't appear in URLs

// --------------------------------------------
// IMPORTS
// --------------------------------------------

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

// "../globals.css" - go UP one level to reach app/globals.css
import "../globals.css";

// --------------------------------------------
// FONT CONFIGURATION
// --------------------------------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --------------------------------------------
// METADATA CONFIGURATION
// --------------------------------------------
// Metadata is information about a web page that helps browsers,
// search engines, and social media platforms understand its content.
//
// Next.js automatically generates meta tags from this object,
// replacing the need to manually edit the <head> section.
//
// This metadata applies to ALL pages using the main layout:
// /, /about, /blog, /blog/post, etc.

export const metadata: Metadata = {
  // ========== TITLE ==========
  // Appears in browser tab and search engine results
  // This is one of the most important SEO elements
  title: "Next.js Main Layout",

  // ========== DESCRIPTION ==========
  // Appears in search engine results below the title
  // Should be 150-160 characters for optimal display
  // Helps users decide whether to click on your link
  description: "Exploring metadata in Next.js 16",

  // ========== KEYWORDS ==========
  // List of relevant keywords for the page
  // Helps search engines understand page content
  //
  // NOTE: Modern search engines like Google no longer rely heavily
  // on keywords for ranking (they focus on content and user experience)
  // However, some smaller search engines may still use them
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],

  // ========== AUTHORS ==========
  // Information about the page/site authors
  // Useful for blogs, documentation, and multi-author platforms
  // Takes an array of objects with name and optional URL
  authors: [
    {
      name: "Code and Create",
      url: "https://www.udemy.com",
    },
  ],

  // ========== ROBOTS ==========
  // Tells search engines how to index and follow links on the page
  // Critical for SEO - controls how search engines interact with your page
  //
  // Possible values:
  // - "index" = page SHOULD be indexed by search engines
  // - "noindex" = page should NOT be indexed (hidden from search results)
  // - "follow" = search engines SHOULD follow links on the page
  // - "nofollow" = search engines should NOT follow links
  //
  // Common combinations:
  // - "index, follow" = normal public page (default)
  // - "noindex, nofollow" = private page (login, admin, etc.)
  robots: "index, follow",

  // ========== VIEWPORT ==========
  // Controls how the page displays on different screen sizes
  // Essential for responsive design on mobile/tablet/desktop
  //
  // - width=device-width: viewport matches device screen width
  // - initial-scale=1.0: page displays at normal zoom level
  //
  // This prevents users from having to pinch-to-zoom on mobile
  // and ensures content scales correctly across devices
  viewport: "width=device-width, initial-scale=1.0",
};

// ============================================
// METADATA IN THE BROWSER
// ============================================
// When you inspect the page (DevTools > Elements > <head>), you'll see:
//
// <title>Next.js Main Layout</title>
// <meta name="description" content="Exploring metadata in Next.js 16">
// <meta name="keywords" content="Next.js,React,TypeScript,Tailwind CSS">
// <meta name="author" content="Code and Create">
// <meta name="robots" content="index, follow">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
//
// Next.js automatically generates these tags from our metadata object!

// --------------------------------------------
// MAIN LAYOUT COMPONENT
// --------------------------------------------

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Root layout MUST have <html> and <body> tags
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*
          ========== MAIN HEADER ==========
          BLUE header - identifies main/public section
          Different from auth layout's YELLOW header

          This header appears on:
          - / (home)
          - /about
          - /blog
          - /blog/post
        */}
        <header className="bg-blue-950 text-white p-6">
          <nav className="flex gap-x-6">
            {/*
              Main navigation links
              Different from auth layout which only has Login/Register
            */}
            <Link href="/" className="text-lg">Home</Link>
            <Link href="/about" className="text-lg">About</Link>
            <Link href="/blog" className="text-lg">Blog</Link>
          </nav>
        </header>

        {/*
          ========== MAIN CONTENT ==========
          {children} can be:
          - Direct page content (/, /about)
          - Nested layout + page (/blog uses BlogLayout)
        */}
        <main className="p-6">
          {children}
        </main>

        {/*
          ========== FOOTER ==========
          Footer only exists in MAIN layout
          AUTH layout has NO footer (minimal UI for auth)
        */}
        <footer className="bg-blue-950 text-white p-4 text-center absolute bottom-0 w-full">
          <p>&copy; {new Date().getFullYear()} My Website. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}

// ============================================
// PROJECT STRUCTURE OVERVIEW
// ============================================
//
// app/
// ├── globals.css           ← Shared styles
// │
// ├── (main)/               ← Route group for public pages
// │   ├── layout.tsx        ← THIS FILE (blue header, footer)
// │   ├── page.tsx          ← / (home)
// │   ├── about/
// │   │   └── page.tsx      ← /about
// │   └── blog/
// │       ├── layout.tsx    ← Nested layout (Blog Section header)
// │       ├── page.tsx      ← /blog
// │       └── post/
// │           └── page.tsx  ← /blog/post
// │
// └── (auth)/               ← Route group for auth pages
//     ├── layout.tsx        ← Auth layout (yellow header, no footer)
//     ├── login/
//     │   └── page.tsx      ← /login
//     └── register/
//         └── page.tsx      ← /register
//
// ============================================
// VISUAL COMPARISON
// ============================================
//
// MAIN PAGES (/about):          AUTH PAGES (/login):
// ┌─────────────────────┐       ┌─────────────────────┐
// │ [BLUE Header]       │       │ [YELLOW Header]     │
// │ Home | About | Blog │       │ Login | Register    │
// │                     │       │                     │
// │ This is About Page  │       │ This is Login Page  │
// │                     │       │                     │
// │ [BLUE Footer]       │       │                     │
// │ © 2024 My Website   │       │ (no footer)         │
// └─────────────────────┘       └─────────────────────┘
//
// TWO COMPLETELY INDEPENDENT LAYOUTS!
