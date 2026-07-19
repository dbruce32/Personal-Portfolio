import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProjectsPage from '@/app/projects/page';

// Mock usePathname for Navbar
jest.mock('next/navigation', () => ({
  usePathname: () => '/projects',
}));

describe('Projects Page', () => {
  it('renders the page title', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('My Projects')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('A collection of my recent work and contributions')).toBeInTheDocument();
  });

  it('renders project cards', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Movie Revenue Prediction Model')).toBeInTheDocument();
    expect(screen.getByText('Travel App: WanderSync')).toBeInTheDocument();
  });

  it('renders skill tags', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Scikit-Learn')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  it('renders the source code link', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Source Code')).toBeInTheDocument();
  });
});
