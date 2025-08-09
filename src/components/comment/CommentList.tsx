'use client';

import { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import styles from './CommentList.module.css';
import { Comment, CommentListProps } from '@/types/comment';
import { CommentStorageService } from '@/services/commentService';

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = () => {
    try {
      const postComments = CommentStorageService.getCommentsByPostId(postId);
      setComments(postComments);
    } catch (error) {
      console.error('댓글 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentAdded = () => {
    loadComments();
  };

  const handleCommentDelete = (commentId: number) => {
    try {
      const success = CommentStorageService.deleteComment(commentId);
      if (success) {
        loadComments();
      } else {
        alert('댓글 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <section className={styles.commentSection}>
        <div className={styles.loadingState}>
          <p>댓글을 불러오는 중...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.commentSection}>
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          댓글 {comments.length > 0 && <span className={styles.commentCount}>({comments.length})</span>}
        </h2>
      </div>

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <div className={styles.emptyState}>
            <p>첫 번째 댓글을 작성해보세요!</p>
          </div>
        ) : (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} onDelete={handleCommentDelete} />)
        )}
      </div>
    </section>
  );
}
