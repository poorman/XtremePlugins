import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: 'Privacy Policy — XtremePlugins',
  description:
    'How XtremePlugins handles your data. Plain-language privacy policy covering collection, usage, security, and your rights.',
};

export default function PrivacyPage() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-4">
        Privacy Policy
      </h1>
      <p className="text-center text-white/50 mb-12">Effective March 1, 2026</p>

      <GlassCard className="p-8 md:p-12 space-y-10 text-white/80 leading-relaxed">
        {/* Intro */}
        <div>
          <p>
            XtremePlugins LLC builds performance-focused plugins for WooCommerce, Shopify, and
            WordPress. We sell software subscriptions &mdash; not your personal information. This
            page spells out exactly what data we collect, why we collect it, and what control you
            have over it. No legal fog, no buried surprises.
          </p>
        </div>

        {/* What We Collect */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">What We Collect</h2>
          <p className="mb-3">
            We only gather information that directly supports your account, your purchases, or our
            ability to help you when something goes wrong.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-white">Account basics</strong> &mdash; your name, email
              address, and a hashed password when you create an account. We never store passwords in
              readable form.
            </li>
            <li>
              <strong className="text-white">Billing details</strong> &mdash; payment processing
              runs entirely through Stripe. We receive a truncated card reference (last four digits
              and expiry) so you can identify your payment method in your dashboard, but we never see
              or store your full card number.
            </li>
            <li>
              <strong className="text-white">Usage analytics</strong> &mdash; anonymous,
              aggregate-level data about which pages are visited, which plugin versions are active,
              and how features are used. This helps us decide what to build next and where to squash
              bugs.
            </li>
            <li>
              <strong className="text-white">Support tickets</strong> &mdash; when you reach out
              through our{' '}
              <Link href="/support" className="text-cyan-400 hover:underline">
                support portal
              </Link>
              , we keep the conversation history, any attachments you share, and basic metadata like
              timestamps and ticket status.
            </li>
          </ul>
        </div>

        {/* How We Use It */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">How We Use It</h2>
          <p className="mb-3">Everything we collect maps to a concrete purpose:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-white">Delivering the service</strong> &mdash; authenticating
              your account, generating license keys, pushing plugin updates, and verifying active
              subscriptions.
            </li>
            <li>
              <strong className="text-white">Processing payments</strong> &mdash; charging your
              subscription, issuing refunds, sending invoices, and handling failed-payment
              notifications.
            </li>
            <li>
              <strong className="text-white">Providing support</strong> &mdash; responding to your
              tickets, diagnosing plugin issues, and following up until problems are resolved. Check
              our{' '}
              <Link href="/faq" className="text-cyan-400 hover:underline">
                FAQ
              </Link>{' '}
              for quick answers before opening a ticket.
            </li>
            <li>
              <strong className="text-white">Improving our products</strong> &mdash; spotting
              patterns in anonymous usage data so we can prioritize roadmap items, optimize
              performance bottlenecks, and ship better{' '}
              <Link href="/docs" className="text-cyan-400 hover:underline">
                documentation
              </Link>
              .
            </li>
          </ul>
        </div>

        {/* What We Never Do */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">What We Never Do</h2>
          <p className="mb-3">
            Some lines we simply do not cross. These are non-negotiable, not &ldquo;subject to
            change.&rdquo;
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>We do not sell, rent, or trade your personal data to anyone, period.</li>
            <li>
              We do not share your information with advertising networks or data brokers.
            </li>
            <li>
              We do not track your browsing activity across other websites. Our analytics stay within
              the boundaries of xtremeplugins.com.
            </li>
            <li>
              We do not build behavioral profiles for ad targeting. We are a plugin company, not an
              ad company.
            </li>
          </ul>
        </div>

        {/* Cookies & Analytics */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">Cookies &amp; Analytics</h2>
          <p className="mb-3">
            We keep cookie usage minimal and intentional:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-white">Essential cookies</strong> &mdash; session tokens and
              CSRF protection. These are strictly necessary for the site to function and cannot be
              disabled.
            </li>
            <li>
              <strong className="text-white">Analytics (optional)</strong> &mdash; we use
              privacy-respecting, cookieless analytics tools that do not fingerprint visitors or
              collect personally identifiable information. You can opt out at any time through the
              cookie banner.
            </li>
          </ul>
          <p className="mt-3">
            We do not use tracking pixels, social-media widgets that phone home, or any third-party
            scripts whose primary job is surveillance.
          </p>
        </div>

        {/* Third-Party Services */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">Third-Party Services</h2>
          <p className="mb-3">
            A handful of external services touch your data in tightly scoped ways:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-white">Stripe</strong> &mdash; handles all payment
              processing. Stripe operates under its own PCI-DSS-compliant privacy policy. We send
              Stripe only what it needs to charge your subscription.
            </li>
            <li>
              <strong className="text-white">Ghost</strong> &mdash; powers our blog. If you
              subscribe to blog updates, Ghost stores your email address for that mailing list and
              nothing else.
            </li>
            <li>
              <strong className="text-white">Transactional email provider</strong> &mdash; sends
              purchase receipts, password resets, and subscription renewal reminders. These emails
              are purely functional; we do not send promotional blasts through this channel without
              your explicit opt-in.
            </li>
          </ul>
          <p className="mt-3">
            We vet every third party before integration and limit data sharing to the minimum each
            service requires to do its job.
          </p>
        </div>

        {/* Data Storage & Security */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            Data Storage &amp; Security
          </h2>
          <p className="mb-3">
            Keeping your data safe is not a marketing bullet point for us &mdash; it is an
            operational baseline.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>All data is encrypted at rest using AES-256.</li>
            <li>
              Every connection to our servers is encrypted in transit via HTTPS/TLS. There are no
              plaintext fallbacks.
            </li>
            <li>
              Internal access to customer data is restricted by role-based controls. Engineers cannot
              casually browse account records.
            </li>
            <li>
              We maintain regular, encrypted backups stored in a geographically separate location
              from primary infrastructure.
            </li>
            <li>
              Passwords are hashed with bcrypt using per-user salts. Even if our database were
              somehow compromised, your password would remain unreadable.
            </li>
          </ul>
        </div>

        {/* Your Rights */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">Your Rights</h2>
          <p className="mb-3">
            You own your data. We hold it on your behalf while you use our service. Here is what you
            can do at any point:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-white">Access</strong> &mdash; request a full copy of the
              personal data we hold about you.
            </li>
            <li>
              <strong className="text-white">Correction</strong> &mdash; update or fix inaccurate
              information directly in your dashboard or by contacting support.
            </li>
            <li>
              <strong className="text-white">Deletion</strong> &mdash; ask us to permanently erase
              your account and all associated data.
            </li>
            <li>
              <strong className="text-white">Export</strong> &mdash; download your data in a
              standard, machine-readable format.
            </li>
            <li>
              <strong className="text-white">Opt out of marketing</strong> &mdash; unsubscribe from
              promotional emails with a single click. Transactional emails (receipts, security
              alerts) will still arrive as long as your account exists.
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email{' '}
            <a
              href="mailto:privacy@xtremeplugins.com"
              className="text-cyan-400 hover:underline"
            >
              privacy@xtremeplugins.com
            </a>{' '}
            or open a ticket through{' '}
            <Link href="/support" className="text-cyan-400 hover:underline">
              support
            </Link>
            . We respond within 10 business days.
          </p>
        </div>

        {/* Data Retention */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">Data Retention</h2>
          <p>
            While your subscription is active, we retain the data needed to operate your account and
            deliver plugin updates. If you cancel your subscription and close your account, we
            initiate a 90-day wind-down period during which your data is marked for deletion but can
            still be recovered if you change your mind. After those 90 days, your personal data is
            permanently purged from all primary systems and backups. Anonymized, aggregate analytics
            data (which cannot be tied back to any individual) may be retained indefinitely for
            long-term product analysis.
          </p>
        </div>

        {/* Children's Privacy */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            Children&rsquo;s Privacy
          </h2>
          <p>
            XtremePlugins is a business tool for store owners and developers. Our services are not
            designed for, marketed to, or intended to be used by anyone under 16 years of age. We do
            not knowingly collect data from minors. If you believe a child under 16 has created an
            account, please contact us at{' '}
            <a
              href="mailto:privacy@xtremeplugins.com"
              className="text-cyan-400 hover:underline"
            >
              privacy@xtremeplugins.com
            </a>{' '}
            and we will remove the account promptly.
          </p>
        </div>

        {/* International Transfers */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            International Transfers
          </h2>
          <p>
            XtremePlugins LLC is based in the United States. If you access our services from outside
            the U.S., your data crosses international borders when it reaches our servers. We apply
            the same security standards regardless of where you are located. For customers in the
            European Economic Area or the United Kingdom, we rely on Standard Contractual Clauses
            where applicable to ensure your data receives adequate protection during transfer.
          </p>
        </div>

        {/* Updates to This Policy */}
        <div>
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            Updates to This Policy
          </h2>
          <p>
            When we make meaningful changes to this policy, we will update the effective date at the
            top and notify active subscribers by email at least 14 days before the changes take
            effect. Minor clarifications or formatting tweaks that do not alter your rights may be
            made without notice. You can always find the latest version right here on this page.
          </p>
        </div>

        {/* Contact & Related Pages */}
        <div className="border-t border-white/10 pt-8">
          <h2 className="font-body text-xl font-semibold text-white mb-3">
            Questions?
          </h2>
          <p className="mb-4">
            If anything in this policy is unclear or you want to know more about how we handle a
            specific piece of data, reach out to{' '}
            <a
              href="mailto:privacy@xtremeplugins.com"
              className="text-cyan-400 hover:underline"
            >
              privacy@xtremeplugins.com
            </a>
            . We are happy to answer plainly.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-cyan-400 hover:underline">
              Terms of Service
            </Link>
            <Link href="/support" className="text-cyan-400 hover:underline">
              Support
            </Link>
            <Link href="/faq" className="text-cyan-400 hover:underline">
              FAQ
            </Link>
            <Link href="/docs" className="text-cyan-400 hover:underline">
              Documentation
            </Link>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
