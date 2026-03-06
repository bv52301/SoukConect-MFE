# Login Integration - Testing Guide

## Overview
The login system has been integrated with the API endpoint at `http://52.76.119.114/v1/auth/login`

## Changes Made

### 1. Created `lib/auth-api.ts`
New API service that handles:
- Login requests to `/v1/auth/login`
- Token storage in localStorage
- Type-safe request/response interfaces matching the Swagger spec

**Key endpoint:**
```
POST /v1/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "string",
  "data": {
    "userId": "string",
    "token": "string",
    "refreshToken": "string",
    "loginType": "string",
    "userType": "string",
    "emailVerified": boolean,
    "phoneVerified": boolean,
    "profilePicture": "string"
  },
  "statusCode": 200
}
```

### 2. Updated `context/auth-context.tsx`
Enhanced authentication context with:
- Token storage and retrieval
- Automatic user restoration on app load
- RefreshToken support for future token refresh functionality
- Loading state tracking

### 3. Updated `components/login-modal.tsx`
- Removed mock signup functionality
- Now calls actual API endpoint
- Handles real error responses from the server
- Properly stores authentication token and refresh token
- Simplified to login-only form

## Testing Steps

### Prerequisites
- Ensure the API server is running at `http://52.76.119.114`
- Have valid test credentials (email and password)

### Manual Testing

1. **Start the application:**
   ```bash
   pnpm dev
   ```

2. **Test Login Flow:**
   - Navigate to the application
   - Click the login button to open the LoginModal
   - Enter your test credentials (email and password)
   - Click "Sign In"
   - Verify:
     - ✅ Loading state shows "Signing In..."
     - ✅ On success: Modal closes and user is logged in
     - ✅ Token is stored in localStorage
     - ✅ User data persists on page refresh

3. **Test Error Handling:**
   - Try logging in with invalid credentials
   - Verify error message is displayed from server
   - Ensure form remains available for retry

4. **Test Token Storage:**
   - Open browser DevTools → Application → LocalStorage
   - After successful login, verify these keys exist:
     - `auth_token` - JWT token from server
     - `refresh_token` - Refresh token from server
     - `user` - JSON stringified user object

5. **Test Session Persistence:**
   - Log in successfully
   - Refresh the page
   - Verify user remains logged in

### Browser Console Debugging
The login process logs errors to the console for debugging:
```javascript
// Open DevTools → Console
// You'll see login errors logged here
```

## API Integration Details

### Base URL
- Development: http://localhost (or from NEXT_PUBLIC_API_URL env var)
- Production: http://52.76.119.114 (configured in `lib/config.ts`)

### Authentication Headers
The login request automatically includes:
```
Content-Type: application/json
```

Future requests can use the stored token by adding:
```
Authorization: Bearer <token>
```

### Token Usage
After successful login, the token is available via:
```typescript
import { useAuth } from '@/context/auth-context';

const { token } = useAuth();
// Use token in API requests
```

## Troubleshooting

### Login Button Not Appearing
- Ensure LoginModal component is rendered in your layout
- Check that onLoginSuccess callback is properly connected

### API Connection Errors
- Verify the API URL is correct: http://52.76.119.114
- Check CORS is enabled on the backend
- Verify network tab in DevTools for actual request details

### Token Not Persisting
- Check browser allows localStorage
- Verify no extensions are blocking storage
- Clear browser cache and try again

### Invalid Credentials Error
- Verify email/password are correct
- Check if account exists on the backend
- Review API response in Network tab

## Next Steps

1. **Add Token Refresh:** Implement refresh token logic in `auth-api.ts`
2. **Add Auth Header Helper:** Create utility to automatically add token to API requests
3. **Add Logout:** Implement logout endpoint call if needed
4. **Add Remember Me:** Extend login form with "Remember Me" checkbox
5. **Add Password Reset:** Integrate password reset flow if available in API
