# Plugins

Plugin catalog and extensibility model for XtremePlugins.

## Current Plugins

| Plugin | Slug | Category | Platforms | Display Price | Tier |
|--------|------|----------|-----------|---------------|------|
| Checkout Booster Pro | `checkout-booster-pro` | performance | WooCommerce, Shopify, WordPress | $49 | Pro+ |
| Urgency Countdown | `urgency-countdown` | conversion | WooCommerce, Shopify, WordPress | $39 | Starter+ |
| Sticky Add-to-Cart Pro | `sticky-add-to-cart-pro` | conversion | WooCommerce, Shopify, WordPress | $29 | Starter+ |

**Note:** Display prices are for perceived value. Plugins are not sold individually — users subscribe to tiers.

## Subscription Tiers

| Tier | Price | Plugins | Sites | Updates | Support |
|------|-------|---------|-------|---------|---------|
| Starter | $29/mo | 1 plugin | 1 site | 6 months | Community |
| Pro | $79/mo | 3 plugins | 5 sites | 12 months | Priority |
| Agency | $199/mo | All plugins | Unlimited | Lifetime | Dedicated |

## Plugin Data Model

Each plugin record includes:

- **Metadata:** name, slug, description, shortDescription, category, price
- **Delivery:** githubRepo, githubReleaseTag (points to private GitHub repo + latest release)
- **Platforms:** array of WOOCOMMERCE, SHOPIFY, WORDPRESS
- **Display:** features (bullet points), screenshots (image URLs)
- **Status:** isActive flag

## Adding a New Plugin

1. Create private GitHub repo (e.g., `poorman/<plugin-slug>`)
2. Tag first release with semver (e.g., `v1.0.0`) and attach .zip asset
3. Add Plugin record via admin panel (`/admin/plugins`) or database seed
4. Assign plugin to relevant subscription tiers
5. Update this file with the new plugin entry
6. Update [MODULES.md](MODULES.md) if the plugin introduces new routes or components

## Plugin Delivery

Plugins are delivered as .zip files from GitHub private repo releases. The server validates the user's license before proxying the download. See [DATA_FLOW.md](DATA_FLOW.md) for the full download flow.

## Platform Support

Plugins target three platforms:

| Platform | Plugin Format | Installation |
|----------|--------------|--------------|
| WooCommerce | WordPress plugin .zip | Upload via WP admin → Plugins → Add New |
| Shopify | Shopify app package | Install via Shopify admin → Apps |
| WordPress | WordPress plugin .zip | Upload via WP admin → Plugins → Add New |

## Extensibility

The platform is designed to scale the plugin catalog:

- **Admin CRUD:** Plugins are managed via `/admin/plugins` (Phase 3)
- **Tier assignment:** Many-to-many relationship allows flexible bundling
- **Category filtering:** Plugin catalog (`/plugins`) supports filtering by platform and category
- **GitHub-based delivery:** Adding a new plugin only requires a GitHub repo and a database record
- **No code changes needed:** New plugins are added entirely through admin UI + GitHub
