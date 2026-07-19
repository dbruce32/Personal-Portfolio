import Link from 'next/link';
import Image from 'next/image';
import ContourBackground from '@/components/ContourBackground/ContourBackground';
import styles from './page.module.css';

const cards = [
  {
    icon: 'fas fa-code',
    title: 'Technical Skills',
    description: 'Python, Java, React, machine learning frameworks, and more.',
    href: '/skills',
  },
  {
    icon: 'fas fa-rocket',
    title: 'Projects',
    description: 'ML models, web apps, and collaborative development work.',
    href: '/projects',
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Experience',
    description: 'Teaching, research, and professional development at Georgia Tech.',
    href: '/professional',
  },
  {
    icon: 'fas fa-paper-plane',
    title: 'Contact',
    description: 'Open to opportunities, collaborations, and conversations.',
    href: '/contact',
  },
];

const techStack = [
  { icon: 'fab fa-python', name: 'Python' },
  { icon: 'fab fa-java', name: 'Java' },
  { icon: 'fab fa-js-square', name: 'JavaScript' },
  { icon: 'fab fa-react', name: 'React' },
  { icon: 'fas fa-database', name: 'SQL' },
  { icon: 'fab fa-git-alt', name: 'Git' },
  { icon: 'fab fa-docker', name: 'Docker' },
];

export default function Home() {
  return (
    <div className={styles.body}>
      <ContourBackground />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.profileImageContainer}>
          <Image
            src="/images/db.png"
            alt="Dylan Bruce"
            width={180}
            height={180}
            className={styles.profileImage}
            priority
          />
        </div>

        <p className={styles.greeting}>Hey, I&apos;m</p>
        <h1 className={styles.name}>Dylan Bruce</h1>
        <p className={styles.tagline}>
          CS student at Georgia Tech building things at the intersection of software engineering and data analysis.
        </p>
      </section>

      {/* Navigation Cards */}
      <section className={styles.cardsSection}>
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className={styles.card}>
              <div className={styles.cardIcon}>
                <i className={card.icon}></i>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.techSection}>
        <p className={styles.techTitle}>Technologies I Work With</p>
        <div className={styles.techGrid}>
          {techStack.map((tech) => (
            <span key={tech.name} className={styles.techTag}>
              <i className={tech.icon}></i> {tech.name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
