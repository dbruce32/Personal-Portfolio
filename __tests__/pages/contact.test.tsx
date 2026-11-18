import '@testing-library/jest-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/contact',
}));

describe('Contact Page', () => {
  it('renders the page title', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Contact' })).toBeInTheDocument();
  });

  it('renders the terminal', () => {
    render(<ContactPage />);
    expect(screen.getByText(/dylan@portfolio/)).toBeInTheDocument();
  });

  it('renders the terminal input', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText('Terminal input')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<ContactPage />);
    expect(screen.getByText('dylanbruce.cs@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('dbruce32')).toBeInTheDocument();
    expect(screen.getByText('dylangbruce')).toBeInTheDocument();
  });

  it('links each contact channel', () => {
    render(<ContactPage />);
    const channels = screen.getByRole('region', { name: 'Contact channels' });
    const hrefs = within(channels).getAllByRole('link').map((l) => l.getAttribute('href'));
    expect(hrefs).toEqual([
      'mailto:dylanbruce.cs@gmail.com',
      'https://www.linkedin.com/in/dylangbruce',
      'https://github.com/dbruce32',
    ]);
  });

  it('answers terminal commands', () => {
    render(<ContactPage />);
    const input = screen.getByLabelText('Terminal input');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });
});
