"use client";
import { useState, useEffect, Suspense } from 'react';
import FoodCategories from '@/components/category';
import { ChefCard } from '../components/chef-card';
import { getTopChefs } from '../lib/data';
import { VendorsSection } from '@/components/vendor-section';
import { useSearchParams, useRouter } from 'next/navigation';
import { Chef } from '@soukconect/types';

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </main>
  );
}

function FoodHomeContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [topChefs, setTopChefs] = useState<Chef[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getTopChefs().then(setTopChefs);
  }, []);

  // If a category is provided in the query params (e.g. /?category=Indian), open VendorsSection
  useEffect(() => {
    const cat = searchParams?.get?.('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const target = event.target as HTMLElement;
    const categoryElement = target.closest('[data-category]') as HTMLElement;

    if (categoryElement) {
      const category = categoryElement.getAttribute('data-category');
      if (category) {
        console.log('Selected category:', category);
        setSelectedCategory(category);
      }
    }
  };

  if (selectedCategory) {
    return (
      <main className="min-h-screen bg-gray-50">
        <VendorsSection
          category={selectedCategory}
          onClose={() => {
            setSelectedCategory(null);
            // remove category param from url
            try {
              router.push('/');
            } catch {
              /* ignore */
            }
          }}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      {/* <section className="bg-gradient-to-r from-green-500 to-emerald-400 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🍕 Food Connect
          </h1>
          <p className="text-white/90 text-lg">
            Discover artisanal food producers and culinary masters
          </p>
        </div>
      </section> */}

      {/* Categories with click handler */}
      <div onClick={handleCategoryClick}>
        <FoodCategories />
      </div>

      {/* Top Chefs Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              👨‍🍳 Most Ordered Makers & Chefs 👩‍🍳
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topChefs.map((chef) => (
              <ChefCard key={chef.id} chef={chef} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function FoodHomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FoodHomeContent />
    </Suspense>
  );
}