import Image from 'next/image';
import Navbar from '@/components/Navbar/Navbar';
import ContourBackground from '@/components/ContourBackground/ContourBackground';
import { getAssetPath } from '@/lib/basePath';
import styles from './page.module.css';

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
      <Navbar />
      <ContourBackground />

      <main className={styles.main}>
        <div className={styles.profileImageContainer}>
          <Image
            src={getAssetPath("/images/db.png")}
            alt="Dylan Bruce"
            width={160}
            height={160}
            className={styles.profileImage}
            priority
            unoptimized
          />
        </div>

        <h1 className={styles.name}>Dylan Bruce</h1>
        <p className={styles.tagline}>
          Computer Science &amp; Mathematics at Georgia Tech.
          <br />
          Focused on software engineering and data analysis.
        </p>

        <div className={styles.techGrid}>
          {techStack.map((tech) => (
            <span key={tech.name} className={styles.techTag}>
              <i className={tech.icon}></i> {tech.name}
            </span>
          ))}
        </div>
      </main>
    </div>
  );
}
