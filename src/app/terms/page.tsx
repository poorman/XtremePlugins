import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: 'Terms of Service — XtremePlugins',
  description:
    'The rules that govern your use of XtremePlugins products and services. Plain-language terms covering subscriptions, licensing, and your rights.',
};

export default function TermsPage() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-4">
        Terms of Service
      </h1>
      <p className="text-center text-white/40 text-sm mb-10">
        Effective March 1, 2026 &middot; XtremePlugins LLC
      </p>

      <GlassCard className="p-8 md:p-12 space-y-12 text-white/80 leading-relaxed">
        {/* ── 1. Agreement Overview ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            1. Agreement Overview
          </h2>
          <p>
            These terms form a binding contract between you and XtremePlugins LLC
            the moment you create an account, purchase a subscription, or install
            any of our plugins. If any part of this document rubs you the wrong
            way, the right move is to stop using our products before proceeding.
          </p>
          <p className="mt-3">
            We sell performance-focused plugins for WooCommerce, Shopify, and
            WordPress. Everything we offer ships through subscription plans you
            can explore on our{' '}
            <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              pricing page
            </Link>
            . The short version: you pay a recurring fee, you get access to our
            software and updates for the duration of that subscription. The long
            version is the rest of this page.
          </p>
        </div>

        {/* ── 2. Account Registration ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            2. Account Registration
          </h2>
          <p>
            You need an account to buy anything or access downloads. When you
            sign up, give us real information &mdash; a working email, your actual
            name, and honest billing details. One person, one account. Creating
            duplicates to exploit trial offers or work around license limits will
            get every associated account terminated without a refund.
          </p>
          <p className="mt-3">
            Your login credentials are your responsibility. If someone else gains
            access to your account because you shared your password or left a
            session open on a public machine, that is on you &mdash; not us. Let
            us know immediately through{' '}
            <Link href="/support" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              support
            </Link>{' '}
            if you suspect unauthorized access and we will lock things down.
          </p>
        </div>

        {/* ── 3. Subscription & Billing ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            3. Subscription &amp; Billing
          </h2>
          <p>We offer three subscription tiers:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
            <li>
              <strong className="text-white">Starter</strong> &mdash; $29 per month
            </li>
            <li>
              <strong className="text-white">Pro</strong> &mdash; $79 per month
            </li>
            <li>
              <strong className="text-white">Agency</strong> &mdash; $199 per month
            </li>
          </ul>
          <p className="mt-3">
            Full tier details and feature breakdowns live on our{' '}
            <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              pricing page
            </Link>
            .
          </p>

          <h3 className="font-body text-lg font-medium text-white mt-5 mb-2">
            Auto-Renewal
          </h3>
          <p>
            Every subscription renews automatically at the end of its billing
            cycle &mdash; monthly or annually, depending on what you chose at
            checkout. We charge the payment method on file the day renewal is due.
            You will receive an email reminder at least 7 days before each
            renewal.
          </p>

          <h3 className="font-body text-lg font-medium text-white mt-5 mb-2">
            Cancellation
          </h3>
          <p>
            Cancel whenever you want from your dashboard &mdash; no phone calls,
            no guilt trips. Your access continues until the current paid period
            runs out, then it stops. We do not delete your account data
            immediately; it sits dormant for 90 days in case you come back.
          </p>

          <h3 className="font-body text-lg font-medium text-white mt-5 mb-2">
            Refunds
          </h3>
          <p>
            You have 14 calendar days from the date of any charge to request a
            full refund. After that window closes, all payments are final. For
            annual plans, if you cancel partway through the year, we will issue a
            prorated credit for the unused whole months remaining. That credit
            applies toward future purchases &mdash; it does not get converted back
            to cash.
          </p>
        </div>

        {/* ── 4. License Terms ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            4. License Terms
          </h2>
          <p>
            When you subscribe, you receive a license key tied to your account.
            Each key activates on a set number of sites determined by your plan
            tier. One activation equals one unique domain (including staging and
            local development environments, which each count as a separate
            activation). Check our{' '}
            <Link href="/faq" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              FAQ
            </Link>{' '}
            for the exact site limits per tier.
          </p>
          <p className="mt-3">
            Your license is non-transferable. You cannot sell it, give it away,
            sublicense it, or bundle it into a product you resell. If you are an
            agency building sites for clients, the plugin stays under your
            account &mdash; ownership does not transfer to the client when the
            project wraps up unless they purchase their own subscription.
          </p>
        </div>

        {/* ── 5. Plugin Usage ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            5. Plugin Usage
          </h2>

          <h3 className="font-body text-lg font-medium text-white mt-2 mb-2">
            What You Can Do
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Install and run our plugins on any site that falls within your activation count</li>
            <li>Use them on client projects you build and manage, as long as each site is activated under your license</li>
            <li>Modify CSS or use our documented hooks and filters to customize behavior for your specific needs</li>
            <li>Reference our{' '}
              <Link href="/docs" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                documentation
              </Link>{' '}
              and reach out to{' '}
              <Link href="/support" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                support
              </Link>{' '}
              for implementation help
            </li>
          </ul>

          <h3 className="font-body text-lg font-medium text-white mt-5 mb-2">
            What You Cannot Do
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Redistribute, share, or upload our plugin files to any third-party site, marketplace, or repository</li>
            <li>Strip, bypass, or tamper with our licensing system</li>
            <li>Decompile, reverse engineer, or attempt to extract our source code beyond what applicable law explicitly permits</li>
            <li>Offer &ldquo;nulled&rdquo; or cracked copies &mdash; this triggers immediate termination and we will pursue legal remedies</li>
            <li>Resell the plugins under your own brand or as part of a competing product</li>
          </ul>
        </div>

        {/* ── 6. Intellectual Property ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            6. Intellectual Property
          </h2>
          <p>
            Every line of code, design element, logo, name, and piece of
            documentation produced by XtremePlugins LLC belongs to us. Your
            subscription buys you a limited right to use the software &mdash;
            nothing more. You do not acquire ownership of any intellectual
            property through your purchase.
          </p>
          <p className="mt-3">
            Content you create using our plugins (your store pages, product
            listings, custom configurations) remains entirely yours. We claim no
            rights over what you build with our tools.
          </p>
        </div>

        {/* ── 7. Limitation of Liability ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            7. Limitation of Liability
          </h2>
          <p>
            We build our plugins to be fast, stable, and reliable. That said,
            software has bugs and third-party platforms change without warning. We
            provide our products on an &ldquo;as-is&rdquo; basis and do not
            guarantee uninterrupted or error-free operation.
          </p>
          <p className="mt-3">
            Under no circumstances will XtremePlugins LLC be liable for indirect,
            incidental, or consequential damages &mdash; including but not limited
            to lost revenue, lost data, or downtime &mdash; arising from your use
            of our plugins. Our total financial liability to you, for any and all
            claims combined, is capped at the amount you paid us during the 12
            months immediately preceding the event that triggered the claim.
          </p>
          <p className="mt-3">
            Always test plugin updates on a staging environment before deploying
            to production. We strongly recommend maintaining current backups of
            your site at all times.
          </p>
        </div>

        {/* ── 8. Termination ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            8. Termination
          </h2>
          <p>
            You can close your account at any time through your dashboard or by
            contacting{' '}
            <Link href="/support" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              support
            </Link>
            .
          </p>
          <p className="mt-3">
            We reserve the right to suspend or terminate your account without
            advance notice if you violate these terms, abuse our systems, engage
            in fraudulent payment activity, or redistribute our software. In cases
            of termination for cause, no refund is owed regardless of where you
            are in the billing cycle.
          </p>
          <p className="mt-3">
            Upon termination, your license keys deactivate and you must remove our
            plugins from all sites. Sections of these terms that logically survive
            termination &mdash; intellectual property, limitation of liability,
            dispute resolution &mdash; remain in effect.
          </p>
        </div>

        {/* ── 9. Dispute Resolution ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            9. Dispute Resolution
          </h2>
          <p>
            If something goes sideways, talk to us first. Send an email to{' '}
            <a
              href="mailto:legal@xtremeplugins.com"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              legal@xtremeplugins.com
            </a>{' '}
            describing the issue in reasonable detail. We commit to responding
            within 10 business days and making a good-faith effort to resolve the
            matter informally.
          </p>
          <p className="mt-3">
            If we cannot reach a resolution within 30 days of your initial notice,
            either party may initiate binding arbitration administered under the
            rules of the American Arbitration Association. The arbitration will
            take place in Delaware, conducted in English, and the arbitrator&apos;s
            decision is final and enforceable in any court of competent
            jurisdiction. Both parties waive the right to participate in class
            actions or class-wide arbitration.
          </p>
          <p className="mt-3">
            These terms are governed by the laws of the State of Delaware, without
            regard to conflict-of-law principles.
          </p>
        </div>

        {/* ── 10. Updates to Terms ── */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            10. Updates to Terms
          </h2>
          <p>
            We may revise these terms as our business evolves. When we make
            changes that meaningfully affect your rights or obligations, we will
            notify you by email and post a notice on our site at least 14 days
            before the new terms take effect. Minor wording corrections or
            formatting tweaks may happen without notice.
          </p>
          <p className="mt-3">
            Continuing to use XtremePlugins products after updated terms go live
            means you accept those updates. If you disagree with a revision,
            cancel your subscription before the new effective date.
          </p>
        </div>

        {/* ── Contact & Links ── */}
        <div className="border-t border-white/10 pt-8">
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            Questions?
          </h2>
          <p>
            Reach out to{' '}
            <a
              href="mailto:legal@xtremeplugins.com"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              legal@xtremeplugins.com
            </a>{' '}
            for anything related to these terms. For product or billing help,
            visit our{' '}
            <Link href="/support" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              support center
            </Link>
            . You can also browse the{' '}
            <Link href="/faq" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              FAQ
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              privacy policy
            </Link>{' '}
            for related information.
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
