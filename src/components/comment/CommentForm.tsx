'use client';

import { useState } from 'react';
import styles from './CommentForm.module.css';
import { CommentStorageService } from '@/services/commentService';
import { CommentFormProps } from '@/types/comment';

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      CommentStorageService.createComment({
        postId,
        content: content.trim(),
      });

      setContent('');
      onCommentAdded();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>댓글 작성</h3>
      </div>

      <div className={styles.inputGroup}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
          className={styles.contentTextarea}
          rows={4}
          maxLength={500}
          disabled={isSubmitting}
        />
        <div className={styles.charCount}>{content.length}/500</div>
      </div>

      <button type="submit" className={styles.submitButton} disabled={isSubmitting || !content.trim()}>
        {isSubmitting ? '작성 중...' : '댓글 작성'}
      </button>
    </form>
  );
}
