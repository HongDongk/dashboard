import { Comment, CommentCreateRequest } from '@/types/comment';

const COMMENTS_STORAGE_KEY = 'dashboard_comments';

export class CommentStorageService {
  // 모든 댓글 조회
  static getComments(): Comment[] {
    if (typeof window === 'undefined') return [];

    try {
      const comments = localStorage.getItem(COMMENTS_STORAGE_KEY);
      return comments ? JSON.parse(comments) : [];
    } catch (error) {
      console.error('댓글 조회 실패:', error);
      return [];
    }
  }

  // 댓글 저장
  static saveComments(comments: Comment[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
    } catch (error) {
      console.error('댓글 저장 실패:', error);
      throw new Error('댓글 저장에 실패했습니다.');
    }
  }

  // 특정 게시글의 댓글 조회
  static getCommentsByPostId(postId: number): Comment[] {
    const comments = this.getComments();
    return comments
      .filter((comment) => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  // 새 댓글 생성
  static createComment(commentData: CommentCreateRequest): Comment {
    const comments = this.getComments();

    const newId = comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1;

    const newComment: Comment = {
      id: newId,
      postId: commentData.postId,
      content: commentData.content,
      author: commentData.author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    this.saveComments(updatedComments);

    return newComment;
  }

  // 댓글 삭제
  static deleteComment(id: number): boolean {
    const comments = this.getComments();
    const filteredComments = comments.filter((comment) => comment.id !== id);

    if (filteredComments.length === comments.length) {
      return false;
    }

    this.saveComments(filteredComments);
    return true;
  }

  // 특정 게시글의 모든 댓글 삭제 (게시글 삭제 시 사용)
  static deleteCommentsByPostId(postId: number): void {
    const comments = this.getComments();
    const filteredComments = comments.filter((comment) => comment.postId !== postId);
    this.saveComments(filteredComments);
  }
}
