import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../SearchBox';

describe('SearchBox', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('검색 입력 필드와 버튼이 렌더링되는지 확인', () => {
    render(<SearchBox onSearch={mockOnSearch} />);

    expect(screen.getByPlaceholderText('키워드를 검색하세요...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '검색' })).toBeInTheDocument();
  });

  it('검색어를 입력할 수 있는지 확인', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');
    await user.type(input, '테스트');

    expect(input).toHaveValue('테스트');
  });

  it('검색 버튼 클릭 시 onSearch가 호출되는지 확인', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');
    const searchButton = screen.getByRole('button', { name: '검색' });

    await user.type(input, '테스트');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('테스트');
  });

  it('Enter 키로 검색할 수 있는지 확인', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');

    await user.type(input, '테스트{enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('테스트');
  });

  it('검색어가 있을 때 클리어 버튼이 표시되는지 확인', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');

    expect(screen.queryByLabelText('검색어 지우기')).not.toBeInTheDocument();

    await user.type(input, '테스트');
    expect(screen.getByLabelText('검색어 지우기')).toBeInTheDocument();
  });

  it('클리어 버튼 클릭 시 검색어가 지워지고 onSearch가 호출되는지 확인', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');

    await user.type(input, '테스트');

    const clearButton = screen.getByLabelText('검색어 지우기');
    await user.click(clearButton);

    expect(input).toHaveValue('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  it('공백만 있는 검색어도 제출되는지 확인', async () => {
    const user = userEvent.setup();
    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('키워드를 검색하세요...');
    const searchButton = screen.getByRole('button', { name: '검색' });

    await user.type(input, '   ');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
