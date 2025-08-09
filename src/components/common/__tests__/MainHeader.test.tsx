import { render, screen } from '@testing-library/react';
import MainHeader from '../MainHeader';

jest.mock('next/link', () => {
  return function MockedLink({ children, href, className, ...props }: any) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  };
});

describe('MainHeader', () => {
  it('헤더가 올바르게 렌더링되는지 확인', () => {
    render(<MainHeader />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('Dashboard 제목이 올바르게 렌더링되는지 확인', () => {
    render(<MainHeader />);

    const title = screen.getByText('Dashboard');
    expect(title).toBeInTheDocument();
  });

  it('Dashboard 제목이 홈페이지로 가는 링크인지 확인', () => {
    render(<MainHeader />);

    const titleLink = screen.getByRole('link', { name: 'Dashboard' });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', '/');
  });

  it('헤더에 올바른 CSS 클래스가 적용되는지 확인', () => {
    render(<MainHeader />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
  });

  it('컨테이너 div가 올바른 CSS 클래스를 가지는지 확인', () => {
    render(<MainHeader />);

    const container = screen.getByRole('banner').querySelector('div');
    expect(container).toHaveClass('container');
  });

  it('제목 링크가 올바른 CSS 클래스를 가지는지 확인', () => {
    render(<MainHeader />);

    const titleLink = screen.getByRole('link', { name: 'Dashboard' });
    expect(titleLink).toHaveClass('title');
  });

  it('컴포넌트가 에러 없이 마운트되는지 확인', () => {
    expect(() => render(<MainHeader />)).not.toThrow();
  });
});
