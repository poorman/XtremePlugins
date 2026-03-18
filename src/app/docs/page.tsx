import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: 'Documentation — XtremePlugins',
  description:
    'Step-by-step guides for installing, configuring, and getting the most out of Checkout Booster Pro, Urgency Countdown, and Sticky Add-to-Cart Pro on WooCommerce, Shopify, and WordPress.',
};

export default function DocsPage() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-4">
        Documentation
      </h1>
      <p className="text-center text-white/60 max-w-[640px] mx-auto mb-12">
        Everything you need to install, activate, and fine-tune your XtremePlugins.
        If something here doesn&apos;t answer your question,{' '}
        <Link href="/support" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
          reach out to support
        </Link>{' '}
        and we&apos;ll get back to you within one business day.
      </p>

      {/* TABLE OF CONTENTS */}
      <GlassCard className="p-6 mb-10">
        <h2 className="font-body text-lg font-bold mb-3">On This Page</h2>
        <ul className="columns-1 sm:columns-2 gap-x-8 text-sm text-white/70 space-y-1.5">
          <li><a href="#getting-started" className="hover:text-cyan transition-colors">Getting Started</a></li>
          <li><a href="#installation" className="hover:text-cyan transition-colors">Installation</a></li>
          <li><a href="#configuration" className="hover:text-cyan transition-colors">Plugin Configuration</a></li>
          <li><a href="#licensing" className="hover:text-cyan transition-colors">Activation &amp; Licensing</a></li>
          <li><a href="#performance" className="hover:text-cyan transition-colors">Performance Tips</a></li>
          <li><a href="#troubleshooting" className="hover:text-cyan transition-colors">Troubleshooting</a></li>
          <li><a href="#requirements" className="hover:text-cyan transition-colors">Platform Requirements</a></li>
        </ul>
      </GlassCard>

      {/* GETTING STARTED */}
      <GlassCard id="getting-started" className="p-6 md:p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">Getting Started</h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Every XtremePlugins product ships as a single <code className="text-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">.zip</code> file.
          No build tools, no dependency chains, no mysterious compilation steps. Download it from
          your{' '}
          <Link href="/dashboard" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
            account dashboard
          </Link>
          , upload it to your platform, activate your license key, and you&apos;re live.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before you install anything, double-check that your store meets
          the <a href="#requirements" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">platform requirements</a> listed
          at the bottom of this page. Running an outdated PHP version or an incompatible theme
          is the number-one cause of post-install headaches, and it takes thirty seconds to verify.
        </p>
        <p className="text-white/70 leading-relaxed">
          Already own a license? Skip ahead to{' '}
          <a href="#configuration" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">configuration</a>.
          New here? Take a look at{' '}
          <Link href="/plugins" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
            our plugin lineup
          </Link>{' '}
          or compare plans on the{' '}
          <Link href="/pricing" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
            pricing page
          </Link>.
        </p>
      </GlassCard>

      {/* INSTALLATION */}
      <GlassCard id="installation" className="p-6 md:p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">Installation</h2>

        <h3 className="font-body text-base font-semibold text-cyan mb-2 mt-2">
          WooCommerce &amp; WordPress
        </h3>
        <ol className="list-decimal list-inside text-white/70 leading-relaxed space-y-2 mb-6 pl-1">
          <li>
            Log in to your WordPress admin panel and go to{' '}
            <strong className="text-white/90">Plugins &gt; Add New &gt; Upload Plugin</strong>.
          </li>
          <li>
            Click <strong className="text-white/90">Choose File</strong>, select the{' '}
            <code className="text-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">.zip</code> you downloaded,
            then hit <strong className="text-white/90">Install Now</strong>.
          </li>
          <li>
            Once WordPress finishes extracting, click <strong className="text-white/90">Activate Plugin</strong>.
          </li>
          <li>
            Navigate to the new plugin settings page (usually under <strong className="text-white/90">WooCommerce &gt; XtremePlugins</strong>)
            and paste your license key. That&apos;s it.
          </li>
        </ol>

        <h3 className="font-body text-base font-semibold text-cyan mb-2">Shopify</h3>
        <ol className="list-decimal list-inside text-white/70 leading-relaxed space-y-2 pl-1">
          <li>
            From your Shopify admin, go to <strong className="text-white/90">Apps</strong> and
            click <strong className="text-white/90">Manage private apps</strong> (or search for XtremePlugins
            in the Shopify App Store).
          </li>
          <li>
            Follow the on-screen prompts to install the app and grant the requested permissions.
            We ask for the minimum access necessary&mdash;storefront display and order metadata only.
          </li>
          <li>
            After installation, open the app, paste your license key, and configure your settings.
            Changes go live on your storefront immediately.
          </li>
        </ol>
        <p className="text-white/50 text-sm mt-4">
          Curious how plugins affect store speed? We ran the numbers in{' '}
          <Link
            href="/blog/the-hidden-cost-of-a-slow-woocommerce-store-and-how-to-fix-it-in-2026"
            className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors"
          >
            The Hidden Cost of a Slow WooCommerce Store
          </Link>.
        </p>
      </GlassCard>

      {/* CONFIGURATION */}
      <GlassCard id="configuration" className="p-6 md:p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">Plugin Configuration</h2>

        <h3 className="font-body text-base font-semibold text-cyan mb-2 mt-2">
          Checkout Booster Pro
        </h3>
        <p className="text-white/70 leading-relaxed mb-3">
          Open <strong className="text-white/90">WooCommerce &gt; Checkout Booster</strong> (or the
          Shopify app panel). You&apos;ll see three tabs: <em>Trust Badges</em>, <em>Express Checkout</em>,
          and <em>Cart Recovery</em>. Start with Trust Badges&mdash;enable the payment icon strip and
          the &ldquo;Secure Checkout&rdquo; guarantee seal. Those two alone consistently move the
          conversion needle on stores we&apos;ve audited.
        </p>
        <p className="text-white/70 leading-relaxed mb-5">
          Express Checkout wires up Apple Pay, Google Pay, and PayPal One Touch to a single
          floating button. Toggle each provider on or off depending on your gateway setup.
          Cart Recovery sends a timed email sequence when a shopper abandons; you can customize
          timing and message copy directly in the editor.
        </p>

        <h3 className="font-body text-base font-semibold text-cyan mb-2">Urgency Countdown</h3>
        <p className="text-white/70 leading-relaxed mb-3">
          Head to <strong className="text-white/90">WooCommerce &gt; Urgency Countdown</strong>.
          Pick a trigger: fixed schedule (e.g. &ldquo;Sale ends Sunday at midnight&rdquo;)
          or evergreen per-visitor (starts when the shopper first sees the page).
          Set the countdown duration, bar color, and position (top bar, inline, or floating).
          Preview it on desktop and mobile before publishing.
        </p>
        <p className="text-white/70 leading-relaxed mb-5">
          If you combine Urgency Countdown with Checkout Booster Pro&apos;s trust badges, you
          create a one-two punch: urgency drives the click, and trust badges remove the last
          reason to hesitate. We wrote about which plugin combinations actually work in{' '}
          <Link
            href="/blog/i-tested-12-wordpress-plugins-only-3-actually-increased-sales"
            className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors"
          >
            I Tested 12 WordPress Plugins&mdash;Only 3 Actually Increased Sales
          </Link>.
        </p>

        <h3 className="font-body text-base font-semibold text-cyan mb-2">Sticky Add-to-Cart Pro</h3>
        <p className="text-white/70 leading-relaxed">
          Go to <strong className="text-white/90">WooCommerce &gt; Sticky ATC</strong>.
          Choose between a bottom bar (recommended for mobile) or a slide-in side panel.
          You can enable variant selection inside the sticky bar so shoppers never have to
          scroll back up to pick a size or color. Adjust the appear-on-scroll threshold to
          control exactly when the bar kicks in&mdash;200px works well for most product pages,
          but tweak it if your hero images are taller than average.
        </p>
      </GlassCard>

      {/* ACTIVATION & LICENSING */}
      <GlassCard id="licensing" className="p-6 md:p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">Activation &amp; Licensing</h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Every purchase generates a unique license key tied to your account. You&apos;ll find it
          in two places: the confirmation email and your{' '}
          <Link href="/dashboard" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
            account dashboard
          </Link>{' '}
          under <strong className="text-white/90">My Licenses</strong>.
        </p>
        <ul className="text-white/70 leading-relaxed space-y-2 mb-4 list-disc list-inside pl-1">
          <li>
            <strong className="text-white/90">Starter</strong> keys activate on one domain at a time.
            Deactivate the old domain from your dashboard before activating on a new one.
          </li>
          <li>
            <strong className="text-white/90">Pro</strong> keys support up to five simultaneous
            activations&mdash;handy for a production site plus staging environments.
          </li>
          <li>
            <strong className="text-white/90">Agency</strong> keys have no domain cap.
            Use them across as many client stores as you need.
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          If you hit an &ldquo;activation limit reached&rdquo; message and you&apos;re sure you haven&apos;t
          exceeded your quota, revoke stale activations in the dashboard or{' '}
          <Link href="/support" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
            contact support
          </Link>{' '}
          for a manual reset. License details and renewal terms are covered in our{' '}
          <Link href="/terms" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
            Terms of Service
          </Link>.
        </p>
      </GlassCard>

      {/* PERFORMANCE TIPS */}
      <GlassCard id="performance" className="p-6 md:p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">Performance Tips</h2>
        <p className="text-white/70 leading-relaxed mb-4">
          We obsess over bundle size so you don&apos;t have to, but your hosting environment
          still matters. A few quick wins:
        </p>
        <ul className="text-white/70 leading-relaxed space-y-2 mb-4 list-disc list-inside pl-1">
          <li>
            <strong className="text-white/90">Enable object caching.</strong> Redis or Memcached
            cuts database queries on every page load. Most managed WordPress hosts offer this
            as a one-click toggle.
          </li>
          <li>
            <strong className="text-white/90">Serve assets through a CDN.</strong> Our plugin
            scripts are small (under 12 KB gzipped per plugin), but delivering them from
            an edge node close to your visitors still shaves 50&ndash;100ms off load time.
          </li>
          <li>
            <strong className="text-white/90">Audit your other plugins.</strong> We regularly see
            stores running 30+ plugins where half are inactive or redundant. Every extra plugin
            adds autoload data, cron jobs, and sometimes third-party tracking scripts.
            Trim the fat.
          </li>
          <li>
            <strong className="text-white/90">Use PHP 8.1 or newer.</strong> PHP 8.x runs measurably
            faster than 7.4 on the same hardware. If your host still defaults to 7.4, upgrading
            is usually a panel setting, not a migration.
          </li>
          <li>
            <strong className="text-white/90">Lazy-load below-the-fold content.</strong> Sticky
            Add-to-Cart Pro already defers its own scripts until the user scrolls. Make sure your
            theme and other plugins do the same.
          </li>
        </ul>
        <p className="text-white/50 text-sm">
          For a deeper dive into WooCommerce speed, read{' '}
          <Link
            href="/blog/the-hidden-cost-of-a-slow-woocommerce-store-and-how-to-fix-it-in-2026"
            className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors"
          >
            The Hidden Cost of a Slow WooCommerce Store&mdash;and How to Fix It in 2026
          </Link>.
        </p>
      </GlassCard>

      {/* TROUBLESHOOTING */}
      <GlassCard id="troubleshooting" className="p-6 md:p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">Troubleshooting</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-body text-sm font-semibold text-white/90 mb-1">
              Plugin doesn&apos;t appear after upload
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              WordPress expects a <code className="text-cyan bg-white/5 px-1 py-0.5 rounded text-xs">.zip</code> containing
              the plugin folder at the top level. If you downloaded a nested zip (zip inside a zip),
              extract once and re-upload the inner file. On Shopify, confirm you&apos;re installing
              from the correct app listing&mdash;search for &ldquo;XtremePlugins&rdquo; exactly.
            </p>
          </div>
          <div>
            <h3 className="font-body text-sm font-semibold text-white/90 mb-1">
              &ldquo;License key invalid&rdquo; error
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              Copy the key directly from your dashboard to avoid stray whitespace. Make sure your
              domain matches what&apos;s registered&mdash;<code className="text-cyan bg-white/5 px-1 py-0.5 rounded text-xs">www.example.com</code> and{' '}
              <code className="text-cyan bg-white/5 px-1 py-0.5 rounded text-xs">example.com</code> are treated as
              separate domains. Update your registered URL if needed.
            </p>
          </div>
          <div>
            <h3 className="font-body text-sm font-semibold text-white/90 mb-1">
              Countdown timer not showing
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              Check for JavaScript conflicts. Open your browser console (<kbd className="text-cyan bg-white/5 px-1 py-0.5 rounded text-xs">F12</kbd> &gt; Console)
              and look for red errors. Nine times out of ten, another plugin is throwing an uncaught
              exception that blocks subsequent scripts. Disable other plugins one by one to isolate
              the culprit.
            </p>
          </div>
          <div>
            <h3 className="font-body text-sm font-semibold text-white/90 mb-1">
              Sticky bar overlaps mobile navigation
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              Open <strong className="text-white/90">Sticky ATC &gt; Advanced</strong> and increase
              the z-index value. If your theme uses a z-index above 9999 on its mobile menu
              (some do), bump ours higher. You can also set a CSS class exclusion so the bar
              hides when a specific menu or overlay is open.
            </p>
          </div>
          <div>
            <h3 className="font-body text-sm font-semibold text-white/90 mb-1">
              Still stuck?
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              Check the{' '}
              <Link href="/faq" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
                FAQ
              </Link>{' '}
              for more common questions, or{' '}
              <Link href="/support" className="text-cyan underline underline-offset-2 hover:text-cyan/80 transition-colors">
                open a support ticket
              </Link>. Include your WordPress version, PHP version, and a screenshot of
              any console errors&mdash;it helps us skip the back-and-forth.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* PLATFORM REQUIREMENTS */}
      <GlassCard id="requirements" className="p-6 md:p-8 mb-8">
        <h2 className="font-body text-xl font-bold mb-4">Platform Requirements</h2>

        <h3 className="font-body text-base font-semibold text-cyan mb-2 mt-2">
          WordPress / WooCommerce
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="py-2 pr-4 font-medium">Requirement</th>
                <th className="py-2 font-medium">Minimum</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border-b border-white/5">
                <td className="py-2 pr-4">WordPress</td>
                <td className="py-2">6.0+</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 pr-4">WooCommerce</td>
                <td className="py-2">7.0+</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 pr-4">PHP</td>
                <td className="py-2">7.4+ (8.1+ recommended)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-2 pr-4">MySQL / MariaDB</td>
                <td className="py-2">5.7+ / 10.3+</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Browser support</td>
                <td className="py-2">Last 2 versions of Chrome, Firefox, Safari, Edge</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-body text-base font-semibold text-cyan mb-2">Shopify</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="py-2 pr-4 font-medium">Requirement</th>
                <th className="py-2 font-medium">Minimum</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border-b border-white/5">
                <td className="py-2 pr-4">Theme</td>
                <td className="py-2">Online Store 2.0 compatible</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Browser support</td>
                <td className="py-2">Last 2 versions of Chrome, Firefox, Safari, Edge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* FOOTER LINKS */}
      <div className="text-center text-sm text-white/40 space-x-4 mt-4">
        <Link href="/faq" className="hover:text-cyan transition-colors">FAQ</Link>
        <Link href="/support" className="hover:text-cyan transition-colors">Support</Link>
        <Link href="/pricing" className="hover:text-cyan transition-colors">Pricing</Link>
        <Link href="/plugins" className="hover:text-cyan transition-colors">Plugins</Link>
        <Link href="/blog" className="hover:text-cyan transition-colors">Blog</Link>
        <Link href="/terms" className="hover:text-cyan transition-colors">Terms</Link>
        <Link href="/privacy" className="hover:text-cyan transition-colors">Privacy</Link>
      </div>
    </section>
  );
}
