import Link from 'next/link';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import ParticleCanvas from '@/components/ParticleCanvas/ParticleCanvas';
import IntroAnimation from '@/components/IntroAnimation/IntroAnimation';
import PanelCard from '@/components/PanelCard/PanelCard';
import styles from './page.module.css';

const techStack = [
  { icon: 'fab fa-python', name: 'Python', color: '#3776ab' },
  { icon: 'fab fa-js-square', name: 'JavaScript', color: '#f7df1e' },
  { icon: 'fab fa-react', name: 'React', color: '#61dafb' },
  { icon: 'fab fa-java', name: 'Java', color: '#FFFFFF' },
  { icon: 'fas fa-database', name: 'SQL', color: '#336791' },
  { icon: 'fab fa-git-alt', name: 'Git', color: '#f05032' },
  { icon: 'fas fa-chart-line', name: 'Analytics', color: '#2ec4b6' },
];

export default function Home() {
  return (
    <div className={styles.body}>
      <IntroAnimation />
      <AnimatedBackground />
      <ParticleCanvas />

      <div className={styles.mainContainer}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.profileSection}>
            <div className={styles.profileImageContainer}>
              <img
                src="/images/db.png"
                alt="Dylan Bruce"
                className={styles.profileImage}
              />
              <div className={styles.profileRing}></div>
            </div>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroName}>DYLAN BRUCE</span>
            <span className={styles.heroRole}>Software Engineering &amp; Data Analysis</span>
          </h1>

          <p className={styles.heroDescription}>
            Georgia Tech Computer Science student specializing in Intelligence and Information Internetworks.
            Driven to build adaptive projects to learn and solve real-world problems.
          </p>

          <div className={styles.heroActions}>
            <Link href="/projects" className={styles.btnPrimary}>
              <i className="fas fa-rocket"></i> View My Work
            </Link>
            <Link href="/contact" className={styles.btnSecondary}>
              <i className="fas fa-paper-plane"></i> Let&apos;s Connect!
            </Link>
          </div>
        </div>

        {/* Interactive Panel */}
        <div className={styles.interactivePanel}>
          <div className={styles.panelGrid}>
            <PanelCard
              icon="fas fa-cogs"
              title="Technical Skills"
              description="Full-stack development, machine learning frameworks, and mathematical computing"
              href="/skills"
              variant="skills"
            />
            <PanelCard
              icon="fas fa-code-branch"
              title="Featured Projects"
              description="Web applications, ML models, and more..."
              href="/projects"
              variant="projects"
            />
            <PanelCard
              icon="fas fa-graduation-cap"
              title="Education & Experience"
              description="Academic journey and professional development"
              href="/professional"
              variant="experience"
            />
            <PanelCard
              icon="fas fa-network-wired"
              title="Get In Touch"
              description="Open to collaborations, internships, and interesting conversations"
              href="/contact"
              variant="contact"
            />
          </div>

          <div className={styles.skillsShowcase}>
            <h3 className={styles.showcaseTitle}>Basic Tech Stack</h3>
            <div className={styles.techGrid}>
              {techStack.map((tech) => (
                <div key={tech.name} className={styles.techItem}>
                  <i className={`${tech.icon} ${styles.techIcon}`} style={{ color: tech.color }}></i>
                  <span className={styles.techName}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
