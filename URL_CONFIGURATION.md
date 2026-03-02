# URL Configuration Guide

## Problem Fixed
Previously, hardcoded localhost URLs were breaking the app when deployed to the server. The app would redirect from `http://52.76.119.114/ui/food` to `http://localhost:3001`, which doesn't work on a server.

## Solution: Relative Paths + Environment Variables

### How It Works Now

#### Development (localhost)
```
localhost:3000 (shell) → /food → localhost:3001 (food-connect)
```

#### Production (deployed server)
```
52.76.119.114/ui (shell) → /food → 52.76.119.114/food (food-connect)
```

**Key: Using relative paths (`/food`, `/`) instead of hardcoded URLs**

### Files Changed

#### 1. `.env.local` (Development)
```dotenv
NEXT_PUBLIC_FOOD_CONNECT_URL=/food
NEXT_PUBLIC_SHELL_URL=/
NEXT_PUBLIC_API_URL=http://52.76.119.114
INTERNAL_API_URL=http://52.76.119.114
```

#### 2. `.env.production` (Production)
Same as above - relative paths work on any domain!

#### 3. Shell App: `apps/shell/app/food/page.tsx`
**Before:**
```tsx
window.location.href = 'http://localhost:3001';
```

**After:**
```tsx
window.location.href = '/food';
```

#### 4. Food-Connect Config: `apps/food-connect/lib/config.ts`
**Before:**
```typescript
shellUrl: process.env.NEXT_PUBLIC_SHELL_URL || "http://localhost:3000",
apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost",
```

**After:**
```typescript
shellUrl: process.env.NEXT_PUBLIC_SHELL_URL || "/",
apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://52.76.119.114",
```

### Why This Works

| Scenario | Shell URL | Food URL | Result |
|---|---|---|---|
| localhost:3000 | `/` | `/food` | Works ✅ |
| localhost:3001 | `/` | `/food` | Works ✅ |
| 52.76.119.114/ui | `/` | `/food` | Works ✅ |
| Any domain | `/` | `/food` | Works ✅ |

### Environment Variables

#### For Local Development
No changes needed - use `.env.local` (already configured)

#### For Production Deployment
On your hosting platform (Docker, AWS, Vercel, etc.), ensure these are set:
```
NEXT_PUBLIC_FOOD_CONNECT_URL=/food
NEXT_PUBLIC_SHELL_URL=/
NEXT_PUBLIC_API_URL=http://52.76.119.114
INTERNAL_API_URL=http://52.76.119.114
```

Or they'll use the `.env.production` defaults automatically.

### Testing Locally

1. **Restart dev servers:**
   ```bash
   npm run dev
   ```

2. **Test shell → food navigation:**
   - Go to `http://localhost:3000`
   - Click "Explore Food Connect"
   - Should navigate to `/food` path ✅

3. **Test food-connect:**
   - Go to `http://localhost:3001`
   - Click on vendor/chef
   - Should load vendor details ✅

### Testing After Deployment

1. Go to `http://52.76.119.114/ui`
2. Click "Explore Food Connect"
3. Should navigate to `http://52.76.119.114/ui/food` ✅
4. Vendor details should load from backend API ✅

### Why Relative Paths Work

Relative paths (`/food`) are always **relative to the current domain**:
- On `localhost:3000` → becomes `localhost:3000/food`
- On `52.76.119.114` → becomes `52.76.119.114/food`
- On `yourdomain.com` → becomes `yourdomain.com/food`

So **no need to hardcode domains!** 🎉

### Summary

✅ No more hardcoded localhost URLs
✅ Works on localhost development
✅ Works on server deployment
✅ Uses relative paths and environment variables
✅ Can easily change API endpoint with env var
