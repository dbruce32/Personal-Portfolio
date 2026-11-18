import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
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
    expect(screen.getByText(/Predicts box office revenue from TMDb metadata/)).toBeInTheDocument();
    expect(screen.getByText(/Collaborative travel planning app/)).toBeInTheDocument();
  });

  it('renders tech tags', () => {
    render(<ProjectsPage />);
    expect(screen.getAllByText('Python').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Scikit-Learn')).toBeInTheDocument();
    expect(screen.getByText('Firebase')).toBeInTheDocument();
  });

  it('renders the ARC-AGI project under Current', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Current' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'ARC-AGI Solver' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Salmon Scale Age Estimation' })).toBeInTheDocument();
    const current = screen.getByRole('region', { name: 'Current' });
    expect(current).toHaveTextContent('ARC-AGI Solver');
    expect(current).toHaveTextContent('Salmon Scale Age Estimation');
  });

  it('renders the research section', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Research' })).toBeInTheDocument();
    expect(screen.getByText('Plankton Classification')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Research' })).not.toHaveTextContent('Salmon');
    expect(screen.getByRole('region', { name: 'Research' })).toHaveTextContent('My role');
    expect(screen.getByTitle('Plankton Classification demo')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/kbhKBLz08vo'
    );
    expect(screen.getByText('FishCast')).toBeInTheDocument();
    expect(screen.getByText(/from 50% to 82%/)).toBeInTheDocument();
  });

  it('embeds the PogoDB live site', () => {
    render(<ProjectsPage />);
    expect(screen.getByAltText('PogoDB home page')).toHaveAttribute('src', '/images/pogo-db-preview.jpg');
    expect(screen.getByLabelText('Open PogoDB live site')).toHaveAttribute('href', 'https://pogo-db.com/');
    const liveLinks = screen.getAllByRole('link', { name: 'Live Site' }).map((el) => el.getAttribute('href'));
    expect(liveLinks).toContain('https://pogo-db.com/');
  });

  it('renders the MSM Lookup project', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 3, name: 'MSM Lookup' })).toBeInTheDocument();
    expect(screen.getByAltText('MSM Lookup home page')).toHaveAttribute('src', '/images/msm-lookup-preview.jpg');
    expect(screen.getByLabelText('Open MSM Lookup live site')).toHaveAttribute(
      'href',
      'https://dbruce32.github.io/msm-lookup/'
    );
  });

  it('links the movie prediction project report', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('link', { name: 'Project Report' })).toHaveAttribute(
      'href',
      'https://dbruce32.github.io/Movie-Success-Prediction/'
    );
    expect(screen.getByAltText('Movie Revenue Prediction Model home page')).toBeInTheDocument();
  });

  it('renders a section sidebar linking to each section', () => {
    render(<ProjectsPage />);
    const nav = screen.getByRole('navigation', { name: 'Project sections' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((l) => l.getAttribute('href'))).toEqual(['#current', '#research', '#past']);
    expect(within(nav).getByText('Past Projects')).toBeInTheDocument();
    expect(document.getElementById('past')).toHaveTextContent('PogoDB');
  });

  it('renders GitHub links', () => {
    render(<ProjectsPage />);
    const links = screen.getAllByRole('link', { name: 'GitHub' });
    expect(links[0]).toHaveAttribute('href', 'https://github.com/dbruce32/ARC-Prize-DSL-Solver');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/dbruce32/Movie-Success-Prediction');
  });
});
