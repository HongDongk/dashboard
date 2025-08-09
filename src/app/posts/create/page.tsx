import PostCreateForm from '@/components/post/PostCreateForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '새 게시글 작성',
  description: '새로운 게시글을 작성하세요',
};

export default function CreatePostPage() {
  return <PostCreateForm />;
}
