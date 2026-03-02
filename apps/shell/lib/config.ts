export const config = {
  // Always use absolute URLs to avoid basePath nesting issues
  // Development: relative path works because no basePath
  // Production: absolute URL because shell is at /ui basePath
  foodConnectUrl: (() => {
    if (typeof window === 'undefined') {
      // Server-side
      return process.env.NODE_ENV === 'production'
        ? 'http://52.76.119.114/food'
        : '/food';
    }
    // Client-side - construct from current origin
    const origin = window.location.origin;
    return process.env.NODE_ENV === 'production'
      ? `${origin}/food`
      : '/food';
  })(),
} as const;
