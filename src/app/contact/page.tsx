import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Contact',
};

const contactCards = [
  {
    icon: 'fas fa-envelope',
    title: 'Send an Email',
    description: 'Drop me a line directly. I typically respond within 24 hours and love discussing new opportunities.',
    linkText: 'dylanbruce.cs@gmail.com',
    linkHref: 'mailto:dylanbruce.cs@gmail.com',
  },
  {
    icon: 'fab fa-linkedin',
    title: 'Connect on LinkedIn',
    description: "Let's network professionally! Check out my experience and connect for career opportunities.",
    linkText: 'View Profile',
    linkHref: 'https://www.linkedin.com/in/dylan-bruce-261b101ba',
  },
  {
    icon: 'fab fa-github',
    title: 'Github Repositories',
    description: 'Look at my work! See my coding style and skills in action.',
    linkText: 'Browse GitHub',
    linkHref: 'https://github.com/dbruce32',
  },
];

export default function ContactPage() {
  return (
    <div className={styles.body}>
      <Navbar />

      <header className={styles.header}>
        <h1 className={styles.title}>Hire me!!</h1>
        <p className={styles.tagline}>Please reach out! I&apos;d love to hear from you.</p>
      </header>

      <div className={styles.contactContainer}>
        <div className={styles.contactGrid}>
          {contactCards.map((card) => (
            <div key={card.title} className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className={card.icon}></i>
              </div>
              <h3 className={styles.contactTitle}>{card.title}</h3>
              <p className={styles.contactDescription}>{card.description}</p>
              <a
                href={card.linkHref}
                target={card.linkHref.startsWith('mailto') ? undefined : '_blank'}
                rel={card.linkHref.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={styles.contactLink}
              >
                {card.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
