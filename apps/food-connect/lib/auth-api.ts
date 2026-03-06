import { config } from './config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    token: string;
    refreshToken: string;
    loginType: string;
    userType: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    profilePicture: string;
  };
  statusCode: number;
}

const API_BASE_URL = config.apiUrl;

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const url = `${API_BASE_URL}/v1/auth/login`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed with status ${response.status}`
        );
      }

      const data: LoginResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  },

  async logout(): Promise<void> {
    // Clear tokens from localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  },

  setStoredToken(token: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('refresh_token', refreshToken);
  },
};
