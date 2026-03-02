import { redirect } from 'next/navigation';

export default function FoodRedirect() {
  // In development: redirect to different port (localhost:3001)
  // In production: redirect to /food (same domain, different basePath)
  const redirectUrl = process.env.NODE_ENV === 'production'
    ? '/food'
    : 'http://localhost:3001';
  
  redirect(redirectUrl);
}
