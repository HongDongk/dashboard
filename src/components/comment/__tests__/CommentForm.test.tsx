import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from '../CommentForm';
import { CommentStorageService } from '@/services/commentService';

jest.mock('@/services/commentService', () => ({
  CommentStorageService: {
    createComment: jest.fn(),
  },
}));

const mockOnCommentAdded = jest.fn();
const mockCreateComment = CommentStorageService.createComment as jest.MockedFunction<
  typeof CommentStorageService.createComment
>;

describe('CommentForm', () => {
  let mockAlert: jest.SpyInstance;
  let mockConsoleError: jest.SpyInstance;
  beforeEach(() => {
    mockOnCommentAdded.mockClear();
    mockCreateComment.mockClear();
    mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('댓글 내용을 입력할 수 있는지 확인', async () => {
    const user = userEvent.setup();
    render(<CommentForm postId={1} onCommentAdded={mockOnCommentAdded} />);

    const textarea = screen.getByPlaceholderText('댓글을 입력하세요');
    await user.type(textarea, '테스트 댓글입니다');

    expect(textarea).toHaveValue('테스트 댓글입니다');
  });

  it('글자 수 제한이 올바르게 표시되는지 확인', async () => {
    const user = userEvent.setup();
    render(<CommentForm postId={1} onCommentAdded={mockOnCommentAdded} />);

    const textarea = screen.getByPlaceholderText('댓글을 입력하세요');
    expect(screen.getByText('0/500')).toBeInTheDocument();

    await user.type(textarea, '테스트');
    expect(screen.getByText('3/500')).toBeInTheDocument();
  });

  it('유효한 댓글 제출이 올바르게 작동하는지 확인', async () => {
    const user = userEvent.setup();
    mockCreateComment.mockReturnValue({
      id: 1,
      postId: 1,
      content: '테스트 댓글',
      createdAt: '2024-01-01T12:00:00Z',
    });

    render(<CommentForm postId={1} onCommentAdded={mockOnCommentAdded} />);

    const textarea = screen.getByPlaceholderText('댓글을 입력하세요');
    const submitButton = screen.getByRole('button', { name: '댓글 작성' });

    await user.type(textarea, '테스트 댓글');
    await user.click(submitButton);

    expect(mockCreateComment).toHaveBeenCalledWith({
      postId: 1,
      content: '테스트 댓글',
    });
    expect(mockOnCommentAdded).toHaveBeenCalled();
    expect(textarea).toHaveValue('');
  });

  it('댓글 작성 실패 시 에러 메시지가 표시되는지 확인', async () => {
    const mockAlert = jest.fn();
    Object.defineProperty(window, 'alert', { value: mockAlert, writable: true });

    const user = userEvent.setup();
    mockCreateComment.mockImplementation(() => {
      throw new Error('댓글 작성 실패');
    });

    render(<CommentForm postId={1} onCommentAdded={mockOnCommentAdded} />);

    const textarea = screen.getByPlaceholderText('댓글을 입력하세요');
    const submitButton = screen.getByRole('button', { name: '댓글 작성' });

    await user.type(textarea, '테스트 댓글');
    await user.click(submitButton);

    expect(mockAlert).toHaveBeenCalledWith('댓글 작성에 실패했습니다.');
  });

  it('댓글 내용이 없을 때 제출 버튼이 비활성화되는지 확인', () => {
    render(<CommentForm postId={1} onCommentAdded={mockOnCommentAdded} />);

    const submitButton = screen.getByRole('button', { name: '댓글 작성' });
    expect(submitButton).toBeDisabled();
  });

  it('댓글 내용이 있을 때 제출 버튼이 활성화되는지 확인', async () => {
    const user = userEvent.setup();
    render(<CommentForm postId={1} onCommentAdded={mockOnCommentAdded} />);

    const textarea = screen.getByPlaceholderText('댓글을 입력하세요');
    const submitButton = screen.getByRole('button', { name: '댓글 작성' });

    await user.type(textarea, '테스트');
    expect(submitButton).toBeEnabled();
  });
});
