// =============================================================================
// BLOG CONTENT COMPONENT - FILE CO-LOCATION EXAMPLE
// =============================================================================
// This component demonstrates FILE CO-LOCATION in Next.js.
//
// What is File Co-location?
//   - Keeping related files together in the same directory
//   - This file (BlogContent.tsx) is in the same folder as page.tsx
//   - It makes the project more organized and maintainable
//
// Important: This file does NOT create a route!
//   - Only page.tsx files define routes in Next.js
//   - Visiting /blog/10/BlogContent will return a 404 error
//   - This file is just a component that can be imported and used
//
// Benefits of co-location:
//   - All related files are in one place
//   - No need to navigate deep folder structures
//   - As the project grows, the structure remains clean
// =============================================================================

// Import the formatDate utility from our private _utils folder
// The @ symbol is an alias for the root app directory (configured in tsconfig.json)
// This is cleaner than using relative paths like "../../_utils/formatDate"
import { formatDate } from "@/app/_utils/formatDate";

// Define the props interface for type safety
// blogId is a string because URL parameters are always strings
interface BlogContentProps {
  blogId: string;
}

/**
 * BlogContent Component
 * Renders the content of a blog post including title, publish date, and body.
 *
 * @param blogId - The ID of the blog post (extracted from the URL)
 */
export default function BlogContent({ blogId }: BlogContentProps) {
  // Sample publish date - in a real app, this would come from a database
  const publishDate = "2025-01-01";

  return (
    <div>
      {/* Blog post title - dynamically shows the blog ID */}
      <h1 className="text-5xl font-bold mb-4">Blog Post {blogId}</h1>

      {/* Publication date - formatted using our private utility function */}
      {/* formatDate("2025-01-01") returns "January 1, 2025" */}
      <p className="text-gray-500 text-lg">
        Published on {formatDate(publishDate)}
      </p>

      {/* Blog post content */}
      <p className="text-lg">This is the content of blog post {blogId}</p>
    </div>
  );
}
