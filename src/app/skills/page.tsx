import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import SkillCategory from '@/components/SkillCategory/SkillCategory';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Skills',
};

const skillCategories = [
  {
    title: 'Backend Skills',
    titleIcon: 'fas fa-wrench',
    skills: [
      { name: 'Java', description: 'Object-Oriented Programming language', icon: 'fab fa-java' },
      { name: 'Python', description: 'General purpose high-level programming language', icon: 'fab fa-python' },
      { name: 'C/C++', description: 'General purpose low-level programming language', icon: 'fas fa-c' },
      { name: 'MIPS Assembly', description: 'Low-level language to control a MIPS microprocessor', icon: 'fa-solid fa-gears' },
    ],
  },
  {
    title: 'Frontend Skills',
    titleIcon: 'fas fa-user-tie',
    skills: [
      { name: 'HTML/CSS', description: 'Basic languages for structuring web pages', icon: 'fas fa-project-diagram' },
      { name: 'JavaScript', description: 'High level programming language for dynamic websites', icon: 'fab fa-js' },
      { name: 'React.js', description: 'JavaScript runtime for building scalable network applications', icon: 'fa-brands fa-react' },
    ],
  },
  {
    title: 'Tools & Practices',
    titleIcon: 'fas fa-cloud',
    skills: [
      { name: 'Git', description: 'Distributed version control system', icon: 'fab fa-github' },
      { name: 'Docker', description: 'Containerization and packaging of applications and dependencies', icon: 'fab fa-docker' },
      { name: 'Agile', description: 'Procedural project development methodology', icon: 'fas fa-recycle' },
    ],
  },
  {
    title: 'Libraries',
    titleIcon: 'fas fa-book',
    skills: [
      { name: 'Scikit-Learn', description: 'Open-source machine learning library', icon: 'fas fa-brain' },
      { name: 'NumPy', description: 'Fundamental package for scientific computing', icon: 'fas fa-calculator' },
      { name: 'Pandas', description: 'Open-source data analysis and manipulation tool', icon: 'fas fa-table' },
      { name: 'Matplotlib', description: 'Comprehensive data visualization tool', icon: 'fas fa-chart-bar' },
    ],
  },
  {
    title: 'Databases',
    titleIcon: 'fas fa-database',
    skills: [
      { name: 'MySQL', description: 'Open-source relational DBMS', icon: 'fas fa-server' },
      { name: 'Firebase', description: 'Backend cloud computing service with real-time databases', icon: 'fas fa-fire' },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className={styles.body}>
      <Navbar />

      <header className={styles.header}>
        <h1 className={styles.title}>My Skills</h1>
        <p className={styles.tagline}>Skills in Software Engineering, Data Analysis, and Machine Learning</p>
      </header>

      {skillCategories.map((category) => (
        <SkillCategory key={category.title} {...category} />
      ))}

      <Footer />
    </div>
  );
}
