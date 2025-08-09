'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostItem from './PostItem';
import styles from './PostList.module.css';
import { Post } from '@/types/post';
import { PostStorageService } from '@/services/postService';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const loadedPosts = PostStorageService.getPosts();
      setPosts(loadedPosts);
    } catch (error) {
      console.error('게시글 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}>⏳</div>
        <p>게시글을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className={styles.postList}>
      {posts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📝</div>
          <p className={styles.emptyText}>아직 작성된 게시글이 없습니다</p>
          <Link href="/posts/create" className={styles.emptyAction}>
            첫 번째 게시글을 작성해보세요
          </Link>
        </div>
      ) : (
        posts.map((post) => <PostItem key={post.id} id={post.id} title={post.title} createdAt={post.createdAt} />)
      )}
    </div>
  );
}
