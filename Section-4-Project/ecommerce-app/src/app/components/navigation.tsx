import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#003D5B] shadow py-4 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-9 h-9 bg-[#EDAE49] text-[#003D5B] rounded-full flex items-center justify-center font-bold text-xl mr-2">
                SB
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Store
              </span>
              <span className="text-xl font-bold tracking-tight text-[#EDAE49]">
                Brand
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block grow max-w-lg mx-8">
            <form className="group relative">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-4 pr-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#EDAE49] focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-white/70 p-1.5 hover:text-white rounded-full transition-colors"
              >
                <i className="bx bx-search text-xl"></i>
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Products Button */}
            <div className="group">
              <button className="text-white/90 hover:text-[#EDAE49] transition-colors p-2 rounded-full hover:bg-white/10 flex items-center">
                <i className="bx bx-store text-2xl mr-1"></i>
                <span className="hidden md:inline text-base font-medium">
                  Products
                </span>
                <i className="bx bx-chevron-down ml-1"></i>
              </button>
            </div>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="text-white/90 flex justify-center items-center hover:text-[#EDAE49] p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <i className="bx bx-cart text-2xl"></i>
            </Link>

            {/* Login Link */}
            <Link
              href="/login"
              className="text-white/90 flex justify-center items-center hover:text-[#EDAE49] p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <i className="bx bx-user text-2xl"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
