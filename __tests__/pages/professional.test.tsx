import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProfessionalPage from '@/app/professional/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/professional',
}));

describe('Professional Page', () => {
  it('renders the page title', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText('Dylan Bruce - Timeline')).toBeInTheDocument();
  });

  it('renders the about section', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders the education section', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Georgia Institute of Technology')).toBeInTheDocument();
  });

  it('renders work experience timeline items', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText('Undergraduate Researcher')).toBeInTheDocument();
    expect(screen.getByText('Linear Algebra Teaching Assistant')).toBeInTheDocument();
    expect(screen.getByText('Discrete Mathematics Teaching Assistant')).toBeInTheDocument();
  });

  it('renders the download CV link', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText('Download CV')).toBeInTheDocument();
  });
});
