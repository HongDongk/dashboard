import { Post, PostCreateRequest } from '@/types/post';

const POSTS_STORAGE_KEY = 'dashboard_posts';

export class PostStorageService {
  // 모든 게시글 조회
  static getPosts(): Post[] {
    if (typeof window === 'undefined') return [];

    try {
      const posts = localStorage.getItem(POSTS_STORAGE_KEY);
      return posts ? JSON.parse(posts) : [];
    } catch (error) {
      console.error('게시글 조회 실패:', error);
      return [];
    }
  }

  // 게시글 저장
  static savePosts(posts: Post[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error('게시글 저장 실패:', error);
      throw new Error('게시글 저장에 실패했습니다.');
    }
  }

  // ID로 게시글 조회
  static getPostById(id: number): Post | null {
    const posts = this.getPosts();
    return posts.find((post) => post.id === id) || null;
  }

  // 새 게시글 생성
  static createPost(postData: PostCreateRequest): Post {
    const posts = this.getPosts();

    const newId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

    const newPost: Post = {
      id: newId,
      title: postData.title,
      content: postData.content,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const updatedPosts = [newPost, ...posts];
    this.savePosts(updatedPosts);

    return newPost;
  }

  // 게시글 삭제
  static deletePost(id: number): boolean {
    const posts = this.getPosts();
    const filteredPosts = posts.filter((post) => post.id !== id);

    if (filteredPosts.length === posts.length) {
      return false;
    }

    this.savePosts(filteredPosts);
    return true;
  }
}
