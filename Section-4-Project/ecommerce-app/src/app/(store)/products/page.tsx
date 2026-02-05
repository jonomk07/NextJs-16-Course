/**
 * Products Page - /products
 *
 * Displays all product categories in a responsive grid layout.
 * Each category card is a clickable Link that navigates to the
 * dynamic category page (/products/[category]).
 *
 * Key concepts:
 * - Dynamic links with template literals: href={`/products/${category.slug}`}
 * - Array.map(): Loops through data and renders a component for each item
 * - Array.find(): Finds the first matching product for a category image
 * - next/image with fill: Automatically fills the parent container (parent must be relative)
 * - sizes attribute: Tells the browser how much space the image takes at different screen widths
 * - Inline styles: Used for dynamic values like borderColor and text color from data
 * - Optional chaining (?.) with fallback (||): Safe access with default value
 * - group hover: Parent hover triggers child animations (image scale, chevron slide)
 */

import { categories, productsList } from "@/app/data/products";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
  /**
   * getCategoryImage - Utility function to find a representative image for each category
   *
   * Since categories don't have their own images, we find the first product
   * that belongs to the category and use its image.
   *
   * Array.find() returns the first product where product.category === categorySlug.
   * If no product is found, we fall back to the placeholder image.
   *
   * Optional chaining (?.) prevents errors if categoryProduct is undefined.
   */
  const getCategoryImage = (categorySlug: string): string => {
    const categoryProduct = productsList.find(
      (product) => product.category === categorySlug
    );
    return categoryProduct?.image || "/images/placeholder.png";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mb-16">
      {/*
       * Categories Grid
       *
       * Responsive grid layout using Tailwind CSS:
       * - grid-cols-1: 1 column on mobile
       * - md:grid-cols-2: 2 columns on tablets (768px+)
       * - lg:grid-cols-3: 3 columns on laptops (1024px+)
       * - xl:grid-cols-4: 4 columns on desktops (1280px+)
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            href={`/products/${category.slug}`} // Dynamic link using template literal
            key={category.slug} // Unique key for React list rendering
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1.25 border-b-4 relative transition-all"
            style={{ borderColor: category.color }} // Dynamic border color from data
          >
            {/*
             * Category Image
             * - fill: Makes the image fill its parent container (parent must be relative)
             * - sizes: Responsive image loading hints for the browser
             *   100vw on mobile, 50vw on tablet, 25vw on desktop
             * - getCategoryImage(): Finds a product image to represent this category
             */}
            <div className="h-48 relative overflow-hidden bg-gray-100">
              <Image
                src={getCategoryImage(category.slug)}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay Gradient - Creates a smooth visual transition from image to text */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white to-transparent"></div>
            </div>

            {/* Category Details */}
            <div className="p-6">
              {/* Category Name - Dynamically colored using inline style */}
              <h3
                className="text-xl font-bold mb-2 text-[#003D5B] group-hover:text-[#00798C] transition-colors"
                style={{ color: category.color }}
              >
                {category.name}
              </h3>
              <p className="text-sm text-[#30638E] mb-4">
                {category.description}
              </p>

              {/* View Products Link - Arrow slides right on hover via group-hover */}
              <div
                className="flex items-center text-sm font-medium transition-colors"
                style={{ color: category.color }}
              >
                <span className="mr-1">View Products</span>
                <i className="bx bx-chevron-right text-xl transform group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation - Back to home page link */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/"
          className="inline-flex items-center text-[#00798C] hover:text-[#003D5B] transition-colors"
        >
          <i className="bx bx-arrow-back mr-2"></i>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
