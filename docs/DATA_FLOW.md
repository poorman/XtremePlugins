# Data Flow

Data processing pipelines and flows within XtremePlugins.

## Subscription Purchase Flow

```
User (browser)
  │
  ├─ 1. Selects tier on /pricing
  ├─ 2. Click "Subscribe" → POST /api/stripe/checkout
  │     └─ Creates Stripe Checkout Session
  ├─ 3. Stripe hosted checkout page
  │     └─ User enters payment details
  ├─ 4. Stripe redirects → /dashboard?success=true
  │
  └─ 5. Stripe webhook (async)
        checkout.session.completed
          ├─ Create/update stripeCustomerId on User
          ├─ Create License for each plugin in tier
          └─ Create Purchase record
```

## Subscription Lifecycle (Stripe Webhooks)

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create licenses + purchase records |
| `invoice.paid` | Extend license expiry dates |
| `customer.subscription.updated` | Adjust plugin access (upgrade/downgrade) |
| `customer.subscription.deleted` | Mark all related licenses as EXPIRED |

## Plugin Download Flow

```
User (dashboard)
  │
  ├─ 1. Click "Download" on plugin
  ├─ 2. POST /api/plugins/[slug]/download
  │     ├─ Validate: authenticated?
  │     ├─ Validate: active license for plugin?
  │     ├─ Validate: license not expired?
  │     └─ If invalid → 403
  │
  ├─ 3. GitHub API call
  │     └─ GET latest release asset from private repo
  │        (authenticated with server-side GitHub PAT)
  │
  ├─ 4. Return download URL to client
  │
  └─ 5. Log to Download table
        (userId, pluginId, licenseId, version, ipAddress)
```

## Blog Content Flow

```
Ghost Admin (/ghost/)
  │
  ├─ Author writes/publishes post
  │
  ├─ Ghost fires webhook → POST /api/revalidate
  │     └─ Next.js on-demand ISR revalidation
  │
  └─ Next.js renders blog pages
        ├─ /blog         → Ghost Content API posts.browse()
        ├─ /blog/[slug]  → Ghost Content API posts.read({slug})
        └─ /blog/tag/[t] → Ghost Content API posts.browse({filter})

        ISR revalidate: 3600s (1 hour) + on-demand via webhook
```

## Authentication Flow

```
User
  │
  ├─ Credentials login
  │   ├─ POST /api/auth/callback/credentials
  │   ├─ Verify bcrypt hash against User.passwordHash
  │   └─ Issue signed JWT cookie
  │
  ├─ OAuth login (Google/GitHub)
  │   ├─ Redirect → provider
  │   ├─ Callback → /api/auth/callback/[provider]
  │   ├─ Create/link Account + User via Prisma adapter
  │   └─ Issue signed JWT cookie
  │
  └─ Subsequent requests
      └─ JWT verified from cookie (no DB lookup)
```

## License Activation

```
Plugin installation (user's site)
  │
  ├─ Plugin sends license key + domain
  ├─ Server validates key exists + status ACTIVE + not expired
  ├─ Checks activatedSites.length < maxSites
  ├─ Adds domain to activatedSites array
  └─ Returns activation confirmation
```
