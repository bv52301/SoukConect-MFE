'use client';

import { useEffect } from 'react';

export default function FoodRedirect() {
  useEffect(() => {
    window.location.href = process.env.NEXT_PUBLIC_FOOD_CONNECT_URL || '/food';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to Food Connect...</p>
    </div>
  );
}
