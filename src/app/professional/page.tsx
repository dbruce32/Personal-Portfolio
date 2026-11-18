'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll';
import ZoomableImage from '@/components/ZoomableImage/ZoomableImage';
import SectionNav from '@/components/SectionNav/SectionNav';
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

interface RolePhoto {
  // Leave src undefined to show a placeholder; set it once the photo is in public/images/roles/.
  src?: string;
  alt: string;
  caption: string;
}

type ExperienceGroup = 'industry' | 'academic' | 'earlier';

interface Experience {
  group: ExperienceGroup;
  date: string;
  title: string;
  org: string;
  location: string;
  logo?: string;
  description: string;
  photo?: RolePhoto;
}

const experiences: Experience[] = [
  {
    // TODO(dylan): confirm start date and description for this role.
    date: 'Aug 2026 - Present',
    title: 'Objects & Design Teaching Assistant',
    group: 'academic',
    org: 'GT College of Computing',
    location: 'Atlanta, GA',
    logo: '/images/yellow-jacket.svg',
    description:
      'Facilitating daily standups for five student groups to introduce industry-standard project management methodologies while still in academia. Also contributing through office hours and grading.',
    photo: {
      src: '/images/roles/cs2340-objects-design-ta.jpg',
      alt: 'CS 2340 Objects & Design group photo with lecturer Dr. Pedro Guillermo Feijóo-García at Georgia Tech',
      caption: 'CS 2340 with Dr. Pedro Guillermo Feijóo-García · Georgia Tech',
    },
  },
  {
    date: 'May 2026 - Aug 2026',
    title: 'Software Engineer II Intern',
    group: 'industry',
    org: 'Walmart Global Tech',
    location: 'Bentonville, AR',
    logo: '/images/wgt.png',
    description:
      'Built a full-stack operational dashboard (Next.js, Tailwind, Java Spring Boot) to consolidate Enterprise Inventory data pipelines. Reduced data access times by 50% across separate systems. Designed CI/CD pipelines with Maven and deployed containerized services on Walmart\'s cloud platform.',
    photo: {
      src: '/images/roles/walmart-sams-club-interns.jpg',
      alt: "Sam's Club summer interns posing with Sam's Club CEO Latriece Watkins",
      caption: "Sam's Club interns with CEO Latriece Watkins · Bentonville, AR",
    },
  },
  {
    date: 'Jan 2026 - May 2026',
    title: 'Software Engineer Intern',
    group: 'industry',
    org: 'MathWorks',
    location: 'Natick, MA',
    logo: '/images/mathworks.png',
    description:
      'Expanded C++ test coverage across a multi-million-line codebase by 1% using CMake-based CI/CD. Created 12+ reusable GenAI skills for test generation and designed agentic workflows that accelerated test coverage efficiency by 50%.',
    photo: {
      src: '/images/roles/mathworks-natick-service-council.jpg',
      alt: "MathWorks interns volunteering at the Natick Service Council's food pantry",
      caption: 'MathWorks interns volunteering at the Natick Service Council food pantry · Natick, MA',
    },
  },
  {
    date: 'Aug 2025 - Present',
    title: 'Machine Learning Researcher',
    group: 'academic',
    org: 'Georgia Tech VIP Aquabots',
    location: 'Atlanta, GA',
    logo: '/images/yellow-jacket.svg',
    description:
      'Contributed to work resulting in a Plankton species classification model (see more in Projects). Improved InceptionV4 CNN accuracy from 50% to 82% for plankton classification across 4,000+ images and 50 species by enhancing preprocessing and normalization pipelines for underwater imagery.',
  },
  {
    date: 'Aug 2025 - Dec 2025',
    title: 'Linear Algebra Teaching Assistant',
    group: 'academic',
    org: 'GT Department of Mathematics',
    location: 'Atlanta, GA',
    logo: '/images/yellow-jacket.svg',
    description:
      'Leading weekly classes of 40+ students teaching fundamental linear algebra topics. Also responsible for grading, assignment creation, and providing office hours for undergraduate students in Differential, Integral, and Multivariable Calculus.',
  },
  {
    date: 'May 2025 - Aug 2025',
    title: 'Discrete Math Teaching Assistant',
    group: 'academic',
    org: 'GT College of Computing',
    location: 'Atlanta, GA',
    logo: '/images/yellow-jacket.svg',
    description:
      'Led weekly review sessions open to 100+ students taking the course. Also supported student understanding of logic, proofs, set theory, combinatorics, and graph theory through office hours and grading.',
    photo: {
      src: '/images/roles/cs2050-discrete-math-ta.jpg',
      alt: 'CS 2050 Discrete Math group photo with lecturer Ronnie Howard on Exam 1 day at Georgia Tech',
      caption: 'CS 2050 Exam 1 with lecturer Ronnie Howard · Georgia Tech',
    },
  },
  {
    date: 'Sep 2022 - Apr 2023',
    title: 'Service Worker',
    group: 'earlier',
    org: 'Arditi Pizzeria',
    location: 'Atlanta, GA',
    description:
      'Customer service, food preparation, and operations in a fast-paced environment.',
  },
  {
    date: 'Oct 2020 - Jun 2021',
    title: 'Non-Profit Tutor',
    group: 'earlier',
    org: 'Teens Tutor Teens',
    location: 'Atlanta, GA',
    description:
      'Free online tutoring during the COVID-19 pandemic for a 501(c)(3) non-profit.',
  },
];

// Industry first for recruiters; teaching and research as their own track; early jobs last.
const experienceGroups: { id: ExperienceGroup; anchor: string; label: string }[] = [
  { id: 'industry', anchor: 'industry', label: 'Industry' },
  { id: 'academic', anchor: 'research-teaching', label: 'Research & Teaching' },
  { id: 'earlier', anchor: 'earlier', label: 'Earlier' },
];

const pageNav = [
  { id: 'education', title: 'Education' },
  { id: 'awards-activities', title: 'Awards & Activities' },
  {
    id: 'experience',
    title: 'Experience',
    children: experienceGroups.map(({ anchor, label }) => ({ id: anchor, title: label })),
  },
];

function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className={styles.timeline}>
      {items.map((exp, index) => (
        <li key={exp.title + exp.date} className={styles.timelineItem}>
          <FadeInOnScroll delay={index * 80}>
            <div className={styles.expItem}>
              <span className={styles.expDate}>{exp.date}</span>
              <span className={styles.expDot} aria-hidden="true"></span>
              <div className={styles.expContent}>
                <h3 className={styles.expTitle}>{exp.title}</h3>
                <div className={styles.expMeta}>
                  {exp.logo && <img src={getAssetPath(exp.logo)} alt="" className={styles.expLogo} />}
                  <p className={styles.expOrg}>{exp.org}</p>
                  <span className={styles.expLocation}>{exp.location}</span>
                </div>
                <p className={styles.expDesc}>{exp.description}</p>
                {exp.photo && <RolePhotoFigure photo={exp.photo} />}
              </div>
            </div>
          </FadeInOnScroll>
        </li>
      ))}
    </ol>
  );
}

function RolePhotoFigure({ photo }: { photo: RolePhoto }) {
  return (
    <figure className={styles.rolePhoto}>
      {photo.src ? (
        <ZoomableImage src={getAssetPath(photo.src)} alt={photo.alt} className={styles.rolePhotoImage} />
      ) : (
        <div className={styles.rolePhotoPlaceholder} role="img" aria-label={`Photo coming soon: ${photo.alt}`}>
          <i className="fas fa-camera" aria-hidden="true"></i>
          <span>Photo coming soon</span>
        </div>
      )}
      <figcaption className={styles.rolePhotoCaption}>{photo.caption}</figcaption>
    </figure>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <div className={styles.sectionHead}>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
  );
}

export default function ProfessionalPage() {
  const resume = getAssetPath('/documents/dylan_bruce_resume.pdf');

  return (
    <div className={styles.body}>
      <Navbar />

      <div className={styles.content}>
        <div className={styles.layout}>
          <div className={styles.introWrap}>
            {/* Intro */}
            <section className={styles.intro}>
              <h1 className={styles.title}>Professional</h1>
              <p className={styles.summary}>
                CS major and math minor at Georgia Tech. Two software engineering internships at Walmart Global Tech and MathWorks. Research in machine learning and experience teaching 1,000+ students.
              </p>
              <ul className={styles.actions}>
                <li>
                  <a href={resume} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                    View resume <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a href={resume} className={styles.textLink} download>
                    Download PDF <span aria-hidden="true">↓</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/dylangbruce" target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>
            </section>
          </div>

          {/* "On this page" index for the whole page, in the right gutter */}
          <aside className={styles.sidebar}>
            <SectionNav sections={pageNav} ariaLabel="Professional sections" />
          </aside>

          <div className={styles.main}>
            {/* Education */}
            <section id="education" className={styles.section} aria-label="Education">
              <SectionHead title="Education" />

              <div className={`${styles.eduRow} ${styles.eduFeatured}`}>
                <div className={styles.eduDate}>
                  2023 – May 2027
                  <span className={styles.eduCurrent}>Current</span>
                </div>
                <div>
                  <h3 className={styles.eduDegree}>B.S. Computer Science, Minor in Mathematics</h3>
                  <p className={styles.eduSchool}>Georgia Institute of Technology</p>
                  <dl className={styles.eduFacts}>
                    <div>
                      <dt>GPA</dt>
                      <dd>3.92 / 4.00</dd>
                    </div>
                    <div>
                      <dt>Threads</dt>
                      <dd>Intelligence &amp; Information Internetworks</dd>
                    </div>
                    <div>
                      <dt>Coursework</dt>
                      <dd>Machine Learning, AI, Algorithms, Systems &amp; Networks, Combinatorics, Probability</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className={styles.eduRow}>
                <span className={styles.eduDate}>2019 – 2023</span>
                <div>
                  <h3 className={styles.eduDegree}>High School Diploma</h3>
                  <p className={styles.eduSchool}>Brookwood High School</p>
                  <dl className={styles.eduFacts}>
                    <div>
                      <dt>GPA</dt>
                      <dd>4.56</dd>
                    </div>
                    <div>
                      <dt>Rank</dt>
                      <dd>8 / 867</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>

            {/* Awards & Activities */}
            <section id="awards-activities" className={styles.section} aria-label="Awards & Activities">
              <SectionHead title="Awards & Activities" />
              <div className={styles.lists}>
                <div>
                  <h3 className={styles.listLabel}>Awards</h3>
                  <ul className={styles.ruledList}>
                    {awards.map((a) => (
                      <li key={a.name}>
                        <span className={styles.itemName}>{a.name}</span>
                        <span className={styles.itemDetail}>{a.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={styles.listLabel}>Activities</h3>
                  <ul className={styles.ruledList}>
                    {activities.map((a) => (
                      <li key={a.name}>
                        <span className={styles.itemName}>{a.name}</span>
                        {a.detail && <span className={styles.itemDetail}>{a.detail}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Experience timeline */}
            <section id="experience" className={styles.section} aria-label="Experience">
              <SectionHead title="Experience" />

              {experienceGroups.map(({ id, anchor, label }) => (
                <section key={id} id={anchor} className={styles.expGroup} aria-labelledby={`exp-${id}`}>
                  <h3 id={`exp-${id}`} className={styles.expGroupLabel}>{label}</h3>
                  <Timeline items={experiences.filter((exp) => exp.group === id)} />
                </section>
              ))}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
