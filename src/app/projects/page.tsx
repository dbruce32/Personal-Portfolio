import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'DYLAN BRUCE - Projects',
};

const projects = [
  {
    title: 'Movie Revenue Prediction Model',
    description:
      'Developed a machine learning model using a TMDb movie database. Predicts movie revenue based on ratings, release date, and other factors. Documented on my github pages.',
    tags: ['Python', 'Scikit-Learn', 'NumPy', 'Keras'],
    links: [
      { label: 'Source Code', href: 'https://github.com/dbruce32/Movie-Success-Prediction', icon: 'fab fa-github' },
    ],
  },
  {
    title: 'Travel App: WanderSync',
    description:
      'A travel application for users to plan trips for themselves or with others. Developed in a group of five for CS 2340 at Georgia Tech.',
    tags: ['Java', 'Firebase', 'Android Studio', 'XML', 'Agile'],
    links: [],
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.body}>
      <Navbar />

      <header className={styles.header}>
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.subtitle}>A collection of my recent work and contributions</p>
      </header>

      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
