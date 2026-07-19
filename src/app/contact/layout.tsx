import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Contact',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
