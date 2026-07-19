'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home', icon: 'fas fa-home' },
  { href: '/professional', label: 'Professional', icon: 'fas fa-user-tie' },
  { href: '/skills', label: 'Skills', icon: 'fas fa-code' },
  { href: '/projects', label: 'Projects', icon: 'fas fa-project-diagram' },
  { href: '/contact', label: 'Contact', icon: 'fas fa-paper-plane' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navContainer}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${styles.navItem} ${pathname === link.href ? styles.active : ''}`}
        >
          <i className={link.icon}></i> {link.label}
        </Link>
      ))}
    </nav>
  );
}
