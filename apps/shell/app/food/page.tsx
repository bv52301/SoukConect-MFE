'use client';

import { useEffect } from 'react';

export default function FoodRedirect() {
  useEffect(() => {
    // In development: redirect to different port (localhost:3001)
    // In production: redirect to /food (same domain, different basePath)
    const redirectUrl = process.env.NODE_ENV === 'production'
      ? '/food'
      : 'http://localhost:3001';
    
    window.location.href = redirectUrl;
  }, []);

  return null;
}
