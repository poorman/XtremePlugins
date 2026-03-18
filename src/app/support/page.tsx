import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: 'Support — XtremePlugins',
  description:
    'Get help with your XtremePlugins products. Priority email support, installation guides, troubleshooting tips, and escalation paths for WooCommerce, Shopify, and WordPress plugins.',
};

export default function SupportPage() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-4">
        Support
      </h1>
      <p className="text-center text-white/60 max-w-[640px] mx-auto mb-12 leading-relaxed">
        We built XtremePlugins because we got tired of bloated plugins slowing down stores we managed.
        So when something goes wrong, we take it personally. Here&apos;s how to reach us.
      </p>

      {/* HOW TO GET HELP */}
      <GlassCard className="p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">How to Get Help</h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Before firing off a support ticket, do yourself a favor and check
          our{' '}
          <Link href="/faq" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
            FAQ page
          </Link>{' '}
          and{' '}
          <Link href="/docs" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
            documentation
          </Link>
          . About 70% of the questions we get are already answered there, and
          you&apos;ll get your answer in seconds instead of waiting for a human.
        </p>
        <p className="text-white/70 leading-relaxed">
          If your issue is performance-related, our blog post on{' '}
          <Link
            href="/blog/the-hidden-cost-of-a-slow-woocommerce-store-and-how-to-fix-it-in-2026"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
          >
            the hidden cost of a slow WooCommerce store
          </Link>{' '}
          covers the most common bottlenecks and their fixes. Worth a read before you assume
          the plugin is the culprit.
        </p>
      </GlassCard>

      {/* SUPPORT CHANNELS */}
      <GlassCard className="p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-6">Support Channels &amp; Response Times</h2>
        <p className="text-white/70 leading-relaxed mb-6">
          All paid support goes through one channel:{' '}
          <a
            href="mailto:support@xtremeplugins.com"
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            support@xtremeplugins.com
          </a>
          . No ticketing portals, no chatbots pretending to understand your problem. You email us,
          a real developer reads it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Starter */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-body font-bold text-lg mb-1">Starter</h3>
            <p className="text-sm text-white/40 mb-3">Community support</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                Access to community forums and{' '}
                <Link href="/docs" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
                  docs
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                Best-effort responses from other users and our team
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                Great for hobby projects and personal sites
              </li>
            </ul>
          </div>

          {/* Pro */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/[0.04] p-5">
            <h3 className="font-body font-bold text-lg mb-1 text-cyan-400">Pro</h3>
            <p className="text-sm text-white/40 mb-3">Priority support &mdash; 24h response</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                Direct email to our engineering team
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                Guaranteed first response within 24 hours (business days)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                Configuration reviews on request
              </li>
            </ul>
          </div>

          {/* Agency */}
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/[0.04] p-5">
            <h3 className="font-body font-bold text-lg mb-1 text-purple-400">Agency</h3>
            <p className="text-sm text-white/40 mb-3">Dedicated support &mdash; 4h response</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                Named point-of-contact on our team
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                4-hour response window, 7 days a week
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">&#8250;</span>
                Emergency hotfixes and deployment assistance
              </li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-white/40 mt-5">
          Not sure which tier you&apos;re on?{' '}
          <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
            Check our pricing page
          </Link>{' '}
          or look at the license key email we sent when you purchased.
        </p>
      </GlassCard>

      {/* COMMON ISSUES */}
      <GlassCard className="p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-6">Common Issues &amp; Quick Fixes</h2>

        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-white/90 mb-1">
              &ldquo;The plugin activated but nothing changed on my site.&rdquo;
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Nine times out of ten, this is a caching issue. Purge your page cache, object cache,
              and CDN cache (Cloudflare, etc.), then reload. If you use a full-page cache plugin like
              WP Super Cache or W3 Total Cache, clear that too.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white/90 mb-1">
              &ldquo;I see a white screen or 500 error after activation.&rdquo;
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              This usually means a PHP version mismatch. Our plugins require PHP 8.1 or higher.
              Check your hosting panel &mdash; most hosts let you switch PHP versions in a couple
              of clicks. If the error persists, rename the plugin folder via FTP to deactivate it,
              then email us with your server&apos;s PHP version and error log.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white/90 mb-1">
              &ldquo;Page speed didn&apos;t improve after installing your optimization plugin.&rdquo;
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Our plugins are built lean on purpose &mdash; we wrote about why in{' '}
              <Link
                href="/blog/i-tested-12-wordpress-plugins-only-3-actually-increased-sales"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                our test of 12 WordPress plugins
              </Link>
              . But if your baseline is already heavy with unoptimized images, render-blocking
              scripts, or a bloated theme, one plugin can only do so much. Run a Lighthouse audit
              and share the results with us &mdash; we&apos;ll help you prioritize.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white/90 mb-1">
              &ldquo;License key says invalid.&rdquo;
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Make sure you&apos;re entering the key from your purchase confirmation email, not
              the order number. Keys are 32 characters and start with <code className="text-cyan-400/80 bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">xp_</code>.
              If you upgraded tiers or transferred a license, the old key gets revoked automatically.
              Still stuck? Forward your receipt to{' '}
              <a href="mailto:support@xtremeplugins.com" className="text-cyan-400 hover:text-cyan-300">
                support@xtremeplugins.com
              </a>{' '}
              and we&apos;ll sort it out.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white/90 mb-1">
              &ldquo;Shopify app isn&apos;t syncing data.&rdquo;
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Head to your Shopify admin &rarr; Apps &rarr; XtremePlugins &rarr; Settings and
              hit &ldquo;Reconnect.&rdquo; Shopify occasionally revokes OAuth tokens during
              platform updates. If the reconnect button doesn&apos;t fix it, uninstall and
              reinstall the app (your settings are stored on our side, so nothing gets lost).
            </p>
          </div>
        </div>
      </GlassCard>

      {/* PLUGIN INSTALLATION GUIDE */}
      <GlassCard className="p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-6">Plugin Installation Guide</h2>

        <div className="space-y-8">
          {/* WordPress / WooCommerce */}
          <div>
            <h3 className="font-body font-semibold text-lg text-white/90 mb-3">
              WordPress &amp; WooCommerce
            </h3>
            <ol className="space-y-3 text-sm text-white/60 leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">1</span>
                <span>Download the <code className="text-cyan-400/80 bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">.zip</code> file from your{' '}
                <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">dashboard</Link> after purchase.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">2</span>
                <span>In your WordPress admin, go to <strong className="text-white/80">Plugins &rarr; Add New &rarr; Upload Plugin</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">3</span>
                <span>Choose the zip file and click <strong className="text-white/80">Install Now</strong>, then <strong className="text-white/80">Activate</strong>.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">4</span>
                <span>Navigate to <strong className="text-white/80">Settings &rarr; XtremePlugins</strong> and paste your license key.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center">5</span>
                <span>Clear all caches (page cache, object cache, CDN). Done.</span>
              </li>
            </ol>
          </div>

          {/* Shopify */}
          <div>
            <h3 className="font-body font-semibold text-lg text-white/90 mb-3">
              Shopify
            </h3>
            <ol className="space-y-3 text-sm text-white/60 leading-relaxed list-none">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">1</span>
                <span>Find XtremePlugins in the{' '}
                <Link href="/plugins" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">Shopify App Store listing</Link>{' '}
                or install directly from your dashboard.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">2</span>
                <span>Authorize the app when Shopify prompts you. We request only the permissions we actually need &mdash; no sneaky data grabs.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">3</span>
                <span>Open the app from your Shopify admin sidebar and enter your license key.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">4</span>
                <span>Configure your settings and you&apos;re live. Changes reflect within 60 seconds.</span>
              </li>
            </ol>
          </div>
        </div>

        <p className="text-sm text-white/40 mt-6">
          Detailed walkthrough with screenshots available in our{' '}
          <Link href="/docs" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
            documentation
          </Link>.
        </p>
      </GlassCard>

      {/* ESCALATION PROCESS */}
      <GlassCard className="p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">Escalation Process</h2>
        <p className="text-white/70 leading-relaxed mb-5">
          We resolve the vast majority of issues in the first reply. But if something falls
          through the cracks, here&apos;s how escalation works:
        </p>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-semibold text-white/90 text-sm mb-0.5">Initial Contact</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Email{' '}
                <a href="mailto:support@xtremeplugins.com" className="text-cyan-400 hover:text-cyan-300">
                  support@xtremeplugins.com
                </a>{' '}
                with your license key, plugin version, platform (WooCommerce/Shopify/WordPress),
                and a clear description of what&apos;s happening. Screenshots help enormously.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="font-semibold text-white/90 text-sm mb-0.5">Triage &amp; Investigation</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Our support engineer reproduces the issue. If we need temporary access to your
                site, we&apos;ll ask &mdash; we never require it upfront.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="font-semibold text-white/90 text-sm mb-0.5">Engineering Escalation</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                If first-line support can&apos;t resolve it within two business days, the ticket
                moves to the developer who built that feature. Pro and Agency customers get
                escalated automatically after the first interaction if needed.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
              4
            </div>
            <div>
              <h3 className="font-semibold text-white/90 text-sm mb-0.5">Resolution &amp; Follow-up</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Once fixed, we confirm the resolution with you and keep the ticket open for 72
                hours in case the issue resurfaces. Agency customers receive a brief post-mortem
                for any P1 incidents.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* BOTTOM LINKS */}
      <div className="text-center text-sm text-white/40 space-y-2 mt-12">
        <p>
          Explore our{' '}
          <Link href="/plugins" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
            plugin catalog
          </Link>
          {' '}&middot;{' '}
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
            Read the blog
          </Link>
          {' '}&middot;{' '}
          <Link href="/pricing" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
            View pricing
          </Link>
        </p>
        <p>
          <Link href="/terms" className="text-white/30 hover:text-white/50 underline underline-offset-2">
            Terms of Service
          </Link>
          {' '}&middot;{' '}
          <Link href="/privacy" className="text-white/30 hover:text-white/50 underline underline-offset-2">
            Privacy Policy
          </Link>
        </p>
      </div>
    </section>
  );
}
