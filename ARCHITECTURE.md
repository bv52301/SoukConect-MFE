# System Architecture & Data Flow

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      RootLayout                                 │
│                   (app/layout.tsx)                              │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              <AuthProvider>                               │ │
│  │         (context/auth-context.tsx)                        │ │
│  │                                                           │ │
│  │  State:                                                   │ │
│  │  ├─ user: User | null                                   │ │
│  │  ├─ isLoggedIn: boolean                                 │ │
│  │  └─ localStorage: "user" key                            │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐│ │
│  │  │         <Navbar>                                    ││ │
│  │  │  ┌────────────────┐  ┌──────────────────────────┐ ││ │
│  │  │  │  Food Connect  │  │ <UserProfileMenu>       │ ││ │
│  │  │  │  Logo + Links  │  │ ├─ Shows login btn OR  │ ││ │
│  │  │  └────────────────┘  │ ├─ User avatar + menu  │ ││ │
│  │  │                       │ └─ Logout action       │ ││ │
│  │  │                       └──────────────────────────┘ ││ │
│  │  └─────────────────────────────────────────────────────┘│ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐│ │
│  │  │         {children}                                  ││ │
│  │  │  ┌──────────────────────────────────────────────┐  ││ │
│  │  │  │  <CartWrapper>                               │  ││ │
│  │  │  │  ├─ Cart items display                      │  ││ │
│  │  │  │  ├─ Proceed to Checkout button              │  ││ │
│  │  │  │  └─ {showCheckout && <CheckoutModal>}       │  ││ │
│  │  │  │                                              │  ││ │
│  │  │  │  <CheckoutModal>                             │  ││ │
│  │  │  │  ├─ Order summary                           │  ││ │
│  │  │  │  ├─ {!isLoggedIn && <LoginModal>}           │  ││ │
│  │  │  │  ├─ Delivery form (if logged in)            │  ││ │
│  │  │  │  └─ Place Order button                       │  ││ │
│  │  │  │                                              │  ││ │
│  │  │  │  <LoginModal>                                │  ││ │
│  │  │  │  ├─ Email input                             │  ││ │
│  │  │  │  ├─ Password input                          │  ││ │
│  │  │  │  ├─ Name input (signup mode)                │  ││ │
│  │  │  │  ├─ Toggle sign-in/sign-up                  │  ││ │
│  │  │  │  └─ Submit button                           │  ││ │
│  │  │  └──────────────────────────────────────────────┘  ││ │
│  │  └─────────────────────────────────────────────────────┘│ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐│ │
│  │  │         <Footer>                                    ││ │
│  │  └─────────────────────────────────────────────────────┘│ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Sequence Diagram

### Login Flow
```
User clicks "Sign In"
        │
        ▼
    Check isLoggedIn in AuthContext
        │
        ├─ TRUE:  Show UserProfileMenu
        │           (user avatar + name)
        │
        └─ FALSE: Show "Sign In" button
                         │
                         ▼
                  User clicks button
                         │
                         ▼
                 <LoginModal> opens
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    Email/Pass     Name (signup)      Avatar Gen
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                  Create User object
                         │
                  ┌──────┴──────┐
                  │             │
                  ▼             ▼
            AuthContext   localStorage.setItem
            state update   ('user', userData)
                  │             │
                  └──────┬───────┘
                         │
                         ▼
                 onLoginSuccess() called
                         │
                         ▼
            UserProfileMenu updates
              (shows user avatar)
```

### Checkout Flow
```
User clicks "Proceed to Checkout"
        │
        ▼
  <CheckoutModal> opens
        │
        ▼
  Check: isLoggedIn?
        │
   ┌────┴────┐
   │         │
   NO        YES
   │         │
   ▼         ▼
<Login>   <Delivery
 Modal      Form>
   │         │
   │    ┌────┴─────────┐
   │    │              │
   │    ▼              ▼
   │  Address      Phone
   │  Input        Input
   │    │              │
   │    └────┬─────────┘
   │         │
   └─────┬───┘
         │
         ▼
   User clicks
   "Place Order"
         │
    ┌────┴─────┐
    │           │
    ▼           ▼
 Loading   Validation
  State     Check
    │           │
    └────┬──────┘
         │
         ▼
   API Call
  (mock delay)
         │
    ┌────┴────┐
    │         │
    ▼         ▼
 Success    Error
    │         │
    ▼         ▼
  Clear    Alert
  Cart   Message
    │
    ▼
  Close
  Modal
    │
    ▼
onCheckoutSuccess()
  callback
```

## State Management Flow

```
┌──────────────────────────────────────────────────────────┐
│               Global State (AuthContext)                │
│                                                          │
│  user: {                                                │
│    id: string                                          │
│    name: string                                        │
│    email: string                                       │
│    phone?: string                                      │
│    avatar?: string                                     │
│  } | null                                              │
│                                                          │
│  isLoggedIn: boolean                                   │
└──────────────┬───────────────────────────────────────────┘
               │
     ┌─────────┼─────────┐
     │         │         │
     ▼         ▼         ▼
 UserProfile  Checkout  CartWrapper
   Menu       Modal     (can check
  (display)  (logic)     isLoggedIn)
     │         │         │
     ▼         ▼         ▼
  Avatar    Address    Conditional
  +Name      Form      display
  +Menu    (show if
           logged in)
```

## Component Dependency Tree

```
RootLayout
├── AuthProvider (wraps all)
│   ├── Navbar
│   │   └── UserProfileMenu
│   │       ├── useAuth() hook
│   │       └── User avatar/menu
│   │
│   ├── CartWrapper
│   │   ├── Product listing
│   │   ├── Cart drawer
│   │   │   └── "Proceed to Checkout" button
│   │   │
│   │   └── CheckoutModal
│   │       ├── useAuth() hook
│   │       ├── Order summary
│   │       ├── Delivery form (conditional)
│   │       │
│   │       └── LoginModal
│   │           ├── Sign-in form
│   │           ├── Sign-up form
│   │           └── Avatar generation
│   │
│   └── Footer
```

## localStorage Persistence Flow

```
User logs in
    │
    ▼
LoginModal.onSubmit()
    │
    ▼
login() called from useAuth
    │
    ├── Update AuthContext state
    │   (user object)
    │
    └── localStorage.setItem('user', JSON.stringify(userData))
           │
           ▼
    Data persisted to browser storage
           │
           ▼
User refreshes page
    │
    ▼
RootLayout mounts
    │
    ▼
AuthProvider useEffect()
    │
    └── localStorage.getItem('user')
           │
           ▼
    Parse and restore user state
           │
           ▼
User is automatically logged in!
```

## API Integration Points

```
Frontend                          Backend
═══════════════════════════════════════════════

LoginModal                    POST /api/auth/login
├─ email                      → {email, password}
└─ password                   ← {user_data + avatar}
                                    │
CheckoutModal                 POST /api/orders
├─ items                      → {userId, items,
├─ address                       deliveryAddress,
└─ phone                         phoneNumber, total}
                              ← {orderId, status,
                                 timestamp}

UserProfileMenu               GET /api/user/:id
└─ Profile link               → Fetch order history
                              ← {orders: [...]}
```

## Conditional Rendering Logic

```
isLoggedIn = false
    │
    ├─ UserProfileMenu → Show "Sign In" button
    │
    └─ CheckoutModal  → Show LoginModal overlay
                       (Disable checkout form)

isLoggedIn = true
    │
    ├─ UserProfileMenu → Show user avatar + dropdown
    │                   ├─ Profile link
    │                   ├─ Order History link
    │                   └─ Logout button
    │
    └─ CheckoutModal  → Hide LoginModal
                       Show delivery form
                       Enable "Place Order" button
```

## Error Handling Flow

```
User interaction
    │
    ▼
Validation check
    │
   ├─ INVALID → Show error message
   │              (inline form feedback)
   │
   └─ VALID
       │
       ▼
   API call
       │
   ┌───┴────┐
   │        │
  ✅        ❌
  Success   Error
   │        │
   ▼        ▼
 Clear   Show alert
 cart    (with error
 Close   message)
 modal   │
         └─ User can retry

```

## Mobile Responsive Behavior

```
Desktop (md+)                  Mobile (<md)
══════════════════════════════════════════

Navbar:                        Navbar:
├─ Logo (left)                ├─ Logo
├─ Nav links (center)         └─ Cart + Profile
└─ Cart + Profile                (right)
   (right)

Cart drawer:                   Cart drawer:
├─ Right sidebar              ├─ Full width or
├─ Fixed width (384px)        └─ Modal overlay
└─ Can scroll items

Modals:                        Modals:
├─ Centered                   ├─ Full width
├─ Max-width: 672px           ├─ Max-height: 90vh
└─ Padding around             └─ Padding: 2rem

Forms:                         Forms:
├─ 2-column layout            ├─ 1-column layout
├─ Horizontal labels          └─ Vertical labels
└─ Wide inputs
```

---

This architecture ensures:
- ✅ Separation of concerns (Auth, Cart, Checkout)
- ✅ Reusable components
- ✅ Type-safe data flow
- ✅ Easy testing and debugging
- ✅ Scalable for future features
