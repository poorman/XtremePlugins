'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', { email, password, redirect: false });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-md p-10">
        <h1 className="font-display text-2xl font-bold text-center mb-8">Log In</h1>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-glass-border rounded-lg text-white placeholder-white/30 outline-none focus:border-cyan/40 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-glass-border rounded-lg text-white placeholder-white/30 outline-none focus:border-cyan/40 transition"
          />
          <Button type="submit" disabled={loading} className="w-full !py-3.5 mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 text-xs text-white/40 bg-purple-deep">or continue with</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="flex-1 py-3 glass rounded-lg text-sm font-semibold text-white/80 hover:bg-white/[0.06] transition"
          >
            Google
          </button>
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="flex-1 py-3 glass rounded-lg text-sm font-semibold text-white/80 hover:bg-white/[0.06] transition"
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-white/50 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cyan hover:underline">Sign up</Link>
        </p>
      </GlassCard>
    </div>
  );
}
