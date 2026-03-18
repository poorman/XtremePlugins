'use client';

import { useState } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export default function FAQPage() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-3">
        Frequently Asked Questions
      </h1>
      <p className="text-center text-white/60 max-w-[600px] mx-auto mb-12">
        Real answers to real questions. If you don&apos;t find what you need here,{' '}
        <Link href="/support" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          hit up our support team
        </Link>{' '}
        and we&apos;ll get back to you within a few hours.
      </p>

      {/* GENERAL */}
      <SectionHeading>General</SectionHeading>

      <FAQItem question="What exactly is XtremePlugins?">
        We build performance-focused plugins for WooCommerce, Shopify, and WordPress. Every plugin
        we ship is obsessively optimized for speed because slow stores lose sales &mdash; it&apos;s that
        simple. We wrote a whole breakdown on{' '}
        <Link
          href="/blog/the-hidden-cost-of-a-slow-woocommerce-store-and-how-to-fix-it-in-2026"
          className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors"
        >
          the hidden cost of a slow WooCommerce store
        </Link>{' '}
        if you want the full picture. Short version: every 100ms of load time costs you roughly 1%
        in conversions.
      </FAQItem>

      <FAQItem question="Who are your plugins built for?">
        Store owners, freelancers, and agencies who are done wrestling with bloated plugins that tank
        their PageSpeed scores. Whether you&apos;re running a single Shopify store or managing 40+
        client sites, we have a plan that fits. Check out our{' '}
        <Link href="/pricing" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          pricing page
        </Link>{' '}
        for the full breakdown.
      </FAQItem>

      <FAQItem question="Do your plugins actually make a difference, or is this marketing fluff?">
        Fair question. We put 12 popular WordPress plugins through real-world testing on production
        stores. Only 3 of them moved the needle on sales &mdash; and two of those were ours. You can read
        the full teardown in our article{' '}
        <Link
          href="/blog/i-tested-12-wordpress-plugins-only-3-actually-increased-sales"
          className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors"
        >
          &ldquo;I Tested 12 WordPress Plugins &mdash; Only 3 Actually Increased Sales&rdquo;
        </Link>.
        We don&apos;t gatekeep data.
      </FAQItem>

      {/* PLUGINS */}
      <SectionHeading>Plugins</SectionHeading>

      <FAQItem question="What plugins do you offer right now?">
        Three battle-tested plugins, each solving a specific conversion problem:
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-white/70">
          <li><strong className="text-white/90">Checkout Booster Pro ($49)</strong> &mdash; Streamlines
            the entire checkout flow. One-click upsells, smart field pre-fill, trust badges
            placed where they actually get seen.</li>
          <li><strong className="text-white/90">Urgency Countdown ($39)</strong> &mdash; Dynamic
            countdown timers that create genuine urgency without feeling spammy. Syncs
            across tabs so customers can&apos;t just refresh to reset.</li>
          <li><strong className="text-white/90">Sticky Add-to-Cart Pro ($29)</strong> &mdash; A
            persistent add-to-cart bar that follows the shopper as they scroll. Zero layout
            shift, minimal DOM footprint.</li>
        </ul>
        <span className="block mt-3">
          Browse everything on our{' '}
          <Link href="/plugins" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
            plugins page
          </Link>.
        </span>
      </FAQItem>

      <FAQItem question="Are these compatible with my theme?">
        Yes. All three plugins use non-destructive rendering &mdash; they hook into standard WooCommerce,
        Shopify, and WordPress template actions instead of overriding template files. We test against
        the top 30 themes by market share every release cycle. If you do hit a conflict, our support
        team will sort it out.
      </FAQItem>

      <FAQItem question="How are plugins delivered?">
        After purchase, you get instant access to your dashboard where you can download .zip files
        from our private repos. No waiting around for an email. Install the .zip through your
        WordPress or Shopify admin panel like any other plugin, enter your license key, and
        you&apos;re live.
      </FAQItem>

      <FAQItem question="Can I use one plugin on multiple sites?">
        That depends on your subscription tier. Starter covers 1 site, Pro gives you 5, and Agency
        is unlimited. We don&apos;t do per-site licensing tricks &mdash; if your plan allows it, just
        activate and go. Full tier comparison is on the{' '}
        <Link href="/pricing" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          pricing page
        </Link>.
      </FAQItem>

      {/* BILLING */}
      <SectionHeading>Billing &amp; Plans</SectionHeading>

      <FAQItem question="What subscription plans do you have?">
        Three tiers, all billed monthly with no annual lock-in:
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-white/70">
          <li><strong className="text-white/90">Starter &mdash; $29/mo</strong> &mdash; 1 plugin, 1 site license.
            Great for solo store owners who want to start with one tool and see results before
            committing further.</li>
          <li><strong className="text-white/90">Pro &mdash; $79/mo</strong> &mdash; 3 plugins, 5 site licenses.
            Built for growing brands that run multiple storefronts or want the full toolkit.</li>
          <li><strong className="text-white/90">Agency &mdash; $199/mo</strong> &mdash; All plugins, unlimited
            site licenses. For agencies and developers managing a portfolio of client stores.</li>
        </ul>
      </FAQItem>

      <FAQItem question="Can I cancel anytime?">
        Absolutely. No cancellation fees, no hoops to jump through. Cancel from your dashboard and
        your access continues through the end of your current billing period. We don&apos;t hold
        your data hostage either &mdash; you can export your plugin settings before you go.
      </FAQItem>

      <FAQItem question="Do you offer refunds?">
        We offer a 14-day money-back guarantee on all plans. If a plugin doesn&apos;t work the way you
        expected, reach out to{' '}
        <Link href="/support" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          support
        </Link>{' '}
        and we&apos;ll make it right. Full details are in our{' '}
        <Link href="/terms" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          terms of service
        </Link>.
      </FAQItem>

      <FAQItem question="What payment methods do you accept?">
        Visa, Mastercard, Amex, and PayPal. All payments are processed through Stripe with full
        PCI compliance. We never store your card details on our servers. See our{' '}
        <Link href="/privacy" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          privacy policy
        </Link>{' '}
        for the full data handling breakdown.
      </FAQItem>

      {/* TECHNICAL */}
      <SectionHeading>Technical</SectionHeading>

      <FAQItem question="Will your plugins slow down my site?">
        No &mdash; and this is the hill we die on. Every plugin is built with lazy-loaded assets, zero
        render-blocking scripts, and sub-50KB footprints. We benchmark every release against Core
        Web Vitals before shipping. Most of our users actually see their LCP improve after
        installing Checkout Booster Pro because it replaces heavier legacy checkout customizations.
      </FAQItem>

      <FAQItem question="What are the minimum requirements?">
        For WordPress/WooCommerce: WordPress 6.0+, WooCommerce 7.0+, PHP 8.0+. For Shopify:
        any store on the Basic plan or higher with Online Store 2.0 theme support. Detailed setup
        guides live in our{' '}
        <Link href="/docs" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          documentation
        </Link>.
      </FAQItem>

      <FAQItem question="How do updates work?">
        Updates ship through the same dashboard where you downloaded the plugin. WordPress users
        get automatic update notifications in their admin panel just like plugins from the official
        repo. Shopify apps update seamlessly. We push updates roughly twice a month &mdash; security
        patches go out immediately.
      </FAQItem>

      <FAQItem question="I'm stuck. Where do I get help?">
        Start with our{' '}
        <Link href="/docs" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          docs
        </Link>{' '}
        &mdash; they cover installation, configuration, and common gotchas. If that doesn&apos;t
        solve it, open a ticket through our{' '}
        <Link href="/support" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          support portal
        </Link>.
        Pro and Agency subscribers get priority response times (under 4 hours during business
        hours). We also post tips and deep dives on the{' '}
        <Link href="/blog" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          blog
        </Link>{' '}
        regularly.
      </FAQItem>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-body text-lg font-semibold text-cyan/90 uppercase tracking-widest mt-12 mb-4 first:mt-0">
      {children}
    </h2>
  );
}

function FAQItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <GlassCard className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-body text-[1.05rem] font-semibold leading-snug">
          {question}
        </span>
        <span
          className={`text-cyan text-xl flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-[0.95rem] leading-relaxed text-white/70">
          {children}
        </div>
      )}
    </GlassCard>
  );
}
