import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Skills',
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
