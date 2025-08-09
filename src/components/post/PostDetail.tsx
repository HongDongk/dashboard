'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './PostDetail.module.css';
import { Post, PostDetailProps } from '@/types/post';
import { PostStorageService } from '@/services/postService';

export default function PostDetail({ postId }: PostDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      const foundPost = PostStorageService.getPostById(parseInt(postId));
      setPost(foundPost || null);
    } catch (error) {
      console.error('게시글 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    const confirmed = confirm('정말로 이 게시글을 삭제하시겠습니까?\n삭제된 게시글은 복구할 수 없습니다.');
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const success = PostStorageService.deletePost(post.id);
      if (success) {
        router.push('/');
      } else {
        alert('게시글 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}>⏳</div>
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>❌</div>
          <h2 className={styles.errorTitle}>게시글을 찾을 수 없습니다</h2>
          <p className={styles.errorText}>요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.</p>
          <Link href="/" className={styles.backButton}>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.postWrapper}>
        <header className={styles.postHeader}>
          <div className={styles.titleSection}>
            <h1 className={styles.postTitle}>{post.title}</h1>
          </div>

          <main className={styles.postContent}>
            <div className={styles.contentWrapper}>
              {post.content.split('\n').map((line, index) => (
                <p key={index} className={styles.contentParagraph}>
                  {line}
                </p>
              ))}
            </div>
            <div className={styles.postMeta}>
              <div className={styles.metaInfo}>
                <span className={styles.metaLabel}>작성일</span>
                <span className={styles.metaValue}>{post.createdAt}</span>
              </div>
            </div>
          </main>

          <div className={styles.actionButtons}>
            <button onClick={handleDelete} className={styles.deleteButton} disabled={isDeleting}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M12.5 4V13C12.5 13.5304 12.2893 14.0391 11.9142 14.4142C11.5391 14.7893 11.0304 15 10.5 15H5.5C4.96957 15 4.46086 14.7893 4.08579 14.4142C3.71071 14.0391 3.5 13.5304 3.5 13V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 1H9.5C9.77614 1 10 1.22386 10 1.5V4H6V1.5C6 1.22386 6.22386 1 6.5 1Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isDeleting ? '삭제 중...' : '삭제'}
            </button>
          </div>
        </header>

        {/* 하단 네비게이션 */}
        <footer className={styles.postFooter}>
          <div className={styles.footerActions}>
            <Link href="/" className={styles.listButton}>
              목록으로
            </Link>
            <Link href="/posts/create" className={styles.createButton}>
              새 글 작성
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
