// =============================================================================
// OPTIONAL CATCH-ALL ROUTE - [[...slug]]
// =============================================================================
// This file is located at: app/products/[[...slug]]/page.tsx
//
// OPTIONAL CATCH-ALL ROUTES use double square brackets [[...param]].
// The key difference from regular catch-all [...param]:
//   - [[...slug]] matches the route WITH OR WITHOUT additional segments
//   - [...slug] REQUIRES at least one segment
//
// URL matching examples for [[...slug]]:
//   /products           -> slug = undefined (base route matches!)
//   /products/a         -> slug = ["a"]
//   /products/a/b       -> slug = ["a", "b"]
//   /products/a/b/c/d   -> slug = ["a", "b", "c", "d"]
//
// URL matching examples for [...slug] (comparison):
//   /products           -> NO MATCH (would need separate page.tsx)
//   /products/a         -> slug = ["a"]
//   /products/a/b       -> slug = ["a", "b"]
//
// When to use optional catch-all:
//   - When you want ONE component to handle both base and nested routes
//   - E-commerce categories: /shop, /shop/men, /shop/men/shoes
//   - Documentation: /docs, /docs/intro, /docs/api/reference
//   - File browsers: /files, /files/folder1, /files/folder1/subfolder
//
// Important (Next.js 15+):
//   - params is a Promise and must be awaited
//   - slug is OPTIONAL (can be undefined), so use slug?: string[]
// =============================================================================

/**
 * OptionalCatchAllRoutePage Component
 *
 * Handles all routes under /products, including the base /products route.
 * The slug parameter captures any URL segments after /products.
 *
 * @param params - Promise containing optional slug array
 */
export default async function OptionalCatchAllRoutePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>; // Note the ? - slug is optional!
}) {
  // Await the params Promise (required in Next.js 15+)
  // slug will be undefined if visiting /products (no additional segments)
  const { slug } = await params;

  return (
    <div>
      <h1 className="text-5xl font-bold">Optional Catch All Route Page</h1>

      {/* Conditional rendering based on whether segments exist */}
      {/* Check both that slug exists AND has items */}
      {slug && slug.length > 0 ? (
        <>
          {/* Display when URL has segments (e.g., /products/a/b/c) */}
          <p className="text-lg mt-2">Segments Captured in the URL:</p>
          <ul className="list-disc list-inside mt-4">
            {/* Map over each URL segment and display it */}
            {slug.map((segment, index) => (
              <li key={index} className="text-blue-500 text-lg">
                Segment {index + 1}: {segment}
              </li>
            ))}
          </ul>
        </>
      ) : (
        /* Display when visiting base /products route (no segments) */
        <p className="text-lg mt-2">
          No segments provided. This is the base products page.
        </p>
      )}
    </div>
  );
}