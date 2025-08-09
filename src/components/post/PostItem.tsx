import Link from 'next/link';
import styles from './PostItem.module.css';
import { Post } from '@/types/post';

export default function PostItem({ id, title, createdAt }: Post) {
  return (
    <Link href={`/posts/${id}`} className={styles.postItem}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.date}>{createdAt}</span>
        </div>
      </div>
      <div className={styles.arrow}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
