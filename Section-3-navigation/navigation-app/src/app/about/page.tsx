/**
 * About Page - Simple Static Page
 *
 * This is a basic page component demonstrating file-based routing.
 * The file is located at: app/about/page.tsx
 * This automatically creates the route: /about
 *
 * No special configuration is needed - Next.js handles routing
 * based on the folder structure in the app directory.
 */

export default function About() {
  return (
    <div>
      <h1 className="text-4xl font-bold">About Page</h1>
      <p className="text-lg mt-4">
        Welcome to the about page. This page demonstrates navigation in Next.js.
      </p>
    </div>
  );
}
