import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentItem from '../CommentItem';
import { Comment } from '@/types/comment';

const mockConfirm = jest.fn();
Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
  writable: true,
});

describe('CommentItem', () => {
  const mockComment: Comment = {
    id: 1,
    postId: 1,
    content: '테스트 댓글입니다',
    createdAt: '2024-01-01T12:00:00Z',
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
    mockConfirm.mockClear();
    mockConfirm.mockReturnValue(true);
  });

  it('댓글 내용이 올바르게 렌더링되는지 확인', () => {
    render(<CommentItem comment={mockComment} onDelete={mockOnDelete} />);

    expect(screen.getByText('테스트 댓글입니다')).toBeInTheDocument();
  });

  it('댓글 작성일이 올바르게 포맷되어 렌더링되는지 확인', () => {
    render(<CommentItem comment={mockComment} onDelete={mockOnDelete} />);

    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText(/1월/)).toBeInTheDocument();
  });

  it('삭제 버튼이 렌더링되는지 확인', () => {
    render(<CommentItem comment={mockComment} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    expect(deleteButton).toBeInTheDocument();
  });

  it('삭제 버튼 클릭 시 confirm이 표시되고 확인 시 onDelete가 호출되는지 확인', async () => {
    mockConfirm.mockReturnValue(true);
    const user = userEvent.setup();

    render(<CommentItem comment={mockComment} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    await user.click(deleteButton);

    expect(mockConfirm).toHaveBeenCalledWith('댓글을 삭제하시겠습니까?');
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('삭제 확인 창에서 취소 시 onDelete가 호출되지 않는지 확인', async () => {
    mockConfirm.mockReturnValue(false);
    const user = userEvent.setup();

    render(<CommentItem comment={mockComment} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    await user.click(deleteButton);

    expect(mockConfirm).toHaveBeenCalledWith('댓글을 삭제하시겠습니까?');
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('여러 줄 댓글이 올바르게 렌더링되는지 확인', () => {
    const multiLineComment: Comment = {
      ...mockComment,
      content: '첫 번째 줄\n두 번째 줄\n세 번째 줄',
    };

    render(<CommentItem comment={multiLineComment} onDelete={mockOnDelete} />);

    expect(screen.getByText('첫 번째 줄')).toBeInTheDocument();
    expect(screen.getByText('두 번째 줄')).toBeInTheDocument();
    expect(screen.getByText('세 번째 줄')).toBeInTheDocument();
  });

  it('댓글 컨테이너가 올바른 CSS 클래스를 가지는지 확인', () => {
    const { container } = render(<CommentItem comment={mockComment} onDelete={mockOnDelete} />);

    const commentItem = container.firstChild;
    expect(commentItem).toHaveClass('commentItem');
  });

  it('날짜 포맷팅이 한국 로케일로 올바르게 작동하는지 확인', () => {
    const specificDateComment: Comment = {
      ...mockComment,
      createdAt: '2024-03-15T14:30:00Z',
    };

    render(<CommentItem comment={specificDateComment} onDelete={mockOnDelete} />);

    expect(screen.getByText(/2024/)).toBeInTheDocument();
    expect(screen.getByText(/3월/)).toBeInTheDocument();
    expect(screen.getByText(/15/)).toBeInTheDocument();
  });
});
