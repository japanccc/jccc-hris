# Netlify Setup Instructions

## Build Settings

When connecting your GitHub repository to Netlify, use these settings:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `build`
- **Node version**: 20 (set in Environment Variables)

## Environment Variables to Add

In Netlify Dashboard → Site settings → Environment variables, add:

### 1. Clerk Authentication

```
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

**Where to find**: [Clerk Dashboard](https://dashboard.clerk.com) → Your Application → API Keys

### 2. Supabase Database

```
DATABASE_URL=postgresql://[user]:[password]@[host]:6543/postgres?pgbouncer=true
```

**CRITICAL**: Must use port `6543` (connection pooler) NOT `5432` to avoid "too many connections" errors in serverless environment.

**Where to find**:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Project Settings → Database
4. Copy "Connection string" under "Connection pooling"
5. Replace `[password]` with your database password
6. Ensure it ends with `?pgbouncer=true`

### 3. App Configuration

```
PUBLIC_APP_URL=https://jchris.netlify.app
```

**Your Netlify URL**: `https://jchris.netlify.app`

### 4. Node Version

```
NODE_VERSION=20
```

## Expected First Deployment

⚠️ **The first deployment will likely FAIL** - this is expected and normal!

Why? The current code:
1. Uses SQLite adapter (not yet migrated to PostgreSQL)
2. Missing Netlify adapter configuration
3. Missing Clerk integration

After getting your Netlify URL, we'll implement Phase 1 of the plan to fix these issues.

## Next Steps After Netlify Connection

1. ✅ Add environment variables (above)
2. ✅ Trigger first deployment (will fail, that's okay)
3. ✅ Your Netlify URL: `https://jchris.netlify.app`
4. ✅ Set `PUBLIC_APP_URL=https://jchris.netlify.app` in environment variables
5. 🔧 Begin Phase 1 implementation:
   - Install Netlify adapter
   - Install Clerk package
   - Update database schema and configuration
   - Update authentication logic

## Clerk Post-Deployment Configuration

After you have your Netlify URL, update Clerk settings:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **Configure** → **Paths**
4. Add your Netlify URL to allowed origins: `https://jchris.netlify.app`

## Configure Clerk Allowlist (5 minutes)

1. In Clerk Dashboard → **User & Authentication** → **Restrictions**
2. Enable **Allowlist** mode
3. Add these domains:
   - `japanccc.org`
   - `cru.org`
   - `kccc.org`
   - `cru.org.sg`
   - `hkccc.org`
   - `powertochange.org.au`
   - `mongoliaccc.org`
4. Add individual emails as needed (for associates/part-time staff)
5. Save changes

✅ This handles all authentication whitelist logic - no custom code needed!

## Troubleshooting

### Build fails with "Cannot find module '@sveltejs/adapter-netlify'"
**Solution**: This is expected. We haven't installed it yet. After getting your Netlify URL, we'll run Phase 1 implementation.

### "Database connection failed"
**Solution**:
1. Double-check `DATABASE_URL` uses port `6543`
2. Verify password is correct
3. Ensure `?pgbouncer=true` is appended

### "Clerk publishable key missing"
**Solution**: Verify `PUBLIC_CLERK_PUBLISHABLE_KEY` is set in Netlify environment variables

## Current Status

- ✅ Repository: https://github.com/japanccc/jccc-hris (public)
- ✅ Clerk app created
- ✅ Supabase database created
- ✅ Connected to Netlify
- ✅ Netlify URL obtained: https://jchris.netlify.app
- ⏳ Add environment variables (next step)
- ⏳ First deployment (will fail, expected)
- ⏳ Phase 1 implementation (after first deploy attempt)
