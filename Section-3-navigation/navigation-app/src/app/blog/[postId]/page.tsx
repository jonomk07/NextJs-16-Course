/**
 * Dynamic Blog Post Page - Handling Invalid Routes
 *
 * This page demonstrates:
 * 1. Params as Promises in Next.js 15+
 * 2. Validating dynamic route parameters
 * 3. Using notFound() for 404 pages
 * 4. Using redirect() to send users elsewhere
 *
 * HANDLING INVALID ROUTES:
 * ------------------------
 * When users visit a dynamic route with an invalid ID
 * (e.g., /blog/999 when that post doesn't exist), we have options:
 *
 * Option 1: notFound()
 * - Shows the built-in 404 page
 * - Best when: The resource truly doesn't exist
 * - User sees: "This page could not be found"
 *
 * Option 2: redirect(url)
 * - Sends user to a different page
 * - Best when: You want to guide users somewhere safe
 * - User sees: The page you redirect them to
 *
 * WHEN TO USE EACH:
 * ----------------
 * notFound():
 * - Blog post doesn't exist
 * - User profile not found
 * - Product was deleted
 *
 * redirect():
 * - After form submission → success page
 * - After login → dashboard
 * - Invalid URL → home page
 * - Old URL → new URL (URL migrations)
 */

// notFound - shows 404 page
// redirect - sends user to another page (uncomment import to use)
import { notFound } from "next/navigation";
// import { redirect } from "next/navigation";

// Valid post IDs - in real apps, this would come from a database
// For demo purposes, only posts 1, 2, 3 are "valid"
const validPostIds = ["1", "2", "3"];

// Type definition for params
type Props = {
  params: Promise<{ postId: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  // Await the params Promise to get actual values
  const resolvedParams = await params;
  const postId = resolvedParams.postId;

  /**
   * ROUTE VALIDATION
   *
   * Check if the postId exists in our valid list.
   * If not, we have two options:
   *
   * 1. notFound() - Shows 404 page
   * 2. redirect('/') - Sends user to home page
   *
   * Uncomment the one you want to test!
   */

  if (!validPostIds.includes(postId)) {
    /**
     * Option 1: notFound()
     *
     * This function tells Next.js to render the 404 page.
     * The function never returns - it throws an error that
     * Next.js catches and handles by showing the not-found page.
     *
     * Try: Visit /blog/99 to see the 404 page
     */
    notFound();

    /**
     * Option 2: redirect()
     *
     * This function redirects the user to another page.
     * Like notFound(), it never returns - it throws an error
     * that Next.js catches and handles by redirecting.
     *
     * Uncomment below and comment out notFound() to test:
     */
    // redirect('/');
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">Blog Post {postId}</h1>

      <p className="text-lg mt-4">
        This is the content of blog post {postId}. Each blog post is dynamically
        generated based on the post ID in the URL.
      </p>

      {/* Educational info box - How Params Work */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-bold text-blue-800 mb-2">How Params Work:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            <strong>1.</strong> Folder [postId] creates dynamic segment
          </li>
          <li>
            <strong>2.</strong> params is a Promise (Next.js 15+)
          </li>
          <li>
            <strong>3.</strong> We await to get the actual value
          </li>
          <li>
            <strong>4.</strong> Current postId: <code className="bg-blue-100 px-1 rounded">{postId}</code>
          </li>
        </ul>
      </div>

      {/* Educational info box - Route Validation */}
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="font-bold text-red-800 mb-2">Route Validation:</h3>
        <p className="text-sm text-red-700 mb-2">
          Valid post IDs: <code className="bg-red-100 px-1 rounded">1, 2, 3</code>
        </p>
        <p className="text-sm text-red-700">
          Try visiting <code className="bg-red-100 px-1 rounded">/blog/99</code> to see
          the 404 page (notFound) in action!
        </p>
      </div>

      {/* Educational info box - notFound vs redirect */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">notFound() vs redirect():</h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <div>
            <strong>notFound():</strong>
            <pre className="bg-yellow-100 p-2 rounded mt-1 text-xs">
{`import { notFound } from "next/navigation";

if (!isValid) {
  notFound(); // Shows 404 page
}`}
            </pre>
          </div>
          <div>
            <strong>redirect():</strong>
            <pre className="bg-yellow-100 p-2 rounded mt-1 text-xs">
{`import { redirect } from "next/navigation";

if (!isValid) {
  redirect('/'); // Goes to home page
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
