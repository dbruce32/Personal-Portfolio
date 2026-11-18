import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import SkillsPage from '@/app/skills/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/skills',
}));

describe('Skills Page', () => {
  it('renders the page title', () => {
    render(<SkillsPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Skills' })).toBeInTheDocument();
  });

  it('renders languages as their own section', () => {
    render(<SkillsPage />);
    const languages = screen.getByRole('region', { name: 'Languages' });
    expect(within(languages).getByText('Python')).toBeInTheDocument();
    expect(within(languages).getByText('Java')).toBeInTheDocument();
  });

  it('renders skill categories', () => {
    render(<SkillsPage />);
    [
      'Frontend',
      'Backend & Mobile',
      'Machine Learning',
      'Data Analysis',
      'Generative AI',
      'Databases & Cloud',
      'DevOps & CI/CD',
      'Quality & Workflow',
    ].forEach((name) => {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    });
  });

  it('places skills in the right categories', () => {
    render(<SkillsPage />);
    expect(within(screen.getByRole('region', { name: 'Frontend' })).getByText('React')).toBeInTheDocument();
    expect(within(screen.getByRole('region', { name: 'Machine Learning' })).getByText('PyTorch')).toBeInTheDocument();
    expect(within(screen.getByRole('region', { name: 'Databases & Cloud' })).getByText('PostgreSQL')).toBeInTheDocument();
    expect(within(screen.getByRole('region', { name: 'DevOps & CI/CD' })).getByText('Docker')).toBeInTheDocument();
    expect(within(screen.getByRole('region', { name: 'Quality & Workflow' })).getByText('Git')).toBeInTheDocument();
  });

  it('shows where each group of skills was used', () => {
    render(<SkillsPage />);
    expect(within(screen.getByRole('region', { name: 'Generative AI' })).getByText(/MathWorks/)).toBeInTheDocument();
  });
});
