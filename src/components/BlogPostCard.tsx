import Link from 'next/link';
import GlassCard from './GlassCard';

interface BlogPostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
}

export default function BlogPostCard({ title, slug, excerpt, publishedAt, readingTime }: BlogPostCardProps) {
  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${slug}`}>
      <GlassCard hover className="p-6 h-full flex flex-col">
        <div className="text-xs text-white/40 mb-2">
          {date} &middot; {readingTime} min read
        </div>
        <h3 className="text-lg font-bold mb-2 leading-snug">{title}</h3>
        <p className="text-sm text-white/60 line-clamp-3">{excerpt}</p>
      </GlassCard>
    </Link>
  );
}
