'use client';

import { useState } from 'react';
import PostList from '../post/PostList';
import SearchBox from './SearchBox';
import styles from './SearchContainer.module.css';

export default function SearchContainer() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className={styles.searchContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{searchQuery ? `'${searchQuery}' 검색 결과` : '최근 게시글'}</h2>
        <SearchBox onSearch={handleSearch} />
      </div>
      <div className={styles.postListWrapper}>
        <PostList searchQuery={searchQuery} />
      </div>
    </section>
  );
}
