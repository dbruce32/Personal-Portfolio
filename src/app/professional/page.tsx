'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll';
import { getAssetPath } from '@/lib/basePath';
import styles from './page.module.css';

const awards = [
  { name: 'National Merit Scholar', detail: 'National Merit Scholarship Program' },
  { name: 'AP Scholar with Distinction', detail: 'College Board' },
  { name: 'Microsoft Technology Associate (MTA)', detail: 'Microsoft certification' },
];

const activities: { name: string; detail?: string }[] = [
  { name: 'Big Data Big Impact @ GT', detail: 'Student data science organization' },
  { name: 'WebDev @ GT', detail: 'Built News2Lang, an AI language-learning platform' },
  { name: 'Bouldering' },
  { name: 'Table Tennis' },
];

const experiences = [
  {
    date: 'May 2026 – Aug 2026',
    title: 'Software Engineer II Intern',
    org: 'Walmart Global Tech',
    location: 'Bentonville, AR',
    logo: '/images/wgt.png',
    description:
      'Built a full-stack operational dashboard (Next.js, Tailwind, Java Spring Boot) to consolidate Enterprise Inventory data pipelines. Reduced data access times by 50% across separate systems. Designed CI/CD pipelines with Maven and deployed containerized services on Walmart\'s cloud platform.',
  },
  {
    date: 'Jan 2026 – May 2026',
    title: 'Software Engineer Intern',
    org: 'MathWorks',
    location: 'Natick, MA',
    logo: '/images/mathworks.png',
    description:
      'Expanded C++ test coverage across a multi-million-line codebase by 1% using CMake-based CI/CD. Created 12+ reusable GenAI skills for test generation and designed agentic workflows that accelerated test coverage efficiency by 50%.',
  },
  {
    date: 'Aug 2025 – Present',
    title: 'Machine Learning Researcher',
    org: 'Georgia Tech VIP Aquabots',
    location: 'Atlanta, GA',
    logo: '/images/yellow-jacket.svg',
    description:
      'Improved InceptionV4 CNN accuracy from 50% to 82% for plankton classification across 4,000+ images and 50 species by enhancing preprocessing and normalization pipelines for underwater imagery.',
  },
  {
    date: 'Aug 2025 – Present',
    title: 'Linear Algebra Teaching Assistant',
    org: 'GT Department of Mathematics',
    location: 'Atlanta, GA',
    logo: '/images/yellow-jacket.svg',
    description:
      'Leading weekly sessions on fundamental linear algebra topics. Grading, assignment creation, and office hours for undergraduate students.',
  },
  {
    date: 'May 2025 – Present',
    title: 'Discrete Math Teaching Assistant',
    org: 'GT College of Computing',
    location: 'Atlanta, GA',
    logo: '/images/yellow-jacket.svg',
    description:
      'Supporting student understanding of logic, proofs, set theory, combinatorics, and graph theory through office hours and grading.',
  },
  {
    date: 'Sep 2022 – Apr 2023',
    title: 'Service Worker',
    org: 'Arditi Pizzeria',
    location: 'Atlanta, GA',
    description:
      'Customer service, food preparation, and operations in a fast-paced environment.',
  },
  {
    date: 'Oct 2020 – Jun 2021',
    title: 'Non-Profit Tutor',
    org: 'Teens Tutor Teens',
    location: 'Atlanta, GA',
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
            CS major and math minor at Georgia Tech. Two software engineering internships at Walmart Global Tech and MathWorks. Research in machine learning and experience teaching 1,000+ students.
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
              <h3 className={styles.eduDegree}>B.S. Computer Science, Minor in Mathematics</h3>
              <span className={styles.eduDate}>2023 – May 2027</span>
            </div>
            <p className={styles.eduSchool}>Georgia Institute of Technology</p>
            <p className={styles.eduDetail}>
              GPA: 3.92/4.00 <br />
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
              GPA: 4.56 <br />
              Rank 8/867
            </p>
          </div>
        </section>

        {/* Awards & Activities */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Awards &amp; Activities</h2>
          <div className={styles.awardsGrid}>
            <div>
              <h3 className={styles.awardsHeading}>
                <i className="fas fa-trophy"></i> Awards
              </h3>
              <ul className={styles.awardsList}>
                {awards.map((a) => (
                  <li key={a.name} className={styles.awardItem}>
                    <span className={styles.awardName}>{a.name}</span>
                    <span className={styles.awardDetail}>{a.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.awardsHeading}>
                <i className="fas fa-users"></i> Activities
              </h3>
              <ul className={styles.awardsList}>
                {activities.map((a) => (
                  <li key={a.name} className={styles.awardItem}>
                    <span className={styles.awardName}>{a.name}</span>
                    {a.detail && <span className={styles.awardDetail}>{a.detail}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>

          <div className={styles.expList}>
            {experiences.map((exp, index) => (
              <FadeInOnScroll key={exp.title + exp.date} delay={index * 80}>
                <div className={styles.expItem}>
                  <div className={styles.expDot}></div>
                  <div className={styles.expContent}>
                    <div className={styles.expHeader}>
                      <h3 className={styles.expTitle}>{exp.title}</h3>
                      <span className={styles.expDate}>{exp.date}</span>
                    </div>
                    <div className={styles.expMeta}>
                      {exp.logo && (
                        <img src={getAssetPath(exp.logo)} alt={exp.org} className={styles.expLogo} />
                      )}
                      <p className={styles.expOrg}>{exp.org}</p>
                      <span className={styles.expLocation}>{exp.location}</span>
                    </div>
                    <p className={styles.expDesc}>{exp.description}</p>
                  </div>
                </div>
                {index < experiences.length - 1 && <hr className={styles.expDivider} />}
              </FadeInOnScroll>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
