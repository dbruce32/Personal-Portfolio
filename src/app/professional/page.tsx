import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { getAssetPath } from '@/lib/basePath';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Professional',
};

const experiences = [
  {
    date: 'Aug 2025 – Present',
    title: 'Undergraduate Researcher',
    org: 'GT Vertical Integration Project',
    description:
      'Research in maritime robotics — sensing and perception of unstructured marine environments. Image processing and software development for navigation and exploration.',
  },
  {
    date: 'Aug 2025 – Present',
    title: 'Linear Algebra Teaching Assistant',
    org: 'GT Department of Mathematics',
    description:
      'Leading weekly sessions on fundamental linear algebra topics. Grading, assignment creation, and office hours for undergraduate students.',
  },
  {
    date: 'May 2025 – Present',
    title: 'Discrete Math Teaching Assistant',
    org: 'GT College of Computing',
    description:
      'Supporting student understanding of logic, proofs, set theory, combinatorics, and graph theory through office hours and grading.',
  },
  {
    date: 'Sep 2022 – Apr 2023',
    title: 'Service Worker',
    org: 'Arditi Pizzeria',
    description:
      'Customer service, food preparation, and operations in a fast-paced environment.',
  },
  {
    date: 'Oct 2020 – Jun 2021',
    title: 'Non-Profit Tutor',
    org: 'Teens Tutor Teens',
    description:
      'Free online tutoring during the COVID-19 pandemic for a 501(c)(3) non-profit.',
  },
];

export default function ProfessionalPage() {
  return (
    <div className={styles.body}>
      <Navbar />

      <div className={styles.content}>
        {/* Intro */}
        <section className={styles.intro}>
          <h1 className={styles.title}>Professional</h1>
          <p className={styles.summary}>
            Third-year CS major and math minor at Georgia Tech. Experienced in software development with a foundation in Python, Java, and SQL. Seeking internships to apply technical expertise in innovative settings.
          </p>
          <div className={styles.actions}>
            <a href={getAssetPath("/documents/dylan_bruce_resume.pdf")} target="_blank" rel="noopener noreferrer" className={styles.resumeLink}>
              <i className="fas fa-external-link-alt"></i> View Resume
            </a>
            <a href={getAssetPath("/documents/dylan_bruce_resume.pdf")} className={styles.resumeLink} download>
              <i className="fas fa-download"></i> Download Resume
            </a>
            <a href="https://www.linkedin.com/in/dylangbruce" target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>
        </section>

        {/* Education */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>

          <div className={styles.eduItem}>
            <div className={styles.eduHeader}>
              <h3 className={styles.eduDegree}>B.S. Computer Science</h3>
              <span className={styles.eduDate}>2023 – Present</span>
            </div>
            <p className={styles.eduSchool}>Georgia Institute of Technology</p>
            <p className={styles.eduDetail}>
              Threads: Intelligence &amp; Information Internetworks. Coursework includes Machine Learning, AI, Algorithms, Systems &amp; Networks, Combinatorics, and Probability.
            </p>
          </div>

          <div className={styles.eduItem}>
            <div className={styles.eduHeader}>
              <h3 className={styles.eduDegree}>High School Diploma</h3>
              <span className={styles.eduDate}>2019 – 2023</span>
            </div>
            <p className={styles.eduSchool}>Brookwood High School</p>
            <p className={styles.eduDetail}>
              Microsoft Technology Associate (MTA) · AP Scholar with Distinction
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>

          <div className={styles.expList}>
            {experiences.map((exp) => (
              <div key={exp.title + exp.date} className={styles.expItem}>
                <div className={styles.expDot}></div>
                <div className={styles.expContent}>
                  <div className={styles.expHeader}>
                    <h3 className={styles.expTitle}>{exp.title}</h3>
                    <span className={styles.expDate}>{exp.date}</span>
                  </div>
                  <p className={styles.expOrg}>{exp.org}</p>
                  <p className={styles.expDesc}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
