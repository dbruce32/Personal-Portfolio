import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href="https://github.com/dbruce32" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/dylan-bruce-261b101ba" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:dylanbruce.cs@gmail.com" aria-label="Email">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p className={styles.copyright}>&copy; {new Date().getFullYear()} Dylan Bruce. All rights reserved.</p>
    </footer>
  );
}
