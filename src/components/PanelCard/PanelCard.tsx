import Link from 'next/link';
import styles from './PanelCard.module.css';

interface PanelCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  variant: 'skills' | 'projects' | 'experience' | 'contact';
}

export default function PanelCard({ icon, title, description, href, variant }: PanelCardProps) {
  return (
    <Link href={href} className={`${styles.panelCard} ${styles[variant]}`}>
      <i className={`${icon} ${styles.cardIcon}`}></i>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </Link>
  );
}
