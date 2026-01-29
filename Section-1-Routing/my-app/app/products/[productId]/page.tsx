// =============================================================================
// PRODUCT PAGE - DYNAMIC ROUTE EXAMPLE
// =============================================================================
// This file is located at: app/products/[productId]/page.tsx
// It renders at URLs like: /products/1, /products/2, /products/abc
//
// DYNAMIC ROUTING in Next.js:
//   - Square brackets [param] create dynamic route segments
//   - [productId] captures any value in that URL position
//   - The captured value is available via the params prop
//
// Examples:
//   /products/1     -> params.productId = "1"
//   /products/42    -> params.productId = "42"
//   /products/shoe  -> params.productId = "shoe"
//
// Dynamic route types:
//   [param]        -> Single dynamic segment (this file)
//   [...param]     -> Catch-all (matches multiple segments)
//   [[...param]]   -> Optional catch-all (matches zero or more segments)
//
// Important (Next.js 15+):
//   - params is now a PROMISE and must be awaited
//   - The component must be async to use await
// =============================================================================

// Import Link for navigation to review pages
import Link from "next/link";

/**
 * Products Component (Dynamic Route)
 *
 * This is an ASYNC function because params is a Promise in Next.js 15+.
 * It displays a product page with a list of reviews.
 *
 * @param params - Promise containing route parameters (productId)
 */
export default async function Products({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  // In Next.js 15+, params is a Promise and must be awaited
  // This extracts the productId from the URL (e.g., "42" from /products/42)
  const { productId } = await params;

  // Sample reviews data - in a real app, this would come from a database
  const reviews = ["review1", "review2", "review3"];

  return (
    <div>
      {/* Product title - dynamically shows the product ID from the URL */}
      <h1 className="text-5xl font-bold">Product {productId}</h1>

      {/* Product description */}
      <p>Description for Product {productId}</p>

      {/* Reviews section */}
      <h2 className="text-2xl font-bold mt-4">Reviews</h2>

      {/* List of review links */}
      {/* Each link navigates to a NESTED DYNAMIC ROUTE: /products/[productId]/reviews/[reviewId] */}
      <ul className="list-disc list-inside">
        {reviews.map((review) => (
          <li key={review}>
            {/* Template literal creates dynamic URL: /products/42/reviews/review1 */}
            <Link
              href={`/products/${productId}/reviews/${review}`}
              className="text-blue-500 hover:underline"
            >
              {review}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}