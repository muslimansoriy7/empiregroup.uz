import PostForm from '@/components/PostForm';
import { createPost } from '@/app/admin/actions';

export const metadata = { title: 'Yangi maqola' };

export default function NewPost({ searchParams }) {
  return <PostForm action={createPost} error={searchParams?.error} />;
}
