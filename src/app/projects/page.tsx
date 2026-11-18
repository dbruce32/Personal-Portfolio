'use client';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll';
import SectionNav from '@/components/SectionNav/SectionNav';
import { getAssetPath } from '@/lib/basePath';
import styles from './page.module.css';

interface ProjectLink {
  label: string;
  href: string;
}

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  role?: string;
  status?: string;
  youtubeId?: string;
  liveUrl?: string;
  previewImage?: string;
  highlights?: string[];
  tags: string[];
  links: ProjectLink[];
}

const current: Project[] = [
  {
    title: 'ARC-AGI Solver',
    subtitle: 'Graduate Knowledge-Based AI (CS 7635) · Fall 2026',
    description:
      'A program-synthesis system for the ARC Prize ARC-AGI-1 benchmark, where each task asks for a grid transformation inferred from only 3–5 examples. It layers pixel-level DSL search, object perception, and verified structural solvers.',
    highlights: [
      'Built a depth-2 search over 23+ DSL primitives with output-shape pruning and fail-fast caching.',
      'Profiled all 400 eval tasks and found most need part selection, separator splitting, or symmetry completion. Then wrote five solvers for those patterns (symmetry completion, split-and-combine, object crop, local rule learning, self-similar tiling).',
    ],
    tags: ['Python', 'NumPy', 'Program Synthesis', 'Search', 'Knowledge Representation'],
    links: [
      { label: 'GitHub', href: 'https://github.com/dbruce32/ARC-Prize-DSL-Solver' },
    ],
    },
  {
    title: 'Salmon Scale Age Estimation',
    subtitle: 'Georgia Tech VIP Aquabots · Fall 2026',
    description:
      'A computer vision tool that estimates a salmon\'s age from an image of one of its scales. It counts the growth rings (annuli) and sums the freshwater and saltwater years, automating a reading that fisheries biologists normally do by hand under a microscope.',
    tags: ['Python', 'Computer Vision', 'Image Processing'],
    links: [],
  },
];

const research: Project[] = [
  {
    title: 'Plankton Classification',
    subtitle: 'Georgia Tech VIP Aquabots · Aug 2025 – Present',
    description:
      'A tool that identifies plankton species from underwater microscope imagery using an InceptionV4 CNN, covering 4,000+ images across 50 species.',
    role:
      'I owned the preprocessing pipeline. Redesigning normalization and systematically testing image transformations raised classification accuracy from 50% to 82%.',
    youtubeId: 'kbhKBLz08vo',
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
    subtitle: 'Personal Project',
    description:
      'Community-driven Pokémon GO database and companion tool. I built the custom static JSON API that powers it, which fetches upstream data, computes relevant statistics at build time, and deploys per-Pokémon endpoints to GitHub Pages.',
    tags: ['TypeScript', 'Node.js', 'GitHub Actions', 'REST API', 'Vitest'],
    liveUrl: 'https://pogo-db.com/',
    previewImage: '/images/pogo-db-preview.jpg',
    links: [
      { label: 'Live Site', href: 'https://pogo-db.com/' },
      { label: 'Site repo', href: 'https://github.com/S-Tier-Devs/pogo-db' },
      { label: 'API repo', href: 'https://github.com/S-Tier-Devs/pogo-db-api' },
    ],
  },
  {
    title: 'MSM Lookup',
    subtitle: 'Personal Project',
    description:
      'Unofficial fan-made information search engine for the popular mobile game My Singing Monsters. Allows users to search any of 200+ monsters to instantly see useful information, plus a solver for one of the minigames. It\'s backed by msm-db, a static JSON API I built from crowdsourced wiki data, and a daily GitHub Actions job rebuilds and redeploys it to pick up information from new game version releases.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'GitHub Actions', 'Static JSON API'],
    liveUrl: 'https://dbruce32.github.io/msm-lookup/',
    previewImage: '/images/msm-lookup-preview.jpg',
    links: [
      { label: 'Live Site', href: 'https://dbruce32.github.io/msm-lookup/' },
      { label: 'Repo', href: 'https://github.com/dbruce32/msm-lookup' },
      { label: 'Static JSON API repo', href: 'https://github.com/dbruce32/msm-db' },
    ],
  },
  {
    title: 'Movie Revenue Prediction Model',
    subtitle: 'Machine Learning (CS 4641) · 5-person team',
    description:
      'Predicts box office revenue from TMDb metadata (budget, popularity, vote count, release year, and genre) by comparing three models.',
    role:
      'I built the neural network: dense ReLU layers with dropout and L2 regularization, trained on log-transformed revenue with early stopping. I also produced its metrics and visualizations, wrote its report sections, and built the project site.',
    tags: ['Python', 'Scikit-Learn', 'Keras', 'Pandas', 'Matplotlib'],
    liveUrl: 'https://dbruce32.github.io/Movie-Success-Prediction/',
    previewImage: '/images/movie-prediction-preview.jpg',
    links: [
      { label: 'Project Report', href: 'https://dbruce32.github.io/Movie-Success-Prediction/' },
      { label: 'GitHub', href: 'https://github.com/dbruce32/Movie-Success-Prediction' },
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
    title: 'WanderSync',
    description:
      'Collaborative travel planning app developed in a team of five for CS 2340. Users create trips, share itineraries, and coordinate logistics in real time.',
    tags: ['Java', 'Firebase', 'Android Studio', 'XML', 'Agile'],
    links: [],
  },
];

function TextLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;
  return (
    <ul className={styles.links}>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
            {link.label}
            <span aria-hidden="true"> ↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className={styles.tags} aria-label="Technologies">
      {tags.map((tag, i) => (
        <li key={`${tag}-${i}`}>{tag}</li>
      ))}
    </ul>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className={styles.entry}>
      {project.subtitle && <p className={styles.entryMeta}>{project.subtitle}</p>}
      <h3 className={styles.entryTitle}>{project.title}</h3>

      {project.youtubeId && (
        <figure className={styles.media}>
          <div className={styles.video}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}`}
              title={`${project.title} demo`}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </figure>
      )}

      {project.liveUrl && project.previewImage && (
        <figure className={styles.media}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.preview}
            aria-label={`Open ${project.title} live site`}
          >
            <img
              src={getAssetPath(project.previewImage)}
              alt={`${project.title} home page`}
              className={styles.previewImage}
              loading="lazy"
            />
          </a>
          <figcaption className={styles.caption}>
            {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </figcaption>
        </figure>
      )}

      <p className={styles.entryDesc}>{project.description}</p>

      {project.highlights && (
        <ul className={styles.highlights}>
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      {project.role && (
        <p className={styles.role}>
          <span className={styles.roleLabel}>My role</span>
          {project.role}
        </p>
      )}

      <div className={styles.entryFoot}>
        <Tags tags={project.tags} />
        <TextLinks links={project.links} />
      </div>
    </article>
  );
}

function ProjectSection({
  id,
  title,
  items,
  first = false,
}: {
  id: string;
  title: string;
  items: Project[];
  first?: boolean;
}) {
  return (
    <section id={id} className={first ? styles.sectionFirst : styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.sectionHead}>
        <h2 id={`${id}-title`} className={styles.sectionTitle}>{title}</h2>
      </div>
      <div className={styles.entries}>
        {items.map((project, i) => (
          <FadeInOnScroll key={project.title} delay={(i % 2) * 100}>
            <ProjectEntry project={project} />
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  );
}

const sections = [
  { id: 'current', title: 'Current', items: current },
  { id: 'research', title: 'Research', items: research },
  { id: 'past', title: 'Past Projects', items: projects },
];


export default function ProjectsPage() {
  return (
    <div className={styles.body}>
      <Navbar />

      <div className={styles.content}>
        <div className={styles.layout}>
          <section className={styles.intro}>
            <h1 className={styles.title}>Projects</h1>
            <p className={styles.subtitle}>Things I&apos;ve built, researched, and contributed to.</p>
          </section>

          <aside className={styles.sidebar}>
            <SectionNav sections={sections} ariaLabel="Project sections" />
          </aside>

          <div className={styles.main}>
            {sections.map(({ id, title, items }, index) => (
              <ProjectSection key={id} id={id} title={title} items={items} first={index === 0} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
