import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchContainer from '../SearchContainer';

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

import { PostStorageService } from '@/services/postService';
const mockGetPosts = PostStorageService.getPosts as jest.MockedFunction<typeof PostStorageService.getPosts>;

describe('SearchContainer', () => {
  beforeEach(() => {
    mockGetPosts.mockClear();
  });

  it('초기 상태에서 "최근 게시글" 제목이 표시되는지 확인', () => {
    mockGetPosts.mockReturnValue([]);

    render(<SearchContainer />);

    expect(screen.getByText('최근 게시글')).toBeInTheDocument();
  });

  it('검색박스와 게시글 목록이 렌더링되는지 확인', () => {
    mockGetPosts.mockReturnValue([]);

    render(<SearchContainer />);

    expect(screen.getByPlaceholderText('키워드를 검색하세요...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '검색' })).toBeInTheDocument();
  });

  it('검색 시 제목이 변경되는지 확인', async () => {
    mockGetPosts.mockReturnValue([]);

    const user = userEvent.setup();
    render(<SearchContainer />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');
    const searchButton = screen.getByRole('button', { name: '검색' });

    await user.type(input, '리액트');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText("'리액트' 검색 결과")).toBeInTheDocument();
    });
  });

  it('검색어를 지우면 다시 "최근 게시글"로 돌아가는지 확인', async () => {
    mockGetPosts.mockReturnValue([]);

    const user = userEvent.setup();
    render(<SearchContainer />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');

    await user.type(input, '리액트');
    await user.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(screen.getByText("'리액트' 검색 결과")).toBeInTheDocument();
    });

    const clearButton = screen.getByLabelText('검색어 지우기');
    await user.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText('최근 게시글')).toBeInTheDocument();
    });
  });

  it('게시글 목록에 검색 쿼리가 전달되는지 확인', async () => {
    const mockPosts = [
      { id: 1, title: '리액트 공부', content: '내용', createdAt: '2024-01-01' },
      { id: 2, title: '뷰 공부', content: '내용', createdAt: '2024-01-02' },
    ];

    mockGetPosts.mockReturnValue(mockPosts);

    const user = userEvent.setup();
    render(<SearchContainer />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');

    await user.type(input, '리액트');
    await user.click(screen.getByRole('button', { name: '검색' }));

    await waitFor(() => {
      expect(screen.getByText('리액트 공부')).toBeInTheDocument();
      expect(screen.queryByText('뷰 공부')).not.toBeInTheDocument();
    });
  });

  it('빈 검색어로 검색해도 에러가 발생하지 않는지 확인', async () => {
    mockGetPosts.mockReturnValue([]);

    const user = userEvent.setup();
    render(<SearchContainer />);

    const searchButton = screen.getByRole('button', { name: '검색' });

    await user.click(searchButton);

    expect(screen.getByText('최근 게시글')).toBeInTheDocument();
  });

  it('컴포넌트가 에러 없이 마운트되는지 확인', () => {
    mockGetPosts.mockReturnValue([]);

    expect(() => render(<SearchContainer />)).not.toThrow();
  });
});
