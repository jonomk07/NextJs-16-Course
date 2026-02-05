/**
 * Product Details Page - /products/[category]/[productId]
 *
 * This page uses nested dynamic routing to display detailed information
 * about a specific product. It has TWO dynamic segments:
 * - [category]: The product category (e.g., "smartphones")
 * - [productId]: The unique product ID (e.g., "product001")
 *
 * Key concepts:
 * - "use client": Required because we use React hooks (useState, useEffect)
 * - useState: Creates reactive state that triggers re-renders when updated
 * - useEffect: Runs side effects (like data fetching) after component renders
 * - Async inside useEffect: useEffect callback can't be async directly,
 *   so we define an async function inside and call it
 * - params as Promise: In Next.js 15+, params is a Promise even in client components
 * - Array.find(): Searches the products array for a matching product ID
 * - Validation: We check both product existence AND category match before displaying
 * - Loading skeleton: Shows animated placeholder while data is being fetched
 * - Optional chaining (?.): Safely access properties that might be undefined
 * - Fallback values (||): Provide defaults when data is missing
 * - toLocaleString(): Formats numbers with commas (e.g., 1299 → "1,299")
 * - Dynamic category colors: Price and button colors adapt to the product's category
 * - Inline style attribute: Used for runtime dynamic colors (Tailwind can't handle dynamic values)
 * - Quantity state: Tracks how many items the user wants to add to cart
 * - Math.max(): Ensures quantity never goes below 1
 * - Updater function pattern: setQuantity(prev => ...) for safe state updates based on previous value
 * - onClick event handlers: Wire button clicks to state-updating functions
 */

"use client";

import { useState, useEffect } from "react";
import { productsList, Product, categories } from "@/app/data/products";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage({
  params,
}: {
  params: Promise<{ category: string; productId: string }>;
}) {
  /**
   * Product State
   *
   * useState<Product | null>(null) means:
   * - The state can hold either a Product object or null
   * - Initially set to null (no product loaded yet)
   * - When setProduct is called with a valid product, React re-renders the page
   */
  const [product, setProduct] = useState<Product | null>(null);

  /**
   * Category Info State
   *
   * useState<{ name: string; color: string } | null>(null) means:
   * - The state holds an object with name and color strings, or null
   * - Initially null (no category data loaded yet)
   * - Once populated, gives us access to the category's theme color
   *   so we can dynamically style the price and Add to Cart button
   *
   * Without this state, we'd have no clean way to access the category
   * color dynamically for each product.
   */
  const [categoryInfo, setCategoryInfo] = useState<{
    name: string;
    color: string;
  } | null>(null);

  /**
   * Quantity State
   *
   * useState(1) initializes the quantity to 1 because when users first
   * land on a product page, they typically want to buy at least one item.
   * This state dynamically tracks how many items the user wants to add
   * to their cart, and updates the displayed value in real time.
   */
  const [quantity, setQuantity] = useState(1);

  /**
   * useEffect - Fetch product data when the page loads
   *
   * Why useEffect?
   * - params is a Promise that needs to be awaited
   * - We need to find the correct product from our data
   * - This is a side effect that should run after the component mounts
   *
   * Why async function inside?
   * - useEffect's callback function CANNOT be async (React rule)
   * - So we define a separate async function and call it immediately
   *
   * Dependency array [params]:
   * - Re-runs the effect whenever params changes (e.g., navigating to a different product)
   */
  useEffect(() => {
    const fetchParams = async () => {
      // Await the params Promise to get the actual URL values
      const resultParams = await params;

      /**
       * Find the product by ID
       *
       * Array.find() loops through productsList and returns the first product
       * where p.id matches the productId from the URL.
       * If no match is found, foundProduct will be undefined.
       */
      const foundProduct = productsList.find(
        (p) => p.id === resultParams.productId
      );

      /**
       * Validation - Two safety checks:
       *
       * 1. Does the product exist? (!foundProduct)
       *    - If not found in our data, stop here
       *
       * 2. Does the product's category match the URL category?
       *    (foundProduct.category.toLowerCase() !== resultParams.category.toLowerCase())
       *    - Prevents showing a smartphone on the "laptops" category page
       *    - Both converted to lowercase to avoid case-sensitivity issues
       *
       * Later, we could use notFound() from next/navigation to show a 404 page.
       */
      if (
        !foundProduct ||
        foundProduct.category.toLowerCase() !==
          resultParams.category.toLowerCase()
      ) {
        return;
      }

      // Update state with the found product - triggers a re-render
      setProduct(foundProduct);

      /**
       * Find the matching category from the categories array
       *
       * We use categories.find() to locate the category whose slug matches
       * the category parameter from the URL. Both sides are converted to
       * lowercase for a case-insensitive comparison.
       *
       * If found, we store its name and color in the categoryInfo state
       * so we can use the color dynamically in our JSX styling.
       */
      const catInfo = categories.find(
        (c) => c.slug.toLowerCase() === resultParams.category.toLowerCase()
      );

      if (catInfo) {
        setCategoryInfo({ name: catInfo.name, color: catInfo.color });
      }
    };

    // Call the async function
    fetchParams();
  }, [params]);

  /**
   * increaseQuantity - Adds one to the current quantity
   *
   * We use the updater function pattern: setQuantity(prev => prev + 1)
   * Instead of setQuantity(quantity + 1), the updater pattern is safer
   * because it always works with the most recent state value (prev),
   * even if multiple updates happen rapidly.
   */
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  /**
   * decreaseQuantity - Subtracts one from the current quantity (minimum 1)
   *
   * Math.max(1, prev - 1) ensures the quantity NEVER goes below 1.
   * If prev is 1, then prev - 1 = 0, but Math.max(1, 0) returns 1.
   * This prevents negative or zero quantities, which would make no
   * sense in a real-world shopping experience.
   */
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  /**
   * Category Color with Fallback
   *
   * categoryInfo?.color: If categoryInfo exists, use its color property
   * || "#00798C": If categoryInfo is null (not found), fall back to teal
   *
   * This prevents crashes or broken styling if the category wasn't found.
   * We use this variable in inline style={{ }} attributes because
   * Tailwind CSS doesn't support fully dynamic color values at runtime
   * without additional configuration (like safelisting).
   */
  const categoryColor = categoryInfo?.color || "#00798C";

  /**
   * Loading State - Show skeleton while product data is being fetched
   *
   * When the page first loads, product is null (initial state).
   * While useEffect runs and awaits params, we show a loading skeleton
   * instead of empty/broken content.
   *
   * The skeleton uses:
   * - animate-pulse: Tailwind animation that fades elements in and out
   * - Gray placeholder divs: Mimic the shape of content that will load
   * - min-h-[60vh]: Ensures the loader is vertically centered on the page
   */
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="w-48 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Left Side - Product Image */}
        <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center relative">
          <div className="relative w-full h-75 md:h-100">
            {/*
             * Dynamic Image Source
             *
             * product?.image: Uses optional chaining to safely access product.image
             * || "/images/placeholder.png": Fallback image if product.image is undefined
             *
             * product?.name: Dynamic alt text for accessibility and SEO
             * || "Product Image": Fallback alt text
             */}
            <Image
              src={product?.image || "/images/placeholder.png"}
              alt={product?.name || "Product Image"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Side - Product Information */}
        <div className="md:w-1/2 p-8 md:p-12 space-y-6">
          {/*
           * Dynamic Product Data
           *
           * Instead of hardcoded values, we now use the product state:
           * - product?.name: The product's name from our data
           * - product?.price.toLocaleString(): Formats price with commas (e.g., 1,299)
           * - product?.description: The product's description text
           *
           * Optional chaining (?.) is used as a safety measure even though
           * we already check for !product above. This is a good defensive
           * coding practice in case the component structure changes later.
           */}
          <div>
            <h1 className="text-3xl font-bold text-[#003D5B] mb-2">
              {product?.name}
            </h1>
            {/*
             * Dynamic Price Color
             *
             * Instead of the hardcoded text-[#D1495B] (red), we use an inline
             * style={{ color: categoryColor }} so the price color matches the
             * product's category theme (e.g., red for smartphones, yellow for headphones).
             *
             * We use the style attribute because Tailwind CSS doesn't support
             * fully dynamic colors at runtime without additional setup.
             */}
            <p
              className="text-xl font-semibold mb-4"
              style={{ color: categoryColor }}
            >
              ${product?.price.toLocaleString()}
            </p>
            <p className="text-[#30638E] leading-relaxed">
              {product?.description}
            </p>
          </div>

          {/* Quantity Counter Section */}
          <div className="pt-6 border-t border-gray-100">
            <div className="mb-6">
              <label className="block text-[#003D5B] font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                {/* Minus Button - Calls decreaseQuantity on click */}
                <button
                  onClick={decreaseQuantity}
                  className="size-10 rounded-l-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <i className="bx bx-minus text-gray-600 text-lg"></i>
                </button>
                {/* Quantity Display - Shows current quantity from state */}
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-14 h-10 border-t border-b border-gray-300 text-center text-[#003D5B] font-medium outline-none"
                />
                {/* Plus Button - Calls increaseQuantity on click */}
                <button
                  onClick={increaseQuantity}
                  className="size-10 rounded-r-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <i className="bx bx-plus text-gray-600 text-lg"></i>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/*
               * Dynamic Button Background Color
               *
               * Same approach as the price: replace the hardcoded bg-[#D1495B]
               * with a dynamic style={{ backgroundColor: categoryColor }}.
               * Now the button matches the category's theme color.
               */}
              <button
                className="flex-1 px-8 py-3 rounded-full flex items-center justify-center font-medium text-white cursor-pointer"
                style={{ backgroundColor: categoryColor }}
              >
                <i className="bx bx-cart mr-2 text-2xl"></i>
                Add to Cart
              </button>
              <Link
                href="/cart"
                className="flex-1 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-[#003D5B] rounded-full flex items-center justify-center font-medium transition-colors"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
