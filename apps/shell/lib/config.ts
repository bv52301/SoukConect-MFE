export const config = {
  // In production, use absolute URL to avoid basePath issues
  // In development, use relative path
  foodConnectUrl: process.env.NODE_ENV === 'production'
    ? (process.env.NEXT_PUBLIC_FOOD_CONNECT_URL || 'http://52.76.119.114/food')
    : (process.env.NEXT_PUBLIC_FOOD_CONNECT_URL || '/food'),
} as const;
