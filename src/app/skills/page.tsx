import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Skills',
};

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Java', icon: 'fab fa-java' },
      { name: 'TypeScript', icon: 'fas fa-code' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'C/C++', icon: 'fas fa-c' },
      { name: 'C#', icon: 'fas fa-hashtag' },
      { name: 'SQL', icon: 'fas fa-database' },
      { name: 'MATLAB', icon: 'fas fa-square-root-variable' },
      { name: 'HTML/CSS', icon: 'fab fa-html5' },
    ],
  },
  {
    title: 'Frameworks & Frontend',
    skills: [
      { name: 'React.js', icon: 'fa-brands fa-react' },
      { name: 'Next.js', icon: 'fas fa-n' },
      { name: 'Tailwind CSS', icon: 'fas fa-paintbrush' },
      { name: 'Spring Boot', icon: 'fas fa-leaf' },
      { name: 'Android Studio', icon: 'fab fa-android' },
    ],
  },
  {
    title: 'Machine Learning',
    skills: [
      { name: 'TensorFlow', icon: 'fas fa-brain' },
      { name: 'Keras', icon: 'fas fa-network-wired' },
      { name: 'scikit-learn', icon: 'fas fa-cogs' },
      { name: 'XGBoost', icon: 'fas fa-bolt' },
      { name: 'Pandas', icon: 'fas fa-table' },
      { name: 'NumPy', icon: 'fas fa-calculator' },
      { name: 'Matplotlib', icon: 'fas fa-chart-bar' },
      { name: 'Seaborn', icon: 'fas fa-chart-area' },
    ],
  },
  {
    title: 'Databases & Cloud',
    skills: [
      { name: 'Firebase', icon: 'fas fa-fire' },
      { name: 'Azure CosmosDB', icon: 'fab fa-microsoft' },
      { name: 'Supabase', icon: 'fas fa-server' },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Git', icon: 'fab fa-git-alt' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'Kubernetes', icon: 'fas fa-dharmachakra' },
      { name: 'Maven', icon: 'fas fa-cubes' },
      { name: 'Jenkins CI/CD', icon: 'fas fa-infinity' },
      { name: 'Apache Airflow', icon: 'fas fa-wind' },
      { name: 'CMake', icon: 'fas fa-hammer' },
      { name: 'LaTeX', icon: 'fas fa-file-alt' },
      { name: 'Agile/Scrum', icon: 'fas fa-recycle' },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className={styles.body}>
      <Navbar />

      <div className={styles.content}>
        <section className={styles.intro}>
          <h1 className={styles.title}>Skills</h1>
          <p className={styles.subtitle}>
            Software engineering, data analysis, and machine learning.
          </p>
        </section>

        {skillCategories.map((category) => (
          <section key={category.title} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category.title}</h2>
            <div className={styles.skillsGrid}>
              {category.skills.map((skill) => (
                <span key={skill.name} className={styles.skill}>
                  <i className={`${skill.icon} ${styles.skillIcon}`}></i>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}
