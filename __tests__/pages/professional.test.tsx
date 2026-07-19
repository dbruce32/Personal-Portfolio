import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProfessionalPage from '@/app/professional/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/professional',
}));

describe('Professional Page', () => {
  it('renders the page title', () => {
    render(<ProfessionalPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Professional' })).toBeInTheDocument();
  });

  it('renders the summary', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText(/Third-year CS major/)).toBeInTheDocument();
  });

  it('renders the resume download link', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText(/Download Resume/)).toBeInTheDocument();
  });

  it('renders education section', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('B.S. Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Georgia Institute of Technology')).toBeInTheDocument();
  });

  it('renders experience items', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText('Undergraduate Researcher')).toBeInTheDocument();
    expect(screen.getByText('Linear Algebra Teaching Assistant')).toBeInTheDocument();
    expect(screen.getByText('Discrete Math Teaching Assistant')).toBeInTheDocument();
  });
});
