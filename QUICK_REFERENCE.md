# Quick Reference - Order Integration

## 🚀 Quick Start

### Place an Order (Code Example)
```typescript
import { orderApi, createTimeSlot, getTomorrowDate } from '@/lib/order-api';

const order = await orderApi.createOrder({
  customerId: user.id,
  addressId: 1,
  totalAmount: 45.99,
  paymentMethod: 'CASH',
  requestedDeliveryDate: getTomorrowDate(),
  deliveryFlexibility: 'FLEXIBLE',
  deliverySlotStart: createTimeSlot(9, 0),    // 9:00 AM
  deliverySlotEnd: createTimeSlot(17, 0),     // 5:00 PM
  items: [
    {
      productId: 123,
      quantity: 2,
      unitPrice: 22.99,
      requestedDeliveryDate: getTomorrowDate(),
      deliveryFlexibility: 'FLEXIBLE',
      deliverySlotStart: createTimeSlot(9, 0),
      deliverySlotEnd: createTimeSlot(17, 0),
    }
  ]
});
```

---

## 📋 API Endpoint

**POST** `http://52.76.119.114/orders`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 🔧 Helper Functions

### `createTimeSlot(hour, minute)`
Converts hours and minutes to TimeSlot format
```typescript
createTimeSlot(14, 30)  // 2:30 PM
// Returns: { hour: 14, minute: 30, second: 0, nano: 0 }
```

### `getTomorrowDate()`
Returns tomorrow's date in YYYY-MM-DD format
```typescript
getTomorrowDate()  // "2026-03-06"
```

---

## 📝 Form Fields (Checkout Modal)

| Field | Type | Default | Required |
|-------|------|---------|----------|
| Delivery Address | textarea | - | ✅ |
| Phone Number | tel input | - | ✅ |
| Delivery Date | date | Tomorrow | ✅ |
| Start Time | time | 09:00 | ✅ |
| End Time | time | 17:00 | ✅ |
| Flexibility | select | FLEXIBLE | ✅ |
| Payment | select | CASH | ✅ |
| Notes | textarea | - | ❌ |

---

## ⚙️ Payment Methods

- `CASH` - Cash on Delivery (default)
- `CARD` - Card Payment
- `UPI` - UPI Payment (supported by API)
- `WALLET` - Wallet Payment (supported by API)

---

## 📦 Delivery Flexibility

- `FLEXIBLE` - Delivery anytime within slot (default)
- `STRICT` - Delivery must be exact time slot

---

## ✅ Validation

Required fields that must be filled:
- ✅ Delivery Address
- ✅ Phone Number
- ✅ Delivery Date
- ✅ Time Slot (Start and End)

---

## 🔄 Authentication Flow

1. User logs in via LoginModal
2. Auth token stored in localStorage (`auth_token`)
3. Order API automatically attaches token to requests
4. All orders linked to authenticated user

---

## 📊 Response Format

**Success:**
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

**Error:**
```json
{
  "success": false,
  "message": "Invalid delivery date",
  "statusCode": 400
}
```

---

## 🧪 Testing Commands

### Check Network Requests
1. Open DevTools → Network tab
2. Place an order
3. Find POST request to `/orders`
4. Verify Authorization header is present
5. Check payload and response structure

### Check Local Storage
```javascript
// In browser console
localStorage.getItem('auth_token')      // Should have token
localStorage.getItem('user')            // Should have user JSON
```

### Log Order Creation
```javascript
// Console logs on order creation
console.log('Order created successfully:', response.data);
console.error('Order error:', err);
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | User not logged in, token missing or expired |
| Address/Phone empty | Fill required fields marked with * |
| Invalid date | Select date greater than today |
| Network error | Check API server is running at http://52.76.119.114 |
| Token not attached | Clear cache, login again, check localStorage |

---

## 📁 File Structure

```
apps/food-connect/
├── lib/
│   ├── auth-api.ts          ✅ Login API
│   ├── order-api.ts         ✅ Order API (NEW)
│   ├── config.ts            ✅ API configuration
│   └── types.ts
├── components/
│   ├── login-modal.tsx      ✅ Login form
│   ├── checkout-modal.tsx   ✅ Order form (UPDATED)
│   └── ...
└── context/
    ├── auth-context.tsx     ✅ Auth state (UPDATED)
    └── ...
```

---

## 🔗 Related Files

- [PLACE_ORDER_INTEGRATION_SUMMARY.md](PLACE_ORDER_INTEGRATION_SUMMARY.md) - Complete summary
- [ORDER_INTEGRATION_GUIDE.md](ORDER_INTEGRATION_GUIDE.md) - Detailed testing guide
- [LOGIN_INTEGRATION_GUIDE.md](LOGIN_INTEGRATION_GUIDE.md) - Auth setup guide

---

## 📞 Support

For detailed information, see the comprehensive guides in the root directory.
