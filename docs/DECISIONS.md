# Decisions

Architectural and design decisions for XtremePlugins. Each entry records the decision, rationale, and date.

---

### D001 — Tier-based subscriptions, not individual plugin sales

**Date:** 2026-03-17
**Decision:** Plugins are sold through subscription tiers (Starter/Pro/Agency), not individually.
**Rationale:** Simplifies billing, encourages upsells, and increases lifetime value. Individual prices shown on cards ($49/$39/$29) are for perceived value comparison only — "Buy Now" links to the relevant tier.

---

### D002 — Ghost CMS for blog (headless)

**Date:** 2026-03-17
**Decision:** Use Ghost 5 in headless mode as the blog CMS rather than building a custom blog or using MDX.
**Rationale:** Ghost provides a mature editor, scheduling, SEO metadata, and Content API out of the box. Headless mode lets us render with Next.js ISR using the site's own Tailwind theme. Requires a separate MySQL instance but avoids building content management.

---

### D003 — GitHub Releases for plugin delivery

**Date:** 2026-03-17
**Decision:** Deliver plugin files via GitHub private repo releases instead of self-hosted file storage.
**Rationale:** Leverages existing version control, release tagging, and asset hosting. No need for S3 or custom file storage. Server uses a GitHub PAT to proxy downloads after license validation.

---

### D004 — JWT sessions (no database lookups)

**Date:** 2026-03-17
**Decision:** Use JWT session strategy with NextAuth instead of database sessions.
**Rationale:** Eliminates per-request database queries for session validation. Trades off instant session revocation for performance. Acceptable for a plugin marketplace where instant logout isn't critical.

---

### D005 — Static HTML landing page first

**Date:** 2026-03-17
**Decision:** Ship a static HTML landing page served by nginx before building the full Next.js app.
**Rationale:** Validates design, copy, and layout immediately. The static page will be migrated to Next.js components in Phase 1.

---

### D006 — Monthly subscriptions at launch, annual billing deferred

**Date:** 2026-03-17
**Decision:** Launch with monthly-only billing. Annual billing is schema-ready (`stripePriceIdAnnual`) but not wired.
**Rationale:** Reduces Stripe integration complexity for MVP. Annual option can be added without schema migration.

---

### D007 — Prisma ORM for database access

**Date:** 2026-03-17
**Decision:** Use Prisma as the ORM with PostgreSQL 16.
**Rationale:** Type-safe queries, migration tooling, and NextAuth adapter support. Pairs well with TypeScript and Next.js API routes.
