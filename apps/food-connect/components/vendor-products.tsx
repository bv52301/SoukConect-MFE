'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface Media {
  id: number;
  mediaType: string;
  url: string;
  description: string | null;
}

interface CategoryDetail {
  Category: string[];
  Cuisinename: string;
  SubCategory: string[];
  regionCategory?: string;
}

interface Schedule {
  weekly_schedules: Array<{
    tz: string;
    end: string;
    start: string;
    stock: number;
    day_of_week: string[];
  }>;
}

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  vendorId: number;
  available: boolean;
  description: string;
  categoryDetails: CategoryDetail[];
  schedule: Schedule;
  useVendorSchedule: boolean;
  media: Media[];
}

interface VendorProductsProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
}

export function VendorProducts({ products = [], onAddToCart }: VendorProductsProps) {
  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      console.log('Added to cart:', product.name);
    }
  };

  // Safety check
  if (!products || !Array.isArray(products)) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No products available</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              {/* Product Header with Image and Title */}
              <div className="flex gap-4 mb-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                    {product.media && product.media.length > 0 ? (
                      <img
                        src={product.media[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23f3f4f6" width="128" height="128"/%3E%3Ctext x="50%25" y="50%25" fill="%239ca3af" text-anchor="middle" dy=".3em" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price and Add Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.available}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-200
                    ${product.available 
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  aria-label={`Add ${product.name} to cart`}
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Availability Status */}
              {!product.available && (
                <div className="mt-3">
                  <span className="text-xs text-red-600 font-medium">
                    Currently Unavailable
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products available</p>
        </div>
      )}
    </div>
  );
}

// Example usage with sample data - This is what renders in the preview
const VendorProductsExample = () => {
  const sampleProducts: Product[] = [
    {
      id: 5,
      name: "Chettinad Chicken Masala",
      sku: "AC-001",
      price: 16,
      vendorId: 4,
      available: true,
      description: "A fiery, aromatic curry made with fresh chicken and a complex blend of roasted Chettinad spices.",
      categoryDetails: [
        {
          Category: ["Indian"],
          Cuisinename: "Asian",
          SubCategory: ["South Indian"],
          regionCategory: "Chettinad"
        }
      ],
      schedule: {
        weekly_schedules: [
          {
            tz: "Asia/Singapore",
            end: "17:00",
            start: "08:00",
            stock: 20,
            day_of_week: ["Sun"]
          }
        ]
      },
      useVendorSchedule: false,
      media: [
        {
          id: 4,
          mediaType: "IMAGE",
          url: "https://bing.com/th?id=OSK.b2ab0b7ccd417709f2a8361477e5d4fd",
          description: null
        }
      ]
    },
    {
      id: 6,
      name: "KVR Uppuma",
      sku: "AC-002",
      price: 7.00,
      vendorId: 4,
      available: true,
      description: "Savory South Indian delight with sambar and chutneys.",
      categoryDetails: [
        {
          Category: ["Indian"],
          Cuisinename: "Asian",
          SubCategory: ["South Indian"]
        }
      ],
      schedule: {
        weekly_schedules: [
          {
            tz: "Asia/Singapore",
            end: "17:00",
            start: "08:00",
            stock: 15,
            day_of_week: ["Sun", "Mon", "Tue"]
          }
        ]
      },
      useVendorSchedule: false,
      media: []
    },
    {
      id: 7,
      name: "KVR Pongal",
      sku: "AC-003",
      price: 7.00,
      vendorId: 4,
      available: true,
      description: "Soft Pongal served with spicy sambar and chutneys.",
      categoryDetails: [
        {
          Category: ["Indian"],
          Cuisinename: "Asian",
          SubCategory: ["South Indian"]
        }
      ],
      schedule: {
        weekly_schedules: []
      },
      useVendorSchedule: true,
      media: []
    },
    {
      id: 8,
      name: "KVR Idly set",
      sku: "AC-004",
      price: 5.30,
      vendorId: 4,
      available: true,
      description: "2 Steamed rice cakes served with sambar and chutney",
      categoryDetails: [
        {
          Category: ["Indian"],
          Cuisinename: "Asian",
          SubCategory: ["South Indian"]
        }
      ],
      schedule: {
        weekly_schedules: []
      },
      useVendorSchedule: true,
      media: []
    },
    {
      id: 9,
      name: "KVR Sambar Idly Set",
      sku: "AC-005",
      price: 8.90,
      vendorId: 4,
      available: false,
      description: "Idlies soaked in flavorful sambar, a comforting South Indian favorite.",
      categoryDetails: [
        {
          Category: ["Indian"],
          Cuisinename: "Asian",
          SubCategory: ["South Indian"]
        }
      ],
      schedule: {
        weekly_schedules: []
      },
      useVendorSchedule: true,
      media: []
    },
    {
      id: 10,
      name: "KVR Mini Sambar Idly",
      sku: "AC-006",
      price: 8.80,
      vendorId: 4,
      available: true,
      description: "Soft mini idly with tangy sambar, served with chutneys.",
      categoryDetails: [
        {
          Category: ["Indian"],
          Cuisinename: "Asian",
          SubCategory: ["South Indian"]
        }
      ],
      schedule: {
        weekly_schedules: []
      },
      useVendorSchedule: true,
      media: []
    }
  ];

  const handleAddToCart = (product: Product) => {
    alert(`Added ${product.name} to cart!`);
  };

  return <VendorProducts products={sampleProducts} onAddToCart={handleAddToCart} />;
};

// Export the example component as default for preview
export default VendorProductsExample;