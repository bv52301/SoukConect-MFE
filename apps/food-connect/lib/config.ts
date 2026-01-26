export const config = {
  shellUrl: process.env.NEXT_PUBLIC_SHELL_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost/api",
} as const;
