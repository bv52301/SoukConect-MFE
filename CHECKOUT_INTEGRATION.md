# Checkout & Authentication Integration Guide

## Overview

This guide documents the modular, reusable checkout and authentication system integrated into the Food Connect application.

## Architecture

### Components

#### 1. **AuthProvider & useAuth Hook** (`context/auth-context.tsx`)
Central state management for user authentication and profile.

**Features:**
- User login/logout functionality
- Profile management (update user details)
- localStorage persistence for session recovery
- Type-safe User interface with id, name, email, phone, avatar

**Usage:**
```tsx
// Wrap your app with AuthProvider in layout.tsx
<AuthProvider>
  {children}
</AuthProvider>

// Use in components
import { useAuth } from '@/context/auth-context';

export function MyComponent() {
  const { user, isLoggedIn, login, logout, updateProfile } = useAuth();
  
  if (!isLoggedIn) return <p>Please log in</p>;
  return <p>Welcome, {user?.name}</p>;
}
```

#### 2. **LoginModal** (`components/login-modal.tsx`)
Reusable sign-in/sign-up modal component.

**Features:**
- Toggle between sign-in and sign-up modes
- Email/password authentication
- Auto-generate user avatars using dicebear API
- Error handling and loading states
- Form validation
- Callback props: `onClose`, `onLoginSuccess`

**Props:**
```tsx
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}
```

**Usage:**
```tsx
const [showLogin, setShowLogin] = useState(false);

return (
  <>
    <button onClick={() => setShowLogin(true)}>Sign In</button>
    <LoginModal
      isOpen={showLogin}
      onClose={() => setShowLogin(false)}
      onLoginSuccess={() => {
        setShowLogin(false);
        // Proceed to next step (e.g., checkout)
      }}
    />
  </>
);
```

#### 3. **UserProfileMenu** (`components/user-profile-menu.tsx`)
Header component for displaying user profile and navigation.

**Features:**
- Displays user avatar (or initial letter)
- Dropdown menu with Profile, Order History, Logout
- Positioned in top-right of header
- Automatically shows/hides based on login state
- Integrates with useAuth for logout

**Usage:**
```tsx
// In layout.tsx or header
import { UserProfileMenu } from '@/components/user-profile-menu';

export default function RootLayout({ children }) {
  return (
    <header>
      <nav>
        {/* Other nav items */}
        <UserProfileMenu />
      </nav>
    </header>
  );
}
```

#### 4. **CheckoutModal** (`components/checkout-modal.tsx`)
Complete checkout flow with delivery form and order summary.

**Features:**
- Automatic login redirect if user not authenticated
- Order summary with item details and total
- Delivery address and phone number capture
- Loading states during order submission
- Success/error handling
- Auto-clears cart after successful order

**Props:**
```tsx
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutItem[];
  total: number;
  onCheckoutSuccess?: () => void;
}

interface CheckoutItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  vendorId: number;
}
```

**Usage:**
```tsx
const [checkout, setCheckout] = useState(false);
const cartItems = [...]; // From cart state
const total = 49.99;

return (
  <>
    <button onClick={() => setCheckout(true)}>Checkout</button>
    <CheckoutModal
      isOpen={checkout}
      onClose={() => setCheckout(false)}
      items={cartItems}
      total={total}
      onCheckoutSuccess={() => {
        console.log('Order placed successfully!');
        // Redirect or show confirmation
      }}
    />
  </>
);
```

## Integration Points

### 1. **Layout Setup** (`app/layout.tsx`)

```tsx
import { AuthProvider } from '@/context/auth-context';
import { UserProfileMenu } from '@/components/user-profile-menu';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <nav>
            {/* Nav items */}
            <UserProfileMenu /> {/* Shows login button or user profile */}
          </nav>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 2. **Cart to Checkout Flow** (`components/cart-wrapper.tsx`)

```tsx
import { CheckoutModal } from '@/components/checkout-modal';

export default function CartWrapper() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Cart items display */}
      <button onClick={() => setShowCheckout(true)}>
        Proceed to Checkout
      </button>

      {/* Checkout flow */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={cart}
        total={cartTotal}
        onCheckoutSuccess={() => {
          setCart([]); // Clear cart
          setShowCheckout(false);
        }}
      />
    </>
  );
}
```

## Flow Diagrams

### User Authentication Flow
```
User clicks "Sign In" (UserProfileMenu)
        ↓
LoginModal appears
        ↓
User enters email/password
        ↓
Validates & creates profile with avatar
        ↓
Stores in AuthContext + localStorage
        ↓
UserProfileMenu shows user avatar/name
```

### Checkout Flow
```
User clicks "Proceed to Checkout"
        ↓
CheckoutModal opens
        ↓
Is user logged in?
  ├─ NO → LoginModal appears
  │   └─ After login → Return to CheckoutModal
  └─ YES → Show delivery form
        ↓
User enters address + phone
        ↓
User clicks "Place Order"
        ↓
API call to backend (replace mock delay)
        ↓
Success → Clear cart & close modal
        ↓
Show confirmation/redirect to orders
```

## File Structure

```
apps/food-connect/
├── context/
│   └── auth-context.tsx           # Authentication state management
├── components/
│   ├── login-modal.tsx            # Sign-in/sign-up modal
│   ├── user-profile-menu.tsx      # Header profile dropdown
│   ├── checkout-modal.tsx         # Checkout flow modal
│   └── cart-wrapper.tsx           # Updated with checkout integration
└── app/
    └── layout.tsx                 # Updated with AuthProvider & UserProfileMenu
```

## State Management Strategy

### AuthContext
- **Scope**: Global user state
- **Persistence**: localStorage (key: "user")
- **Triggers**: Login, logout, profile update

### CheckoutModal Local State
- **address**: Delivery address (string)
- **phoneNumber**: Contact number (string)
- **loading**: API call status (boolean)
- **showLoginModal**: Conditional login display (boolean)

### CartWrapper Local State
- **cart**: Items array (CartItem[])
- **showCart**: Cart drawer visibility (boolean)
- **showCheckout**: Checkout modal visibility (boolean)

## Backend Integration Points

The following endpoints need to be implemented:

### 1. **POST /api/orders**
Create a new order with delivery details.

**Request:**
```json
{
  "userId": "user-123",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 29.99
    }
  ],
  "deliveryAddress": "123 Main St",
  "phoneNumber": "+1 (555) 123-4567",
  "total": 59.98
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "ORD-12345",
  "estimatedDelivery": "2024-01-15",
  "total": 59.98
}
```

### 2. **POST /api/auth/login** (Optional - currently using mock)
Authenticate user credentials.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://dicebear.com/api/avataaars/john-doe.svg"
}
```

## Customization Guide

### Change Avatar Provider
In `login-modal.tsx`, update the avatar URL:
```tsx
// Current (Dicebear API)
avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`

// Alternative (UI Avatars)
avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
```

### Add Phone Number Validation
In `checkout-modal.tsx`:
```tsx
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
if (!phoneRegex.test(phoneNumber)) {
  alert('Invalid phone number');
  return;
}
```

### Persist Cart to localStorage
In `cart-wrapper.tsx`:
```tsx
// Save cart
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

// Load cart
useEffect(() => {
  const saved = localStorage.getItem('cart');
  if (saved) setCart(JSON.parse(saved));
}, []);
```

### Add Email Verification
In `login-modal.tsx`:
```tsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setError('Invalid email format');
  return;
}
```

## Testing Checklist

- [ ] Login modal appears when clicking "Sign In"
- [ ] Can toggle between sign-in and sign-up modes
- [ ] User avatar displays in UserProfileMenu after login
- [ ] User profile menu dropdown works (Profile, Orders, Logout)
- [ ] Logout clears user and redirects appropriately
- [ ] Cart shows correct total and item count
- [ ] "Proceed to Checkout" opens CheckoutModal
- [ ] CheckoutModal shows LoginModal if user not logged in
- [ ] Delivery form appears after login
- [ ] Form validation works (empty fields prevention)
- [ ] Order submission shows loading state
- [ ] Success message displays after order
- [ ] Cart clears after successful checkout
- [ ] User session persists on page refresh (localStorage)

## Security Considerations

⚠️ **Current Implementation Notes:**
- Uses mock authentication (passwords not validated)
- localStorage is not encrypted
- No HTTPS validation for API calls
- Avatar generation is client-side only

**For Production:**
1. Implement proper backend authentication
2. Use JWT tokens with secure storage
3. Add HTTPS/TLS for all communications
4. Implement CSRF protection
5. Validate all inputs server-side
6. Use secure password hashing (bcrypt)
7. Implement rate limiting on auth endpoints
8. Add 2FA for sensitive operations

## Troubleshooting

### UserProfileMenu not showing
- Ensure AuthProvider wraps the entire app in layout.tsx
- Check browser console for import errors
- Verify UserProfileMenu is imported correctly

### Checkout modal won't open
- Check that CheckoutModal is imported in cart-wrapper.tsx
- Verify showCheckout state is being set to true
- Check browser console for TypeScript errors

### Login modal stuck
- Verify onLoginSuccess callback is called
- Check that AuthContext state is updating
- Look at browser localStorage to see if user is saved

### Cart items not persisting
- Add localStorage persistence to CartWrapper (see Customization section)
- Check browser DevTools Storage tab
- Ensure cart state updates are triggering re-renders

## Future Enhancements

1. **Order History**: Retrieve and display user's previous orders
2. **Address Book**: Save multiple delivery addresses
3. **Payment Integration**: Add Stripe/PayPal integration
4. **Order Tracking**: Real-time order status updates
5. **Reviews**: Allow users to rate vendors/products
6. **Wishlists**: Save favorite items for later
7. **Referral Program**: Share referral codes with friends
8. **Loyalty Points**: Reward frequent customers

---

**Last Updated**: 2024
**Status**: Core checkout flow complete, ready for backend integration
