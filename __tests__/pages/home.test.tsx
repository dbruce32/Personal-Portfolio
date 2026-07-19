import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the ParticleCanvas since it uses canvas APIs
jest.mock('@/components/ParticleCanvas/ParticleCanvas', () => {
  return function MockParticleCanvas() {
    return <canvas data-testid="particle-canvas" />;
  };
});

describe('Home Page', () => {
  it('renders the hero title', () => {
    render(<Home />);
    const elements = screen.getAllByText('DYLAN BRUCE');
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the role subtitle', () => {
    render(<Home />);
    expect(screen.getByText(/Software Engineering/)).toBeInTheDocument();
  });

  it('renders the hero description', () => {
    render(<Home />);
    expect(screen.getByText(/Georgia Tech Computer Science student/)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Home />);
    expect(screen.getByText(/View My Work/)).toBeInTheDocument();
    expect(screen.getByText(/Connect/)).toBeInTheDocument();
  });

  it('renders all panel cards', () => {
    render(<Home />);
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    expect(screen.getByText('Education & Experience')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('renders tech stack items', () => {
    render(<Home />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
