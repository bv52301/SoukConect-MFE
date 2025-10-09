export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 py-20 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute left-10 top-20 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute right-20 bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            SOULCONNECT PREMIER
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            More Than a
            <br />
            <span className="text-yellow-300">Marketplace</span>
          </h1>

          {/* Subheading */}
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10">
            Your trusted marketplace for every need - connecting passionate creators with
            discerning consumers across the globe
          </p>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
            <div className="text-center">
              <div className="bg-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Carefully Curated</h3>
              <p className="text-white/80 text-sm">Handpicked quality vendors</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Global Community</h3>
              <p className="text-white/80 text-sm">Worldwide connections</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-white font-semibold mb-1">Authentic Stories</h3>
              <p className="text-white/80 text-sm">Every product has meaning</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition">
              Explore All Results
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg backdrop-blur transition">
              ⚡ Join Our Community
            </button>
          </div>
        </div>
      </section>

      {/* Brand Family Section */}
      <section className="py-20 px-4 bg-gray-50">
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
      <section className="bg-gradient-to-r from-blue-500 to-cyan-400 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Connect?</h2>
          <p className="text-white/90 text-lg mb-8">
            Join our community of creators and consumers building authentic connections
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition">
              Become a Vendor
            </button>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition">
              Start Shopping
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}