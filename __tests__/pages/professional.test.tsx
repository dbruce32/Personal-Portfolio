import '@testing-library/jest-dom';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
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
    expect(screen.getByText(/CS major and math minor at Georgia Tech/)).toBeInTheDocument();
  });

  it('renders education section', () => {
    render(<ProfessionalPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Education' })).toBeInTheDocument();
    expect(screen.getByText(/B.S. Computer Science/)).toBeInTheDocument();
    expect(screen.getByText('Georgia Institute of Technology')).toBeInTheDocument();
  });

  it('renders awards and activities', () => {
    render(<ProfessionalPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Awards & Activities' })).toBeInTheDocument();
    expect(screen.getByText('National Merit Scholar')).toBeInTheDocument();
    expect(screen.getByText('WebDev @ GT')).toBeInTheDocument();
  });

  it('renders experience items', () => {
    render(<ProfessionalPage />);
    expect(screen.getByText('Software Engineer II Intern')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer Intern')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning Researcher')).toBeInTheDocument();
    expect(screen.getByText('Linear Algebra Teaching Assistant')).toBeInTheDocument();
    expect(screen.getByText('Discrete Math Teaching Assistant')).toBeInTheDocument();
    expect(screen.getByText('Walmart Global Tech')).toBeInTheDocument();
    expect(screen.getByText('MathWorks')).toBeInTheDocument();
  });

  it('groups experience into Industry, Research & Teaching, and Earlier timelines', () => {
    render(<ProfessionalPage />);
    const industry = within(screen.getByRole('region', { name: 'Industry' })).getAllByRole('listitem');
    expect(industry).toHaveLength(2);
    expect(industry[0]).toHaveTextContent('Walmart Global Tech');
    expect(industry[0]).toHaveTextContent('May 2026 – Aug 2026');
    expect(industry[1]).toHaveTextContent('MathWorks');

    const academic = within(screen.getByRole('region', { name: 'Research & Teaching' })).getAllByRole('listitem');
    expect(academic.map((li) => li.querySelector('h3')?.textContent)).toEqual([
      'Objects & Design Teaching Assistant',
      'Machine Learning Researcher',
      'Linear Algebra Teaching Assistant',
      'Discrete Math Teaching Assistant',
    ]);

    const earlier = within(screen.getByRole('region', { name: 'Earlier' })).getAllByRole('listitem');
    expect(earlier).toHaveLength(2);
    expect(earlier[0]).toHaveTextContent('Arditi Pizzeria');
  });

  it('links to the resume and LinkedIn', () => {
    render(<ProfessionalPage />);
    expect(screen.getByRole('link', { name: /View resume/ })).toHaveAttribute('href', '/documents/dylan_bruce_resume.pdf');
    const linkedIn = screen.getAllByRole('link', { name: /LinkedIn/ }).map((l) => l.getAttribute('href'));
    expect(linkedIn).toContain('https://www.linkedin.com/in/dylangbruce');
  });

  it('shows a photo for each internship and TA role', () => {
    render(<ProfessionalPage />);
    expect(screen.getByAltText("Sam's Club summer interns posing with Sam's Club CEO Latriece Watkins")).toHaveAttribute(
      'src',
      '/images/roles/walmart-sams-club-interns.jpg'
    );
    expect(screen.getByText("Sam's Club interns with CEO Latriece Watkins · Bentonville, AR")).toBeInTheDocument();
    expect(screen.queryAllByRole('img', { name: /Photo coming soon/ })).toHaveLength(0);
    expect(screen.getByRole('button', { name: /Enlarge photo: CS 2050/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enlarge photo: MathWorks interns/ })).toBeInTheDocument();
    expect(screen.getByText('CS 2340 with Dr. Pedro Guillermo Feijóo-García · Georgia Tech')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enlarge photo: CS 2340/ })).toBeInTheDocument();
  });

  it('enlarges a role photo on click and closes on outside click', async () => {
    render(<ProfessionalPage />);
    fireEvent.click(screen.getByRole('button', { name: /Enlarge photo: Sam's Club/ }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    fireEvent.click(dialog);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes the enlarged photo with Escape', async () => {
    render(<ProfessionalPage />);
    fireEvent.click(screen.getByRole('button', { name: /Enlarge photo: Sam's Club/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('has a section index for the whole page with Experience sub-sections', () => {
    render(<ProfessionalPage />);
    const nav = screen.getByRole('navigation', { name: 'Professional sections' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((l) => l.textContent)).toEqual([
      'Education',
      'Awards & Activities',
      'Experience',
      'Industry',
      'Research & Teaching',
      'Earlier',
    ]);
    links.forEach((l) => {
      expect(document.getElementById(l.getAttribute('href')!.slice(1))).not.toBeNull();
    });
  });
});
