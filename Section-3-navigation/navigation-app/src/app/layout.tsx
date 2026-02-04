/**
 * Root Layout with Navigation Bar and Active Link Highlighting
 *
 * This layout demonstrates several key concepts:
 *
 * 1. "use client" Directive:
 *    - Required because we use the usePathname() hook
 *    - Hooks only work in Client Components
 *    - This means the component runs in the browser
 *
 * 2. Navigation Bar:
 *    - Placed in the layout so it appears on every page
 *    - Uses Link components for client-side navigation
 *    - No full page reload when navigating
 *
 * 3. Active Link Highlighting:
 *    - usePathname() returns the current URL path
 *    - We compare it with each link's href
 *    - If they match, we apply different styles (bold + yellow)
 *
 * 4. Dynamic Link Generation:
 *    - Instead of hardcoding each Link, we use an array
 *    - map() function creates Link components dynamically
 *    - This makes it easy to add/remove navigation items
 *
 * NOTE: Metadata cannot be exported from Client Components.
 * In real applications, you would create a separate server
 * component for metadata or use a different architecture.
 */

"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Load Google Fonts with Next.js font optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata cannot be used in client components
// In production, you would structure this differently
// export const metadata: Metadata = {
//   title: "Navigation Demo",
//   description: "Learning Next.js navigation",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // usePathname() hook returns the current URL path
  // e.g., "/about", "/blog", "/login"
  const pathname = usePathname();

  // Define navigation links in an array for dynamic rendering
  // This makes it easy to add, remove, or reorder links
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/login", label: "Login" },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation Header */}
        <header className="bg-gray-800 p-4 text-white">
          <nav className="flex gap-6">
            {/*
              Map through links array to generate navigation
              This is more maintainable than hardcoding each Link
            */}
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-lg ${
                  // Compare current pathname with link href
                  // If they match, apply bold + yellow styles (active state)
                  // Otherwise, no additional styles (default state)
                  pathname === href ? "font-bold text-yellow-400" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Main content area where page components render */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
