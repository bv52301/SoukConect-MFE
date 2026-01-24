# Quick Reference: Checkout & Auth System

## 🚀 Quick Start

### For Users
1. Click "Proceed to Checkout" button in cart
2. If not logged in → LoginModal appears
3. Sign up with email/password (auto-generates avatar)
4. Enter delivery address and phone
5. Click "Place Order"
6. ✅ Order confirmed!

### For Developers

**Use Auth in any component:**
```tsx
import { useAuth } from '@/context/auth-context';

export function MyComponent() {
  const { user, isLoggedIn } = useAuth();
  
  if (!isLoggedIn) return <p>Please log in</p>;
  return <p>Welcome, {user?.name}!</p>;
}
```

**Trigger Login Modal:**
```tsx
import { LoginModal } from '@/components/login-modal';

const [showLogin, setShowLogin] = useState(false);

return (
  <>
    <button onClick={() => setShowLogin(true)}>Sign In</button>
    <LoginModal
      isOpen={showLogin}
      onClose={() => setShowLogin(false)}
      onLoginSuccess={() => setShowLogin(false)}
    />
  </>
);
```

**Trigger Checkout:**
```tsx
import { CheckoutModal } from '@/components/checkout-modal';

const [checkout, setCheckout] = useState(false);

return (
  <>
    <button onClick={() => setCheckout(true)}>Checkout</button>
    <CheckoutModal
      isOpen={checkout}
      onClose={() => setCheckout(false)}
      items={cartItems}
      total={cartTotal}
      onCheckoutSuccess={() => console.log('Order placed!')}
    />
  </>
);
```

## 📁 File Locations

```
apps/food-connect/
├── context/
│   └── auth-context.tsx          ← Global auth state
├── components/
│   ├── login-modal.tsx           ← Sign-in/up form
│   ├── user-profile-menu.tsx     ← Header profile
│   ├── checkout-modal.tsx        ← Checkout flow
│   └── cart-wrapper.tsx          ← Cart + checkout integration
└── app/
    └── layout.tsx                ← App wrapper
```

## 🔑 Key Functions

### `useAuth()` Hook
```tsx
const {
  user,           // User | null
  isLoggedIn,     // boolean
  login,          // (userData: User) => void
  logout,         // () => void
  updateProfile   // (updates: Partial<User>) => void
} = useAuth();
```

### User Interface
```tsx
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}
```

### CheckoutItem Interface
```tsx
interface CheckoutItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  vendorId: number;
}
```

## 📊 Component Props

### LoginModal Props
```tsx
{
  isOpen: boolean              // Show/hide modal
  onClose: () => void          // Close callback
  onLoginSuccess?: () => void  // After successful login
}
```

### CheckoutModal Props
```tsx
{
  isOpen: boolean              // Show/hide modal
  onClose: () => void          // Close callback
  items: CheckoutItem[]        // Cart items
  total: number                // Order total
  onCheckoutSuccess?: () => void // After successful order
}
```

### UserProfileMenu Props
```tsx
// No props - uses useAuth() internally
<UserProfileMenu />
```

## 🎨 Styling Classes (Tailwind)

**Modal Overlay:**
```tsx
className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
```

**Form Input:**
```tsx
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
```

**Primary Button:**
```tsx
className="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
```

**Secondary Button:**
```tsx
className="px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
```

## 💾 LocalStorage Keys

**User Data:**
```tsx
localStorage.getItem('user')      // Persisted User object
localStorage.setItem('user', JSON.stringify(userData))
localStorage.removeItem('user')   // On logout
```

## 🔐 Security Checklist

⚠️ Current implementation is for development/demo only:
- ❌ Passwords not validated
- ❌ No HTTPS
- ❌ No CSRF protection
- ❌ No rate limiting

**For production, add:**
- ✅ Backend authentication
- ✅ HTTPS/TLS
- ✅ CSRF tokens
- ✅ Rate limiting
- ✅ Input validation
- ✅ Password hashing
- ✅ JWT tokens
- ✅ 2FA support

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| UserProfileMenu not showing | Check AuthProvider wraps entire app |
| Modal won't open | Verify state and imports |
| Login not persisting | Check localStorage in DevTools |
| Checkout form broken | Ensure all props passed correctly |
| Avatar not loading | Check dicebear API URL format |

## 📞 Support

**For issues:**
1. Check browser console for errors
2. Verify all imports are correct
3. Check localStorage data in DevTools
4. Look for TypeScript compilation errors
5. Review the full CHECKOUT_INTEGRATION.md guide

## 🎯 Common Tasks

**Check if user is logged in:**
```tsx
const { isLoggedIn } = useAuth();
if (!isLoggedIn) return <LoginPrompt />;
```

**Get current user info:**
```tsx
const { user } = useAuth();
console.log(user?.name, user?.email);
```

**Logout user:**
```tsx
const { logout } = useAuth();
logout(); // Clears user and localStorage
```

**Update user profile:**
```tsx
const { updateProfile } = useAuth();
updateProfile({ phone: '+1234567890' });
```

**Handle successful checkout:**
```tsx
<CheckoutModal
  onCheckoutSuccess={() => {
    // Clear cart
    // Show confirmation
    // Redirect to orders
  }}
/>
```

---

For more details, see **CHECKOUT_INTEGRATION.md** or code comments in each file.
