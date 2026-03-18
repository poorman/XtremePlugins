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
      <div className="font-body text-[2.8rem] font-bold text-white mb-2">${price}</div>
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
