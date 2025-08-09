import styles from './CommentItem.module.css';
import { CommentProps } from '@/types/comment';

export default function CommentItem({ comment, onDelete }: CommentProps) {
  const handleDelete = () => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      onDelete(comment.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <div className={styles.commentContent}>
          {comment.content.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className={styles.commentMeta}>
        <time className={styles.date}>{formatDate(comment.createdAt)}</time>
        <button onClick={handleDelete} className={styles.deleteButton}>
          삭제
        </button>
      </div>
    </div>
  );
}
