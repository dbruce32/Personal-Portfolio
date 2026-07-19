import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/contact',
}));

describe('Contact Page', () => {
  it('renders the page title', () => {
    render(<ContactPage />);
    expect(screen.getByText('Hire me!!')).toBeInTheDocument();
  });

  it('renders contact cards', () => {
    render(<ContactPage />);
    expect(screen.getByText('Send an Email')).toBeInTheDocument();
    expect(screen.getByText('Connect on LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Github Repositories')).toBeInTheDocument();
  });

  it('renders contact links', () => {
    render(<ContactPage />);
    expect(screen.getByText('dylanbruce.cs@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('View Profile')).toBeInTheDocument();
    expect(screen.getByText('Browse GitHub')).toBeInTheDocument();
  });

  it('renders correct link hrefs', () => {
    render(<ContactPage />);
    const emailLink = screen.getByText('dylanbruce.cs@gmail.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:dylanbruce.cs@gmail.com');

    const githubLink = screen.getByText('Browse GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/dbruce32');
  });
});
