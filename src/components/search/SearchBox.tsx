'use client';

import { useState } from 'react';
import styles from './SearchBox.module.css';
import { SearchBoxProps } from '@/types/search';

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    onSearch(query);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBox}>
      <div className={styles.inputWrapper}>
        <div className={styles.searchIcon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={'키워드를 검색하세요...'}
          className={styles.searchInput}
        />

        {searchQuery && (
          <button type="button" onClick={handleClear} className={styles.clearButton} aria-label="검색어 지우기">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <button type="submit" className={styles.searchButton}>
        검색
      </button>
    </form>
  );
}
