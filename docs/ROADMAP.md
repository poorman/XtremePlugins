# Roadmap

Phased delivery plan for XtremePlugins.

## Phase 1 — Core Infrastructure

- [ ] Docker Compose with all 5 services (nginx, web, ghost, postgres, ghost-db)
- [ ] Next.js 14 project scaffolding with Tailwind + existing cyberpunk theme
- [ ] Prisma schema + initial migration
- [ ] NextAuth setup (email/password + Google OAuth + GitHub OAuth)
- [ ] Migrate static HTML landing page to Next.js components
- [ ] Ghost CMS setup + blog routes (`/blog`, `/blog/[slug]`, `/blog/tag/[tag]`)
- [ ] ISR rendering with Ghost Content API
- [ ] Ghost webhook → Next.js on-demand revalidation
- [ ] Publish first article: "The Hidden Cost of a Slow WooCommerce Store"
- [ ] Database seed script (admin user, tiers, initial plugins)

## Phase 2 — Stripe & Plugin Delivery

- [ ] Stripe Checkout integration (monthly subscriptions)
- [ ] Stripe webhook handlers (checkout, invoice, subscription lifecycle)
- [ ] Stripe Customer Portal integration (`/dashboard/billing`)
- [ ] License generation on purchase
- [ ] GitHub release download flow with license validation
- [ ] Download logging
- [ ] User dashboard: licenses, downloads, subscription status
- [ ] Plugin catalog page (`/plugins`) with platform/category filtering
- [ ] Plugin detail pages (`/plugins/[slug]`)

## Phase 3 — Admin Panel

- [ ] Admin routes with ADMIN role protection
- [ ] Plugin CRUD (create, edit, toggle active, manage screenshots)
- [ ] Subscription tier CRUD
- [ ] User management (view, role assignment)
- [ ] License management (view, revoke, extend)
- [ ] Analytics dashboard (downloads, revenue, user growth)

## Future Considerations

- Annual billing option (schema-ready, not wired)
- Plugin reviews and ratings
- Affiliate/referral program
- Plugin update notifications (email or in-dashboard)
- White-label plugin customization (Agency tier)
- License activation API for plugin self-validation
