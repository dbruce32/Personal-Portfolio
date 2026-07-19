import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import TimelineItem from '@/components/TimelineItem/TimelineItem';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dylan Bruce - Professional Timeline',
};

const experiences = [
  {
    date: 'August 2025 - Present',
    title: 'Undergraduate Researcher',
    subtitle: 'GT Vertical Integration Project',
    description:
      'Conducting research in maritime robotics, focusing on sensing and perception of unstructured marine environments. Utilizing image processing and software development to support navigation, mapping, and exploration with underwater and surface vehicles.',
    icon: 'fas fa-anchor',
  },
  {
    date: 'August 2025 - Present',
    title: 'Linear Algebra Teaching Assistant',
    subtitle: 'GT Department of Mathematics',
    description:
      'Leading weekly teaching sessions, introducing and elaborating fundamental linear algebra topics to a large class of undergraduate students. Involved in grading, assignment creation, and holding office hours/review.',
    icon: 'fas fa-calculator',
  },
  {
    date: 'May 2025 - Present',
    title: 'Discrete Mathematics Teaching Assistant',
    subtitle: 'GT College of Computing',
    description:
      'Assist in teaching Discrete Mathematics at Georgia Tech by holding office hours, grading, and supporting student understanding of core concepts like logic, basic proofs, set theory, introductory combinatorics, and graph theory.',
    icon: 'fas fa-cube',
  },
  {
    date: 'September 2022 - April 2023',
    title: 'Local Service Worker',
    subtitle: 'Arditi Pizzeria',
    description:
      'Provided friendly customer service, prepared food orders, and maintained cleanliness in a fast-paced local pizzeria.',
    icon: 'fas fa-pizza-slice',
  },
  {
    date: 'October 2020 - June 2021',
    title: 'Non-Profit Tutor',
    subtitle: 'Teens Tutor Teens',
    description:
      'Offered free online tutoring to students during the COVID-19 pandemic for a 501(c)(3) non-profit organization.',
    icon: 'fas fa-chalkboard-teacher',
  },
];

export default function ProfessionalPage() {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dylan Bruce - Timeline</h1>
        <p className={styles.tagline}>Undergraduate CS + Math student at Georgia Tech</p>
      </header>

      <Navbar />

      {/* About & Education */}
      <div className={styles.modernSections}>
        <section className={styles.modernAbout}>
          <div className={styles.aboutHeader}>
            <div className={styles.aboutTitle}>
              <div className={styles.aboutIcon}>
                <i className="fas fa-user"></i>
              </div>
              About Me
            </div>
            <a href="/documents/dylan_bruce_resume.pdf" className={styles.downloadCv} download>
              <i className="fas fa-download"></i>
              Download CV
            </a>
          </div>
          <div className={styles.aboutContent}>
            I&apos;m a third year Computer Science major and mathematics minor at Georgia Tech with experience in software development cycles and a strong foundation in Python, Java, and SQL. I&apos;m eager to secure an internship to apply my technical expertise and analytical problem-solving skills in an innovative setting. Above all, I&apos;m driven to learn from my peers while furthering my career.
          </div>
        </section>

        <section className={styles.modernEducation}>
          <div className={styles.educationTitle}>
            <div className={styles.educationIcon}>
              <i className="fas fa-graduation-cap"></i>
            </div>
            Education
          </div>

          <div className={styles.educationItem}>
            <span className={styles.educationDate}>2023 - Present</span>
            <h3 className={styles.educationItemTitle}>Bachelor of Science in Computer Science</h3>
            <p className={styles.educationItemSubtitle}>Georgia Institute of Technology</p>
            <div className={styles.educationDescription}>
              <ul>
                <li><strong>Threads/Focuses:</strong> Intelligence &amp; Information Internetworks</li>
                <li><strong>Relevant Coursework:</strong> Machine Learning, Introduction to AI, Systems and Networks, Design and Analysis of Algorithms, Data Structures &amp; Algorithms, Combinatorics, Probability and Statistics</li>
              </ul>
            </div>
          </div>

          <div className={styles.educationItem}>
            <span className={styles.educationDate}>2019 - 2023</span>
            <h3 className={styles.educationItemTitle}>High School Diploma</h3>
            <p className={styles.educationItemSubtitle}>Brookwood High School</p>
            <div className={styles.educationDescription}>
              <ul>
                <li><strong>Accolades:</strong></li>
                <li>Microsoft Technology Associate (MTA)</li>
                <li>AP Scholar with Distinction</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Work Experience Timeline */}
      <div className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeaderTitle}>Work Experience</h2>
          <p className={styles.sectionHeaderSubtitle}>My professional development journey</p>
        </div>

        <div className={styles.timeline}>
          {experiences.map((exp) => (
            <TimelineItem key={exp.title + exp.date} {...exp} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
