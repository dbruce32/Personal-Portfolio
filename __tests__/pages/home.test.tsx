import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock client components
jest.mock('@/components/ContourBackground/ContourBackground', () => {
  return function MockContourBackground() {
    return <svg data-testid="contour-bg" />;
  };
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Home Page', () => {
  it('renders the name', () => {
    render(<Home />);
    expect(screen.getByText('Dylan Bruce')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Home />);
    expect(screen.getByText(/Computer Science/)).toBeInTheDocument();
  });

  it('renders the profile image', () => {
    render(<Home />);
    expect(screen.getByAltText('Dylan Bruce')).toBeInTheDocument();
  });

  it('renders tech stack tags', () => {
    render(<Home />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });

  it('renders the navbar', () => {
    render(<Home />);
    expect(screen.getByText('DB')).toBeInTheDocument();
  });
});
