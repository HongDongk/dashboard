import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostCreateForm from '../PostCreateForm';
import { PostStorageService } from '@/services/postService';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@/services/postService', () => ({
  PostStorageService: {
    createPost: jest.fn(),
  },
}));

const mockCreatePost = PostStorageService.createPost as jest.MockedFunction<typeof PostStorageService.createPost>;

describe('PostCreateForm', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockCreatePost.mockClear();
  });

  it('폼 요소들이 렌더링되는지 확인', () => {
    render(<PostCreateForm />);

    expect(screen.getByLabelText(/제목/)).toBeInTheDocument();
    expect(screen.getByLabelText(/내용/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '게시글 작성' })).toBeInTheDocument();
  });

  it('제목과 내용을 입력할 수 있는지 확인', async () => {
    const user = userEvent.setup();
    render(<PostCreateForm />);

    const titleInput = screen.getByLabelText(/제목/);
    const contentInput = screen.getByLabelText(/내용/);

    await user.type(titleInput, '테스트 제목');
    await user.type(contentInput, '테스트 내용');

    expect(titleInput).toHaveValue('테스트 제목');
    expect(contentInput).toHaveValue('테스트 내용');
  });

  it('유효한 폼 제출이 작동하는지 확인', async () => {
    const mockAlert = jest.fn();
    Object.defineProperty(window, 'alert', { value: mockAlert });

    mockCreatePost.mockReturnValue({
      id: 1,
      title: '테스트 제목',
      content: '테스트 내용',
      createdAt: '2024-01-01',
    });

    const user = userEvent.setup();
    render(<PostCreateForm />);

    await user.type(screen.getByLabelText(/제목/), '테스트 제목');
    await user.type(screen.getByLabelText(/내용/), '테스트 내용');
    await user.click(screen.getByRole('button', { name: '게시글 작성' }));

    expect(mockCreatePost).toHaveBeenCalledWith({
      title: '테스트 제목',
      content: '테스트 내용',
    });
    expect(mockAlert).toHaveBeenCalledWith('게시글이 성공적으로 작성되었습니다!');
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
