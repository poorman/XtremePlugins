import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import GlassCard from '@/components/GlassCard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-2xl font-bold mb-6">Dashboard</h1>
      <GlassCard className="p-8">
        <p className="text-white/60">
          Welcome, {session.user?.name || session.user?.email}. Your licenses and downloads will appear here in Phase 2.
        </p>
      </GlassCard>
    </section>
  );
}
