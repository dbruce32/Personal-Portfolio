import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Projects',
};

const projects = [
  {
    title: 'PogoDB',
    description:
      'Community-driven Pokémon GO database and companion tool. I built the custom static JSON API that powers it — fetching upstream data, computing DPS/STAB stats at build time, and deploying per-Pokémon endpoints to GitHub Pages.',
    tags: ['TypeScript', 'Node.js', 'GitHub Actions', 'REST API', 'Vitest'],
    links: [
      { label: 'Main Project', href: 'https://github.com/S-Tier-Devs/pogo-db', icon: 'fab fa-github' },
      { label: 'API', href: 'https://github.com/S-Tier-Devs/pogo-db-api', icon: 'fas fa-server' },
    ],
  },
  {
    title: 'FishCast',
    description:
      'Climate-fishery forecasting using RNNs (LSTMs) in PyTorch to predict shifts in marine species distributions. Developed with Georgia Tech PACE Supercomputing resources.',
    tags: ['Python', 'PyTorch', 'LSTM', 'Data Analysis'],
    links: [],
  },
  {
    title: 'News2Lang',
    description:
      'AI-powered language learning platform built with WebDev@GT. Uses NLP and LLMs to extract phrases from real news, highlight context, and provide simplified explanations.',
    tags: ['Next.js', 'Tailwind', 'Supabase', 'OpenAI', 'NLP'],
    links: [],
  },
  {
    title: 'Movie Revenue Prediction Model',
    description:
      'Machine learning model trained on TMDb data to predict movie revenue from ratings, release timing, and genre features. Built end-to-end — data cleaning, feature engineering, model selection, and evaluation.',
    tags: ['Python', 'Scikit-Learn', 'NumPy', 'Keras'],
    links: [
      { label: 'GitHub', href: 'https://github.com/dbruce32/Movie-Success-Prediction', icon: 'fab fa-github' },
    ],
  },
  {
    title: 'WanderSync',
    description:
      'Collaborative travel planning app developed in a team of five for CS 2340. Users create trips, share itineraries, and coordinate logistics in real time.',
    tags: ['Java', 'Firebase', 'Android Studio', 'XML', 'Agile'],
    links: [],
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.body}>
      <Navbar />

      <div className={styles.content}>
        <section className={styles.intro}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Things I&apos;ve built and contributed to.</p>
        </section>

        <div className={styles.projectList}>
          {projects.map((project) => (
            <article key={project.title} className={styles.project}>
              <div className={styles.projectHeader}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                {project.links.length > 0 && (
                  <div className={styles.projectLinks}>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                        aria-label={link.label}
                      >
                        <i className={link.icon}></i>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <p className={styles.projectDesc}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
