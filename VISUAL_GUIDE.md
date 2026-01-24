# 🎬 Visual Quick-Start Guide

## What You'll See in the App

### 1️⃣ Initial State (Not Logged In)

```
┌─────────────────────────────────────────────────────┐
│  🍕 Food Connect              🛒    [Sign In]       │
└─────────────────────────────────────────────────────┘
                     ↑                        ↑
              Logo & Links         "Sign In" button visible
                                   when NOT logged in
```

**User Action**: Click "Sign In" button
**What Happens**: LoginModal appears

---

### 2️⃣ Login Modal

```
┌─────────────────────────────────────────────┐
│  Login / Sign Up                          × │
│                                             │
│  ☐ I don't have an account (Toggle)        │
│                                             │
│  Email Address                              │
│  [________________________]                 │
│                                             │
│  Password                                   │
│  [________________________]                 │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │        Sign In / Create Account      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  (Loading state appears during signup)     │
└─────────────────────────────────────────────┘

Available Actions:
• Enter email & password
• Toggle to sign-up mode
• See name field appear
• Auto-generate avatar (behind scenes)
```

**What Happens**: 
- ✅ User saved to AuthContext
- ✅ Stored in localStorage
- ✅ LoginModal closes
- ✅ Profile appears in header

---

### 3️⃣ After Login (Logged In State)

```
┌─────────────────────────────────────────────────────┐
│  🍕 Food Connect              🛒    [👤 John]       │
│                                         ▼
│                                    ┌─────────────┐
│                                    │ John Doe    │
│                                    │ john@em... │
│                                    ├─────────────┤
│                                    │ Profile     │
│                                    │ My Orders   │
│                                    │ Logout      │
│                                    └─────────────┘
└─────────────────────────────────────────────────────┘

Changes:
• "Sign In" button → User avatar
• Avatar shows first letter or image
• Click to open dropdown menu
• Menu shows user info & options
```

---

### 4️⃣ Cart with Items

```
┌────────────────────────────────────────┐
│ Shopping Cart                    ×     │
│                                        │
│ Biryani                      ×2  $12   │
│ Butter Chicken              ×1  $8    │
│ Naan Bread                  ×3  $9    │
│                                        │
├────────────────────────────────────────┤
│ Total: $29.00                          │
│                                        │
│ ┌──────────────────────────────────┐   │
│ │   Proceed to Checkout            │   │
│ └──────────────────────────────────┘   │
└────────────────────────────────────────┘
```

**User Action**: Click "Proceed to Checkout"

---

### 5️⃣ Checkout Modal (If Not Logged In)

If user is NOT logged in when clicking checkout:

```
┌─────────────────────────────────────────────┐
│                                            │
│   ┌──────────────────────────────────────┐ │
│   │  Login / Sign Up              ×      │ │
│   │                                      │ │
│   │  [Standard login form appears]       │ │
│   │                                      │ │
│   └──────────────────────────────────────┘ │
│   (LoginModal overlays checkout)           │
│                                            │
└─────────────────────────────────────────────┘

Flow:
1. LoginModal appears ON TOP
2. User logs in
3. LoginModal closes
4. Delivery form appears below
```

---

### 6️⃣ Checkout Modal (If Logged In)

If user IS logged in:

```
┌─────────────────────────────────────────────────┐
│  Order Summary                               ×  │
│                                                 │
│ ITEMS:                                          │
│ ┌───────────────────────────────────────────┐  │
│ │ Biryani (Qty: 2)               $12.00   │  │
│ │ Butter Chicken (Qty: 1)         $8.00   │  │
│ │ Naan Bread (Qty: 3)             $9.00   │  │
│ └───────────────────────────────────────────┘  │
│                                                 │
│ DELIVERY DETAILS:                               │
│ ┌───────────────────────────────────────────┐  │
│ │ Delivery Address                          │  │
│ │                                          │  │
│ │ [Enter your delivery address]            │  │
│ │ [Textarea - multiple lines]              │  │
│ │                                          │  │
│ │ Phone Number                              │  │
│ │ [+1 (555) 123-4567]                     │  │
│ │                                          │  │
│ └───────────────────────────────────────────┘  │
│                                                 │
│ TOTAL: $29.00                                   │
│ ┌─────────────────────┬──────────────────────┐ │
│ │      Cancel         │    Place Order        │ │
│ └─────────────────────┴──────────────────────┘ │
└─────────────────────────────────────────────────┘

Available Actions:
• Fill address
• Fill phone number
• Click "Place Order"
• See loading state
• Success message appears
```

**User Action**: Click "Place Order"

---

### 7️⃣ Order Success

```
Order placed successfully!

What happens:
✓ Success message shows
✓ Cart automatically clears
✓ Checkout modal closes
✓ User can browse more items
✓ Profile still shows in header
```

---

### 8️⃣ After Logout

```
┌─────────────────────────────────────────────────────┐
│  🍕 Food Connect              🛒    [Sign In]       │
└─────────────────────────────────────────────────────┘

Returns to initial state:
✓ Profile menu gone
✓ "Sign In" button visible again
✓ localStorage cleared
✓ User data removed
```

---

## 🔄 Complete User Flow

```
START
  │
  ├─ [Not Logged In] → Click "Sign In" → LoginModal
  │                    │
  │                    └─→ Fill email/password
  │                    │
  │                    └─→ Click "Sign In/Create Account"
  │                    │
  │                    └─→ 🎉 Logged In!
  │                        Profile shows in header
  │
  ├─ Browse & Add to Cart
  │  │
  │  └─→ Click "Proceed to Checkout"
  │      │
  │      ├─ If NOT logged in → Go to step 1
  │      │
  │      └─ If logged in → Fill Delivery Form
  │         │
  │         ├─ Enter address
  │         ├─ Enter phone
  │         │
  │         └─→ Click "Place Order"
  │             │
  │             ├─ Validation
  │             ├─ Loading state
  │             ├─ Order submitted
  │             │
  │             └─→ ✅ Success!
  │                 Cart clears
  │                 Modal closes
  │
  └─ Continue Shopping or Logout
```

---

## 🎨 UI Elements Reference

### Buttons
```
[Sign In]              ← Default button (blue/gray)
[Place Order]          ← Primary action (orange)
[Cancel]               ← Secondary action (outlined)
[Logout]               ← Danger action (in dropdown)
```

### Form Inputs
```
[Email input field]
[Password input field]
[Name input field (signup only)]
[Address textarea field]
[Phone number input field]
```

### States
```
Idle:      Normal buttons, enabled
Loading:   "Processing..." text, disabled buttons
Success:   "Order placed successfully!" message
Error:     "Please fill all fields" in red
```

### Modals
```
LoginModal:     Centered, dark overlay, white card
CheckoutModal:  Centered, dark overlay, white card
Dropdown:       Positioned at top-right (UserProfileMenu)
```

---

## ⌨️ Keyboard Shortcuts

```
Tab          - Navigate between form fields
Enter        - Submit form when button is focused
Escape       - Close modal (clickable close button instead)
```

---

## 📱 Mobile View

```
Small screens (<768px):
┌──────────────────────────────┐
│ 🍕       🛒    [👤/Sign In] │  ← Navbar (compact)
│                              │
│ [Content takes full width]   │
│ • Modals are full-width      │
│ • Buttons stack vertically   │
│ • Forms are single column    │
│                              │
└──────────────────────────────┘

Medium screens (768px - 1024px):
┌─────────────────────────────────────┐
│ 🍕 Food Connect    🛒    [👤/Sign] │
│                                     │
│ [Content with padding]              │
│ • Modals 90% width                  │
│ • Forms organized better            │
│                                     │
└─────────────────────────────────────┘

Large screens (1024px+):
┌──────────────────────────────────────────────────────┐
│ 🍕 Food Connect    Links...    🛒    [👤/Sign In]  │
│                                                      │
│ [Content with max-width]                            │
│ • Modals max-width: 672px (checkout), 512px (login) │
│ • Full responsive layout                            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 Test Scenarios

### Scenario 1: Happy Path
```
1. Click "Sign In"
2. Enter email: test@example.com
3. Enter password: password123
4. Click "Create Account"
5. See avatar appear
6. Profile shows in top-right
7. Add items to cart
8. Click "Proceed to Checkout"
9. Fill delivery details
10. Click "Place Order"
11. See success message
12. Cart clears
✅ PASS
```

### Scenario 2: Existing User
```
1. Click "Sign In"
2. Toggle to "Sign In" mode
3. Enter email from previous signup
4. Enter password
5. Click "Sign In"
6. Same user data loads
✅ PASS (no duplicate)
```

### Scenario 3: Session Persistence
```
1. Sign in with test@example.com
2. Refresh page
3. User should STILL be logged in
4. Profile visible in header
✅ PASS (localStorage works)
```

### Scenario 4: Logout
```
1. Click profile dropdown
2. Click "Logout"
3. Profile menu disappears
4. "Sign In" button reappears
5. localStorage cleared
✅ PASS
```

---

## 🔍 What to Look For

### In Browser Console
```javascript
// You won't see errors, but you can verify:
localStorage.getItem('user')
// Should return: {"id":"...","name":"...","email":"...","avatar":"..."}
```

### In Browser DevTools
```
Application → Storage → Local Storage
  → localhost:3001
    → user: (JSON object with user data)
```

### In Network Tab
```
Currently shows no API calls (using mock)
Once connected to backend, you'll see:
  → POST /api/auth/login
  → POST /api/orders
```

---

## ✅ Verification Checklist

While testing, verify:

- [ ] "Sign In" button visible when logged out
- [ ] LoginModal appears on click
- [ ] Can enter email and password
- [ ] Can toggle to sign-up mode
- [ ] Name field appears in sign-up
- [ ] Avatar generates on signup
- [ ] LoginModal closes after signup
- [ ] User avatar shows in header
- [ ] Profile dropdown works
- [ ] Logout button clears data
- [ ] Refresh page keeps user logged in
- [ ] Checkout shows delivery form when logged in
- [ ] LoginModal appears if logout then try checkout
- [ ] Cart clears after successful order
- [ ] Order total is correct
- [ ] Delivery address is optional input accepted
- [ ] Phone number is optional input accepted
- [ ] All modals close when clicking close button
- [ ] Mobile view is responsive
- [ ] No console errors
- [ ] No TypeScript errors

---

**Ready to test? Run `pnpm dev` and go to http://localhost:3001 🚀**
