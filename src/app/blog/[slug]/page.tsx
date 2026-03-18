import { getPost } from '@/lib/ghost';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);
    return {
      title: `${post.title} — XtremePlugins Blog`,
      description: post.excerpt ?? '',
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-[760px] mx-auto px-6 py-16">
      <div className="text-xs text-white/40 mb-3">
        {post.published_at && new Date(post.published_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      <h1 className="font-body text-[clamp(1.8rem,5vw,2.8rem)] font-bold leading-tight mb-8">
        {post.title}
      </h1>
      {post.html && (
        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-body prose-a:text-cyan"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mt-10 flex-wrap">
          {post.tags.map((tag) => (
            <a
              key={tag.id}
              href={`/blog/tag/${tag.slug}`}
              className="px-3 py-1 text-xs glass rounded-full text-white/60 hover:text-white transition"
            >
              #{tag.name}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
