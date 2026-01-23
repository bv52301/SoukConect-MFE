
"use client";
import BannerCMS from "./components/carousel-layout";
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <BannerCMS />

      {/* Brand Family Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Our Brand Family</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our specialized marketplaces, each designed to connect you with
            exceptional creators in their field
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Food Connect Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">🍕</div>
              <h3 className="text-2xl font-bold text-center mb-3">Food Connect</h3>
              <p className="text-gray-600 text-center mb-6 min-h-[60px]">
                Artisanal food producers, traditional recipes, and culinary artistry
              </p>
              <a
                href="http://localhost:3001"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg block text-center transition"
              >
                Explore Food Connect
              </a>
            </div>

            {/* Reno Connect Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">🏠</div>
              <h3 className="text-2xl font-bold text-center mb-3">Reno Connect</h3>
              <p className="text-gray-600 text-center mb-6 min-h-[60px]">
                Skilled craftspeople, renovation experts, and home improvement specialists
              </p>
              <button
                disabled
                className="bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg block w-full cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>

            {/* Party Connect Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4 text-center">🎉</div>
              <h3 className="text-2xl font-bold text-center mb-3">Party Connect</h3>
              <p className="text-gray-600 text-center mb-6 min-h-[60px]">
                Event planners, entertainers, and unforgettable celebration specialists
              </p>
              <button
                disabled
                className="bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg block w-full cursor-not-allowed"
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