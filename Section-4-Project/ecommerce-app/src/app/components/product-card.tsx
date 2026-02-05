/**
 * ProductCard Component
 *
 * A reusable component that displays individual product information
 * in a card format. Used on category pages to show products.
 *
 * Key concepts:
 * - TypeScript interfaces: Define the shape of props for type safety
 * - Props: Data passed from parent component to child component
 * - Dynamic inline styles: Use style={{ }} for values that change per card
 * - next/image: Optimized image component with width/height for performance
 * - line-clamp: Tailwind utility to truncate text to a specific number of lines
 * - toLocaleString(): JavaScript method to format numbers with commas (1299 → 1,299)
 * - group hover: Tailwind pattern where hovering a parent (group) triggers child styles
 */

import { Product } from "@/app/data/products";
import Image from "next/image";
import Link from "next/link";

/**
 * TypeScript Interface - ProductCardProps
 *
 * An interface is like a blueprint that defines what props this component expects.
 * If we pass the wrong data type or miss a required prop, TypeScript will warn us.
 *
 * - product: The full product object (must match the Product type from our data file)
 * - categorySlug: The URL-friendly category name (e.g., "smartphones", "laptops")
 * - categoryColor: The hex color code for the category (e.g., "#d1495b")
 */
interface ProductCardProps {
  product: Product;
  categorySlug: string;
  categoryColor: string;
}

/**
 * We destructure the props directly in the function parameters.
 * This is equivalent to:
 *   const product = props.product;
 *   const categorySlug = props.categorySlug;
 *   const categoryColor = props.categoryColor;
 */
export default function ProductCard({
  product,
  categorySlug,
  categoryColor,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
      {/* Image Container - Centers the product image with a light gray background */}
      <div className="h-64 relative bg-gray-50 p-6 flex items-center justify-center">
        <Image
          src={product.image} // Dynamic image path from product data
          alt={product.name} // Dynamic alt text for accessibility and SEO
          width={200}
          height={200}
          className="max-h-full object-contain h-full w-auto group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info - Separated from image by a subtle top border */}
      <div className="p-6 border-t border-gray-100">
        {/* Product Title - line-clamp-1 truncates to a single line if too long */}
        <h2 className="text-lg font-bold text-[#003D5B] mb-2 line-clamp-1">
          {product.name}
        </h2>

        {/* Product Description - line-clamp-2 limits to two lines */}
        <p className="text-sm text-[#30638E] opacity-80 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Action Buttons */}
        <div className="flex items-center justify-between">
          {/*
           * Price Display
           * - style={{ color: categoryColor }} dynamically sets the text color
           *   based on the category (e.g., red for smartphones, blue for laptops)
           * - toLocaleString() formats numbers: 1299 becomes "1,299"
           */}
          <span
            className="text-xl font-bold"
            style={{ color: categoryColor }}
          >
            ${product.price.toLocaleString()}
          </span>

          <div className="flex gap-2">
            {/*
             * View Details Button
             * - Dynamic link: /products/{categorySlug}/{productId}
             *   e.g., /products/smartphones/product001
             * - backgroundColor is set dynamically to match the category theme
             */}
            <Link
              href={`/products/${categorySlug}/${product.id}`}
              className="px-4 py-2 flex justify-center items-center rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: categoryColor }}
            >
              View Details
            </Link>

            {/* Add to Cart Button - Icon-only button with dynamic background color */}
            <button
              className="w-10 h-10 rounded-full text-white flex items-center justify-center"
              style={{ backgroundColor: categoryColor }}
            >
              <i className="bx bx-cart text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
