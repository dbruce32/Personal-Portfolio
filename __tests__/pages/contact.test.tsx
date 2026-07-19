import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
    expect(screen.getByText('github.com/dbruce32')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/in/dylangbruce')).toBeInTheDocument();
  });
});
