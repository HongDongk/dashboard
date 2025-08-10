import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentList from '../CommentList';
import { Comment } from '@/types/comment';
import { CommentStorageService } from '@/services/commentService';

jest.mock('@/services/commentService', () => ({
  CommentStorageService: {
    getCommentsByPostId: jest.fn(),
    deleteComment: jest.fn(),
  },
}));

const mockGetCommentsByPostId = CommentStorageService.getCommentsByPostId as jest.MockedFunction<
  typeof CommentStorageService.getCommentsByPostId
>;
const mockDeleteComment = CommentStorageService.deleteComment as jest.MockedFunction<
  typeof CommentStorageService.deleteComment
>;

describe('CommentList', () => {
  beforeEach(() => {
    mockGetCommentsByPostId.mockClear();
    mockDeleteComment.mockClear();
  });

  it('댓글이 없을 때 빈 상태가 올바르게 표시되는지 확인', async () => {
    mockGetCommentsByPostId.mockReturnValue([]);

    render(<CommentList postId={1} />);

    await waitFor(() => {
      expect(screen.getByText('첫 번째 댓글을 작성해보세요!')).toBeInTheDocument();
    });
  });

  it('댓글 목록이 올바르게 렌더링되는지 확인', async () => {
    const mockComments: Comment[] = [
      { id: 1, postId: 1, content: '첫 번째 댓글', createdAt: '2024-01-01T12:00:00Z' },
      { id: 2, postId: 1, content: '두 번째 댓글', createdAt: '2024-01-01T13:00:00Z' },
    ];

    mockGetCommentsByPostId.mockReturnValue(mockComments);

    render(<CommentList postId={1} />);

    await waitFor(() => {
      expect(screen.getByText('첫 번째 댓글')).toBeInTheDocument();
      expect(screen.getByText('두 번째 댓글')).toBeInTheDocument();
    });
  });

  it('댓글 개수가 올바르게 표시되는지 확인', async () => {
    const mockComments: Comment[] = [
      { id: 1, postId: 1, content: '첫 번째 댓글', createdAt: '2024-01-01T12:00:00Z' },
      { id: 2, postId: 1, content: '두 번째 댓글', createdAt: '2024-01-01T13:00:00Z' },
    ];

    mockGetCommentsByPostId.mockReturnValue(mockComments);

    render(<CommentList postId={1} />);

    await waitFor(() => {
      expect(screen.getByText('댓글')).toBeInTheDocument();
      expect(screen.getByText('(2)')).toBeInTheDocument();
    });
  });

  it('댓글 삭제가 올바르게 작동하는지 확인', async () => {
    const mockComments: Comment[] = [{ id: 1, postId: 1, content: '테스트 댓글', createdAt: '2024-01-01T12:00:00Z' }];

    mockGetCommentsByPostId.mockReturnValueOnce(mockComments).mockReturnValueOnce([]);

    mockDeleteComment.mockReturnValue(true);

    const mockConfirm = jest.fn().mockReturnValue(true);
    Object.defineProperty(window, 'confirm', { value: mockConfirm, writable: true });

    const user = userEvent.setup();
    render(<CommentList postId={1} />);

    await waitFor(() => {
      expect(screen.getByText('테스트 댓글')).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    await user.click(deleteButton);

    expect(mockDeleteComment).toHaveBeenCalledWith(1);

    await waitFor(() => {
      expect(screen.getByText('첫 번째 댓글을 작성해보세요!')).toBeInTheDocument();
    });
  });

  it('댓글 삭제 실패 시 에러 메시지가 표시되는지 확인', async () => {
    const mockAlert = jest.fn();
    Object.defineProperty(window, 'alert', { value: mockAlert, writable: true });

    const mockComments: Comment[] = [{ id: 1, postId: 1, content: '테스트 댓글', createdAt: '2024-01-01T12:00:00Z' }];

    mockGetCommentsByPostId.mockReturnValue(mockComments);
    mockDeleteComment.mockReturnValue(false);

    const mockConfirm = jest.fn().mockReturnValue(true);
    Object.defineProperty(window, 'confirm', { value: mockConfirm, writable: true });

    const user = userEvent.setup();
    render(<CommentList postId={1} />);

    await waitFor(() => {
      expect(screen.getByText('테스트 댓글')).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    await user.click(deleteButton);

    expect(mockAlert).toHaveBeenCalledWith('댓글 삭제에 실패했습니다.');
  });

  it('postId가 변경될 때 댓글이 다시 로드되는지 확인', async () => {
    const { rerender } = render(<CommentList postId={1} />);

    expect(mockGetCommentsByPostId).toHaveBeenCalledWith(1);

    rerender(<CommentList postId={2} />);

    expect(mockGetCommentsByPostId).toHaveBeenCalledWith(2);
  });
});
