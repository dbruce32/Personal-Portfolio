import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Professional',
};

export default function ProfessionalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
