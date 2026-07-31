import Navbar from '@/components/Navbar/Navbar';
import ContourBackground from '@/components/ContourBackground/ContourBackground';
import LiveClock from '@/components/LiveClock/LiveClock';
import Magnetic from '@/components/Magnetic/Magnetic';
import BouncyPhoto from '@/components/BouncyPhoto/BouncyPhoto';
import Footer from '@/components/Footer/Footer';
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
          <BouncyPhoto
            src={getAssetPath("/images/db.png")}
            alt="Dylan Bruce"
            size={160}
            className={styles.profileImage}
          />
        </div>

        <Magnetic strength={0.15}>
          <h1 className={styles.name}>Dylan Bruce</h1>
        </Magnetic>

        <p className={styles.tagline}>
          Computer Science &amp; Mathematics at Georgia Tech.
        </p>

        <div className={styles.techGrid}>
          {techStack.map((tech) => (
            <Magnetic key={tech.name} strength={0.4}>
              <span className={styles.techTag}>
                <i className={tech.icon}></i> {tech.name}
              </span>
            </Magnetic>
          ))}
        </div>

        <div className={styles.currently}>
          <h2 className={styles.currentlyTitle}>Currently</h2>
          <ul className={styles.currentlyList}>
            <li>Building operational dashboards at Walmart Global Tech</li>
          </ul>
        </div>

        <LiveClock />
      </main>
      <Footer />
    </div>
  );
}
