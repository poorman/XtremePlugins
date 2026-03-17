import { PrismaClient, Role, Platform } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

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
      maxSites: 0,
      updateMonths: 0,
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
