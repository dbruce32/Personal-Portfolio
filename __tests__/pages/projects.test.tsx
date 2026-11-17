import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProjectsPage from '@/app/projects/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/projects',
}));

describe('Projects Page', () => {
  it('renders the page title', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
  });

  it('renders project titles', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Movie Revenue Prediction Model')).toBeInTheDocument();
    expect(screen.getByText('WanderSync')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Machine learning model trained on TMDb/)).toBeInTheDocument();
    expect(screen.getByText(/Collaborative travel planning app/)).toBeInTheDocument();
  });

  it('renders tech tags', () => {
    render(<ProjectsPage />);
    expect(screen.getAllByText('Python').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Scikit-Learn')).toBeInTheDocument();
    expect(screen.getByText('Firebase')).toBeInTheDocument();
  });

  it('renders the featured ARC-AGI project', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'ARC-AGI Solver' })).toBeInTheDocument();
    expect(screen.getByText('30/400')).toBeInTheDocument();
  });

  it('renders the research section', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Research' })).toBeInTheDocument();
    expect(screen.getByText('Plankton Classification')).toBeInTheDocument();
    expect(screen.getByText('Salmon Scale Age Estimation')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('My role')).toBeInTheDocument();
    expect(screen.getByText('FishCast')).toBeInTheDocument();
    expect(screen.getByText(/from 50% to 82%/)).toBeInTheDocument();
  });

  it('renders GitHub links', () => {
    render(<ProjectsPage />);
    const links = screen.getAllByLabelText('GitHub');
    expect(links[0]).toHaveAttribute('href', 'https://github.com/dbruce32/ARC-Prize-DSL-Solver');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/dbruce32/Movie-Success-Prediction');
  });
});
