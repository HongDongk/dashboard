import Link from 'next/link';
import PostItem from './PostItem';
import styles from './PostList.module.css';
import { Post } from '@/types/post';

const mockPosts: Post[] = [
  { id: 1, title: '첫 번째 게시글입니다', createdAt: '2024-01-15' },
  { id: 2, title: 'Next.js 개발 팁 공유드립니다', createdAt: '2024-01-14' },
  { id: 3, title: '프론트엔드 개발자 모집합니다', createdAt: '2024-01-13' },
  { id: 4, title: 'React Hook 사용법에 대해 질문있습니다', createdAt: '2024-01-12' },
  { id: 5, title: '코드 리뷰 부탁드립니다', createdAt: '2024-01-11' },
];

export default function PostList() {
  return (
    <div className={styles.postList}>
      {mockPosts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <p className={styles.emptyText}>아직 작성된 게시글이 없습니다</p>
          <Link href="/posts/create" className={styles.emptyAction}>
            첫 번째 게시글을 작성해보세요
          </Link>
        </div>
      ) : (
        mockPosts.map((post) => <PostItem key={post.id} id={post.id} title={post.title} createdAt={post.createdAt} />)
      )}
    </div>
  );
}
