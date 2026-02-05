import Link from "next/link";
import { categories } from "@/app/data/products";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Newsletter Section */}
      <div className="bg-[#003D5B] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Newsletter Text */}
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-2">
                Join Our Newsletter
              </h2>
              <p className="text-white/80">
                Get the latest products, promotions, and tech news delivered to
                your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="w-full md:w-auto">
              <form className="flex flex-col md:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#EDAE49] transition-all min-w-60"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#EDAE49] hover:bg-[#EDAE49]/90 text-white px-6 py-3 rounded-lg transform hover:scale-105 transition-all font-medium flex items-center justify-center"
                >
                  Subscribe
                  <i className="bx bx-envelope ml-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          {/* Left Section - Logo, Description, Social Icons */}
          <div className="col-span-2 md:col-span-4">
            {/* Logo */}
            <Link href="/" className="flex items-center mb-6">
              <div className="bg-[#EDAE49] text-[#003D5B] w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-2">
                SB
              </div>
              <span className="text-xl font-bold text-[#003D5B]">Store</span>
              <span className="text-xl font-bold text-[#EDAE49]">Brand</span>
            </Link>

            {/* Brand Description */}
            <p className="text-gray-600 mb-6">
              Elevating your tech experience with premium products and
              exceptional service.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram", "youtube"].map(
                (platform) => (
                  <a
                    key={platform}
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-[#003D5B] transform hover:scale-110 transition-all"
                  >
                    <i
                      className={`bx bxl-${platform} text-gray-500 group-hover:text-white text-xl transition-colors`}
                    ></i>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Categories Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[#003D5B] font-bold mb-4 text-lg">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link
                    href="/products"
                    className="text-gray-600 hover:text-[#00798C] hover:translate-x-1 inline-flex items-center transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EDAE49] opacity-70 mr-2 inline-block"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-[#00798C] hover:text-[#003D5B] font-medium hover:translate-x-1 inline-flex items-center transition-all group"
                >
                  View All
                  <i className="bx bx-right-arrow-alt ml-1 opacity-70 group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[#003D5B] font-bold mb-4 text-lg">Shop</h3>
            <ul className="space-y-2.5">
              {[
                "All Products",
                "New Arrivals",
                "Best Sellers",
                "Gift Cards",
                "Deals",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#00798C] hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[#003D5B] font-bold mb-4 text-lg">Support</h3>
            <ul className="space-y-2.5">
              {[
                "Contact Us",
                "FAQs",
                "Shipping",
                "Returns",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#00798C] hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[#003D5B] font-bold mb-4 text-lg">Company</h3>
            <ul className="space-y-2.5">
              {[
                "About Us",
                "Blog",
                "Careers",
                "Press",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#00798C] hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} StoreBrand. All rights reserved.
            </div>

            <div className="flex items-center">
              {/* Payment Icons */}
              <div className="hidden md:flex items-center mr-6 space-x-3">
                {["Visa", "Mastercard", "Paypal", "Apple"].map((method) => (
                  <div key={method} className="text-gray-400">
                    <i
                      className={`bx bxl-${method.toLowerCase()} text-2xl`}
                    ></i>
                  </div>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex space-x-4 items-center">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-[#003D5B]"
                >
                  Terms
                </a>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-[#003D5B]"
                >
                  Privacy
                </a>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-[#003D5B]"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
