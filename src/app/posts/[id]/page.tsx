import PostDetail from '@/components/post/PostDetail';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `${id}번 게시글`,
    description: '게시글을 확인하고 수정하거나 삭제할 수 있습니다',
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;

  return <PostDetail postId={id} />;
}
