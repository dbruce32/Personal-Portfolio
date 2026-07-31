import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Projects',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
