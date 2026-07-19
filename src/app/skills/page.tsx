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
      { name: 'C/C++', icon: 'fas fa-c' },
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'MIPS Assembly', icon: 'fa-solid fa-gears' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', icon: 'fa-brands fa-react' },
      { name: 'HTML/CSS', icon: 'fab fa-html5' },
      { name: 'Next.js', icon: 'fas fa-n' },
    ],
  },
  {
    title: 'Libraries & Frameworks',
    skills: [
      { name: 'Scikit-Learn', icon: 'fas fa-brain' },
      { name: 'NumPy', icon: 'fas fa-calculator' },
      { name: 'Pandas', icon: 'fas fa-table' },
      { name: 'Matplotlib', icon: 'fas fa-chart-bar' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: 'fas fa-server' },
      { name: 'Firebase', icon: 'fas fa-fire' },
    ],
  },
  {
    title: 'Tools & Practices',
    skills: [
      { name: 'Git', icon: 'fab fa-git-alt' },
      { name: 'Docker', icon: 'fab fa-docker' },
      { name: 'Agile/Scrum', icon: 'fas fa-recycle' },
      { name: 'Linux', icon: 'fab fa-linux' },
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
