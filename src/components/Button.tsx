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
