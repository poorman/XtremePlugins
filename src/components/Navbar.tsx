'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Button from './Button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Plugins', href: '/plugins' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 px-6 bg-purple-deep/70 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-14">
        <div className="flex items-center gap-7">
          <Link href="/" className="font-display font-black text-lg text-white tracking-wide">
            XP
          </Link>
          <ul className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Dashboard
              </Link>
              {session.user && (session.user as { role: string }).role === 'ADMIN' && (
                <Link href="/admin" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                Log In
              </Link>
              <Button href="/register" variant="primary" className="!py-2 !px-5 !text-xs">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
