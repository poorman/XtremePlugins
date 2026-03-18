import Link from 'next/link';
import Image from 'next/image';

const mainLinks = [
  { label: 'Plugins', href: '/plugins' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
];

const secondaryLinks = [
  { label: 'Support', href: '/support' },
  { label: 'Docs', href: '/docs' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
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
