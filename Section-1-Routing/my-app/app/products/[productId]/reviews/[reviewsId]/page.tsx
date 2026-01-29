// =============================================================================
// NESTED DYNAMIC ROUTE - MULTIPLE DYNAMIC SEGMENTS
// =============================================================================
// This file is located at: app/products/[productId]/reviews/[reviewsId]/page.tsx
// It renders at URLs like: /products/123/reviews/456
//
// This demonstrates NESTED DYNAMIC ROUTES with MULTIPLE dynamic segments:
//   - [productId] captures the product identifier
//   - [reviewsId] captures the review identifier
//   - Both are available in the params object
//
// Folder structure:
//   app/products/
//   ├── [productId]/
//   │   ├── page.tsx                    -> /products/[productId]
//   │   └── reviews/
//   │       └── [reviewsId]/
//   │           └── page.tsx            -> /products/[productId]/reviews/[reviewsId] (this file)
//
// URL examples:
//   /products/42/reviews/1      -> productId="42", reviewsId="1"
//   /products/shoe/reviews/abc  -> productId="shoe", reviewsId="abc"
//
// Real-world use cases:
//   - E-commerce: /products/[productId]/reviews/[reviewId]
//   - Social media: /users/[userId]/posts/[postId]
//   - Forums: /categories/[categoryId]/threads/[threadId]
//   - Courses: /courses/[courseId]/lessons/[lessonId]
//
// Important (Next.js 15+):
//   - params is a Promise containing ALL dynamic segments
//   - Must await params before accessing productId and reviewsId
//   - All URL parameters are strings (even if they look like numbers)
// =============================================================================

/**
 * ReviewDetails Component
 *
 * Displays details for a specific review of a specific product.
 * This page receives TWO dynamic parameters from nested route segments.
 *
 * @param params - Promise containing productId and reviewsId from the URL
 */
export default async function ReviewDetails({
  params,
}: {
  params: Promise<{ productId: string; reviewsId: string }>;
}) {
  // Await and destructure both dynamic parameters
  // From URL /products/42/reviews/1: productId="42", reviewsId="1"
  const { productId, reviewsId } = await params;

  return (
    <div>
      {/* Display the product identifier */}
      <h1 className="text-5xl font-bold">Product: {productId}</h1>

      {/* Display the review identifier */}
      <h2 className="text-3xl font-semibold mt-4">Review {reviewsId}</h2>

      {/* Display review content (in a real app, this would be fetched from a database) */}
      <p className="text-lg mt-2">
        Details about review {reviewsId} for product {productId}
      </p>
    </div>
  );
}
