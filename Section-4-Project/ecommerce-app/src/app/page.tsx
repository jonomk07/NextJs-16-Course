import Link from "next/link";
import Image from "next/image";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="grow">
        {/* Hero Section */}
        <div className="relative h-[80vh] mb-16 overflow-hidden bg-linear-to-r from-[#003D5B] to-[#00798C]">
          <div className="max-w-7xl mx-auto px-4 pt-24 h-full flex flex-col">
            <div className="grow flex flex-col md:flex-row items-center justify-center md:justify-between">
              {/* Left Side - Text Content */}
              <div className="w-1/2 text-center md:text-left mb-10 md:mb-0 z-10">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                  <div className="mb-2">
                    Discover{" "}
                    <span className="text-[#EDAE49]">Premium</span>
                  </div>
                  <div>Products</div>
                </h1>

                <p className="text-xl text-white opacity-80 max-w-lg mb-10">
                  Experience exceptional quality and service with our curated
                  selection of premium products.
                </p>

                {/* Call to Action Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    href="/products"
                    className="px-8 py-3 bg-[#EDAE49] text-white rounded-full hover:bg-[#EDAE49]/90 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    Shop Now
                    <i className="bx bx-chevron-right ml-1 text-xl"></i>
                  </Link>
                </div>
              </div>

              {/* Right Side - Featured Product Image */}
              <div className="w-1/2 relative z-10 flex justify-center md:justify-end">
                <Link href="/products" className="relative group cursor-pointer">
                  {/* Glowing Animated Circle */}
                  <div className="absolute -inset-4 rounded-full bg-white/10 backdrop-blur-sm animate-pulse group-hover:bg-white/20 transition-colors"></div>

                  {/* Frosted Glass Card */}
                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <Image
                      src="/images/product001.png"
                      alt="Featured Product Image"
                      width={500}
                      height={400}
                      className="rounded-lg drop-shadow-2xl object-contain"
                    />

                    {/* New Arrival Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-[#EDAE49] text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold">
                      New Arrival
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
