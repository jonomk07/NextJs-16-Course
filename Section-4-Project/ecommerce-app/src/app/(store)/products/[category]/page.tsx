/**
 * Dynamic Category Page - /products/[category]
 *
 * This page uses Next.js dynamic routing to display products for a specific category.
 * The [category] folder name creates a dynamic segment in the URL.
 *
 * Key concepts:
 * - Dynamic Routes: [category] captures the URL segment as a parameter
 *   e.g., /products/smartphones → params.category = "smartphones"
 * - Async Server Component: In Next.js 15+, params is a Promise that must be awaited
 * - Array.filter(): Creates a new array with only the items that match a condition
 * - Array.find(): Returns the first item that matches a condition (or undefined)
 * - Optional chaining (?.) : Safely access properties that might be undefined
 * - Logical OR (||): Provides a fallback value if the left side is falsy
 * - Props: We pass product data and category info down to the ProductCard component
 */

// Import the Product type for TypeScript typing, plus the data arrays
import { Product, productsList, categories } from "@/app/data/products";
import Link from "next/link";
import ProductCard from "@/app/components/product-card";

/**
 * CategoryPage - Async Server Component
 *
 * In Next.js 15+, params is a Promise, so we must:
 * 1. Mark the function as async
 * 2. Await the params before using them
 *
 * The params object contains all dynamic segments from the URL.
 * For /products/[category], we get: { category: "smartphones" }
 */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // Await the params Promise to get the actual values
  const resolvedParams = await params;

  // Normalize the slug to lowercase for consistent matching
  const categorySlug = resolvedParams.category.toLowerCase();

  /**
   * Filter products by category
   *
   * Array.filter() loops through every product in productsList and returns
   * only the ones where product.category matches our categorySlug.
   *
   * We type the result as Product[] (array of Product objects) for type safety.
   * We use toLowerCase() on both sides to avoid case-sensitivity issues.
   */
  const categoryProducts: Product[] = productsList.filter(
    (product) => product.category.toLowerCase() === categorySlug
  );

  /**
   * Find the category info object
   *
   * Array.find() returns the first category whose slug matches categorySlug.
   * If no match is found, categoryInfo will be undefined.
   */
  const categoryInfo = categories.find((cat) => cat.slug === categorySlug);

  /**
   * Extract category name with fallback
   *
   * categoryInfo?.name - Optional chaining: if categoryInfo exists, get its name
   * || resolvedParams.category - If name is undefined, fall back to the raw URL slug
   *
   * This ensures we always have something to display, even if the category
   * doesn't exist in our data.
   */
  const categoryName = categoryInfo?.name || resolvedParams.category;

  /**
   * Extract category color with fallback
   *
   * Same pattern as categoryName - if no color is found, default to dark blue.
   * This color is passed to ProductCard components for dynamic styling.
   */
  const categoryColor = categoryInfo?.color || "#003D5B";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Category Banner - Gradient header showing the category name and description */}
      <div className="bg-linear-to-r from-[#003D5B] to-[#00798C] rounded-2xl p-8 mb-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">{categoryName}</h1>
          <p className="text-lg text-white opacity-80 max-w-2xl">
            Explore our selection of premium {categoryName.toLowerCase()}{" "}
            designed for exceptional performance.
          </p>
        </div>
      </div>

      {/*
       * Products Grid
       *
       * Responsive grid layout:
       * - Mobile: 1 column (grid-cols-1)
       * - Tablet: 2 columns (md:grid-cols-2)
       * - Desktop: 3 columns (lg:grid-cols-3)
       *
       * We map through categoryProducts and render a ProductCard for each one.
       * The key prop (product.id) helps React efficiently update the DOM.
       *
       * Props passed to each ProductCard:
       * - product: The individual product object with all its data
       * - categorySlug: For building dynamic links later
       * - categoryColor: For dynamic button/price styling
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categorySlug={categorySlug}
            categoryColor={categoryColor}
          />
        ))}
      </div>

      {/* Back Navigation - Link back to the main categories/products page */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/products"
          className="inline-flex items-center text-[#00798C] hover:text-[#003D5B] transition-colors"
        >
          <i className="bx bx-left-arrow-alt mr-2 text-xl"></i>
          Back to all Categories
        </Link>
      </div>
    </div>
  );
}
