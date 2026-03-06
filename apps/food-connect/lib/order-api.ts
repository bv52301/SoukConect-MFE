import { config } from './config';

// Time slot interface for delivery times
export interface TimeSlot {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

// Order item interface
export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  requestedDeliveryDate: string; // YYYY-MM-DD format
  deliveryFlexibility: 'STRICT' | 'FLEXIBLE';
  deliverySlotStart: TimeSlot;
  deliverySlotEnd: TimeSlot;
}

// Create order request interface
export interface CreateOrderRequest {
  customerId: number;
  addressId: number;
  totalAmount: number;
  paymentMethod: 'CASH' | 'CARD' | 'UPI' | 'WALLET';
  requestedDeliveryDate: string; // YYYY-MM-DD format
  deliveryFlexibility: 'STRICT' | 'FLEXIBLE';
  deliverySlotStart: TimeSlot;
  deliverySlotEnd: TimeSlot;
  notes?: string;
  items: OrderItem[];
}

// Order response interface
export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: number;
    customerId: number;
    orderStatus: string;
    totalAmount: number;
    createdAt: string;
    estimatedDeliveryDate: string;
  };
  statusCode: number;
}

const API_BASE_URL = config.apiUrl;

// Helper function to get authorization header
function getAuthHeader(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

// Helper function to create time slot from hours
export function createTimeSlot(hours: number = 0, minutes: number = 0): TimeSlot {
  return {
    hour: hours,
    minute: minutes,
    second: 0,
    nano: 0,
  };
}

// Helper function to get tomorrow's date in YYYY-MM-DD format
export function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export const orderApi = {
  async createOrder(orderData: CreateOrderRequest, token?: string): Promise<OrderResponse> {
    const url = `${API_BASE_URL}/orders`;
    
    try {
      const headers = getAuthHeader();
      // If explicit token provided, use it
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Order creation failed with status ${response.status}`
        );
      }

      const data: OrderResponse = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Order creation failed');
      }

      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  },
};
