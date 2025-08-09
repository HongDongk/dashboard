import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostDetail from '../PostDetail';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@/services/postService', () => ({
  PostStorageService: {
    getPostById: jest.fn(),
    deletePost: jest.fn(),
  },
}));

import { PostStorageService } from '@/services/postService';
const mockGetPostById = PostStorageService.getPostById as jest.MockedFunction<typeof PostStorageService.getPostById>;
const mockDeletePost = PostStorageService.deletePost as jest.MockedFunction<typeof PostStorageService.deletePost>;

describe('PostDetail', () => {
  beforeEach(() => {
    mockGetPostById.mockClear();
    mockDeletePost.mockClear();
    mockPush.mockClear();
  });

  it('게시글이 존재하지 않을 때 에러 메시지가 표시되는지 확인', async () => {
    mockGetPostById.mockReturnValue(null);

    render(<PostDetail postId="999" />);

    await waitFor(() => {
      expect(screen.getByText('게시글을 찾을 수 없습니다')).toBeInTheDocument();
    });
  });

  it('게시글이 올바르게 렌더링되는지 확인', async () => {
    const mockPost = {
      id: 1,
      title: '테스트 게시글',
      content: '테스트 내용입니다',
      createdAt: '2024-01-01',
    };

    mockGetPostById.mockReturnValue(mockPost);

    render(<PostDetail postId="1" />);

    await waitFor(() => {
      expect(screen.getByText('테스트 게시글')).toBeInTheDocument();
      expect(screen.getByText('테스트 내용입니다')).toBeInTheDocument();
      expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    });
  });

  it('삭제 버튼이 작동하는지 확인', async () => {
    const mockPost = {
      id: 1,
      title: '테스트 게시글',
      content: '테스트 내용',
      createdAt: '2024-01-01',
    };

    mockGetPostById.mockReturnValue(mockPost);
    mockDeletePost.mockReturnValue(true);

    const mockConfirm = jest.fn().mockReturnValue(true);
    Object.defineProperty(window, 'confirm', { value: mockConfirm });

    const user = userEvent.setup();
    render(<PostDetail postId="1" />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: '삭제' }));

    expect(mockConfirm).toHaveBeenCalled();
    expect(mockDeletePost).toHaveBeenCalledWith(1);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
