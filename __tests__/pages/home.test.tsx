import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('@/components/ContourBackground/ContourBackground', () => {
  return function MockContourBackground() {
    return <svg data-testid="contour-bg" />;
  };
});

jest.mock('@/components/LiveClock/LiveClock', () => {
  return function MockLiveClock() {
    return <div data-testid="live-clock">Clock</div>;
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

  it('renders the live clock', () => {
    render(<Home />);
    expect(screen.getByTestId('live-clock')).toBeInTheDocument();
  });
});
