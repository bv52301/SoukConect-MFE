import { ChefCard } from '../components/chef-card';
import { getTopChefs } from '../lib/data';

// ISR - Revalidate every 60 seconds
export const revalidate = 60;

export default async function FoodHomePage() {
  const topChefs = await getTopChefs();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🍕 Food Connect
          </h1>
          <p className="text-white/90 text-lg">
            Discover artisanal food producers and culinary masters
          </p>
        </div>
      </section>

      {/* Top Chefs Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              👨‍🍳 Most Ordered Makers & Chefs 👩‍🍳
            </h2>
            <p className="text-gray-600">
              Meet the culinary artists behind our most beloved products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topChefs.map((chef) => (
              <ChefCard key={chef.id} chef={chef} />
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition">
              View All 47 Makers & Chefs →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}