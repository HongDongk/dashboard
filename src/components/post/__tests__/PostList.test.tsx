import { render, screen, waitFor } from '@testing-library/react';
import PostList from '../PostList';
import { Post } from '@/types/post';
import { PostStorageService } from '@/services/postService';

jest.mock('@/services/postService', () => ({
  PostStorageService: {
    getPosts: jest.fn(),
  },
}));

jest.mock('next/link', () => {
  return function MockedLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const mockGetPosts = PostStorageService.getPosts as jest.MockedFunction<typeof PostStorageService.getPosts>;

describe('PostList', () => {
  beforeEach(() => {
    mockGetPosts.mockClear();
  });

  it('게시글이 없을 때 빈 상태가 표시되는지 확인', async () => {
    mockGetPosts.mockReturnValue([]);

    render(<PostList searchQuery="" />);

    await waitFor(() => {
      expect(screen.getByText('아직 작성된 게시글이 없습니다')).toBeInTheDocument();
      expect(screen.getByText('첫 번째 게시글을 작성해보세요')).toBeInTheDocument();
    });
  });

  it('게시글 목록이 렌더링되는지 확인', async () => {
    const mockPosts: Post[] = [
      { id: 1, title: '첫 번째 게시글', content: '내용1', createdAt: '2024-01-01' },
      { id: 2, title: '두 번째 게시글', content: '내용2', createdAt: '2024-01-02' },
    ];

    mockGetPosts.mockReturnValue(mockPosts);

    render(<PostList searchQuery="" />);

    await waitFor(() => {
      expect(screen.getByText('첫 번째 게시글')).toBeInTheDocument();
      expect(screen.getByText('두 번째 게시글')).toBeInTheDocument();
    });
  });

  it('검색 기능이 작동하는지 확인', async () => {
    const mockPosts: Post[] = [
      { id: 1, title: '리액트 공부', content: '리액트는 재미있다', createdAt: '2024-01-01' },
      { id: 2, title: '뷰 공부', content: '뷰도 좋다', createdAt: '2024-01-02' },
    ];

    mockGetPosts.mockReturnValue(mockPosts);

    render(<PostList searchQuery="리액트" />);

    await waitFor(() => {
      expect(screen.getByText('리액트 공부')).toBeInTheDocument();
      expect(screen.queryByText('뷰 공부')).not.toBeInTheDocument();
    });
  });

  it('검색 결과가 없을 때 메시지가 표시되는지 확인', async () => {
    const mockPosts: Post[] = [{ id: 1, title: '리액트 공부', content: '내용', createdAt: '2024-01-01' }];

    mockGetPosts.mockReturnValue(mockPosts);

    render(<PostList searchQuery="존재하지않는검색어" />);

    await waitFor(() => {
      expect(screen.getByText('"존재하지않는검색어"에 대한 검색 결과가 없습니다')).toBeInTheDocument();
    });
  });
});
