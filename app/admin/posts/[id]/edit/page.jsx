import { notFound } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { getPostById } from '@/lib/posts';
import { updatePost } from '@/app/admin/actions';

export const metadata = { title: 'Tahrirlash' };
export const dynamic = 'force-dynamic';

export default async function EditPost({ params, searchParams }) {
  const post = await getPostById(params.id);
  if (!post) notFound();
  const action = updatePost.bind(null, post.id);
  return <PostForm post={post} action={action} error={searchParams?.error} />;
}
