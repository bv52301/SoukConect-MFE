import { getChef, getAllChefIds } from '../../../lib/data';
import { notFound } from 'next/navigation';

// ISR - Revalidate every 5 minutes
export const revalidate = 300;

// Generate static paths for all chefs
export async function generateStaticParams() {
  const chefIds = await getAllChefIds();
  return chefIds.map((id) => ({ id }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const chef = await getChef(params.id);
  
  if (!chef) {
    return { title: 'Chef Not Found' };
  }

  return {
    title: `${chef.name} - Food Connect`,
    description: chef.bio,
  };
}

export default async function ChefPage({ params }: { params: { id: string } }) {
  const chef = await getChef(params.id);

  if (!chef) {
    notFound();
  }

  const bgColors = [
    'bg-gradient-to-br from-orange-400 to-orange-500',
    'bg-gradient-to-br from-teal-400 to-teal-500',
    'bg-gradient-to-br from-green-400 to-green-500',
    'bg-gradient-to-br from-purple-400 to-purple-500',
  ];

  const randomBg = bgColors[parseInt(chef.id) % bgColors.length];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Chef Header */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className={`${randomBg} w-32 h-32 rounded-full flex items-center justify-center shadow-xl`}>
              <span className="text-6xl">👨‍🍳</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{chef.name}</h1>
                  <p className="text-gray-600 text-lg">{chef.specialty}</p>
                </div>
                <div className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-full">
                  ⭐ {chef.rating}
                </div>
              </div>

              <p className="text-gray-700 mb-6">{chef.bio}</p>

              {/* Stats */}
              <div className="flex gap-6 mb-6">
                <div>
                  <div className="font-bold text-2xl">{chef.totalOrders.toLocaleString()}</div>
                  <div className="text-gray-600 text-sm">Total Orders</div>
                </div>
                <div>
                  <div className="font-bold text-2xl">{chef.products}</div>
                  <div className="text-gray-600 text-sm">Products</div>
                </div>
                <div>
                  <div className="font-bold text-2xl">{chef.experience}+</div>
                  <div className="text-gray-600 text-sm">Years Experience</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {chef.tags.map((tag:any) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Placeholder */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Products by {chef.name}</h2>
          
          <div className="bg-white rounded-xl p-12 text-center">
            <p className="text-gray-600 text-lg">
              Products will be displayed here...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              This is a placeholder. You'll add product listing next!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}