'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FoodRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to localhost:3001 (food app's actual location)
    window.location.href = 'http://localhost:3001';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to Food Connect...</p>
    </div>
  );
}
