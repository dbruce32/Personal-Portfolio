'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

interface SkillCategory {
  title: string;
  blurb: string;
  usedIn?: string;
  skills: string[];
}

// First line is set large; the rest follows in a lighter weight.
const primaryLanguages = ['Python', 'TypeScript', 'Java', 'C/C++'];
const otherLanguages = [
  'JavaScript',
  'SQL',
  'C#',
  'MATLAB',
  'HTML/CSS',
];

const categories: SkillCategory[] = [
  {
    title: 'Frontend',
    blurb: 'Data-heavy web apps and dashboards.',
    usedIn: 'Walmart dashboard, PogoDB, MSM Lookup, News2Lang',
    skills: ['React', 'Next.js', 'Redux', 'Tailwind CSS'],
  },
  {
    title: 'Backend & Mobile',
    blurb: 'Services, APIs, and an Android app.',
    usedIn: 'Walmart microservices, PogoDB API, WanderSync',
    skills: ['Spring Boot', 'Node.js', 'REST APIs', 'Android Studio'],
  },
  {
    title: 'Machine Learning',
    blurb: 'Computer vision, forecasting, and regression models.',
    usedIn: 'Aquabots, FishCast, Movie Revenue Prediction',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'XGBoost'],
  },
  {
    title: 'Data Analysis',
    blurb: 'Cleaning, exploring, and visualizing datasets.',
    usedIn: 'Movie Revenue Prediction',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Generative AI',
    blurb: 'LLM-powered features and agentic tooling.',
    usedIn: 'MathWorks test generation, News2Lang',
    skills: ['LLM APIs', 'Agentic Workflows', 'Prompt Engineering'],
  },
  {
    title: 'Databases & Cloud',
    blurb: 'Relational, document, and hosted backends.',
    usedIn: 'PogoDB, News2Lang, WanderSync',
    skills: ['PostgreSQL', 'Supabase', 'Firebase', 'Azure Cosmos DB', 'AWS'],
  },
  {
    title: 'DevOps & CI/CD',
    blurb: 'Containers, pipelines, and automated deploys.',
    usedIn: 'Walmart, MathWorks, PogoDB, MSM Lookup',
    skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins', 'Apache Airflow', 'Maven', 'CMake'],
  },
  {
    title: 'Quality & Workflow',
    blurb: 'Testing, monitoring, and team practices.',
    usedIn: 'MathWorks C++ testing, PogoDB, this site',
    skills: ['Jest / Vitest', 'SonarQube', 'Prometheus', 'Git', 'Agile/Scrum', 'LaTeX'],
  },
];

function SkillList({ skills, className }: { skills: string[]; className?: string }) {
  return (
    <ul className={`${styles.skillList} ${className ?? ''}`}>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}

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

        <section className={styles.languages} aria-labelledby="languages-title">
          <h2 id="languages-title" className={styles.kicker}>Languages</h2>
          <SkillList skills={primaryLanguages} className={styles.languagesPrimary} />
          <SkillList skills={otherLanguages} className={styles.languagesOther} />
        </section>

        <ol className={styles.rows}>
          {categories.map((category, index) => (
            <li key={category.title}>
              <section className={styles.row} aria-labelledby={`skills-${index}`}>
                <div className={styles.heading}>
                  <h2 id={`skills-${index}`} className={styles.rowTitle}>{category.title}</h2>
                  <p className={styles.blurb}>{category.blurb}</p>
                </div>
                <SkillList skills={category.skills} className={styles.rowSkills} />
                {category.usedIn && (
                  <p className={styles.usedIn}>
                    <span className={styles.usedInLabel}>Used in</span>
                    {category.usedIn}
                  </p>
                )}
              </section>
            </li>
          ))}
        </ol>
      </div>

      <Footer />
    </div>
  );
}
