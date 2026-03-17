import { getPosts } from '@/lib/ghost';
import BlogPostCard from '@/components/BlogPostCard';

export const revalidate = 3600;

export const metadata = {
  title: 'Blog — XtremePlugins',
  description: 'Tips, guides, and insights for WooCommerce, Shopify, and WordPress store owners.',
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> | null = null;

  try {
    posts = await getPosts();
  } catch {
    // Ghost not configured yet — show empty state
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-10">Blog</h1>
      {!posts || posts.length === 0 ? (
        <p className="text-center text-white/50">No posts yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              title={post.title ?? ''}
              slug={post.slug}
              excerpt={post.excerpt ?? ''}
              publishedAt={post.published_at ?? ''}
              readingTime={(post as { reading_time?: number }).reading_time ?? 5}
            />
          ))}
        </div>
      )}
    </section>
  );
}
