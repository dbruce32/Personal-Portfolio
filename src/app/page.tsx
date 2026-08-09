import Navbar from '@/components/Navbar/Navbar';
import ContourBackground from '@/components/ContourBackground/ContourBackground';
import LiveClock from '@/components/LiveClock/LiveClock';
import Magnetic from '@/components/Magnetic/Magnetic';
import BouncyPhoto from '@/components/BouncyPhoto/BouncyPhoto';
import Footer from '@/components/Footer/Footer';
import { getAssetPath } from '@/lib/basePath';
import styles from './page.module.css';

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
