
"use client";
import Link from "next/link";
import BannerCMS from "./components/carousel-layout";
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="px-4 pt-6 pb-6 bg-gray-50">
        <BannerCMS />
      </div>

      {/* Brand Family Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2">Our Brand Family</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Discover our specialized marketplaces, each designed to connect you with
            exceptional creators in their field
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Food Connect Card */}
            <Link href="http://localhost:3001">
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 transform cursor-pointer h-full flex flex-col">
                <div className="text-5xl mb-3 text-center">🍕</div>
                <h3 className="text-2xl font-bold text-center mb-2">Food Connect</h3>
                <p className="text-gray-600 text-center mb-5 leading-relaxed flex-grow">
                  Artisanal food producers, traditional recipes, and culinary artistry
                </p>
                <div className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg text-center transition w-full">
                  Explore Food Connect
                </div>
              </div>
            </Link>

            {/* Reno Connect Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md opacity-75 cursor-not-allowed h-full flex flex-col">
              <div className="text-5xl mb-3 text-center">🏠</div>
              <h3 className="text-2xl font-bold text-center mb-2">Reno Connect</h3>
              <p className="text-gray-600 text-center mb-5 leading-relaxed flex-grow">
                Skilled craftspeople, renovation experts, and home improvement specialists
              </p>
              <button
                disabled
                className="bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg block w-full cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>

            {/* Party Connect Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md opacity-75 cursor-not-allowed h-full flex flex-col">
              <div className="text-5xl mb-3 text-center">🎉</div>
              <h3 className="text-2xl font-bold text-center mb-2">Party Connect</h3>
              <p className="text-gray-600 text-center mb-5 leading-relaxed flex-grow">
                Event planners, entertainers, and unforgettable celebration specialists
              </p>
              <button
                disabled
                className="bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg block w-full cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-8 px-4 mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left Stats */}
            <div className="text-white">
              <p className="text-3xl font-bold">50K+</p>
              <p className="text-sm text-white/80">Active Vendors</p>
            </div>

            {/* Center CTA */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Connect?</h2>
              <p className="text-white/90 text-sm mb-5">
                Join thousands building authentic connections today
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2.5 rounded-lg transition text-sm">
                  Become a Vendor
                </button>
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-2.5 rounded-lg transition text-sm">
                  Start Shopping
                </button>
              </div>
            </div>

            {/* Right Stats */}
            <div className="text-white text-right">
              <p className="text-3xl font-bold">100K+</p>
              <p className="text-sm text-white/80">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}