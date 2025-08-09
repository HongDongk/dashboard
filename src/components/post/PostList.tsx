'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostItem from './PostItem';
import styles from './PostList.module.css';
import { Post } from '@/types/post';
import { PostStorageService } from '@/services/postService';

interface PostListProps {
  searchQuery: string;
}

export default function PostList({ searchQuery }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery]);

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

  const filterPosts = () => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}>⏳</div>
        <p>게시글을 불러오는 중...</p>
      </div>
    );
  }

  const isSearching = searchQuery.trim() !== '';

  return (
    <div className={styles.postList}>
      {filteredPosts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>{isSearching ? '🔍' : '📝'}</div>
          <p className={styles.emptyText}>
            {isSearching ? `"${searchQuery}"에 대한 검색 결과가 없습니다` : '아직 작성된 게시글이 없습니다'}
          </p>
          {!isSearching && (
            <Link href="/posts/create" className={styles.emptyAction}>
              첫 번째 게시글을 작성해보세요
            </Link>
          )}
        </div>
      ) : (
        filteredPosts.map((post) => (
          <PostItem key={post.id} id={post.id} title={post.title} createdAt={post.createdAt} />
        ))
      )}
    </div>
  );
}
