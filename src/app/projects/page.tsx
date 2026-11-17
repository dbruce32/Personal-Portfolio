'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll';
import { getAssetPath } from '@/lib/basePath';
import styles from './page.module.css';

interface ProjectLink {
  label: string;
  href: string;
  icon: string;
}

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  role?: string;
  status?: string;
  video?: string;
  tags: string[];
  links: ProjectLink[];
}

const featured = {
  title: 'ARC-AGI Solver',
  subtitle: 'Knowledge-Based AI (CS 4635) · Fall 2026',
  description:
    'A program-synthesis system for the ARC-AGI-1 benchmark, where each task asks for a grid transformation inferred from only 3–5 examples. It layers pixel-level DSL search, object perception, and verified structural solvers that answer only when they reproduce every training pair exactly.',
  stats: [
    { value: '30/400', label: 'Eval tasks solved' },
    { value: '5×', label: 'Over DSL-search baseline' },
    { value: '0', label: 'Wrong answers from verified solvers' },
  ],
  highlights: [
    'Built a depth-2 search over 23+ DSL primitives with output-shape pruning and fail-fast caching, taking the Gradescope run from timing out to about 40 seconds.',
    'Profiled all 400 eval tasks and found most need part selection, separator splitting, or symmetry completion. Then wrote five solvers for those patterns (symmetry completion, split-and-combine, object crop, local rule learning, self-similar tiling), raising the score from 6 to 30.',
    'Hand-written rule templates solved 38 training tasks but 0 eval tasks. The lesson: representation, not search, was the bottleneck.',
  ],
  tags: ['Python', 'NumPy', 'Program Synthesis', 'Search', 'Knowledge Representation'],
  links: [
    { label: 'GitHub', href: 'https://github.com/dbruce32/ARC-Prize-DSL-Solver', icon: 'fab fa-github' },
  ] as ProjectLink[],
};

const research: Project[] = [
  {
    title: 'Salmon Scale Age Estimation',
    subtitle: 'Georgia Tech VIP Aquabots · Fall 2026',
    status: 'In progress',
    description:
      'A computer vision tool that estimates a salmon\'s age from an image of one of its scales. It counts the growth rings (annuli) and sums the freshwater and saltwater years, automating a reading that fisheries biologists normally do by hand under a microscope.',
    tags: ['Python', 'Computer Vision', 'Image Processing'],
    links: [],
  },
  {
    title: 'Plankton Classification',
    subtitle: 'Georgia Tech VIP Aquabots · Aug 2025 – Present',
    description:
      'A tool that identifies plankton species from underwater microscope imagery using an InceptionV4 CNN, covering 4,000+ images across 50 species.',
    role:
      'I owned the preprocessing pipeline. Redesigning normalization and systematically testing image transformations raised classification accuracy from 50% to 82%.',
    // TODO(dylan): drop the demo video in public/videos/ and set this, e.g. '/videos/plankton-demo.mp4'
    video: undefined,
    tags: ['Python', 'Computer Vision', 'CNN', 'InceptionV4', 'Preprocessing'],
    links: [],
  },
  {
    title: 'FishCast',
    subtitle: 'Climate-Fishery Forecasting · Sep 2025',
    description:
      'LSTM forecasting models in PyTorch that predict temporal shifts in marine species distributions from combined climate and fisheries datasets. Trained and benchmarked on Georgia Tech PACE supercomputing resources with a 5-person team.',
    tags: ['Python', 'PyTorch', 'LSTM', 'HPC'],
    links: [],
  },
];

const projects: Project[] = [
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

function LinkIcons({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className={styles.projectLinks}>
      {links.map((link) => (
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
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className={styles.tags}>
      {tags.map((tag, i) => (
        <span key={`${tag}-${i}`} className={styles.tag}>{tag}</span>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.project}>
      <div className={styles.projectHeader}>
        <h3 className={styles.projectTitle}>
          {project.title}
          {project.status && <span className={styles.status}>{project.status}</span>}
        </h3>
        <LinkIcons links={project.links} />
      </div>
      {project.subtitle && <p className={styles.projectSubtitle}>{project.subtitle}</p>}
      {project.video && (
        <video
          className={styles.video}
          src={getAssetPath(project.video)}
          controls
          muted
          playsInline
          preload="metadata"
          aria-label={`${project.title} demo`}
        />
      )}
      <p className={styles.projectDesc}>{project.description}</p>
      {project.role && (
        <p className={styles.role}>
          <span className={styles.roleLabel}>My role</span>
          {project.role}
        </p>
      )}
      <Tags tags={project.tags} />
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <div className={styles.body}>
      <Navbar />

      <div className={styles.content}>
        <section className={styles.intro}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Things I&apos;ve built, researched, and contributed to.</p>
        </section>

        {/* Featured */}
        <FadeInOnScroll>
          <article className={styles.featured} aria-labelledby="featured-title">
            <span className={styles.featuredBadge}>
              <i className="fas fa-star"></i> Featured
            </span>
            <div className={styles.projectHeader}>
              <h2 id="featured-title" className={styles.featuredTitle}>{featured.title}</h2>
              <LinkIcons links={featured.links} />
            </div>
            <p className={styles.projectSubtitle}>{featured.subtitle}</p>
            <p className={styles.featuredDesc}>{featured.description}</p>

            <dl className={styles.stats}>
              {featured.stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statLabel}>{stat.label}</dt>
                  <dd className={styles.statValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>

            <ul className={styles.highlights}>
              {featured.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <Tags tags={featured.tags} />
          </article>
        </FadeInOnScroll>

        {/* Research */}
        <section className={styles.section} aria-labelledby="research-title">
          <h2 id="research-title" className={styles.sectionTitle}>Research</h2>
          <div className={styles.projectList}>
            {research.map((project, index) => (
              <FadeInOnScroll key={project.title} delay={index * 100}>
                <ProjectCard project={project} />
              </FadeInOnScroll>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className={styles.section} aria-labelledby="more-projects-title">
          <h2 id="more-projects-title" className={styles.sectionTitle}>More Projects</h2>
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <FadeInOnScroll key={project.title} delay={index * 100}>
                <ProjectCard project={project} />
              </FadeInOnScroll>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
