# Netlify Environment Variables - Quick Reference

**Site**: https://jchris.netlify.app

Add these environment variables in **Netlify Dashboard → Site settings → Environment variables**:

## Required Variables

### 1. Clerk Authentication
```bash
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```
Get from: [Clerk Dashboard](https://dashboard.clerk.com) → Your Application → API Keys

### 2. Supabase Database
```bash
DATABASE_URL=postgresql://postgres.paoipjeybgbwjgwbwcwd:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```
Get from: [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → Database → Connection Pooling → Transaction mode

⚠️ **CRITICAL**: Must use port **6543** (not 5432) with `?pgbouncer=true`

### 3. App Configuration
```bash
PUBLIC_APP_URL=https://jchris.netlify.app
NODE_VERSION=20
```

## Variable Checklist

- [ ] `PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_`)
- [ ] `CLERK_SECRET_KEY` (starts with `sk_test_`)
- [ ] `DATABASE_URL` (contains `:6543/postgres?pgbouncer=true`)
- [ ] `PUBLIC_APP_URL` (set to `https://jchris.netlify.app`)
- [ ] `NODE_VERSION` (set to `20`)

## After Adding Variables

1. Trigger a deployment (will fail - that's expected!)
2. The build will fail because:
   - Missing `@sveltejs/adapter-netlify`
   - Missing `@clerk/sveltekit`
   - SQLite schema doesn't match PostgreSQL
3. Next step: Phase 1 implementation (install dependencies, update schema)

## Clerk Configuration (After Deployment)

In [Clerk Dashboard](https://dashboard.clerk.com):

### Add Redirect URLs
**Configure → Paths → Redirect URLs**
- Add: `https://jchris.netlify.app`
- Add: `http://localhost:5173` (for local dev)

### Configure Allowlist
**User & Authentication → Restrictions → Allowlist**
Enable and add:
- `japanccc.org`
- `cru.org`
- `kccc.org`
- `cru.org.sg`
- `hkccc.org`
- `powertochange.org.au`
- `mongoliaccc.org`

## Current Status

✅ Netlify site created: https://jchris.netlify.app
✅ GitHub repository connected
⏳ **Next**: Add environment variables above
⏳ Trigger first deployment
⏳ Begin Phase 1 implementation
