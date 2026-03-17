import GhostContentAPI from '@tryghost/content-api';

const ghost = new GhostContentAPI({
  url: process.env.GHOST_URL || 'http://localhost:2072',
  key: process.env.GHOST_CONTENT_API_KEY || '',
  version: 'v5.0',
});

export async function getPosts(page = 1, limit = 10) {
  return ghost.posts.browse({
    limit,
    page,
    include: ['tags'],
    fields: ['id', 'title', 'slug', 'excerpt', 'feature_image', 'published_at', 'reading_time'],
  });
}

export async function getPost(slug: string) {
  return ghost.posts.read({ slug }, { include: ['tags'] });
}

export async function getPostsByTag(tag: string, page = 1, limit = 10) {
  return ghost.posts.browse({
    limit,
    page,
    filter: `tag:${tag}`,
    include: ['tags'],
    fields: ['id', 'title', 'slug', 'excerpt', 'feature_image', 'published_at', 'reading_time'],
  });
}
