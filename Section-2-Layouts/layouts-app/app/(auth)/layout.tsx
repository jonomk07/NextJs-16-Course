// ============================================
// AUTH ROOT LAYOUT - app/(auth)/layout.tsx
// ============================================
// This is a SEPARATE ROOT LAYOUT for authentication pages
//
// MULTIPLE ROOT LAYOUTS EXPLAINED:
// In Next.js, you can have multiple root layouts by using route groups.
// Each route group can have its own layout.tsx that acts as an
// independent root layout with its own <html> and <body> tags.
//
// KEY DIFFERENCE FROM NESTED LAYOUTS:
// - Nested layouts INHERIT from parent layouts
// - Multiple root layouts are COMPLETELY INDEPENDENT
// - They don't share headers, footers, or any UI elements
//
// This auth layout is used for:
// - /login → app/(auth)/login/page.tsx
// - /register → app/(auth)/register/page.tsx

// --------------------------------------------
// IMPORTS
// --------------------------------------------

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

// Note: "../globals.css" - we go UP one level because we're inside (auth) folder
import "../globals.css";

// --------------------------------------------
// FONT CONFIGURATION
// --------------------------------------------
// Same fonts as main layout - you could use different fonts here
// to give auth pages a completely different feel

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --------------------------------------------
// METADATA FOR AUTH PAGES
// --------------------------------------------
// Auth pages have DIFFERENT metadata requirements than public pages:
// - They should NOT appear in search results (noindex)
// - Search engines should NOT follow links on these pages (nofollow)
// - This is a security and SEO best practice

export const metadata: Metadata = {
  // ========== TITLE ==========
  // Clear indication this is an authentication page
  title: "Authentication - Next.js App",

  // ========== DESCRIPTION ==========
  // Describes the purpose of auth pages
  description: "Login and register pages in Next.js 16",

  // ========== KEYWORDS ==========
  // Auth-specific keywords
  // Even though these pages won't be indexed,
  // it's good practice to define relevant keywords
  keywords: ["authentication", "login", "register", "Next.js"],

  // ========== AUTHORS ==========
  // Same author information as main layout
  authors: [
    {
      name: "Code and Create",
      url: "https://www.udemy.com",
    },
  ],

  // ========== ROBOTS ==========
  // CRITICAL DIFFERENCE FROM MAIN LAYOUT!
  //
  // "noindex" = page should NOT be indexed by search engines
  //             (won't appear in search results)
  //
  // "nofollow" = search engines should NOT follow links on this page
  //              (prevents crawling from auth pages)
  //
  // WHY USE noindex, nofollow FOR AUTH PAGES?
  // 1. Login/register pages don't need to appear in search results
  // 2. Prevents sensitive URLs from being indexed
  // 3. Reduces unnecessary crawling of private pages
  // 4. Standard security/SEO practice for auth pages
  robots: "noindex, nofollow",
};

// ============================================
// METADATA COMPARISON: MAIN vs AUTH
// ============================================
//
// MAIN LAYOUT:                    AUTH LAYOUT:
// robots: "index, follow"         robots: "noindex, nofollow"
//         ↓                                ↓
// ✅ Appears in search results    ❌ Hidden from search results
// ✅ Links are followed           ❌ Links are not followed
//
// This ensures public pages are discoverable while
// authentication pages remain private!

// --------------------------------------------
// AUTH LAYOUT COMPONENT
// --------------------------------------------
// This layout wraps ONLY pages inside the (auth) route group
// It has NO connection to the main layout

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Each root layout MUST have its own <html> and <body> tags
    // This is what makes it a ROOT layout, not a nested layout
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*
          ========== AUTH HEADER ==========
          YELLOW header - completely different from main layout's BLUE header
          This visually distinguishes auth pages from the main site

          bg-yellow-300: yellow background
          p-4: padding on all sides
        */}
        <header className="bg-yellow-300 p-4">
          {/*
            Auth-specific navigation
            Only shows Login and Register links
            No Home, About, or Blog links here
          */}
          <nav className="flex gap-x-6">
            <Link href="/login" className="text-lg font-bold">
              Login
            </Link>
            <Link href="/register" className="text-lg font-bold">
              Register
            </Link>
          </nav>
        </header>

        {/*
          ========== MAIN CONTENT ==========
          {children} renders the current auth page:
          - On /login → Login page content
          - On /register → Register page content
        */}
        <main className="p-6">
          {children}
        </main>

        {/*
          NO FOOTER in auth layout!
          This is intentional - auth pages have minimal UI
          Main layout has a footer, but auth layout doesn't
        */}
      </body>
    </html>
  );
}

// ============================================
// COMPARISON: AUTH vs MAIN LAYOUT
// ============================================
//
// AUTH LAYOUT (this file):          MAIN LAYOUT:
// ┌─────────────────────────┐       ┌─────────────────────────┐
// │ [Yellow Header]         │       │ [Blue Header]           │
// │  Login | Register       │       │  Home | About | Blog    │
// │                         │       │                         │
// │ [Page Content]          │       │ [Page Content]          │
// │                         │       │                         │
// │                         │       │ [Blue Footer]           │
// └─────────────────────────┘       └─────────────────────────┘
//
// COMPLETELY INDEPENDENT - no shared UI elements!
//
// ============================================
// USE CASES FOR MULTIPLE ROOT LAYOUTS
// ============================================
//
// 1. AUTHENTICATION PAGES:
//    - Minimal UI, no distractions
//    - Different header/navigation
//
// 2. ADMIN DASHBOARD:
//    - Sidebar navigation instead of top navbar
//    - Different color scheme
//
// 3. MARKETING vs APP:
//    - Landing pages with marketing layout
//    - User dashboard with app layout
//
// 4. DIFFERENT THEMES:
//    - Light theme for public pages
//    - Dark theme for dashboard
