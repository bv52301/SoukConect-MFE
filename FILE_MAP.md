# File Map & Quick Navigation

## 📍 Created Files

### Authentication & Context
**File**: [apps/food-connect/context/auth-context.tsx](apps/food-connect/context/auth-context.tsx)
- **Lines**: 1-150 (entire file)
- **Purpose**: Global auth state management
- **Exports**: AuthProvider, useAuth hook, User interface
- **Key Exports**: `useAuth()`, `AuthProvider`

### UI Components

**File**: [apps/food-connect/components/login-modal.tsx](apps/food-connect/components/login-modal.tsx)
- **Lines**: 1-200 (entire file)
- **Purpose**: Reusable sign-in/sign-up modal
- **Exports**: LoginModal component
- **Props**: isOpen, onClose, onLoginSuccess

**File**: [apps/food-connect/components/user-profile-menu.tsx](apps/food-connect/components/user-profile-menu.tsx)
- **Lines**: 1-150 (entire file)
- **Purpose**: Header profile dropdown component
- **Exports**: UserProfileMenu component
- **No props**: Uses useAuth() internally

**File**: [apps/food-connect/components/checkout-modal.tsx](apps/food-connect/components/checkout-modal.tsx)
- **Lines**: 1-180 (entire file)
- **Purpose**: Complete checkout flow
- **Exports**: CheckoutModal component, CheckoutItem interface
- **Props**: isOpen, onClose, items, total, onCheckoutSuccess

### Documentation Files

**File**: [CHECKOUT_INTEGRATION.md](CHECKOUT_INTEGRATION.md)
- **Size**: ~400 lines
- **Content**: Complete integration guide with examples
- **Sections**: Architecture, Components, Integration Points, Flow Diagrams, Backend Specs

**File**: [CHECKOUT_SUMMARY.md](CHECKOUT_SUMMARY.md)
- **Size**: ~200 lines
- **Content**: Quick summary and completion checklist
- **Sections**: Tasks, Architecture, Features, Next Steps

**File**: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **Size**: ~250 lines
- **Content**: Developer quick reference
- **Sections**: Quick Start, File Locations, Key Functions, Styling, Troubleshooting

**File**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Size**: ~400 lines
- **Content**: System diagrams and data flow
- **Sections**: Architecture Diagram, Data Flow, Component Tree, API Points

**File**: [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md)
- **Size**: ~300 lines
- **Content**: Complete implementation verification
- **Sections**: Checklists, User Flow Validation, Testing Scenarios

---

## 🔄 Modified Files

### Layout Integration
**File**: [apps/food-connect/app/layout.tsx](apps/food-connect/app/layout.tsx)
- **Lines Modified**: 1-6 (imports)
- **Lines Modified**: 14-20 (AuthProvider wrapper)
- **Lines Modified**: 30 (UserProfileMenu addition)
- **Lines Modified**: 95-97 (AuthProvider closing tag)
- **What Changed**: 
  - Added `import { AuthProvider }`
  - Added `import { UserProfileMenu }`
  - Wrapped layout with `<AuthProvider>`
  - Replaced Sign In button with `<UserProfileMenu />`

### Cart Integration
**File**: [apps/food-connect/components/cart-wrapper.tsx](apps/food-connect/components/cart-wrapper.tsx)
- **Lines Modified**: 1-5 (imports)
- **Lines Modified**: 36 (showCheckout state)
- **Lines Modified**: 45-72 (handleAddToCart function)
- **Lines Modified**: 167-171 (Proceed to Checkout button)
- **Lines Modified**: 239-245 (CheckoutModal component)
- **What Changed**:
  - Added `import { CheckoutModal }`
  - Added `showCheckout` state
  - Updated button to trigger CheckoutModal
  - Added CheckoutModal component
  - Integrated onCheckoutSuccess callback

---

## 🎯 Key Code Locations

### Using Authentication

**Check if logged in:**
```tsx
// In any component:
import { useAuth } from '@/context/auth-context';

const { isLoggedIn, user } = useAuth();
if (!isLoggedIn) return <LoginPrompt />;
```

**Logout action:**
```tsx
const { logout } = useAuth();
<button onClick={logout}>Sign Out</button>
```

### Opening Login Modal

```tsx
import { LoginModal } from '@/components/login-modal';

const [isOpen, setIsOpen] = useState(false);
return (
  <>
    <button onClick={() => setIsOpen(true)}>Sign In</button>
    <LoginModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onLoginSuccess={() => setIsOpen(false)}
    />
  </>
);
```

### Opening Checkout Modal

```tsx
import { CheckoutModal } from '@/components/checkout-modal';

const [isOpen, setIsOpen] = useState(false);
return (
  <>
    <button onClick={() => setIsOpen(true)}>Checkout</button>
    <CheckoutModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      items={cartItems}
      total={cartTotal}
      onCheckoutSuccess={() => console.log('Order placed!')}
    />
  </>
);
```

---

## 📂 Complete File Structure

```
apps/food-connect/
├── app/
│   ├── layout.tsx ← MODIFIED (AuthProvider + UserProfileMenu)
│   ├── page.tsx
│   ├── globals.css
│   └── chefs/
│
├── components/
│   ├── auth-context.tsx ← NEW (Context API)
│   ├── login-modal.tsx ← NEW (Sign-in/up form)
│   ├── user-profile-menu.tsx ← NEW (Header dropdown)
│   ├── checkout-modal.tsx ← NEW (Checkout flow)
│   ├── cart-wrapper.tsx ← MODIFIED (Checkout integration)
│   ├── category.tsx
│   ├── chef-card.tsx
│   ├── vendor-card.tsx
│   ├── vendor-products.tsx
│   └── vendor-section.tsx
│
├── context/ ← NEW FOLDER
│   └── auth-context.tsx ← NEW (Auth context moved here)
│
└── lib/
    ├── api.ts
    ├── data.ts
    └── types.ts

Root documentation:
├── CHECKOUT_INTEGRATION.md ← NEW (Complete guide)
├── CHECKOUT_SUMMARY.md ← NEW (Quick summary)
├── QUICK_REFERENCE.md ← NEW (Developer reference)
├── ARCHITECTURE.md ← NEW (System diagrams)
└── IMPLEMENTATION_CHECKLIST.md ← NEW (Verification)
```

---

## 🚀 Quick Links to Key Sections

### For Using Auth in Components
👉 See [QUICK_REFERENCE.md](QUICK_REFERENCE.md#-quick-start) - Quick Start section

### For Integration Details
👉 See [CHECKOUT_INTEGRATION.md](CHECKOUT_INTEGRATION.md#integration-points) - Integration Points section

### For Architecture Overview
👉 See [ARCHITECTURE.md](ARCHITECTURE.md#system-architecture-diagram) - Architecture Diagram

### For API Specifications
👉 See [CHECKOUT_INTEGRATION.md](CHECKOUT_INTEGRATION.md#backend-integration-points) - Backend Integration section

### For Testing
👉 See [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md#testing-scenarios-covered) - Testing Scenarios section

---

## 📝 Code Reference

### AuthContext Usage Example
```tsx
import { useAuth } from '@/context/auth-context';

export function MyComponent() {
  const { user, isLoggedIn, login, logout, updateProfile } = useAuth();

  return isLoggedIn ? (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Please sign in</p>
  );
}
```

### Checkout Usage Example
```tsx
import { CheckoutModal } from '@/components/checkout-modal';
import { useState } from 'react';

export function CheckoutButton({ items, total }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Checkout</button>
      <CheckoutModal
        isOpen={open}
        onClose={() => setOpen(false)}
        items={items}
        total={total}
        onCheckoutSuccess={() => {
          // Handle success (clear cart, redirect, etc.)
          console.log('Order placed successfully!');
        }}
      />
    </>
  );
}
```

---

## ✅ Verification Checklist

Use this to verify implementation:

- [ ] Can navigate to [apps/food-connect/context/auth-context.tsx](apps/food-connect/context/auth-context.tsx)
- [ ] Can navigate to [apps/food-connect/components/login-modal.tsx](apps/food-connect/components/login-modal.tsx)
- [ ] Can navigate to [apps/food-connect/components/user-profile-menu.tsx](apps/food-connect/components/user-profile-menu.tsx)
- [ ] Can navigate to [apps/food-connect/components/checkout-modal.tsx](apps/food-connect/components/checkout-modal.tsx)
- [ ] Can see imports in [apps/food-connect/app/layout.tsx](apps/food-connect/app/layout.tsx)
- [ ] Can see CheckoutModal in [apps/food-connect/components/cart-wrapper.tsx](apps/food-connect/components/cart-wrapper.tsx)
- [ ] Can read [CHECKOUT_INTEGRATION.md](CHECKOUT_INTEGRATION.md)
- [ ] All TypeScript errors resolved (run `pnpm tsc`)

---

## 🔍 Line-by-Line Changes

### layout.tsx Changes

**Line 1-5**: Added imports
```tsx
import { AuthProvider } from '@/context/auth-context';
import { UserProfileMenu } from '@/components/user-profile-menu';
```

**Line 18**: Wrapped with AuthProvider
```tsx
<AuthProvider>
  {/* entire app content */}
</AuthProvider>
```

**Line 30**: Replaced Sign In button with UserProfileMenu
```tsx
<UserProfileMenu />
```

### cart-wrapper.tsx Changes

**Line 5**: Added checkout modal import
```tsx
import { CheckoutModal, type CheckoutItem } from '@/components/checkout-modal';
```

**Line 36**: Added checkout state
```tsx
const [showCheckout, setShowCheckout] = useState(false);
```

**Line 167-171**: Updated Proceed button
```tsx
onClick={() => {
  setShowCheckout(true);
  setShowCart(false);
}}
```

**Line 239-245**: Added CheckoutModal
```tsx
<CheckoutModal
  isOpen={showCheckout}
  onClose={() => setShowCheckout(false)}
  items={cart as CheckoutItem[]}
  total={cartTotal}
  onCheckoutSuccess={() => {
    setCart([]);
    setShowCheckout(false);
  }}
/>
```

---

**Last Updated**: 2024
**Status**: ✅ All files created and integrated
**Ready for**: Production testing / Backend integration

