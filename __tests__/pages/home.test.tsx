import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the ContourBackground since it uses browser APIs
jest.mock('@/components/ContourBackground/ContourBackground', () => {
  return function MockContourBackground() {
    return <svg data-testid="contour-bg" />;
  };
});

describe('Home Page', () => {
  it('renders the name', () => {
    render(<Home />);
    expect(screen.getByText('Dylan Bruce')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Home />);
    expect(screen.getByText(/CS student at Georgia Tech/)).toBeInTheDocument();
  });

  it('renders navigation cards', () => {
    render(<Home />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders tech stack tags', () => {
    render(<Home />);
    expect(screen.getByText('Technologies I Work With')).toBeInTheDocument();
    expect(screen.getAllByText(/Python/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/React/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Git/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the profile image', () => {
    render(<Home />);
    expect(screen.getByAltText('Dylan Bruce')).toBeInTheDocument();
  });
});
