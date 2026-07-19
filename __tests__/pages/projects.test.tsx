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
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Scikit-Learn')).toBeInTheDocument();
    expect(screen.getByText('Firebase')).toBeInTheDocument();
  });

  it('renders GitHub link for first project', () => {
    render(<ProjectsPage />);
    const links = screen.getAllByLabelText('GitHub');
    expect(links[0]).toHaveAttribute('href', 'https://github.com/dbruce32/Movie-Success-Prediction');
  });
});
