import { getPostsByTag } from '@/lib/ghost';
import BlogPostCard from '@/components/BlogPostCard';

export const revalidate = 3600;

export default async function TagPage({ params }: { params: { tag: string } }) {
  let posts: Awaited<ReturnType<typeof getPostsByTag>> | null = null;

  try {
    posts = await getPostsByTag(params.tag);
  } catch {
    // Ghost not configured
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-16">
      <h1 className="font-body text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-center mb-10">
        Posts tagged &ldquo;{params.tag}&rdquo;
      </h1>
      {!posts || posts.length === 0 ? (
        <p className="text-center text-white/50">No posts found for this tag.</p>
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
