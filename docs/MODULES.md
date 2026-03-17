# Modules

Current and planned modules for the XtremePlugins platform. Update this file when adding or modifying modules.

## Current Modules

### Static Landing Page

| File | Purpose |
|------|---------|
| `public/index.html` | Single-page landing: hero, social proof, plugin cards, pricing tiers, footer |
| `public/src/img/logo.png` | Brand logo (used in hero + footer) |
| `public/src/img/background.png` | Warp-speed background image (currently unused — removed from CSS) |

### Infrastructure

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Defines nginx service (port 2070), serves `public/` as static site |
| `nginx.conf` | Reverse proxy config, SPA fallback, 30-day image cache headers |

## Planned Modules (Next.js Migration)

### Frontend Pages

| Route | Module | Auth |
|-------|--------|------|
| `/` | Landing page (migrated from static HTML) | Public |
| `/plugins` | Plugin catalog with filtering | Public |
| `/plugins/[slug]` | Plugin detail page | Public |
| `/pricing` | Tier comparison | Public |
| `/blog` | Blog listing (Ghost ISR) | Public |
| `/blog/[slug]` | Blog post | Public |
| `/blog/tag/[tag]` | Posts by tag | Public |
| `/login` | Sign in (email + OAuth) | Public |
| `/register` | Sign up | Public |
| `/dashboard` | User licenses, downloads, subscription | USER |
| `/dashboard/billing` | Stripe Customer Portal redirect | USER |
| `/admin` | Admin overview | ADMIN |
| `/admin/plugins` | Plugin CRUD | ADMIN |
| `/admin/tiers` | Tier CRUD | ADMIN |
| `/admin/users` | User management | ADMIN |
| `/admin/licenses` | License management | ADMIN |
| `/admin/analytics` | Downloads, revenue, growth charts | ADMIN |

### API Routes

| Route | Purpose |
|-------|---------|
| `/api/auth/[...nextauth]` | NextAuth endpoints |
| `/api/stripe/checkout` | Create Stripe Checkout Session |
| `/api/stripe/webhook` | Handle Stripe webhook events |
| `/api/stripe/portal` | Create Stripe Customer Portal session |
| `/api/plugins/[slug]/download` | Validate license + proxy GitHub release download |

### Shared Components

| Component | Purpose |
|-----------|---------|
| Navbar | Sticky glass-blur navigation |
| Footer | Logo + nav links |
| GlassCard | Reusable glassmorphism container |
| PricingCard | Tier display with features list |
| PluginCard | Plugin display with screenshot mock |
| Button | Primary gradient, outline, ghost variants |
| Form inputs | Glass-styled inputs |
| Badge | Platform badge, status badge |
| Modal | Dialog overlay |
| Toast | Notification popups |

### Data Layer

| Module | Purpose |
|--------|---------|
| Prisma schema | User, Plugin, SubscriptionTier, License, Purchase, Download models |
| Prisma migrations | Database schema versioning |
| Seed script | Initial admin user + tier + plugin data |
