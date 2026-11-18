import Navbar from '@/components/Navbar/Navbar';
import ContourBackground from '@/components/ContourBackground/ContourBackground';
import LiveClock from '@/components/LiveClock/LiveClock';
import Magnetic from '@/components/Magnetic/Magnetic';
import BouncyPhoto from '@/components/BouncyPhoto/BouncyPhoto';
import Footer from '@/components/Footer/Footer';
import { getAssetPath } from '@/lib/basePath';
import styles from './page.module.css';

const currently = [
  'Graduating with my B.S. in May 2027',
  'Working as a Teaching Assistant for Objects & Design (CS 2340)',
];

export default function Home() {
  return (
    <div className={styles.body}>
      <Navbar />
      <ContourBackground />

      <main className={styles.main}>
        <div className={styles.text}>
          <p className={styles.kicker}>Software Engineer · Machine Learning Research</p>

          <Magnetic strength={0.15}>
            <h1 className={styles.name}>Dylan Bruce</h1>
          </Magnetic>

          <p className={styles.tagline}>
            Computer Science &amp; Mathematics at Georgia Tech
          </p>

          <section className={styles.currently} aria-labelledby="currently-title">
            <h2 id="currently-title" className={styles.currentlyTitle}>Currently</h2>
            <ul className={styles.currentlyList}>
              {currently.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div className={styles.clockRow}>
            <LiveClock />
          </div>
        </div>

        <figure className={styles.photo}>
          <BouncyPhoto
            src={getAssetPath('/images/db.png')}
            alt="Dylan Bruce"
            size={220}
            className={styles.profileImage}
          />
          {/* <figcaption className={styles.caption}>fig. 1 — click me</figcaption> */}
        </figure>
      </main>
      <Footer />
    </div>
  );
}
