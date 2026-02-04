/**
 * Home Page - Demonstrating the Link Component
 *
 * In traditional HTML, we use anchor tags (<a>) for navigation.
 * However, anchor tags cause a full page reload, which defeats the
 * purpose of a Single Page Application (SPA).
 *
 * Next.js provides the Link component from "next/link" which enables
 * client-side navigation. This means:
 * - Only the necessary parts of the page are updated
 * - No full page reload occurs
 * - Application state is preserved
 * - Navigation is instant and smooth
 *
 * The Link component accepts an "href" prop just like anchor tags,
 * but handles navigation internally using JavaScript.
 */

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Home Page</h1>

      {/*
        Using Link component instead of <a> tag
        This enables client-side navigation without full page reload

        Try opening Network tab in DevTools and clicking this link
        You'll notice only necessary data is fetched, not the entire page
      */}
      <Link href="/about" className="text-blue-500 underline">
        Go to about page
      </Link>
    </div>
  );
}
