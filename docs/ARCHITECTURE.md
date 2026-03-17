# Architecture

## System Overview

XtremePlugins is a SaaS plugin marketplace for WooCommerce, Shopify, and WordPress. Users subscribe to tiers that unlock plugin bundles with updates and support. The platform runs as a multi-service Docker Compose stack behind an nginx reverse proxy on port 2070.

## Services

```
┌─────────────────────────────────────────────────────┐
│                  nginx (port 2070)                   │
│              reverse proxy + static cache            │
├──────────────────────┬──────────────────────────────┤
│         /            │         /ghost/               │
│         ▼            │            ▼                  │
│   Next.js 14 (:3000) │     Ghost 5 (:2368)          │
│   App Router         │     Headless CMS             │
│   ├─ Storefront      │     ├─ Content API           │
│   ├─ User Dashboard  │     └─ Admin Panel           │
│   ├─ Admin Panel     │         │                    │
│   ├─ API Routes      │         ▼                    │
│   │   ├─ /api/auth   │     MySQL 8                  │
│   │   ├─ /api/stripe │     (ghost-db)               │
│   │   └─ /api/plugins│                              │
│   └─ Blog (ISR)      │                              │
│       │               │                              │
│       ▼               │                              │
│   PostgreSQL 16       │                              │
│   (Prisma ORM)       │                              │
└──────────────────────┴──────────────────────────────┘
```

| Service | Image/Stack | Internal Port | External Port | Purpose |
|---------|-------------|---------------|---------------|---------|
| nginx | nginx:alpine | 80 | 2070 | Reverse proxy, static asset caching |
| web | Next.js 14 | 3000 | 2071 | Storefront, API routes, admin, blog rendering |
| ghost | Ghost 5 (headless) | 2368 | 2072 | Blog CMS (Content API + Admin) |
| postgres | PostgreSQL 16 | 5432 | 2073 | Users, plugins, subscriptions, licenses |
| ghost-db | MySQL 8 | 3306 | internal only | Ghost database |

## External Integrations

| Service | Purpose |
|---------|---------|
| Stripe | Subscription billing, webhooks, customer portal |
| GitHub | Private repo releases for plugin file delivery |
| Google OAuth | Social login |
| GitHub OAuth | Social login |

## Nginx Routing

```
/         → http://web:3000     (Next.js)
/ghost/   → http://ghost:2368   (Ghost admin)
```

Static assets (images) cached 30 days with `Cache-Control: public, immutable`.

## Current State

The project is currently a static HTML landing page served directly by nginx. The target architecture (Next.js + Ghost + PostgreSQL) is defined in the design spec and will be built in phases. See [ROADMAP.md](ROADMAP.md) for delivery timeline.

## Frontend Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Cyberpunk glassmorphism theme: dark, Orbitron + Exo 2 fonts
- Palette: cyan (#00e5ff), magenta (#e040fb), purple (#7c3aed), deep purple (#0d0021)

## Authentication

NextAuth.js with JWT session strategy. Prisma adapter for Account/User linkage. Strategies: credentials (bcrypt), Google OAuth, GitHub OAuth. Roles: USER (default), ADMIN.

## Session & State

- JWT stored in signed cookies (no database session lookups)
- Prisma adapter creates Session table but it is unused at runtime
- First admin created via database seed script
