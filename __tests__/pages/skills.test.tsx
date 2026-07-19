import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SkillsPage from '@/app/skills/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/skills',
}));

describe('Skills Page', () => {
  it('renders the page title', () => {
    render(<SkillsPage />);
    expect(screen.getByText('My Skills')).toBeInTheDocument();
  });

  it('renders skill categories', () => {
    render(<SkillsPage />);
    expect(screen.getByText('Backend Skills')).toBeInTheDocument();
    expect(screen.getByText('Frontend Skills')).toBeInTheDocument();
    expect(screen.getByText('Tools & Practices')).toBeInTheDocument();
    expect(screen.getByText('Libraries')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
  });

  it('renders individual skills', () => {
    render(<SkillsPage />);
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
    expect(screen.getByText('MySQL')).toBeInTheDocument();
  });
});
