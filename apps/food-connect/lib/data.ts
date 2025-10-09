/* import type { Chef } from './types'; */
import type { Chef } from '@soukconect/types';

export async function getTopChefs(): Promise<Chef[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  return [
    {
      id: '1',
      name: 'Maria Santos',
      rating: 4.9,
      specialty: 'Artisan Sweets & Baked Treasures',
      totalOrders: 2847,
      products: 15,
      experience: 8,
      tags: ['Sweet', 'Cakes', 'Cookies'],
      bio: 'Passionate baker with 8 years of experience creating artisanal sweets and baked goods using traditional recipes passed down through generations.',
    },
    {
      id: '2',
      name: 'Giuseppe Romano',
      rating: 5.0,
      specialty: 'Authentic Italian Pasta Art & Foods',
      totalOrders: 2156,
      products: 12,
      experience: 15,
      tags: ['Pasta', 'Italian', 'Fresh'],
      bio: 'Master pasta maker from Bologna, bringing authentic Italian flavors and traditional pasta-making techniques to your table.',
    },
    {
      id: '3',
      name: 'Emma Thompson',
      rating: 4.8,
      specialty: 'Global Street & Sandwich',
      totalOrders: 1923,
      products: 8,
      experience: 6,
      tags: ['Street', 'Fusion', 'Quick'],
      bio: 'Creative chef specializing in global street food fusion, bringing flavors from around the world into innovative sandwich creations.',
    },
    {
      id: '4',
      name: 'Jean-Pierre Dubois',
      rating: 4.7,
      specialty: 'Traditional French Patisserie',
      totalOrders: 1654,
      products: 10,
      experience: 12,
      tags: ['French', 'Pastry', 'Classic'],
      bio: 'Classically trained French pastry chef with 12 years of experience in creating exquisite pastries and desserts.',
    },
  ];
}

export async function getChef(id: string): Promise<Chef | null> {
  const chefs = await getTopChefs();
  return chefs.find(chef => chef.id === id) || null;
}

export async function getAllChefIds(): Promise<string[]> {
  const chefs = await getTopChefs();
  return chefs.map(chef => chef.id);
}