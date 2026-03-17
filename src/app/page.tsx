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
