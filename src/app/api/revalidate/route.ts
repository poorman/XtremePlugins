import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/blog/tag/[tag]', 'page');

  return NextResponse.json({ revalidated: true, paths: ['/blog', '/blog/[slug]', '/blog/tag/[tag]'] });
}
