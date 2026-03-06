# Architecture & Data Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Food Connect App                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────┐         ┌──────────────────────┐      │
│  │  Login Modal         │         │  Checkout Modal      │      │
│  │                      │         │  (Order Form)        │      │
│  │ • Email input        │         │                      │      │
│  │ • Password input     │         │ • Address input      │      │
│  │ • Error display      │         │ • Phone number       │      │
│  └────────┬─────────────┘         │ • Delivery date      │      │
│           │                       │ • Time slot (S/E)    │      │
│           ▼                       │ • Flexibility        │      │
│  ┌──────────────────────┐         │ • Payment method     │      │
│  │  Auth Context        │         │ • Special notes      │      │
│  │                      │         │ • Error display      │      │
│  │ • user               │         └────────┬─────────────┘      │
│  │ • token              │                  │                    │
│  │ • isLoggedIn         │                  ▼                    │
│  │ • login()            │         ┌──────────────────────┐      │
│  └────────┬─────────────┘         │  Order API Service   │      │
│           │                       │  (order-api.ts)      │      │
│           └──────────┬────────────┤                      │      │
│                      │            │ • createOrder()      │      │
│                      ▼            │ • createTimeSlot()   │      │
│           ┌──────────────────────┤ • getTomorrowDate()   │      │
│           │  Local Storage       │                      │      │
│           │                      │ • Auth header mgmt   │      │
│           │ • auth_token         └────────┬─────────────┘      │
│           │ • refresh_token              │                    │
│           │ • user                       ▼                    │
│           └──────────────────────┐──────────────────────┐      │
│                                  │   HTTP Request       │      │
│                                  │   POST /orders       │      │
│                                  │   Bearer Token       │      │
│                                  │   JSON Body          │      │
│                                  └────────┬─────────────┘      │
└──────────────────────────────────────────┼──────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Backend API Server                             │
│              (52.76.119.114/orders)                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Order Controller                                         │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │  1. Validate Request                                    │   │
│  │     ├─ Check auth token                                │   │
│  │     ├─ Validate payload structure                      │   │
│  │     └─ Check required fields                           │   │
│  │                                                           │   │
│  │  2. Business Logic                                      │   │
│  │     ├─ Verify customer exists                          │   │
│  │     ├─ Check address validity                          │   │
│  │     ├─ Validate delivery date                          │   │
│  │     ├─ Check inventory availability                    │   │
│  │     └─ Calculate fees (if applicable)                  │   │
│  │                                                           │   │
│  │  3. Store Order                                         │   │
│  │     ├─ Create order record                             │   │
│  │     ├─ Store order items                               │   │
│  │     ├─ Link to customer                                │   │
│  │     └─ Generate orderId                                │   │
│  │                                                           │   │
│  │  4. Return Response                                     │   │
│  │     ├─ orderId                                         │   │
│  │     ├─ orderStatus (PENDING)                           │   │
│  │     ├─ estimatedDeliveryDate                           │   │
│  │     └─ success: true                                   │   │
│  └───────────────────┬────────────────────────────────────┘   │
│                      │                                          │
│                      ▼                                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Database                                                 │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                           │   │
│  │ • Orders table                                           │   │
│  │ • Order Items table                                      │   │
│  │ • Addresses table                                        │   │
│  │ • Customers table                                        │   │
│  │ • Notifications (queue for email/SMS)                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Data Flow - Order Placement

```
┌─────────────────────────────────┐
│  User adds items to cart        │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  User clicks "Checkout"         │
└────────────┬────────────────────┘
             │
             ▼
    ┌────────────────────┐
    │  Is user logged in?│
    └────┬─────────────┬─┘
         │ NO          │ YES
         ▼             │
    ┌─────────────┐    │
    │ Show Login  │    │
    │ Modal       │    │
    │             │    │
    │ ┌─────────┐ │    │
    │ │ User    │ │    │
    │ │ logs in │─┼────┘
    │ │ or      │ │
    │ │ cancels │ │
    │ └─────────┘ │
    └─────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Checkout Modal Opens               │
│  Show form with:                    │
│  • Address, Phone (required)        │
│  • Delivery date, time             │
│  • Payment method, Flexibility      │
│  • Optional notes                   │
└────────┬────────────────────────────┘
         │
         ▼
    ┌─────────────────────┐
    │ User fills form     │
    │ • All required      │
    │   fields filled?    │
    └────┬────────────┬───┘
         │ NO         │ YES
         ▼            │
    ┌────────────┐    │
    │ Show error │    │
    │ message    │    │
    └────────────┘    │
         ▲            │
         └────────────┘
                      │
                      ▼
           ┌────────────────────────┐
           │ User clicks            │
           │ "Place Order"          │
           └───────────┬────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ handleProceedToCheckout()   │
        │                              │
        │ 1. Parse time inputs        │
        │    09:00 → TimeSlot(9,0)   │
        │                              │
        │ 2. Build CreateOrderRequest │
        │    ├─ customerId           │
        │    ├─ addressId            │
        │    ├─ totalAmount          │
        │    ├─ paymentMethod        │
        │    └─ items[]              │
        │                              │
        │ 3. Call orderApi.createOrder│
        └──────────┬───────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────┐
    │ Fetch POST /orders               │
    │ Headers:                         │
    │  ├─ Authorization: Bearer <tok> │
    │  └─ Content-Type: application/json
    │                                  │
    │ Body: JSON CreateOrderRequest    │
    └──────────┬───────────────────────┘
               │
               ▼
    ┌──────────────────────────────────┐
    │ API Processing                   │
    │                                  │
    │ ✓ Validate token               │
    │ ✓ Validate payload             │
    │ ✓ Check business rules         │
    │ ✓ Create order in DB           │
    │ ✓ Return orderId               │
    └──────────┬───────────────────────┘
               │
        ┌──────┴──────┐
        │ SUCCESS     │ ERROR
        ▼             ▼
    ┌────────┐   ┌──────────────┐
    │ 200 OK │   │ 400/401/500  │
    │ with   │   │ with error   │
    │ orderId│   │ message      │
    └────┬───┘   └────┬─────────┘
         │            │
         ▼            ▼
    ┌─────────────┐  ┌────────────────┐
    │ • Close     │  │ • Display error│
    │   modal     │  │   in form      │
    │ • Reset     │  │ • Keep form    │
    │   form      │  │   filled for   │
    │ • Call      │  │   retry        │
    │   callback  │  │ • Log error    │
    │ • Console   │  │ • Focus input  │
    │   log       │  └────────────────┘
    │   success   │
    └─────────────┘
```

---

## Component Hierarchy

```
┌─ App Layout
│
├─ Shell Component
│  │
│  └─ Food Connect Page
│     │
│     ├─ Cart Wrapper
│     │  │
│     │  └─ Products Section
│     │     │
│     │     └─ Add to Cart Button
│     │        │
│     │        └─ Checkout Modal
│     │           │
│     │           ├─ Order Summary
│     │           │  ├─ Cart Items List
│     │           │  └─ Total Amount
│     │           │
│     │           ├─ Delivery Details Form
│     │           │  ├─ Address Input
│     │           │  ├─ Phone Number Input
│     │           │  ├─ Delivery Date Picker
│     │           │  ├─ Time Slot Inputs
│     │           │  ├─ Payment Method Select
│     │           │  ├─ Flexibility Select
│     │           │  ├─ Notes Textarea
│     │           │  └─ Error Display
│     │           │
│     │           ├─ Cancel Button
│     │           └─ Place Order Button
│     │              │
│     │              └─ Loading State / Success / Error
│     │
│     └─ Login Modal (if not authenticated)
│        ├─ Email Input
│        ├─ Password Input
│        └─ Sign In Button
│           │
│           └─ Token Stored in localStorage
│
└─ Auth Context Provider
   └─ User State
      ├─ user
      ├─ token
      ├─ login()
      ├─ logout()
      └─ updateProfile()
```

---

## State Management Flow

```
Auth Context
├─ user: User | null
│  ├─ id
│  ├─ email
│  ├─ name
│  ├─ profilePicture
│  └─ ...
│
├─ token: string | null
│  └─ JWT from login API
│
├─ isLoggedIn: boolean
│  └─ !!user
│
└─ login(user, token, refreshToken)
   └─ Stored in localStorage

Checkout Modal Local State
├─ deliveryAddress: string
├─ phoneNumber: string
├─ deliveryDate: string (YYYY-MM-DD)
├─ deliveryFlexibility: 'STRICT' | 'FLEXIBLE'
├─ paymentMethod: 'CASH' | 'CARD'
├─ deliverySlotStart: string (HH:MM)
├─ deliverySlotEnd: string (HH:MM)
├─ notes: string
├─ loading: boolean
├─ error: string
└─ addressId: number
```

---

## API Request Structure

```
┌─ POST Request
│
├─ URL: http://52.76.119.114/orders
│
├─ Headers
│  ├─ Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
│  └─ Content-Type: "application/json"
│
└─ Body: CreateOrderRequest
   ├─ customerId: number (from auth.user.id)
   ├─ addressId: number (default: 1)
   ├─ totalAmount: number (from cart)
   ├─ paymentMethod: "CASH" | "CARD"
   ├─ requestedDeliveryDate: "2026-03-06" (YYYY-MM-DD)
   ├─ deliveryFlexibility: "FLEXIBLE" | "STRICT"
   ├─ deliverySlotStart: TimeSlot
   │  ├─ hour: number (0-23)
   │  ├─ minute: number (0-59)
   │  ├─ second: number (0)
   │  └─ nano: number (0)
   │
   ├─ deliverySlotEnd: TimeSlot (same structure)
   │
   ├─ notes?: string (optional)
   │
   └─ items: OrderItem[]
      └─ [0..n]
         ├─ productId: number
         ├─ quantity: number
         ├─ unitPrice: number
         ├─ requestedDeliveryDate: "2026-03-06"
         ├─ deliveryFlexibility: "FLEXIBLE"
         ├─ deliverySlotStart: TimeSlot
         └─ deliverySlotEnd: TimeSlot
```

---

## Error Handling Flow

```
Try Order API Call
├─ Network Error
│  └─ Catch: "An unexpected error occurred"
│
├─ HTTP Error (not 200)
│  ├─ Try JSON parse response
│  │  ├─ Success: Use response.message
│  │  └─ Fail: Use status-based message
│  └─ Throw with message
│
├─ API Returns success: false
│  └─ Throw with response.message
│
├─ API Returns success: true
│  ├─ Extract response.data (orderId, etc.)
│  ├─ Reset form fields
│  ├─ Call onCheckoutSuccess()
│  ├─ Close modal
│  └─ Console log success
│
└─ Catch Error
   ├─ Extract error message
   ├─ Display in error state
   ├─ Log to console
   └─ Keep form open for retry
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Type-safe data flow
- ✅ Proper error handling
- ✅ Scalable structure
- ✅ Easy to test and debug
