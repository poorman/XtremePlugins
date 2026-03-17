# XtremePlugins — SaaS Plugin Marketplace Design Spec

## Overview

XtremePlugins is a SaaS platform for selling premium freemium plugins for WooCommerce, Shopify, and WordPress. Customers purchase subscription tiers that unlock plugin bundles with ongoing updates and support. The platform includes a storefront, user dashboard, admin panel, Stripe billing, GitHub-based plugin delivery, and a Ghost-powered blog.

**Port:** 2070 (public via nginx reverse proxy)

---

## Architecture

### Services (Docker Compose)

| Service | Image/Stack | Internal Port | Purpose |
|---------|-------------|---------------|---------|
| nginx | nginx:alpine | 80 → 2070 | Reverse proxy, routes traffic |
| web | Next.js 14 (App Router) | 3000 → 2071 | Storefront, admin, API routes, blog rendering |
| ghost | Ghost 5 (headless) | 2368 → 2072 | Blog CMS — Content API + Admin panel |
| postgres | PostgreSQL 16 | 5432 → 2073 | Users, plugins, subscriptions, licenses |
| ghost-db | MySQL 8 | 3306 (internal only) | Ghost's required database |

### Nginx Routing

```
/ → http://web:3000          (Next.js)
/ghost/ → http://ghost:2368  (Ghost admin)
```

### External Integrations

- **Stripe** — subscription billing, webhooks, customer portal
- **GitHub** — private repo releases for plugin file delivery
- **Google OAuth** — social login provider
- **GitHub OAuth** — social login provider

---

## Data Model (PostgreSQL + Prisma)

### User
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| email | String | Unique |
| name | String | Optional |
| passwordHash | String | Nullable (OAuth users) |
| emailVerified | DateTime | Nullable, required by NextAuth Prisma adapter |
| role | Enum (USER, ADMIN) | Default: USER |
| avatar | String | Optional URL |
| stripeCustomerId | String | Nullable, set on first purchase |
| createdAt | DateTime | |
| updatedAt | DateTime | |

Linked to NextAuth `Account` table. Session strategy is JWT — the Prisma adapter creates a `Session` table but it is unused for auth checks; sessions are stored in signed JWT cookies.

### Plugin
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | String | Display name |
| slug | String | Unique, URL-safe |
| description | Text | Full markdown description |
| shortDescription | String | For cards/listings |
| price | Decimal | Display price (for reference only — plugins are sold through tier subscriptions, not individually) |
| githubRepo | String | e.g. "poorman/checkout-booster-pro" |
| githubReleaseTag | String | Latest release tag |
| platforms | Enum[] | WOOCOMMERCE, SHOPIFY, WORDPRESS |
| category | String | e.g. "performance", "conversion" |
| features | String[] | Feature bullet points |
| screenshots | String[] | Image URLs |
| isActive | Boolean | Default: true |
| createdAt | DateTime | |
| updatedAt | DateTime | |

### SubscriptionTier
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| name | String | Starter, Pro, Agency |
| slug | String | Unique |
| stripePriceIdMonthly | String | Stripe Price ID for monthly billing |
| stripePriceIdAnnual | String | Nullable — Stripe Price ID for annual billing (added later) |
| monthlyPrice | Decimal | Display price |
| maxSites | Int | Site activation limit |
| updateMonths | Int | How long updates last (0 = lifetime) |
| supportLevel | String | community, priority, dedicated |
| features | String[] | Display features for pricing page |
| createdAt | DateTime | |
| updatedAt | DateTime | |

Many-to-many relationship with Plugin via `_PluginToSubscriptionTier` join table.

### License
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| userId | UUID | FK → User |
| pluginId | UUID | FK → Plugin |
| subscriptionTierId | UUID | FK → SubscriptionTier |
| licenseKey | String | Unique, generated |
| status | Enum (ACTIVE, EXPIRED, REVOKED) | |
| activatedSites | String[] | Domain list |
| maxSites | Int | Copied from tier at purchase |
| stripeSubscriptionId | String | |
| expiresAt | DateTime | Nullable (lifetime = null) |
| createdAt | DateTime | |
| updatedAt | DateTime | |

### Purchase
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| userId | UUID | FK → User |
| licenseId | UUID | FK → License |
| stripePaymentId | String | |
| amount | Decimal | |
| currency | String | Default: "usd" |
| type | Enum (ONE_TIME, SUBSCRIPTION) | |
| createdAt | DateTime | |

### Download
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| userId | UUID | FK → User |
| pluginId | UUID | FK → Plugin |
| licenseId | UUID | FK → License |
| version | String | Release tag downloaded |
| ipAddress | String | |
| downloadedAt | DateTime | |

---

## Authentication

### Provider: NextAuth.js

**Strategies:**
1. **Credentials** — email + password (bcrypt hashed)
2. **Google OAuth**
3. **GitHub OAuth**

**Session:** JWT strategy — sessions stored in signed cookies, no database session lookups. The Prisma adapter creates a Session table but it is unused at runtime.

**Roles:** USER (default), ADMIN. First admin created via database seed script (Phase 1).

**Adapter:** Prisma adapter for storing Account/User linkage.

---

## Subscription & Payment Flow

### Business Model

- Users subscribe to a **tier** (Starter $29/mo, Pro $79/mo, Agency $199/mo) — **monthly recurring subscriptions**
- Each tier includes a **bundle of plugins**
- Subscription grants: plugin downloads, updates for the duration of active subscription, support at tier level
- If subscription lapses: license status → EXPIRED, user keeps the last downloaded version of each plugin but cannot download new updates or releases
- Plugins are **not sold individually** — the landing page "Buy Now" buttons and individual prices ($49/$39/$29) link to the relevant tier subscription. Individual prices are shown for perceived value comparison only.
- Annual billing option is schema-ready (`stripePriceIdAnnual`) but not wired for MVP — monthly only at launch

### Purchase Flow

1. User selects tier on `/pricing`
2. Click "Subscribe" → `POST /api/stripe/checkout` creates Stripe Checkout Session
3. Stripe redirects to `/dashboard?success=true`
4. Stripe webhook `checkout.session.completed` fires → API route handler:
   - Creates/updates `stripeCustomerId` on User
   - Creates License record for each plugin in the tier
   - Creates Purchase record
5. User sees licenses in `/dashboard`

### Stripe Webhook Events

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create licenses + purchase records |
| `invoice.paid` | Extend license expiry dates |
| `customer.subscription.updated` | Handle tier upgrade/downgrade — reconcile licenses (diff plugin sets: create new licenses for newly included plugins, mark removed ones as EXPIRED) |
| `customer.subscription.deleted` | Mark all related licenses as EXPIRED |

**License reconciliation on tier change:** When a user upgrades (e.g. Starter → Pro), the webhook handler diffs the plugin sets between old and new tier. New plugins get fresh License rows. Existing licenses carry over. Plugins no longer in the new tier get marked EXPIRED.

**New plugin added to tier:** When admin adds a new plugin to a tier, a background job creates License rows for all active subscribers of that tier. This is triggered from the admin CRUD action, not from Stripe.

### Stripe Customer Portal

- Users manage billing at `/dashboard/billing` which redirects to Stripe's hosted Customer Portal
- Handles: cancel, upgrade, downgrade, update payment method

---

## Plugin Delivery (GitHub Releases)

### Flow

1. User clicks "Download" on a plugin in `/dashboard`
2. `POST /api/plugins/[slug]/download` validates:
   - User is authenticated
   - Has active license for this plugin
   - License not expired
3. Rate limit: max 10 downloads per plugin per hour per user
4. If valid: API route proxies the download — streams the asset bytes from GitHub through the Next.js API route to the client. The GitHub PAT is never exposed to the browser.
5. Logs download to `Download` table

### GitHub Setup Required

- Each plugin has a private GitHub repo (e.g. `poorman/checkout-booster-pro`)
- Releases tagged with semver (e.g. `v1.0.0`)
- Release assets contain the plugin .zip file
- Server uses a GitHub Personal Access Token (env var) to access private repos

---

## Blog (Ghost CMS — Headless)

### Ghost Configuration

- Runs in headless/content-API mode
- MySQL 8 backend (separate from main PostgreSQL)
- Admin panel accessible at `/ghost/` (proxied by nginx)
- Content API key + Admin API key stored in env vars

### Next.js Blog Routes

| Route | Purpose | Data Source |
|-------|---------|-------------|
| `/blog` | Paginated post listing | Ghost Content API `posts.browse()` |
| `/blog/[slug]` | Individual post | Ghost Content API `posts.read({slug})` |
| `/blog/tag/[tag]` | Posts filtered by tag | Ghost Content API `posts.browse({filter})` |

### Rendering

- ISR with `revalidate: 3600` (1-hour cache)
- Ghost webhook on publish → calls `POST /api/revalidate?secret=<REVALIDATION_SECRET>&tag=blog` for on-demand ISR. Ghost webhook configured in Ghost admin under Integrations → Custom. Secret shared via `REVALIDATION_SECRET` env var to prevent cache-busting attacks.
- Blog pages rendered with site's Tailwind theme (dark cyberpunk aesthetic)
- Full SEO: meta tags, Open Graph, JSON-LD `Article` schema from Ghost metadata

### First Article

"The Hidden Cost of a Slow WooCommerce Store (And How to Fix It in 2026)" — to be published via Ghost admin once the platform is running.

---

## Frontend

### Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Existing design: cyberpunk glassmorphism — dark theme, Orbitron + Exo 2 fonts, cyan (#00e5ff) / magenta (#e040fb) / purple (#7c3aed) palette, warp-speed background

### Pages

| Route | Purpose | Auth |
|-------|---------|------|
| `/` | Landing page (hero, social proof, features, pricing) | Public |
| `/plugins` | Plugin catalog with platform/category filtering | Public |
| `/plugins/[slug]` | Plugin detail — screenshots, features | Public |
| `/pricing` | Subscription tiers comparison | Public |
| `/blog` | Blog listing | Public |
| `/blog/[slug]` | Blog post | Public |
| `/blog/tag/[tag]` | Blog posts by tag | Public |
| `/login` | NextAuth sign in (email + OAuth) | Public |
| `/register` | Sign up | Public |
| `/dashboard` | User licenses, downloads, subscription info | USER |
| `/dashboard/billing` | Redirect to Stripe Customer Portal | USER |
| `/admin` | Overview — stats, recent activity | ADMIN |
| `/admin/plugins` | CRUD plugins | ADMIN |
| `/admin/tiers` | CRUD subscription tiers | ADMIN |
| `/admin/users` | User management | ADMIN |
| `/admin/licenses` | License management | ADMIN |
| `/admin/analytics` | Downloads, revenue, user growth charts | ADMIN |

### Shared Components

- Navbar (sticky, glass blur)
- Footer (logo + nav links)
- GlassCard, PricingCard, PluginCard
- Button (primary gradient, outline, ghost variants)
- Form inputs (glass style)
- Badge (platform, status)
- Modal, Toast notifications

### Assets

- `/public/src/img/logo.png` — brand logo
- `/public/src/img/background.png` — warp-speed background

---

## Docker Compose Structure

```yaml
services:
  nginx:
    image: nginx:alpine
    ports: ["2070:80"]
    depends_on:
      web: { condition: service_healthy }
      ghost: { condition: service_healthy }

  web:
    build: .
    ports: ["2071:3000"]
    healthcheck: { test: "curl -f http://localhost:3000/api/health", interval: 10s, retries: 5 }
    depends_on:
      postgres: { condition: service_healthy }
    env: DATABASE_URL, NEXTAUTH_SECRET, STRIPE_*, GHOST_*, GITHUB_*

  ghost:
    image: ghost:5-alpine
    ports: ["2072:2368"]
    healthcheck: { test: "curl -f http://localhost:2368/ghost/api/v4/admin/site/", interval: 10s, retries: 5 }
    depends_on:
      ghost-db: { condition: service_healthy }
    env: headless config, MySQL connection, content API keys

  postgres:
    image: postgres:16-alpine
    ports: ["2073:5432"]
    healthcheck: { test: "pg_isready -U xp", interval: 5s, retries: 5 }
    volumes: [pgdata]

  ghost-db:
    image: mysql:8
    healthcheck: { test: "mysqladmin ping -h localhost", interval: 5s, retries: 5 }
    volumes: [ghostdata]
```

---

## Environment Variables

```
# Database
DATABASE_URL=postgresql://xp:xp@postgres:5432/xtremeplugins

# NextAuth
NEXTAUTH_SECRET=<random>
NEXTAUTH_URL=http://localhost:2070

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Ghost
GHOST_URL=http://ghost:2368
GHOST_CONTENT_API_KEY=
GHOST_ADMIN_API_KEY=

# GitHub (plugin delivery)
GITHUB_PAT=<personal access token for private repos>

# Revalidation
REVALIDATION_SECRET=<random secret for Ghost webhook cache busting>
```

---

## Phased Delivery

### Phase 1 — Core Infrastructure
- Docker Compose with all 5 services (with health checks)
- Next.js project scaffolding with Tailwind + existing design
- Prisma schema + migrations
- Database seed script (admin user, sample tiers, sample plugins)
- NextAuth (email/password + OAuth)
- Landing page migrated from static HTML (update pricing to show "/mo")
- Ghost setup + blog routes + revalidation webhook
- Publish first article ("The Hidden Cost of a Slow WooCommerce Store")

### Phase 2 — Stripe & Plugin Delivery
- Stripe integration (checkout, webhooks, customer portal)
- License generation and management
- GitHub release download flow (proxied, with rate limiting)
- User dashboard (licenses, downloads, billing)
- Plugin catalog + detail pages

### Phase 3 — Admin Panel
- Admin routes with role-based protection
- CRUD for plugins, tiers, users, licenses
- Analytics dashboard (downloads, revenue, growth)
- Plugin screenshot/asset upload
