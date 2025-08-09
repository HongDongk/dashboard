import styles from './page.module.css';
import Link from 'next/link';
import SearchContainer from '@/components/search/SearchContainer';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.topSection}>
        <section className={styles.topSection}>
          <h1 className={styles.topSectionTitle}>커뮤니티 게시판</h1>
          <p className={styles.topSectionDescription}>자유롭게 소통하고 정보를 공유하는 공간입니다</p>
          <Link href="/posts/create" className={styles.topSectionButton}>
            새 게시글 작성
          </Link>
        </section>

        <SearchContainer />
      </main>
    </div>
  );
}
