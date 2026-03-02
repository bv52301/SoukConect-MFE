import { redirect } from 'next/navigation';

export default function FoodRedirect() {
  // In development: redirect to different port (localhost:3001)
  // In production: redirect using environment variable (absolute URL)
  const redirectUrl = process.env.NODE_ENV === 'production'
    ? (process.env.NEXT_PUBLIC_FOOD_CONNECT_URL || 'http://52.76.119.114/food')
    : 'http://localhost:3001';
  
  redirect(redirectUrl);
}
