import { render, screen } from '@testing-library/react';
import PostItem from '../PostItem';

jest.mock('next/link', () => {
  return function MockedLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('PostItem', () => {
  const mockProps = {
    id: 1,
    title: '테스트 게시글',
    createdAt: '2024-01-01',
  };

  it('게시글 제목과 날짜가 렌더링되는지 확인', () => {
    render(<PostItem {...mockProps} />);

    expect(screen.getByText('테스트 게시글')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
  });

  it('올바른 링크가 생성되는지 확인', () => {
    render(<PostItem {...mockProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/posts/1');
  });
});
