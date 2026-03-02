'use client';

import { useEffect } from 'react';

export default function FoodRedirect() {
  useEffect(() => {
    window.location.href = 'http://localhost:3001';
  }, []);

  return null;
}
