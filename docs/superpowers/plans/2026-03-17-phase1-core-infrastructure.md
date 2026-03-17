# Phase 1: Core Infrastructure — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the full Docker infrastructure (Next.js + Ghost + PostgreSQL + nginx), implement auth, migrate the landing page, wire up the blog, and seed the database — producing a running site on port 2070 with login, public pages, and blog.

**Architecture:** 5 Docker services orchestrated via Docker Compose. Next.js 14 App Router handles all web routes + API. Ghost runs headless for blog content, fetched by Next.js via Content API. PostgreSQL stores all application data via Prisma ORM. Nginx reverse-proxies everything on port 2070.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL 16, NextAuth.js, Ghost 5, nginx, Docker Compose

**Spec:** `docs/superpowers/specs/2026-03-17-xtremeplugins-design.md`

---

## File Structure

```
XtremePlugins/
├── docker-compose.yml              # 5 services: nginx, web, ghost, postgres, ghost-db
├── Dockerfile                      # Multi-stage Next.js build
├── .dockerignore
├── .env.example                    # Template env vars
├── .env                            # Local env vars (gitignored)
├── .gitignore
├── nginx/
│   └── default.conf                # Reverse proxy config
├── package.json                    # Next.js project
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── prisma/
│   ├── schema.prisma               # Full data model
│   └── seed.ts                     # Admin user + sample tiers + sample plugins
├── src/
│   ├── lib/
│   │   ├── prisma.ts               # Prisma client singleton
│   │   ├── auth.ts                 # NextAuth config (providers, adapter, callbacks)
│   │   ├── ghost.ts                # Ghost Content API client
│   │   └── fonts.ts                # Orbitron + Exo 2 font config
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky glass navbar
│   │   ├── Footer.tsx              # Footer with logo + links
│   │   ├── GlassCard.tsx           # Reusable glass card wrapper
│   │   ├── PricingCard.tsx         # Tier pricing card
│   │   ├── Button.tsx              # Primary, outline, ghost variants
│   │   ├── BlogPostCard.tsx        # Blog listing card
│   │   └── WarpBackground.tsx      # Animated warp-speed background
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, navbar, footer, background
│   │   ├── globals.css             # Tailwind + custom CSS vars + animations
│   │   ├── page.tsx                # Landing page (migrated from static HTML)
│   │   ├── login/
│   │   │   └── page.tsx            # NextAuth sign-in page
│   │   ├── register/
│   │   │   └── page.tsx            # Sign-up page
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing (Ghost Content API)
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx        # Blog post detail
│   │   │   └── tag/
│   │   │       └── [tag]/
│   │   │           └── page.tsx    # Posts by tag
│   │   └── api/
│   │       ├── health/
│   │       │   └── route.ts        # Health check endpoint
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts    # NextAuth API route
│   │       └── revalidate/
│   │           └── route.ts        # Ghost webhook revalidation
│   └── middleware.ts               # Auth protection for /dashboard, /admin
├── public/
│   └── src/
│       └── img/
│           ├── logo.png            # (existing)
│           └── background.png      # (existing)
└── docs/                           # (existing specs/plans)
```

---

## Chunk 1: Docker Infrastructure + Next.js Scaffolding

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.gitignore`

**Context:** The workspace uses nvm for Node.js. Source it before any npm/npx commands:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
```

- [ ] **Step 1: Stop the existing nginx container (it's on port 2070)**

```bash
cd /home/pbieda/scripts/XtremePlugins && docker compose down
```

- [ ] **Step 2: Back up existing public/ assets**

```bash
cd /home/pbieda/scripts/XtremePlugins
mkdir -p _backup
cp -r public/src _backup/src
cp public/index.html _backup/index.html
```

- [ ] **Step 3: Initialize Next.js project**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
cd /home/pbieda/scripts/XtremePlugins
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --no-import-alias --yes
```

If it errors because directory is not empty, run in a temp dir and move files:
```bash
npx create-next-app@14 /tmp/xp-init --typescript --tailwind --eslint --app --src-dir --no-import-alias --yes
cp -rn /tmp/xp-init/* /home/pbieda/scripts/XtremePlugins/
cp /tmp/xp-init/.gitignore /home/pbieda/scripts/XtremePlugins/
cp /tmp/xp-init/.eslintrc.json /home/pbieda/scripts/XtremePlugins/
rm -rf /tmp/xp-init
```

- [ ] **Step 4: Restore image assets to public/**

```bash
cd /home/pbieda/scripts/XtremePlugins
mkdir -p public/src/img
cp _backup/src/img/* public/src/img/
```

- [ ] **Step 5: Install dependencies**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
cd /home/pbieda/scripts/XtremePlugins
npm install prisma @prisma/client @auth/prisma-adapter next-auth@4 bcryptjs @tryghost/content-api
npm install -D @types/bcryptjs @types/tryghost__content-api
```

- [ ] **Step 6: Verify project builds**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
cd /home/pbieda/scripts/XtremePlugins
npx next build
```

Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: initialize Next.js 14 project with dependencies"
```

---

### Task 2: Environment configuration

**Files:**
- Create: `.env.example`, `.env`

- [ ] **Step 1: Create .env.example**

```env
# Database
DATABASE_URL=postgresql://xp:xp@localhost:2073/xtremeplugins

# NextAuth
NEXTAUTH_SECRET=change-me-to-random-secret
NEXTAUTH_URL=http://localhost:2070

# OAuth (leave blank to disable)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Stripe (Phase 2)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Ghost
GHOST_URL=http://localhost:2072
GHOST_CONTENT_API_KEY=
GHOST_ADMIN_API_KEY=

# GitHub plugin delivery (Phase 2)
GITHUB_PAT=

# Revalidation
REVALIDATION_SECRET=change-me-to-random-secret
```

- [ ] **Step 2: Create .env (local copy with generated secrets)**

Copy `.env.example` to `.env`. Generate a random NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

Set `DATABASE_URL=postgresql://xp:xp@localhost:2073/xtremeplugins` for local dev outside Docker.

For Docker internal use, the web service will override to `postgresql://xp:xp@postgres:5432/xtremeplugins`.

- [ ] **Step 3: Ensure .env is in .gitignore**

Verify `.gitignore` includes `.env` (but NOT `.env.example`).

- [ ] **Step 4: Commit**

```bash
git add .env.example .gitignore && git commit -m "feat: add environment configuration template"
```

---

### Task 3: Docker Compose + nginx

**Files:**
- Create: `docker-compose.yml`, `Dockerfile`, `.dockerignore`, `nginx/default.conf`

- [ ] **Step 1: Create .dockerignore**

```
node_modules
.next
.git
_backup
docs
```

- [ ] **Step 2: Create Dockerfile (multi-stage Next.js build)**

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

- [ ] **Step 3: Update next.config.js for standalone output**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

module.exports = nextConfig;
```

- [ ] **Step 4: Create nginx/default.conf**

```nginx
upstream nextjs {
    server web:3000;
}

upstream ghost {
    server ghost:2368;
}

server {
    listen 80;
    server_name localhost;

    # Ghost admin
    location /ghost/ {
        proxy_pass http://ghost;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Ghost content API (used by Ghost admin panel)
    location /content/ {
        proxy_pass http://ghost;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Ghost members API (used by Ghost admin)
    location /members/ {
        proxy_pass http://ghost;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Everything else -> Next.js
    location / {
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location /_next/static/ {
        proxy_pass http://nextjs;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /src/img/ {
        proxy_pass http://nextjs;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

- [ ] **Step 5: Create docker-compose.yml**

```yaml
services:
  nginx:
    image: nginx:alpine
    container_name: xp-nginx
    ports:
      - "2070:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      web:
        condition: service_healthy
      ghost:
        condition: service_healthy
    restart: unless-stopped

  web:
    build: .
    container_name: xp-web
    ports:
      - "2071:3000"
    environment:
      - DATABASE_URL=postgresql://xp:xp@postgres:5432/xtremeplugins
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:2070}
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID:-}
      - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET:-}
      - GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID:-}
      - GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET:-}
      - GHOST_URL=http://ghost:2368
      - GHOST_CONTENT_API_KEY=${GHOST_CONTENT_API_KEY:-}
      - REVALIDATION_SECRET=${REVALIDATION_SECRET:-}
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

  ghost:
    image: ghost:5-alpine
    container_name: xp-ghost
    ports:
      - "2072:2368"
    environment:
      - url=http://localhost:2070
      - database__client=mysql
      - database__connection__host=ghost-db
      - database__connection__user=ghost
      - database__connection__password=ghostpass
      - database__connection__database=ghost
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:2368/ghost/api/admin/site/"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    depends_on:
      ghost-db:
        condition: service_healthy
    volumes:
      - ghost_content:/var/lib/ghost/content
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    container_name: xp-postgres
    ports:
      - "2073:5432"
    environment:
      - POSTGRES_USER=xp
      - POSTGRES_PASSWORD=xp
      - POSTGRES_DB=xtremeplugins
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U xp -d xtremeplugins"]
      interval: 5s
      timeout: 3s
      retries: 5
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

  ghost-db:
    image: mysql:8
    container_name: xp-ghost-db
    environment:
      - MYSQL_ROOT_PASSWORD=ghostroot
      - MYSQL_DATABASE=ghost
      - MYSQL_USER=ghost
      - MYSQL_PASSWORD=ghostpass
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "ghost", "-pghostpass"]
      interval: 5s
      timeout: 3s
      retries: 5
    volumes:
      - ghostdata:/var/lib/mysql
    restart: unless-stopped

volumes:
  pgdata:
  ghostdata:
  ghost_content:
```

- [ ] **Step 6: Commit**

```bash
git add docker-compose.yml Dockerfile .dockerignore nginx/ && git commit -m "feat: add Docker Compose infrastructure (5 services)"
```

---

### Task 4: Health check API route

**Files:**
- Create: `src/app/api/health/route.ts`

- [ ] **Step 1: Create health endpoint**

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/health/ && git commit -m "feat: add /api/health endpoint for Docker health checks"
```

---

### Task 5: Prisma schema + migrations

**Files:**
- Create: `prisma/schema.prisma`, `src/lib/prisma.ts`

- [ ] **Step 1: Initialize Prisma**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
cd /home/pbieda/scripts/XtremePlugins
npx prisma init
```

- [ ] **Step 2: Write the full Prisma schema**

Replace `prisma/schema.prisma` with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

enum Platform {
  WOOCOMMERCE
  SHOPIFY
  WORDPRESS
}

enum LicenseStatus {
  ACTIVE
  EXPIRED
  REVOKED
}

enum PurchaseType {
  ONE_TIME
  SUBSCRIPTION
}

// ── NextAuth models ──

model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ── Application models ──

model User {
  id               String    @id @default(uuid())
  email            String    @unique
  name             String?
  passwordHash     String?
  emailVerified    DateTime?
  role             Role      @default(USER)
  image            String?
  stripeCustomerId String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  accounts  Account[]
  sessions  Session[]
  licenses  License[]
  purchases Purchase[]
  downloads Download[]
}

model Plugin {
  id               String     @id @default(uuid())
  name             String
  slug             String     @unique
  description      String     @db.Text
  shortDescription String
  price            Decimal    @db.Decimal(10, 2)
  githubRepo       String
  githubReleaseTag String     @default("v1.0.0")
  platforms        Platform[]
  category         String
  features         String[]
  screenshots      String[]
  isActive         Boolean    @default(true)
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt

  tiers     SubscriptionTier[]
  licenses  License[]
  downloads Download[]
}

model SubscriptionTier {
  id                   String   @id @default(uuid())
  name                 String
  slug                 String   @unique
  stripePriceIdMonthly String
  stripePriceIdAnnual  String?
  monthlyPrice         Decimal  @db.Decimal(10, 2)
  maxSites             Int
  updateMonths         Int      @default(0)
  supportLevel         String
  features             String[]
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt

  plugins  Plugin[]
  licenses License[]
}

model License {
  id                   String        @id @default(uuid())
  userId               String
  pluginId             String
  subscriptionTierId   String
  licenseKey           String        @unique @default(uuid())
  status               LicenseStatus @default(ACTIVE)
  activatedSites       String[]
  maxSites             Int
  stripeSubscriptionId String?
  expiresAt            DateTime?
  createdAt            DateTime      @default(now())
  updatedAt            DateTime      @updatedAt

  user             User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  plugin           Plugin           @relation(fields: [pluginId], references: [id])
  subscriptionTier SubscriptionTier @relation(fields: [subscriptionTierId], references: [id])
  purchases        Purchase[]
  downloads        Download[]
}

model Purchase {
  id              String       @id @default(uuid())
  userId          String
  licenseId       String
  stripePaymentId String
  amount          Decimal      @db.Decimal(10, 2)
  currency        String       @default("usd")
  type            PurchaseType @default(SUBSCRIPTION)
  createdAt       DateTime     @default(now())

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  license License @relation(fields: [licenseId], references: [id])
}

model Download {
  id           String   @id @default(uuid())
  userId       String
  pluginId     String
  licenseId    String
  version      String
  ipAddress    String
  downloadedAt DateTime @default(now())

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  plugin  Plugin  @relation(fields: [pluginId], references: [id])
  license License @relation(fields: [licenseId], references: [id])
}
```

- [ ] **Step 3: Create Prisma client singleton**

Create `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

- [ ] **Step 4: Generate Prisma client and run migration against local DB**

Start just PostgreSQL for migration:

```bash
cd /home/pbieda/scripts/XtremePlugins
docker compose up -d postgres
sleep 3
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
DATABASE_URL=postgresql://xp:xp@localhost:2073/xtremeplugins npx prisma migrate dev --name init
```

Expected: Migration creates all tables successfully.

- [ ] **Step 5: Commit**

```bash
git add prisma/ src/lib/prisma.ts && git commit -m "feat: add Prisma schema with all models and initial migration"
```

---

### Task 6: Database seed script

**Files:**
- Create: `prisma/seed.ts`
- Modify: `package.json` (add prisma.seed config)

- [ ] **Step 1: Create seed script**

Create `prisma/seed.ts`:

```typescript
import { PrismaClient, Role, Platform } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@xtremeplugins.com' },
    update: {},
    create: {
      email: 'admin@xtremeplugins.com',
      name: 'Admin',
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log('Admin user:', admin.email);

  // Plugins
  const checkoutBooster = await prisma.plugin.upsert({
    where: { slug: 'checkout-booster-pro' },
    update: {},
    create: {
      name: 'Checkout Booster Pro',
      slug: 'checkout-booster-pro',
      description: 'Optimize your checkout flow for maximum conversions. Removes friction, reduces cart abandonment, and increases completed purchases.',
      shortDescription: 'Optimized for performance & speed',
      price: 49,
      githubRepo: 'poorman/checkout-booster-pro',
      platforms: [Platform.WOOCOMMERCE, Platform.WORDPRESS],
      category: 'performance',
      features: ['One-click checkout', 'Smart field validation', 'Progress indicator', 'Mobile optimized'],
      screenshots: [],
      isActive: true,
    },
  });

  const urgencyCountdown = await prisma.plugin.upsert({
    where: { slug: 'urgency-countdown' },
    update: {},
    create: {
      name: 'Urgency Countdown',
      slug: 'urgency-countdown',
      description: 'Create urgency with countdown timers on product pages and checkout. Proven to boost conversions by up to 30%.',
      shortDescription: 'Increase sales with smart UX plugins',
      price: 39,
      githubRepo: 'poorman/urgency-countdown',
      platforms: [Platform.WOOCOMMERCE, Platform.SHOPIFY, Platform.WORDPRESS],
      category: 'conversion',
      features: ['Customizable timers', 'Evergreen mode', 'A/B testing', 'Analytics dashboard'],
      screenshots: [],
      isActive: true,
    },
  });

  const stickyCart = await prisma.plugin.upsert({
    where: { slug: 'sticky-add-to-cart-pro' },
    update: {},
    create: {
      name: 'Sticky Add-to-Cart Pro',
      slug: 'sticky-add-to-cart-pro',
      description: 'Keep the add-to-cart button always visible as users scroll. Reduces friction and increases add-to-cart rates.',
      shortDescription: 'Install in seconds, no coding needed',
      price: 29,
      githubRepo: 'poorman/sticky-add-to-cart-pro',
      platforms: [Platform.WOOCOMMERCE, Platform.SHOPIFY],
      category: 'conversion',
      features: ['Sticky bar', 'Quick view', 'Quantity selector', 'Custom styling'],
      screenshots: [],
      isActive: true,
    },
  });

  // Subscription tiers
  const starter = await prisma.subscriptionTier.upsert({
    where: { slug: 'starter' },
    update: {},
    create: {
      name: 'Starter',
      slug: 'starter',
      stripePriceIdMonthly: 'price_starter_monthly_placeholder',
      monthlyPrice: 29,
      maxSites: 1,
      updateMonths: 6,
      supportLevel: 'community',
      features: ['1 plugin license', '1 site activation', '6 months updates', 'Community support'],
      plugins: { connect: [{ id: stickyCart.id }] },
    },
  });

  const pro = await prisma.subscriptionTier.upsert({
    where: { slug: 'pro' },
    update: {},
    create: {
      name: 'Pro',
      slug: 'pro',
      stripePriceIdMonthly: 'price_pro_monthly_placeholder',
      monthlyPrice: 79,
      maxSites: 5,
      updateMonths: 12,
      supportLevel: 'priority',
      features: ['3 plugin licenses', '5 site activations', '12 months updates', 'Priority support', 'Early access features'],
      plugins: { connect: [{ id: stickyCart.id }, { id: urgencyCountdown.id }, { id: checkoutBooster.id }] },
    },
  });

  const agency = await prisma.subscriptionTier.upsert({
    where: { slug: 'agency' },
    update: {},
    create: {
      name: 'Agency',
      slug: 'agency',
      stripePriceIdMonthly: 'price_agency_monthly_placeholder',
      monthlyPrice: 199,
      maxSites: 0, // unlimited
      updateMonths: 0, // lifetime
      supportLevel: 'dedicated',
      features: ['All plugins included', 'Unlimited activations', 'Lifetime updates', 'Dedicated support', 'White-label option', 'Custom integrations'],
      plugins: { connect: [{ id: stickyCart.id }, { id: urgencyCountdown.id }, { id: checkoutBooster.id }] },
    },
  });

  console.log('Tiers:', starter.name, pro.name, agency.name);
  console.log('Plugins:', checkoutBooster.name, urgencyCountdown.name, stickyCart.name);
  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 2: Add seed config to package.json**

Add to `package.json`:

```json
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```

Install tsx as dev dependency:

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
npm install -D tsx
```

- [ ] **Step 3: Run the seed**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
DATABASE_URL=postgresql://xp:xp@localhost:2073/xtremeplugins npx prisma db seed
```

Expected: Outputs admin email, tier names, plugin names, "Seed complete."

- [ ] **Step 4: Commit**

```bash
git add prisma/seed.ts package.json package-lock.json && git commit -m "feat: add database seed script (admin, 3 plugins, 3 tiers)"
```

---

## Chunk 2: Authentication + Shared Components

### Task 7: NextAuth configuration

**Files:**
- Create: `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`

- [ ] **Step 1: Create auth config**

Create `src/lib/auth.ts`:

```typescript
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string; role: string }).id = token.id as string;
        (session.user as { id: string; role: string }).role = token.role as string;
      }
      return session;
    },
  },
};
```

- [ ] **Step 2: Create NextAuth API route**

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

- [ ] **Step 3: Create middleware for protected routes**

Create `src/middleware.ts`:

```typescript
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin routes require ADMIN role
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/auth.ts src/app/api/auth/ src/middleware.ts && git commit -m "feat: add NextAuth with credentials + OAuth providers + middleware"
```

---

### Task 8: Tailwind theme + global styles + fonts

**Files:**
- Create: `src/lib/fonts.ts`
- Modify: `tailwind.config.ts`, `src/app/globals.css`

- [ ] **Step 1: Create font config**

Create `src/lib/fonts.ts`:

```typescript
import { Exo_2, Orbitron } from 'next/font/google';

export const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
});
```

- [ ] **Step 2: Update tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-exo2)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
      colors: {
        cyan: {
          DEFAULT: '#00e5ff',
          dim: 'rgba(0, 229, 255, 0.6)',
        },
        magenta: {
          DEFAULT: '#e040fb',
        },
        purple: {
          deep: '#0d0021',
          mid: '#1a0040',
          DEFAULT: '#7c3aed',
        },
        gold: '#fbbf24',
        glass: {
          bg: 'rgba(255, 255, 255, 0.04)',
          border: 'rgba(120, 100, 255, 0.18)',
          'border-bright': 'rgba(120, 100, 255, 0.35)',
          shine: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: Write globals.css**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --cyan: #00e5ff;
  --magenta: #e040fb;
  --purple: #7c3aed;
  --purple-deep: #0d0021;
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(120, 100, 255, 0.18);
  --glass-border-bright: rgba(120, 100, 255, 0.35);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--purple-deep);
  color: rgba(255, 255, 255, 0.95);
  overflow-x: hidden;
}

/* Warp streaks animation */
@keyframes rotateStreaks {
  to { transform: rotate(360deg); }
}

@keyframes twinkle {
  0% { opacity: 0.15; }
  100% { opacity: 0.7; }
}

@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Glass card utility */
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.glass-hover:hover {
  border-color: var(--glass-border-bright);
  box-shadow: 0 0 40px rgba(120, 60, 255, 0.08);
}

/* Gradient text */
.text-gradient {
  background: linear-gradient(135deg, var(--cyan), var(--magenta));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/fonts.ts tailwind.config.ts src/app/globals.css && git commit -m "feat: add Tailwind theme, fonts, and global styles"
```

---

### Task 9: Shared components (Navbar, Footer, GlassCard, Button, WarpBackground)

**Files:**
- Create: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/GlassCard.tsx`, `src/components/Button.tsx`, `src/components/WarpBackground.tsx`

- [ ] **Step 1: Create WarpBackground component**

Create `src/components/WarpBackground.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';

export default function WarpBackground() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      const sz = Math.random() * 2 + 0.5;
      s.className = 'absolute rounded-full bg-white';
      s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;animation:twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;animation-delay:${Math.random() * 4}s;`;
      container.appendChild(s);
    }
    return () => { container.innerHTML = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ background: `url('/src/img/background.png') center center / cover no-repeat, radial-gradient(ellipse at 50% 40%, #1a0040 0%, #0d0021 50%, #050010 100%)` }}>
      {/* Streaks layer 1 */}
      <div
        className="absolute"
        style={{
          inset: '-50%',
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,229,255,0.04) 2deg, transparent 4deg, transparent 18deg, rgba(224,64,251,0.04) 20deg, transparent 22deg, transparent 42deg, rgba(180,80,255,0.04) 44deg, transparent 46deg, transparent 68deg, rgba(0,229,255,0.03) 70deg, transparent 72deg, transparent 95deg, rgba(224,64,251,0.04) 97deg, transparent 99deg, transparent 125deg, rgba(0,229,255,0.03) 127deg, transparent 129deg, transparent 156deg, rgba(180,80,255,0.04) 158deg, transparent 160deg, transparent 190deg, rgba(0,229,255,0.04) 192deg, transparent 194deg, transparent 226deg, rgba(224,64,251,0.03) 228deg, transparent 230deg, transparent 264deg, rgba(180,80,255,0.04) 266deg, transparent 268deg, transparent 300deg, rgba(0,229,255,0.04) 302deg, transparent 304deg, transparent 338deg, rgba(224,64,251,0.04) 340deg, transparent 342deg, transparent 360deg)',
          animation: 'rotateStreaks 120s linear infinite',
        }}
      />
      {/* Streaks layer 2 */}
      <div
        className="absolute"
        style={{
          inset: '-30%',
          background: 'conic-gradient(from 45deg at 50% 50%, transparent 0deg, rgba(0,229,255,0.07) 1deg, transparent 3deg, transparent 35deg, rgba(120,60,255,0.05) 36deg, transparent 38deg, transparent 78deg, rgba(224,64,251,0.07) 79deg, transparent 81deg, transparent 125deg, rgba(0,229,255,0.06) 126deg, transparent 128deg, transparent 175deg, rgba(120,60,255,0.07) 176deg, transparent 178deg, transparent 225deg, rgba(224,64,251,0.05) 226deg, transparent 228deg, transparent 278deg, rgba(0,229,255,0.07) 279deg, transparent 281deg, transparent 335deg, rgba(120,60,255,0.05) 336deg, transparent 338deg, transparent 360deg)',
          animation: 'rotateStreaks 90s linear infinite reverse',
        }}
      />
      {/* Center glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[650px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(100,40,200,0.28) 0%, rgba(60,20,160,0.12) 40%, transparent 70%)' }}
      />
      {/* Stars */}
      <div ref={starsRef} className="absolute inset-0" />
    </div>
  );
}
```

- [ ] **Step 2: Create GlassCard component**

Create `src/components/GlassCard.tsx`:

```tsx
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)] ${hover ? 'glass-hover transition-all duration-300 hover:-translate-y-1' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create Button component**

Create `src/components/Button.tsx`:

```tsx
import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  children: ReactNode;
  className?: string;
}

export default function Button({ variant = 'primary', href, children, className = '', ...props }: ButtonProps) {
  const base = 'inline-block font-body font-bold text-sm tracking-wide transition-all duration-300 rounded-lg';

  const variants = {
    primary: `${base} px-8 py-3.5 bg-gradient-to-br from-cyan to-indigo-500 text-white shadow-[0_4px_25px_rgba(0,229,255,0.25)] hover:shadow-[0_6px_35px_rgba(0,229,255,0.4)] hover:-translate-y-0.5`,
    outline: `${base} px-8 py-3.5 border border-glass-border-bright text-white/95 hover:bg-white/5 hover:border-purple/50`,
    ghost: `${base} px-4 py-2 text-white/60 hover:text-white`,
  };

  const cls = `${variants[variant]} ${className}`;

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }

  return <button className={cls} {...props}>{children}</button>;
}
```

- [ ] **Step 4: Create Navbar component**

Create `src/components/Navbar.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Button from './Button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Plugins', href: '/plugins' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 px-6 bg-purple-deep/70 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-14">
        <div className="flex items-center gap-7">
          <Link href="/" className="font-display font-black text-lg text-white tracking-wide">
            XP
          </Link>
          <ul className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Dashboard
              </Link>
              {session.user && (session.user as { role: string }).role === 'ADMIN' && (
                <Link href="/admin" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Log In
              </Link>
              <Button href="/register" variant="primary" className="!py-2 !px-5 !text-xs">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 5: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import Link from 'next/link';
import Image from 'next/image';

const mainLinks = [
  { label: 'Plugins', href: '/plugins' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '#faq' },
];

const secondaryLinks = [
  { label: 'Support', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-5">
      <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="flex items-center gap-3">
            <Image src="/src/img/logo.png" alt="XtremePlugins" width={140} height={48} className="h-12 w-auto drop-shadow-[0_0_20px_rgba(0,229,255,0.15)]" />
          </div>
          <div className="flex flex-col gap-3 md:text-right">
            <div className="flex flex-wrap gap-6 md:justify-end">
              {mainLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-6 md:justify-end">
              {secondaryLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-5 border-t border-white/[0.04] font-display text-[0.7rem] text-white/20 tracking-widest">
          &copy; 2026 XtremePlugins. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ && git commit -m "feat: add shared components (Navbar, Footer, GlassCard, Button, WarpBackground)"
```

---

### Task 10: Root layout + NextAuth session provider

**Files:**
- Create: `src/components/Providers.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create session provider wrapper**

Create `src/components/Providers.tsx`:

```tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

- [ ] **Step 2: Write root layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { exo2, orbitron } from '@/lib/fonts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WarpBackground from '@/components/WarpBackground';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'XtremePlugins — Premium Freemium Plugins for WooCommerce, Shopify & WordPress',
  description: 'Supercharge your store with premium freemium plugins for WooCommerce, Shopify and WordPress. Used by 5,000+ store owners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      <body className="font-body min-h-screen">
        <Providers>
          <WarpBackground />
          <div className="relative z-[1]">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Providers.tsx src/app/layout.tsx && git commit -m "feat: add root layout with session provider, navbar, footer, background"
```

---

## Chunk 3: Pages (Landing, Auth, Blog)

### Task 11: Landing page (migrate from static HTML)

**Files:**
- Create: `src/app/page.tsx`, `src/components/PricingCard.tsx`

- [ ] **Step 1: Create PricingCard component**

Create `src/components/PricingCard.tsx`:

```tsx
import GlassCard from './GlassCard';
import Button from './Button';

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  features: string[];
  featured?: boolean;
  buttonLabel: string;
  href: string;
}

export default function PricingCard({ name, price, period, features, featured = false, buttonLabel, href }: PricingCardProps) {
  return (
    <GlassCard
      hover
      className={`p-9 text-center relative ${featured ? 'border-cyan/30 shadow-[0_4px_30px_rgba(0,0,0,0.25),0_0_60px_rgba(0,229,255,0.08)]' : ''}`}
    >
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent" />
      )}
      <div className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-3">{name}</div>
      <div className="font-display text-4xl font-black text-gradient mb-2">${price}</div>
      <div className="text-xs text-white/60 mb-6">{period}</div>
      <ul className="text-left mb-7">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 py-1.5 text-sm text-white/60 border-b border-white/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_var(--cyan)] shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Button href={href} variant={featured ? 'primary' : 'outline'} className="w-full !py-3.5">
        {buttonLabel}
      </Button>
    </GlassCard>
  );
}
```

- [ ] **Step 2: Create landing page**

Replace `src/app/page.tsx` with the full landing page migrated from the static HTML. This is a large file — it ports the hero, social proof, features grid, pricing grid, and section dividers from `_backup/index.html` into React + Tailwind components:

```tsx
import Image from 'next/image';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import PricingCard from '@/components/PricingCard';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="text-center pt-12 pb-2">
        <div className="max-w-[1100px] mx-auto px-6">
          <Image
            src="/src/img/logo.png"
            alt="XP — Xtreme Plugins"
            width={480}
            height={240}
            priority
            className="mx-auto w-[min(480px,85vw)] h-auto drop-shadow-[0_0_60px_rgba(0,229,255,0.2)] animate-[fadeUp_1.2s_cubic-bezier(0.16,1,0.3,1)_both]"
          />
          <h1 className="font-body text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-tight mt-5 mb-7 max-w-[550px] mx-auto animate-[fadeUp_1s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
            Supercharge Your Store with Xtreme Plugins
          </h1>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-12 animate-[fadeUp_1s_cubic-bezier(0.16,1,0.3,1)_0.35s_both]">
            <Button href="/plugins">Get Plugins</Button>
            <Button href="#" variant="outline">View Demo</Button>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="max-w-[1100px] mx-auto px-6 mb-16">
        <GlassCard className="max-w-[640px] mx-auto p-7 text-center animate-[fadeUp_1s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]">
          <h3 className="text-lg font-semibold mb-2">Used by 5,000+ store owners</h3>
          <div className="flex items-center justify-center gap-1 mb-4">
            <span className="text-sm font-bold text-gold mr-1.5">4.9</span>
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-gold text-base">&#9733;</span>
            ))}
            <span className="text-sm text-white/60 ml-2">5/5 &middot; 1,200+ reviews</span>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {['WooCommerce', 'Shopify', 'WordPress'].map((p) => (
              <div key={p} className="flex items-center gap-2 px-5 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm font-bold">
                {p}
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* DIVIDER */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-purple/30 to-transparent" />
      </div>

      {/* FEATURES */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <h2 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-10">
          Powerful Plugins for Your Store
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Blazing Fast', desc: 'Optimized for performance & speed.', name: 'Checkout Booster Pro', price: '$49' },
            { title: 'Conversion Boost', desc: 'Increase sales with smart UX plugins', name: 'Urgency Countdown', price: '$39' },
            { title: 'Plug & Play', desc: 'Install in seconds, no coding needed.', name: 'Sticky Add-to-Cart Pro', price: '$29' },
          ].map((card) => (
            <GlassCard key={card.name} hover className="p-6 flex flex-col">
              <h4 className="font-body text-lg font-bold italic mb-1">{card.title}</h4>
              <p className="text-sm text-white/60 mb-4">{card.desc}</p>
              <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-purple-deep/80 to-purple-mid/60 border border-glass-border mb-4" />
              <p className="text-xs font-semibold text-white/60 mb-0.5">{card.name}</p>
              <p className="font-display text-2xl font-bold mb-3">{card.price}</p>
              <Button href="/pricing" className="self-start mt-auto">Buy Now</Button>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      </div>

      {/* PRICING */}
      <section className="max-w-[1100px] mx-auto px-6 py-16 pb-20">
        <h2 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-10">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCard
            name="Starter"
            price={29}
            period="/mo"
            features={['1 plugin license', '1 site activation', '6 months updates', 'Community support']}
            buttonLabel="Get Started"
            href="/register"
          />
          <PricingCard
            name="Pro"
            price={79}
            period="/mo"
            features={['3 plugin licenses', '5 site activations', '12 months updates', 'Priority support', 'Early access features']}
            featured
            buttonLabel="Get Pro"
            href="/register"
          />
          <PricingCard
            name="Agency"
            price={199}
            period="/mo"
            features={['All plugins included', 'Unlimited activations', 'Lifetime updates', 'Dedicated support', 'White-label option', 'Custom integrations']}
            buttonLabel="Go Agency"
            href="/register"
          />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx src/components/PricingCard.tsx && git commit -m "feat: migrate landing page to Next.js with React components"
```

---

### Task 12: Login + Register pages

**Files:**
- Create: `src/app/login/page.tsx`, `src/app/register/page.tsx`, `src/app/api/register/route.ts`

- [ ] **Step 1: Create login page**

Create `src/app/login/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', { email, password, redirect: false });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-md p-10">
        <h1 className="font-display text-2xl font-bold text-center mb-8">Log In</h1>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-glass-border rounded-lg text-white placeholder-white/30 outline-none focus:border-cyan/40 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-glass-border rounded-lg text-white placeholder-white/30 outline-none focus:border-cyan/40 transition"
          />
          <Button type="submit" disabled={loading} className="w-full !py-3.5 mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-xs text-white/40 bg-purple-deep">or continue with</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="flex-1 py-3 glass rounded-lg text-sm font-semibold text-white/80 hover:bg-white/[0.06] transition"
          >
            Google
          </button>
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="flex-1 py-3 glass rounded-lg text-sm font-semibold text-white/80 hover:bg-white/[0.06] transition"
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-white/50 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cyan hover:underline">Sign up</Link>
        </p>
      </GlassCard>
    </div>
  );
}
```

- [ ] **Step 2: Create register API route**

Create `src/app/api/register/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

- [ ] **Step 3: Create register page**

Create `src/app/register/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Registration failed');
      setLoading(false);
      return;
    }

    // Auto-login after registration
    await signIn('credentials', { email, password, callbackUrl: '/dashboard' });
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-md p-10">
        <h1 className="font-display text-2xl font-bold text-center mb-8">Create Account</h1>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.04] border border-glass-border rounded-lg text-white placeholder-white/30 outline-none focus:border-cyan/40 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-glass-border rounded-lg text-white placeholder-white/30 outline-none focus:border-cyan/40 transition"
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-3 bg-white/[0.04] border border-glass-border rounded-lg text-white placeholder-white/30 outline-none focus:border-cyan/40 transition"
          />
          <Button type="submit" disabled={loading} className="w-full !py-3.5 mt-2">
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-xs text-white/40 bg-purple-deep">or continue with</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="flex-1 py-3 glass rounded-lg text-sm font-semibold text-white/80 hover:bg-white/[0.06] transition"
          >
            Google
          </button>
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="flex-1 py-3 glass rounded-lg text-sm font-semibold text-white/80 hover:bg-white/[0.06] transition"
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-white/50 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-cyan hover:underline">Log in</Link>
        </p>
      </GlassCard>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/login/ src/app/register/ src/app/api/register/ && git commit -m "feat: add login and register pages with credentials + OAuth"
```

---

### Task 13: Ghost client + blog pages

**Files:**
- Create: `src/lib/ghost.ts`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/blog/tag/[tag]/page.tsx`, `src/components/BlogPostCard.tsx`, `src/app/api/revalidate/route.ts`

- [ ] **Step 1: Create Ghost client**

Create `src/lib/ghost.ts`:

```typescript
import GhostContentAPI from '@tryghost/content-api';

const ghost = new GhostContentAPI({
  url: process.env.GHOST_URL || 'http://localhost:2072',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0',
});

export async function getPosts(page = 1, limit = 10) {
  return ghost.posts.browse({
    limit,
    page,
    include: ['tags'],
    fields: ['id', 'title', 'slug', 'excerpt', 'feature_image', 'published_at', 'reading_time'],
  });
}

export async function getPost(slug: string) {
  return ghost.posts.read({ slug }, { include: ['tags'] });
}

export async function getPostsByTag(tag: string, page = 1, limit = 10) {
  return ghost.posts.browse({
    limit,
    page,
    filter: `tag:${tag}`,
    include: ['tags'],
    fields: ['id', 'title', 'slug', 'excerpt', 'feature_image', 'published_at', 'reading_time'],
  });
}
```

- [ ] **Step 2: Create BlogPostCard component**

Create `src/components/BlogPostCard.tsx`:

```tsx
import Link from 'next/link';
import GlassCard from './GlassCard';

interface BlogPostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
}

export default function BlogPostCard({ title, slug, excerpt, publishedAt, readingTime }: BlogPostCardProps) {
  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${slug}`}>
      <GlassCard hover className="p-6 h-full flex flex-col">
        <div className="text-xs text-white/40 mb-2">
          {date} &middot; {readingTime} min read
        </div>
        <h3 className="text-lg font-bold mb-2 leading-snug">{title}</h3>
        <p className="text-sm text-white/60 line-clamp-3">{excerpt}</p>
      </GlassCard>
    </Link>
  );
}
```

- [ ] **Step 3: Create blog listing page**

Create `src/app/blog/page.tsx`:

```tsx
import { getPosts } from '@/lib/ghost';
import BlogPostCard from '@/components/BlogPostCard';

export const revalidate = 3600;

export const metadata = {
  title: 'Blog — XtremePlugins',
  description: 'Tips, guides, and insights for WooCommerce, Shopify, and WordPress store owners.',
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];

  try {
    posts = await getPosts();
  } catch {
    // Ghost not configured yet — show empty state
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-10">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-center text-white/50">No posts yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              title={post.title ?? ''}
              slug={post.slug}
              excerpt={post.excerpt ?? ''}
              publishedAt={post.published_at ?? ''}
              readingTime={(post as { reading_time?: number }).reading_time ?? 5}
            />
          ))}
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Create blog post detail page**

Create `src/app/blog/[slug]/page.tsx`:

```tsx
import { getPost, getPosts } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);
    return {
      title: `${post.title} — XtremePlugins Blog`,
      description: post.excerpt ?? '',
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-[760px] mx-auto px-6 py-16">
      <div className="text-xs text-white/40 mb-3">
        {post.published_at && new Date(post.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      <h1 className="font-body text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-tight mb-8">
        {post.title}
      </h1>
      {post.html && (
        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-body prose-a:text-cyan"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mt-10 flex-wrap">
          {post.tags.map((tag) => (
            <a
              key={tag.id}
              href={`/blog/tag/${tag.slug}`}
              className="px-3 py-1 text-xs glass rounded-full text-white/60 hover:text-white transition"
            >
              #{tag.name}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
```

- [ ] **Step 5: Create tag filter page**

Create `src/app/blog/tag/[tag]/page.tsx`:

```tsx
import { getPostsByTag } from '@/lib/ghost';
import BlogPostCard from '@/components/BlogPostCard';

export const revalidate = 3600;

export default async function TagPage({ params }: { params: { tag: string } }) {
  let posts: Awaited<ReturnType<typeof getPostsByTag>> = [];

  try {
    posts = await getPostsByTag(params.tag);
  } catch {
    // Ghost not configured
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-10">
        Posts tagged &ldquo;{params.tag}&rdquo;
      </h1>
      {posts.length === 0 ? (
        <p className="text-center text-white/50">No posts found for this tag.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              title={post.title ?? ''}
              slug={post.slug}
              excerpt={post.excerpt ?? ''}
              publishedAt={post.published_at ?? ''}
              readingTime={(post as { reading_time?: number }).reading_time ?? 5}
            />
          ))}
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 6: Create revalidation webhook endpoint**

Create `src/app/api/revalidate/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  // Ghost SDK doesn't use Next.js fetch with tags, so we use path-based revalidation
  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/blog/tag/[tag]', 'page');

  return NextResponse.json({ revalidated: true, paths: ['/blog', '/blog/[slug]', '/blog/tag/[tag]'] });
}
```

- [ ] **Step 7: Install Tailwind typography plugin for blog prose styling**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
npm install @tailwindcss/typography
```

Add to `tailwind.config.ts` plugins:

```typescript
plugins: [require('@tailwindcss/typography')],
```

- [ ] **Step 8: Commit**

```bash
git add src/lib/ghost.ts src/app/blog/ src/components/BlogPostCard.tsx src/app/api/revalidate/ tailwind.config.ts package.json package-lock.json && git commit -m "feat: add Ghost blog integration with ISR and revalidation webhook"
```

---

### Task 14: Dashboard placeholder + build verification

**Files:**
- Create: `src/app/dashboard/page.tsx`

- [ ] **Step 1: Create dashboard placeholder**

Create `src/app/dashboard/page.tsx`:

```tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import GlassCard from '@/components/GlassCard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-2xl font-bold mb-6">Dashboard</h1>
      <GlassCard className="p-8">
        <p className="text-white/60">
          Welcome, {session.user?.name || session.user?.email}. Your licenses and downloads will appear here in Phase 2.
        </p>
      </GlassCard>
    </section>
  );
}
```

- [ ] **Step 2: Build the project to verify everything compiles**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
cd /home/pbieda/scripts/XtremePlugins
npx next build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/ && git commit -m "feat: add dashboard placeholder page (Phase 2 content)"
```

---

### Task 15: Docker full stack test

- [ ] **Step 1: Build and start all services**

```bash
cd /home/pbieda/scripts/XtremePlugins
docker compose up -d --build
```

- [ ] **Step 2: Wait for health checks to pass**

```bash
docker compose ps
```

Expected: All 5 services showing "healthy" status. Ghost may take 30-60 seconds.

- [ ] **Step 3: Run Prisma migration from host (Prisma CLI is not in the production Docker image)**

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
cd /home/pbieda/scripts/XtremePlugins
DATABASE_URL=postgresql://xp:xp@localhost:2073/xtremeplugins npx prisma migrate deploy
DATABASE_URL=postgresql://xp:xp@localhost:2073/xtremeplugins npx prisma db seed
```

Expected: Migration applies, seed runs successfully. (PostgreSQL is exposed on host port 2073.)

- [ ] **Step 4: Verify all endpoints**

```bash
# Health check
curl -s http://localhost:2070/api/health | jq .

# Landing page
curl -s -o /dev/null -w "%{http_code}" http://localhost:2070/

# Ghost admin
curl -s -o /dev/null -w "%{http_code}" http://localhost:2070/ghost/

# Blog page
curl -s -o /dev/null -w "%{http_code}" http://localhost:2070/blog

# Login page
curl -s -o /dev/null -w "%{http_code}" http://localhost:2070/login
```

Expected: All return 200.

- [ ] **Step 5: Configure Ghost admin**

Open `http://localhost:2070/ghost/` in browser. Complete Ghost setup wizard:
1. Create Ghost admin account
2. Go to Settings → Integrations → Add custom integration named "XtremePlugins"
3. Copy the **Content API Key** → paste into `.env` as `GHOST_CONTENT_API_KEY`
4. Set up webhook: Settings → Integrations → XtremePlugins → Add Webhook
   - Event: "Post published"
   - Target URL: `http://web:3000/api/revalidate?secret=YOUR_REVALIDATION_SECRET&tag=blog`

- [ ] **Step 6: Publish the first blog article**

In Ghost admin (`http://localhost:2070/ghost/`):
1. Click "New post"
2. Paste the article content: "The Hidden Cost of a Slow WooCommerce Store (And How to Fix It in 2026)"
3. Set the publish date to 2025 as requested
4. Add tags: "WooCommerce", "Performance", "Optimization"
5. Publish

- [ ] **Step 7: Rebuild web container with Ghost API key**

After adding `GHOST_CONTENT_API_KEY` to `.env`:

```bash
docker compose up -d --build web
```

- [ ] **Step 8: Verify blog renders the article**

```bash
curl -s http://localhost:2070/blog | grep -o "Hidden Cost"
```

Expected: Finds "Hidden Cost" in the HTML output.

- [ ] **Step 9: Commit final state**

```bash
git add -A && git commit -m "feat: Phase 1 complete — full Docker stack with auth, landing page, blog"
```

---

## Summary

| Task | What it builds |
|------|---------------|
| 1 | Next.js project initialization |
| 2 | Environment config (.env) |
| 3 | Docker Compose (5 services) + nginx reverse proxy |
| 4 | Health check API |
| 5 | Prisma schema + migration |
| 6 | Database seed (admin, plugins, tiers) |
| 7 | NextAuth (credentials + OAuth + middleware) |
| 8 | Tailwind theme + fonts + globals |
| 9 | Shared components (Navbar, Footer, GlassCard, Button, WarpBackground) |
| 10 | Root layout with providers |
| 11 | Landing page (React migration) |
| 12 | Login + Register pages |
| 13 | Ghost blog integration + revalidation |
| 14 | Dashboard placeholder + build check |
| 15 | Full stack Docker test + Ghost setup + first article |

**After Phase 1:** The site runs on port 2070 with a working landing page, user auth (login/register), Ghost blog with the first article published, and the database seeded with admin + sample plugins + tiers. Ready for Phase 2 (Stripe + plugin delivery + dashboard).
