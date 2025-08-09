'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PostCreateForm.module.css';
import { PostStorageService } from '@/services/postService';

export default function PostCreateForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      PostStorageService.createPost({
        title: title.trim(),
        content: content.trim(),
      });

      alert('게시글이 성공적으로 작성되었습니다!');
      router.push('/');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (confirm('작성 중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>새 게시글 작성</h1>
          <p className={styles.description}>다른 사용자들과 공유하고 싶은 내용을 작성해보세요</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="title" className={styles.label}>
              제목 <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              className={styles.titleInput}
              maxLength={100}
              disabled={isSubmitting}
            />
            <div className={styles.charCount}>{title.length}/100</div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="content" className={styles.label}>
              내용 <span className={styles.required}>*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시글 내용을 입력하세요"
              className={styles.contentTextarea}
              rows={12}
              maxLength={2000}
              disabled={isSubmitting}
            />
            <div className={styles.charCount}>{content.length}/2000</div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="button" onClick={handleCancel} className={styles.cancelButton} disabled={isSubmitting}>
              취소
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || !title.trim() || !content.trim()}
            >
              {isSubmitting ? '작성 중...' : '게시글 작성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
