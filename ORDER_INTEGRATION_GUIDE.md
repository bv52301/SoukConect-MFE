# Order API Integration - Testing Guide

## Overview
The order creation system has been integrated with the API endpoint at `http://52.76.119.114/orders`

## Changes Made

### 1. Created `lib/order-api.ts`
New API service that handles:
- Order creation with `POST /orders` endpoint
- Type-safe request/response interfaces matching the Swagger spec
- Automatic authorization header attachment
- Helper functions for time slot and date handling

**Key endpoint:**
```
POST http://52.76.119.114/orders
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Structure:**
```json
{
  "customerId": 9007199254740991,
  "addressId": 9007199254740991,
  "totalAmount": 0,
  "paymentMethod": "CASH",
  "requestedDeliveryDate": "2026-03-05",
  "deliveryFlexibility": "STRICT",
  "deliverySlotStart": {
    "hour": 9,
    "minute": 0,
    "second": 0,
    "nano": 0
  },
  "deliverySlotEnd": {
    "hour": 17,
    "minute": 0,
    "second": 0,
    "nano": 0
  },
  "notes": "string",
  "items": [
    {
      "productId": 9007199254740991,
      "quantity": 1,
      "unitPrice": 0,
      "requestedDeliveryDate": "2026-03-05",
      "deliveryFlexibility": "STRICT",
      "deliverySlotStart": {...},
      "deliverySlotEnd": {...}
    }
  ]
}
```

**Response Structure:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": 12345,
    "customerId": 9007199254740991,
    "orderStatus": "PENDING",
    "totalAmount": 50.00,
    "createdAt": "2026-03-05T10:30:00Z",
    "estimatedDeliveryDate": "2026-03-06"
  },
  "statusCode": 200
}
```

### 2. Updated `components/checkout-modal.tsx`
Enhanced with:
- Delivery date selection (date input)
- Delivery flexibility (STRICT/FLEXIBLE)
- Delivery time slot (start and end times)
- Payment method selection (CASH/CARD)
- Special notes for delivery (optional)
- Proper error handling with error display
- Automatic address ID handling (defaults to 1)
- Token-based authorization

## Key Features

### Helper Functions

#### `createTimeSlot(hours: number, minutes: number): TimeSlot`
Converts hours and minutes into the required TimeSlot format for the API.

```typescript
import { createTimeSlot } from '@/lib/order-api';

const slot = createTimeSlot(14, 30); // 2:30 PM
// Returns: { hour: 14, minute: 30, second: 0, nano: 0 }
```

#### `getTomorrowDate(): string`
Returns tomorrow's date in YYYY-MM-DD format.

```typescript
import { getTomorrowDate } from '@/lib/order-api';

const tomorrow = getTomorrowDate(); // e.g., "2026-03-06"
```

### Authorization
The API automatically includes the auth token from the user's login session:
- Token is retrieved from localStorage (`auth_token`)
- Added to request header: `Authorization: Bearer <token>`
- Fallback to explicit token parameter if provided

## Testing Steps

### Prerequisites
- User must be logged in (auth token required)
- Valid delivery address and phone number
- Cart items ready for order

### Manual Testing

1. **Start the application:**
   ```bash
   pnpm dev
   ```

2. **Test Order Flow:**
   - Add items to cart
   - Click "Checkout"
   - Verify login modal appears if not logged in
   - Login with valid credentials
   - Fill in delivery details:
     - ✅ Delivery Address (required)
     - ✅ Phone Number (required)
     - ✅ Delivery Date (defaults to tomorrow)
     - ✅ Delivery Flexibility (STRICT or FLEXIBLE)
     - ✅ Delivery Time Slot (Start and End)
     - ✅ Payment Method (CASH or CARD)
     - ✅ Special Notes (optional)
   - Click "Place Order"
   - Verify:
     - Loading state shows "Processing..."
     - Success: Modal closes, order created
     - Error message displays if API fails

3. **Test Different Scenarios:**

   **Cash Payment:**
   - Select "Cash on Delivery"
   - Fill delivery details
   - Place order
   - Verify API called with `paymentMethod: "CASH"`

   **Card Payment:**
   - Select "Card Payment"
   - Fill delivery details
   - Place order
   - Verify API called with `paymentMethod: "CARD"`

   **Flexible Delivery:**
   - Select "Flexible" delivery
   - Any delivery time slot accepted
   - Order should process normally

   **Strict Time Delivery:**
   - Select "Strict Time"
   - Delivery must happen within specified slot
   - Order should process normally

4. **Test Validation:**
   - Leave address empty → Error: "Please fill in all delivery details"
   - Leave phone empty → Error: "Please fill in all delivery details"
   - Try without login → Login modal appears

5. **Verify API Data in DevTools:**
   - Open Browser DevTools → Network
   - Place an order
   - Check the POST request to `/orders`
   - Verify payload structure matches expected format
   - Verify Authorization header is present
   - Check response contains orderId and orderStatus

### Example Network Request (DevTools)

**Request:**
```
POST http://52.76.119.114/orders
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "customerId": 123,
  "addressId": 1,
  "totalAmount": 45.99,
  "paymentMethod": "CASH",
  "requestedDeliveryDate": "2026-03-06",
  "deliveryFlexibility": "FLEXIBLE",
  "deliverySlotStart": {"hour": 9, "minute": 0, "second": 0, "nano": 0},
  "deliverySlotEnd": {"hour": 17, "minute": 0, "second": 0, "nano": 0},
  "notes": "Ring the doorbell twice",
  "items": [
    {
      "productId": 45,
      "quantity": 2,
      "unitPrice": 22.99,
      "requestedDeliveryDate": "2026-03-06",
      "deliveryFlexibility": "FLEXIBLE",
      "deliverySlotStart": {"hour": 9, "minute": 0, "second": 0, "nano": 0},
      "deliverySlotEnd": {"hour": 17, "minute": 0, "second": 0, "nano": 0}
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": 98765,
    "customerId": 123,
    "orderStatus": "PENDING",
    "totalAmount": 45.99,
    "createdAt": "2026-03-05T10:30:00Z",
    "estimatedDeliveryDate": "2026-03-06"
  },
  "statusCode": 200
}
```

## API Integration Details

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| customerId | number | Yes | User ID from auth context |
| addressId | number | Yes | Delivery address ID (default: 1) |
| totalAmount | number | Yes | Order total in decimal format |
| paymentMethod | string | Yes | CASH or CARD |
| requestedDeliveryDate | string | Yes | YYYY-MM-DD format |
| deliveryFlexibility | string | Yes | STRICT or FLEXIBLE |
| deliverySlotStart | TimeSlot | Yes | Start time of delivery window |
| deliverySlotEnd | TimeSlot | Yes | End time of delivery window |
| notes | string | No | Special delivery instructions |
| items | OrderItem[] | Yes | Array of items in order |

### TimeSlot Format
```typescript
{
  hour: number,        // 0-23
  minute: number,      // 0-59
  second: number,      // 0-59 (usually 0)
  nano: number         // nanoseconds (usually 0)
}
```

## Error Handling

### Common Errors

**Missing Authentication:**
```
Error: Order creation failed with status 401
Solution: Ensure user is logged in with valid token
```

**Invalid Delivery Date:**
```
Error: Delivery date must be in future
Solution: Select a date greater than today
```

**Missing Required Fields:**
```
Error: Please fill in all delivery details
Solution: Fill address and phone number (required fields marked with *)
```

**API Server Down:**
```
Error: An unexpected error occurred
Solution: Check API server at http://52.76.119.114 is running
```

## Browser Console Debugging

```javascript
// Order creation logs
console.log('Order created successfully:', response.data);

// Error logs
console.error('Order error:', err);
```

Check DevTools → Console for detailed error messages.

## Next Steps

1. **Order Tracking:** Add order status tracking page
2. **Payment Integration:** Implement card payment gateway
3. **Address Management:** Add saved addresses selection
4. **Delivery Slot Optimization:** Show available time slots based on vendor
5. **Order Confirmation:** Add email/SMS confirmation after order
6. **Order History:** Display user's past orders
7. **Real-time Updates:** Add WebSocket for order status updates

## Troubleshooting

### Order Not Creating
- Verify authentication token exists in localStorage
- Check Network tab for actual API response
- Ensure all required fields are filled
- Check API server is running at configured URL

### Time Slot Not Saving
- Verify time format is HH:MM (24-hour format)
- Check start time is before end time
- Time slot values are correctly parsed as numbers

### Token Not Attached
- Verify user is logged in
- Check localStorage has `auth_token` key
- Clear browser cache and login again

### Custom Error Messages
The API response `message` field is displayed to user:
- Customize backend error messages for better UX
- Currently shows generic fallback if message missing
